import { NextResponse } from "next/server";
import mammoth from "mammoth";
import PDFParser, { type Output } from "pdf2json";
import Groq from "groq-sdk";

import type {
  AnalysisResult,
  AnalysisStatus,
  KeywordResult,
  SectionScore,
  RewriteSuggestion,
} from "@/types/analysis";

export const runtime = "nodejs";

const GROQ_MODEL = "llama-3.3-70b-versatile";
const MAX_FILE_SIZE = 10 * 1024 * 1024;
const MIN_JOB_DESCRIPTION_LENGTH = 10;
const MIN_RESUME_TEXT_LENGTH = 50;

type JsonObject = Record<string, unknown>;
type KeywordImportance = KeywordResult["importance"];

function decodePdfText(value: string): string {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}

function extractPdfTextFromData(pdfData: Output): string {
  return pdfData.Pages.map((page) =>
    page.Texts.map((text) =>
      text.R.map((run) => decodePdfText(run.T)).join("")
    ).join(" ")
  ).join("\n\n");
}

function parsePdfBuffer(buffer: Buffer): Promise<string> {
  return new Promise((resolve, reject) => {
    const parser = new PDFParser();

    parser.on("pdfParser_dataError", (error) => {
      parser.destroy();
      reject(error instanceof Error ? error : error.parserError);
    });

    parser.on("pdfParser_dataReady", (pdfData) => {
      parser.destroy();
      resolve(extractPdfTextFromData(pdfData));
    });

    parser.parseBuffer(buffer);
  });
}

function asObject(value: unknown): JsonObject {
  return typeof value === "object" && value !== null
    ? (value as JsonObject)
    : {};
}

async function extractResumeText(file: File): Promise<string> {
  const buffer = Buffer.from(await file.arrayBuffer());
  const fileName = file.name.toLowerCase();

  if (file.type === "application/pdf" || fileName.endsWith(".pdf")) {
    return parsePdfBuffer(buffer);
  }

  if (
    file.type ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
    fileName.endsWith(".docx")
  ) {
    const data = await mammoth.extractRawText({ buffer });
    return data.value ?? "";
  }

  throw new Error("Unsupported file type");
}

function clampScore(value: unknown): number {
  return typeof value === "number" && !Number.isNaN(value)
    ? Math.min(100, Math.max(0, value))
    : 0;
}

function normalizeStatus(value: unknown): AnalysisStatus {
  if (
    value === "excellent" ||
    value === "good" ||
    value === "fair" ||
    value === "poor"
  ) {
    return value;
  }

  return "fair";
}

function safeString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function safeSectionScores(value: unknown): SectionScore[] {
  if (!Array.isArray(value)) return [];

  return value.map((item) => {
    const itemObject = asObject(item);

    return {
      name: safeString(itemObject.name) || "Unknown",
      score: clampScore(itemObject.score),
      note: safeString(itemObject.note),
    };
  });
}

function safeKeywords(value: unknown): KeywordResult[] {
  if (!Array.isArray(value)) return [];

  return value.map((item) => {
    const itemObject = asObject(item);
    const rawImportance = safeString(itemObject.importance);

    const importance: KeywordImportance =
      rawImportance === "Critical" ||
      rawImportance === "High" ||
      rawImportance === "Medium"
        ? rawImportance
        : "Medium";

    return {
      kw: safeString(itemObject.kw) || "Unknown",
      found: Boolean(itemObject.found),
      count: clampScore(itemObject.count),
      importance,
    };
  });
}

function safeSuggestions(value: unknown): RewriteSuggestion[] {
  if (!Array.isArray(value)) return [];

  return value.map((item) => {
    const itemObject = asObject(item);

    return {
      section: safeString(itemObject.section) || "General",
      before: safeString(itemObject.before),
      after: safeString(itemObject.after),
    };
  });
}

function safeJsonParse(content: unknown): unknown {
  if (typeof content !== "string") return content;

  try {
    return JSON.parse(content);
  } catch {
    const match = content.match(/\{[\s\S]*\}/);

    if (!match) {
      throw new Error("AI did not return valid JSON");
    }

    return JSON.parse(match[0]);
  }
}

