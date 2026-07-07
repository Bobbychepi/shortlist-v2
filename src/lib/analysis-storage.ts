import { AnalysisResult } from "@/types/analysis";

const LATEST_RESULT_KEY = "shortlist_latest_result";
const RESULTS_HISTORY_KEY = "shortlist_results";
const MAX_HISTORY_ITEMS = 50;

function parseJson<T>(value: string | null): T | null {
  if (!value) return null;

  try {
    return JSON.parse(value) as T;
  } catch {
    return null;
  }
}

export function getLatestAnalysis(): AnalysisResult | null {
  if (typeof window === "undefined") return null;

  const raw = window.localStorage.getItem(LATEST_RESULT_KEY);
  const parsed = parseJson<unknown>(raw);

  if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
    return null;
  }

  return parsed as AnalysisResult;
}

export function getAnalysisHistory(): AnalysisResult[] {
  if (typeof window === "undefined") return [];

  const raw = window.localStorage.getItem(RESULTS_HISTORY_KEY);
  const parsed = parseJson<unknown>(raw);

  if (!Array.isArray(parsed)) {
    return [];
  }

  return parsed.filter(
    (item): item is AnalysisResult =>
      typeof item === "object" && item !== null && !Array.isArray(item)
  );
}

export function setLatestAnalysis(result: AnalysisResult): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(LATEST_RESULT_KEY, JSON.stringify(result));
}

export function saveAnalysis(result: AnalysisResult): void {
  if (typeof window === "undefined") return;

  const existing = getAnalysisHistory();
  const filtered = existing.filter((item) => item.id !== result.id);
  const updated = [result, ...filtered].slice(0, MAX_HISTORY_ITEMS);

  window.localStorage.setItem(RESULTS_HISTORY_KEY, JSON.stringify(updated));
  setLatestAnalysis(result);
}

export function clearAnalysisStorage(): void {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(LATEST_RESULT_KEY);
  window.localStorage.removeItem(RESULTS_HISTORY_KEY);
}
