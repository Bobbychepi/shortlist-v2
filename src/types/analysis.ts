export type AnalysisStatus = "excellent" | "good" | "fair" | "poor";

export type SectionScore = {
  name: string;
  score: number;
  note: string;
};

export type KeywordResult = {
  kw: string;
  found: boolean;
  count: number;
  importance: "Critical" | "High" | "Medium";
};

export type RewriteSuggestion = {
  section: string;
  before: string;
  after: string;
};

export type AnalysisResult = {
  id: string;
  createdAt: string;
  fileName: string;
  roleTitle: string;
  company: string;
  score: number;
  ats: number;
  keywordScore: number;
  status: AnalysisStatus;
  summary: string;
  sectionScores: SectionScore[];
  keywords: KeywordResult[];
  suggestions: RewriteSuggestion[];
  recommendation: string;
};


export type UploadedFile = {
  file: File;
  name: string;
  size: string;
};

export const analyzeSteps = [
  "Parsing resume content",
  "Reading job requirements",
  "Running analysis",
  "Scoring ATS compatibility",
  "Generating insights & rewrites",
];