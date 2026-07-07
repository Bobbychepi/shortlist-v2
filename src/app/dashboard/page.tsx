"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import { Plus, Upload, Eye, Download, ChevronRight, FileText } from "lucide-react";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import StatCard from "@/components/UI/StatCard";
import ScoreStatusBadge from "@/components/UI/ScoreStatusBadge";
import ScoreTimeline from "@/components/UI/ScoreTimeline";
import EmptyDashboard from "@/components/UI/EmptyDashboard";
import { formatShortDate } from "@/lib/date";
import {
  getAnalysisHistory,
  getLatestAnalysis,
  setLatestAnalysis,
} from "@/lib/analysis-storage";
import type { AnalysisResult } from "@/types/analysis";

export default function DashboardPage() {
  const router = useRouter();

  const [history] = useState<AnalysisResult[]>(getAnalysisHistory);
  const [latestResult] = useState<AnalysisResult | null>(getLatestAnalysis);

  const totalAnalyses = history.length;

  const averageScore = totalAnalyses
    ? Math.round(history.reduce((sum, item) => sum + item.score, 0) / totalAnalyses)
    : 0;

  const bestScore = totalAnalyses ? Math.max(...history.map((item) => item.score)) : 0;

  const thisMonthCount = useMemo(() => {
    const now = new Date();

    return history.filter((item) => {
      const date = new Date(item.createdAt);

      return (
        !Number.isNaN(date.getTime()) &&
        date.getMonth() === now.getMonth() &&
        date.getFullYear() === now.getFullYear()
      );
    }).length;
  }, [history]);

  const chartData = useMemo(() => {
    const sorted = [...history].sort(
      (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    );

    return sorted.slice(-12).map((item) => ({
      date: formatShortDate(item.createdAt),
      score: item.score,
    }));
  }, [history]);

  const recentAnalyses = useMemo(
    () =>
      [...history]
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        .slice(0, 5),
    [history]
  );

  function openAnalysis(result: AnalysisResult) {
    setLatestAnalysis(result);
    router.push("/results");
  }

  return (
    <main className="min-h-screen bg-[#08090f] text-white">
      <Navbar />

      <section className="mx-auto max-w-7xl px-6 pb-16 pt-28">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="space-y-7"
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-white">Dashboard</h1>
              <p className="mt-1 text-sm text-white/35">
                Track your resume scores and saved analysis history.
              </p>
            </div>

            <button
              type="button"
              onClick={() => router.push("/analyze")}
              className="flex items-center gap-2 rounded-xl bg-indigo-500 px-5 py-2.5 text-sm font-medium text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-indigo-400"
            >
              <Plus className="h-4 w-4" />
              New Analysis
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            <StatCard label="Total Analyses" value={`${totalAnalyses}`} sub="Saved in browser storage" color="#818cf8" />
            <StatCard label="Avg Match Score" value={`${averageScore}%`} sub="Across saved analyses" color="#34d399" />
            <StatCard label="Best Score" value={`${bestScore}%`} sub="Highest match score" color="#a78bfa" />
            <StatCard label="This Month" value={`${thisMonthCount}`} sub="Recent analyses" color="#fb923c" />
          </div>

          {totalAnalyses === 0 ? (
            <EmptyDashboard onStartAnalysis={() => router.push("/analyze")} />
          ) : (
            <>
              <div className="grid gap-6 lg:grid-cols-5">
                <ScoreTimeline chartData={chartData} thisMonthCount={thisMonthCount} />

                <div className="space-y-4 lg:col-span-2">
                  <div className="rounded-2xl border border-white/[0.07] bg-[#0e0f1d] p-5 shadow-[0_4px_24px_rgba(0,0,0,0.3)]">
                    <p className="mb-4 text-sm font-semibold text-white">Quick Actions</p>

                    <div className="space-y-2">
                      <button
                        type="button"
                        onClick={() => router.push("/analyze")}
                        className="group flex w-full items-center gap-3 rounded-xl p-3 text-left transition-colors hover:bg-white/4"
                      >
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#6366f118] text-[#6366f1]">
                          <Upload className="h-4 w-4" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-sm text-white group-hover:text-white/90">Upload new resume</p>
                          <p className="text-xs text-white/30">PDF or DOCX</p>
                        </div>
                        <ChevronRight className="h-3.5 w-3.5 text-white/20 transition-colors group-hover:text-white/40" />
                      </button>

                      <button
                        type="button"
                        disabled={!latestResult}
                        onClick={() => latestResult && router.push("/results")}
                        className={`group flex w-full items-center gap-3 rounded-xl p-3 text-left transition-colors ${
                          latestResult ? "hover:bg-white/4" : "cursor-not-allowed opacity-50"
                        }`}
                      >
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#22d3ee18] text-[#22d3ee]">
                          <Eye className="h-4 w-4" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-sm text-white group-hover:text-white/90">View latest report</p>
                          <p className="text-xs text-white/30">Open current analysis</p>
                        </div>
                        <ChevronRight className="h-3.5 w-3.5 text-white/20 transition-colors group-hover:text-white/40" />
                      </button>

                      <button
                        type="button"
                        disabled
                        className="group flex w-full cursor-not-allowed items-center gap-3 rounded-xl p-3 text-left opacity-50 transition-colors"
                        title="Coming soon"
                      >
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#a78bfa18] text-[#a78bfa]">
                          <Download className="h-4 w-4" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-sm text-white">Download report PDF</p>
                          <p className="text-xs text-white/30">Coming soon</p>
                        </div>
                        <ChevronRight className="h-3.5 w-3.5 text-white/20" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="overflow-hidden rounded-2xl border border-white/[0.07] bg-[#0e0f1d] shadow-[0_4px_24px_rgba(0,0,0,0.3)]">
                <div className="flex items-center justify-between border-b border-white/6 px-6 py-4">
                  <p className="text-base font-semibold text-white">Recent Analyses</p>

                  <button type="button" className="text-xs text-indigo-400 transition-colors hover:text-indigo-300">
                    View all
                  </button>
                </div>

                <div className="divide-y divide-white/5">
                  {recentAnalyses.map((analysis) => (
                    <button
                      key={analysis.id}
                      type="button"
                      onClick={() => openAnalysis(analysis)}
                      className="w-full text-left transition-colors hover:bg-white/2"
                    >
                      <div className="flex items-center gap-4 px-6 py-4">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/4">
                          <FileText className="h-4 w-4 text-white/40" />
                        </div>

                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-medium text-white">{analysis.roleTitle}</p>
                          <p className="text-xs text-white/35">
                            {analysis.company?.trim() || "Unknown company"} · {formatShortDate(analysis.createdAt)}
                          </p>
                        </div>

                        <div className="hidden items-center gap-3 sm:flex">
                          <div className="text-right">
                            <p className="text-xs text-white/30">Match</p>
                            <p className="text-sm font-semibold text-white">{analysis.score}%</p>
                          </div>

                          <div className="text-right">
                            <p className="text-xs text-white/30">ATS</p>
                            <p className="text-sm font-semibold text-white">{analysis.ats}%</p>
                          </div>

                          <ScoreStatusBadge status={analysis.status} />

                          <Eye className="h-4 w-4 text-white/60 transition-colors hover:text-white/80" />
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}
        </motion.div>
      </section>

      <Footer />
    </main>
  );
}