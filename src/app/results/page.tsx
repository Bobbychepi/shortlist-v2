"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "motion/react";
import { Download, PenLine, RotateCcw, Share2, X } from "lucide-react";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { getLatestAnalysis } from "@/lib/analysis-storage";
import { AnalysisResult } from "@/types/analysis";
import { getScoreColor } from "@/lib/score";
import CircularProgress from "@/components/UI/CircularProgress";
import { formatDate } from "@/lib/date";

export default function ResultsPage() {
  const [latestResult] = useState<AnalysisResult | null>(() =>
    getLatestAnalysis()
  );

  if (!latestResult) {
    return (
      <main className="min-h-screen bg-[#08090f] text-white">
        <Navbar />
        <section className="mx-auto max-w-6xl px-6 pt-28 pb-16">
          <div className="rounded-2xl border border-white/[0.07] bg-[#0e0f1d] p-10 text-center">
            <p className="text-sm text-white/40">No analysis found yet.</p>
            <h1 className="mt-4 text-3xl font-bold">
              Start your first resume analysis
            </h1>
            <p className="mt-2 text-sm text-white/35">
              Upload a resume and paste a job description to generate your
              results.
            </p>
            <Link
              href="/analyze"
              className="mt-6 inline-flex rounded-xl bg-indigo-500 px-6 py-3 text-sm font-medium text-white transition hover:bg-indigo-400"
            >
              Analyze a resume
            </Link>
          </div>
        </section>
        <Footer />
      </main>
    );
  }

  const company = latestResult.company.trim() || "Unknown company";
  const formattedDate = formatDate(latestResult.createdAt);
  const scoreColor = getScoreColor(latestResult.score);
  const atsColor = getScoreColor(latestResult.ats);
  const keywordColor = getScoreColor(latestResult.keywordScore);

  return (
    <main className="min-h-screen bg-[#08090f] text-white">
      <Navbar />

      <section className="mx-auto max-w-6xl px-6 pt-28 pb-16">
        <div className="mb-8 flex flex-col justify-between gap-4 border-b border-white/[0.06] pb-6 md:flex-row md:items-center">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-xl font-bold">
                {latestResult.roleTitle} @ {company}
              </h1>
              <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2 py-0.5 text-xs text-emerald-400 capitalize">
                {latestResult.status}
              </span>
            </div>
            <p className="mt-1 text-xs text-white/35">
              Analyzed {formattedDate} · {latestResult.fileName}
            </p>
            {latestResult.summary && (
              <p className="mt-3 max-w-2xl text-sm text-white/40">
                {latestResult.summary}
              </p>
            )}
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              className="flex items-center gap-1.5 rounded-lg border border-white/[0.1] px-3 py-2 text-xs text-white/40 cursor-not-allowed"
              title="Coming soon"
            >
              <Share2 className="h-3.5 w-3.5" />
              Share
            </button>

            <button
              type="button"
              className="flex items-center gap-1.5 rounded-lg border border-white/[0.1] px-3 py-2 text-xs text-white/40 cursor-not-allowed"
              title="Coming soon"
            >
              <Download className="h-3.5 w-3.5" />
              Export PDF
            </button>

            <Link
              href="/analyze"
              className="flex items-center gap-1.5 rounded-lg bg-indigo-500 px-3 py-2 text-xs font-medium text-white transition hover:bg-indigo-400"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              Re-analyze
            </Link>
          </div>
        </div>

        <div className="space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="rounded-2xl border border-white/[0.07] bg-[#0e0f1d] p-7"
          >
            <div className="mb-8">
              <h2 className="text-lg font-semibold">Overall Scores</h2>
              <p className="mt-1 text-sm text-white/35">
                These results reflect your latest processed resume and job
                match.
              </p>
            </div>
            <div className="grid gap-6 sm:grid-cols-3">
              <CircularProgress
                value={latestResult.score}
                label="Match Score"
                color={scoreColor}
              />
              <CircularProgress
                value={latestResult.ats}
                label="ATS Score"
                color={atsColor}
              />
              <CircularProgress
                value={latestResult.keywordScore}
                label="Keyword Score"
                color={keywordColor}
              />
            </div>
          </motion.div>

          <div className="grid gap-6 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.1 }}
              className="rounded-2xl border border-white/[0.07] bg-[#0e0f1d] p-6"
            >
              <h2 className="mb-5 text-lg font-semibold">Section Scores</h2>
              <div className="space-y-4">
                {latestResult.sectionScores.length > 0 ? (
                  latestResult.sectionScores.map((section) => (
                    <div key={section.name}>
                      <div className="mb-1.5 flex justify-between gap-4">
                        <div>
                          <p className="text-sm font-medium">{section.name}</p>
                          <p className="text-xs text-white/35">
                            {section.note}
                          </p>
                        </div>
                        <span className="text-sm font-semibold">
                          {section.score}%
                        </span>
                      </div>
                      <div className="h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${section.score}%` }}
                          transition={{ duration: 0.8 }}
                          className="h-full rounded-full"
                          style={{
                            backgroundColor: getScoreColor(section.score),
                          }}
                        />
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-white/40">
                    No section score data available.
                  </p>
                )}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.16 }}
              className="rounded-2xl border border-white/[0.07] bg-[#0e0f1d] p-6"
            >
              <h2 className="mb-5 text-lg font-semibold">Keyword Match</h2>
              {latestResult.keywords.length > 0 ? (
                <div className="grid grid-cols-2 gap-3">
                  {latestResult.keywords.map((keyword) => (
                    <div
                      key={keyword.kw}
                      className={`rounded-xl border p-3 ${
                        keyword.found
                          ? "border-emerald-500/20 bg-emerald-500/5"
                          : "border-red-500/20 bg-red-500/5"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">
                          {keyword.kw}
                        </span>
                        {keyword.found ? (
                          <span className="text-xs font-semibold text-emerald-400">
                            ×{keyword.count}
                          </span>
                        ) : (
                          <X className="h-3.5 w-3.5 text-red-400" />
                        )}
                      </div>
                      <p className="mt-1 text-[10px] text-white/30">
                        {keyword.importance}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-white/40">
                  No keyword results available.
                </p>
              )}
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.22 }}
            className="rounded-2xl border border-white/[0.07] bg-[#0e0f1d] p-6"
          >
            <h2 className="mb-5 text-lg font-semibold">
              AI Rewrite Suggestions
            </h2>
            {latestResult.suggestions.length > 0 ? (
              <div className="space-y-4">
                {latestResult.suggestions.map((suggestion, index) => (
                  <div
                    key={`${suggestion.section}-${index}`}
                    className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-5"
                  >
                    <div className="mb-4 flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-400">
                        <PenLine className="h-4 w-4" />
                      </div>
                      <h3 className="font-semibold">{suggestion.section}</h3>
                    </div>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div>
                        <p className="mb-2 text-xs uppercase tracking-wider text-red-400">
                          Before
                        </p>
                        <p className="rounded-xl border border-red-500/10 bg-red-500/5 p-4 text-sm text-white/45">
                          {suggestion.before || "No current text available."}
                        </p>
                      </div>
                      <div>
                        <p className="mb-2 text-xs uppercase tracking-wider text-emerald-400">
                          After
                        </p>
                        <p className="rounded-xl border border-emerald-500/10 bg-emerald-500/5 p-4 text-sm text-white/70">
                          {suggestion.after ||
                            "No suggested rewrite available."}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-white/40">
                No rewrite suggestions available.
              </p>
            )}
          </motion.div>

          <div className="flex flex-col items-start justify-between gap-4 py-4 md:flex-row md:items-center">
            <div>
              <p className="text-sm text-white/35">
                {latestResult.recommendation}
              </p>
            </div>
            <Link
              href="/analyze"
              className="flex items-center gap-2 rounded-xl bg-indigo-500 px-6 py-3 text-sm font-medium text-white transition hover:-translate-y-0.5 hover:bg-indigo-400"
            >
              <RotateCcw className="h-4 w-4" />
              Re-analyze Resume
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
