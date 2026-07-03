"use client";

import { useCallback, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import {
  ArrowRight,
  Brain,
  CheckCircle,
  FileText,
  RotateCcw,
  Upload,
  Zap,
} from "lucide-react";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

type UploadedFile = {
  name: string;
  size: string;
};

const analyzeSteps = [
  "Parsing resume content",
  "Reading job requirements",
  "Running AI analysis",
  "Scoring ATS compatibility",
  "Generating insights & rewrites",
];

export default function AnalyzePage() {
  const router = useRouter();

  const [uploadedFile, setUploadedFile] = useState<UploadedFile | null>(null);
  const [jobDesc, setJobDesc] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisStep, setAnalysisStep] = useState(-1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  const fileRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback((file: File) => {
    const isValid =
      file.type === "application/pdf" ||
      file.name.toLowerCase().endsWith(".docx");

    if (!isValid) return;

    setUploadedFile({
      name: file.name,
      size: `${(file.size / 1024).toFixed(0)} KB`,
    });
  }, []);

  const handleDrop = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      setIsDragging(false);

      const file = event.dataTransfer.files[0];
      if (file) handleFile(file);
    },
    [handleFile]
  );

  async function runAnalysis() {
    if (!uploadedFile || jobDesc.trim().length <= 50) return;

    setIsAnalyzing(true);
    setCompletedSteps([]);

    for (let i = 0; i < analyzeSteps.length; i++) {
      setAnalysisStep(i);
      await new Promise((resolve) => setTimeout(resolve, 700));
      setCompletedSteps((prev) => [...prev, i]);
    }

    router.push("/results");
  }

  const canAnalyze = uploadedFile && jobDesc.trim().length > 50;

  return (
    <main className="min-h-screen bg-[#08090f] text-white">
      <Navbar />

      {isAnalyzing && (
        <div className="fixed inset-0 z-999 flex items-center justify-center bg-[#08090f]/95 backdrop-blur-md">
          <div className="w-full max-w-sm px-4">
            <div className="mb-10 text-center">
              <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border border-indigo-500/30 bg-indigo-500/20">
                <Brain className="h-8 w-8 text-indigo-400" />
              </div>

              <h2 className="mb-2 text-2xl font-bold">
                Analyzing your resume
              </h2>

              <p className="text-sm text-white/40">
                Checking your resume against the job description.
              </p>
            </div>

            <div className="space-y-3">
              {analyzeSteps.map((step, index) => {
                const done = completedSteps.includes(index);
                const active = analysisStep === index && !done;

                return (
                  <div
                    key={step}
                    className={`flex items-center gap-3 rounded-xl border px-4 py-3 ${
                      done
                        ? "border-emerald-500/20 bg-emerald-500/10"
                        : active
                        ? "border-indigo-500/30 bg-indigo-500/10"
                        : "border-white/6 bg-white/2"
                    }`}
                  >
                    {done ? (
                      <CheckCircle className="h-4 w-4 text-emerald-400" />
                    ) : active ? (
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-indigo-400 border-t-transparent" />
                    ) : (
                      <div className="h-4 w-4 rounded-full border border-white/20" />
                    )}

                    <span
                      className={`text-sm ${
                        done
                          ? "text-emerald-400"
                          : active
                          ? "text-white"
                          : "text-white/30"
                      }`}
                    >
                      {step}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      <section className="mx-auto max-w-7xl px-6 pt-28 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="space-y-8"
        >
          <div>
            <h1 className="text-3xl font-bold">New Analysis</h1>
            <p className="mt-1 text-sm text-white/35">
              Upload your resume and paste the job description.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-indigo-500 text-xs font-bold">
                  1
                </div>
                <h2 className="font-semibold">Upload your resume</h2>
              </div>

              <p className="ml-8 text-xs text-white/35">
                PDF or DOCX · Max 10MB
              </p>

              <motion.div
                onDragOver={(event) => {
                  event.preventDefault();
                  setIsDragging(true);
                }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleDrop}
                onClick={() => !uploadedFile && fileRef.current?.click()}
                className={`relative min-h-[260px] overflow-hidden rounded-2xl border-2 border-dashed transition ${
                  uploadedFile
                    ? "cursor-default border-emerald-500/40 bg-emerald-500/5"
                    : "cursor-pointer border-white/[0.08] hover:border-white/20 hover:bg-white/[0.02]"
                }`}
              >
                <input
                  ref={fileRef}
                  type="file"
                  accept=".pdf,.docx"
                  className="hidden"
                  onChange={(event) => {
                    const file = event.target.files?.[0];
                    if (file) handleFile(file);
                  }}
                />

                <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-8 text-center">
                  {uploadedFile ? (
                    <>
                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-emerald-500/25 bg-emerald-500/15">
                        <FileText className="h-7 w-7 text-emerald-400" />
                      </div>

                      <div>
                        <p className="mb-1 font-semibold">
                          {uploadedFile.name}
                        </p>
                        <p className="text-xs text-white/40">
                          {uploadedFile.size} · Ready to analyze
                        </p>
                      </div>

                      <button
                        onClick={(event) => {
                          event.stopPropagation();
                          setUploadedFile(null);
                          fileRef.current?.click();
                        }}
                        className="flex items-center gap-1.5 text-xs text-white/30 transition hover:text-white/60"
                      >
                        <RotateCcw className="h-3 w-3" />
                        Replace file
                      </button>
                    </>
                  ) : (
                    <>
                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.05]">
                        <Upload className="h-7 w-7 text-white/40" />
                      </div>

                      <div>
                        <p className="mb-1 font-medium">
                          {isDragging ? "Drop it here" : "Drop your resume here"}
                        </p>
                        <p className="text-sm text-white/35">
                          or <span className="text-indigo-400">browse files</span>
                        </p>
                      </div>
                    </>
                  )}
                </div>
              </motion.div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-indigo-500 text-xs font-bold">
                  2
                </div>
                <h2 className="font-semibold">Paste job description</h2>
              </div>

              <p className="ml-8 text-xs text-white/35">
                Add the role requirements so Shortlist can compare properly.
              </p>

              <textarea
                value={jobDesc}
                onChange={(event) => setJobDesc(event.target.value)}
                placeholder="Paste the full job description here..."
                className="min-h-[260px] w-full resize-none rounded-2xl border border-white/[0.08] bg-[#0e0f1d] p-5 text-sm text-white outline-none transition placeholder:text-white/20 focus:border-indigo-500/50"
              />

              <p className="text-right text-xs text-white/25">
                {jobDesc.trim().length} characters
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between rounded-2xl border border-white/[0.07] bg-[#0e0f1d] p-5">
            <div>
              <h3 className="font-semibold">
                {canAnalyze ? "Ready to analyze!" : "Complete both steps above"}
              </h3>

              <div className="mt-2 flex gap-4 text-xs">
                <span
                  className={
                    uploadedFile ? "text-emerald-400" : "text-white/30"
                  }
                >
                  Resume uploaded
                </span>

                <span
                  className={
                    jobDesc.trim().length > 50
                      ? "text-emerald-400"
                      : "text-white/30"
                  }
                >
                  Job description added
                </span>
              </div>
            </div>

            <button
              onClick={runAnalysis}
              disabled={!canAnalyze}
              className={`flex items-center gap-2.5 rounded-xl px-8 py-3.5 text-sm font-medium transition ${
                canAnalyze
                  ? "bg-indigo-500 text-white hover:-translate-y-0.5 hover:bg-indigo-400"
                  : "cursor-not-allowed bg-white/[0.05] text-white/25"
              }`}
            >
              <Zap className="h-4 w-4" />
              Analyze Resume
              {canAnalyze && <ArrowRight className="h-4 w-4" />}
            </button>
          </div>
        </motion.div>
      </section>

      <Footer />
    </main>
  );
}