function jsonError(message: string, status = 400) {
  return NextResponse.json({ error: message }, { status });
}

export async function POST(request: Request) {
  const groqApiKey = process.env.GROQ_API_KEY?.trim();

  if (!groqApiKey) {
    return jsonError("GROQ_API_KEY is not configured on the server.", 500);
  }

  const formData = await request.formData();
  const file = formData.get("resume");
  const jobDescription = formData.get("jobDescription");

  if (!(file instanceof File)) {
    return jsonError("Resume file is required.");
  }

  if (file.size > MAX_FILE_SIZE) {
    return jsonError("File is too large. Max size is 10MB.");
  }

  const fileName = file.name.toLowerCase();
  const isPdf = file.type === "application/pdf" || fileName.endsWith(".pdf");
  const isDocx =
    file.type ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
    fileName.endsWith(".docx");

  if (!isPdf && !isDocx) {
    return jsonError(
      "Unsupported file type. Please upload a PDF or DOCX file."
    );
  }

  if (
    typeof jobDescription !== "string" ||
    jobDescription.trim().length < MIN_JOB_DESCRIPTION_LENGTH
  ) {
    return jsonError(
      `Job description must be at least ${MIN_JOB_DESCRIPTION_LENGTH} characters long.`
    );
  }

  let resumeText = "";

  try {
    resumeText = await extractResumeText(file);
  } catch (error) {
    console.error("Resume text extraction failed:", error);

    return jsonError(
      "Unable to extract text from the resume. Please upload a valid PDF or DOCX file."
    );
  }

  if (resumeText.trim().length < MIN_RESUME_TEXT_LENGTH) {
    return jsonError(
      "Could not read enough text from the resume. Image-only PDFs are not supported."
    );
  }

  try {
    const groq = new Groq({
      apiKey: groqApiKey,
    });

    const completion = await groq.chat.completions.create({
      model: GROQ_MODEL,
      temperature: 0.2,
      response_format: { type: "json_object" },
      messages: [
        {
          role: "system",
          content:
            "You are an ATS resume analyzer. Return only valid JSON. Do not use markdown. Do not invent details absent from the resume.",
        },
        {
          role: "user",
          content: `Analyze this resume against this job description.

Resume:
${resumeText.slice(0, 12000)}

Job Description:
${jobDescription.trim().slice(0, 6000)}

Return only valid JSON in exactly this shape:
{
  "roleTitle": "string",
  "company": "string",
  "score": 0,
  "ats": 0,
  "keywordScore": 0,
  "status": "excellent",
  "summary": "string",
  "sectionScores": [
    { "name": "string", "score": 0, "note": "string" }
  ],
  "keywords": [
    { "kw": "string", "found": true, "count": 0, "importance": "Critical" }
  ],
  "suggestions": [
    { "section": "string", "before": "string", "after": "string" }
  ],
  "recommendation": "string"
}

Do not fabricate companies, qualifications, technologies, achievements, or metrics. Rewrites may improve wording but must remain truthful.`,
        },
      ],
    });

    const content = completion.choices[0]?.message?.content;

    if (!content) {
      return jsonError("No response received from Groq.", 502);
    }

    const aiResult = asObject(safeJsonParse(content));

    const result: AnalysisResult = {
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      fileName: file.name,
      roleTitle: safeString(aiResult.roleTitle) || "Untitled role",
      company: safeString(aiResult.company),
      score: clampScore(aiResult.score),
      ats: clampScore(aiResult.ats),
      keywordScore: clampScore(aiResult.keywordScore),
      status: normalizeStatus(aiResult.status),
      summary: safeString(aiResult.summary),
      sectionScores: safeSectionScores(aiResult.sectionScores),
      keywords: safeKeywords(aiResult.keywords),
      suggestions: safeSuggestions(aiResult.suggestions),
      recommendation: safeString(aiResult.recommendation),
    };

    return NextResponse.json(result);
  } catch (error) {
    console.error("Groq analysis failed:", error);

    const message =
      error instanceof Error && error.message
        ? error.message
        : "Failed to analyze resume. Please try again.";

    return jsonError(message, 500);
  }
}
