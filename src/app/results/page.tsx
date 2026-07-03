"use client";

import Link from "next/link";
import { motion } from "motion/react";
import {
  Download,
  Layers,
  PenLine,
  RotateCcw,
  Share2,
  Target,
  X,
} from "lucide-react";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const sectionScores = [
  {
    name: "Summary",
    score: 68,
    color: "#fb923c",
    note: "Lacks specific role focus",
  },
  {
    name: "Experience",
    score: 91,
    color: "#34d399",
    note: "Strong quantified impact",
  },
  {
    name: "Education",
    score: 95,
    color: "#34d399",
    note: "Relevant and complete",
  },
  {
    name: "Projects",
    score: 82,
    color: "#6366f1",
    note: "Good, add links",
  },
  {
    name: "Skills",
    score: 74,
    color: "#facc15",
    note: "Missing key tech stack items",
  },
  {
    name: "Certifications",
    score: 45,
    color: "#f87171",
    note: "No relevant certifications",
  },
];

const suggestions = [
  {
    icon: PenLine,
    color: "#6366f1",
    section: "Summary",
    before:
      "Experienced developer looking for challenging opportunities to grow my skills.",
    after:
      "Frontend engineer with 4 years building performant React applications at scale. Led migration to Next.js, reducing TTFB by 40%.",
  },
  {
    icon: Target,
    color: "#22d3ee",
    section: "Experience — Bullet Point",
    before:
      "Responsible for improving the performance of the main application.",
    after:
      "Optimized Core Web Vitals across the main dashboard, improving LCP by 52% and reducing bundle size by 38KB.",
  },
  {
    icon: Layers,
    color: "#a78bfa",
    section: "Skills Section",
    before: "React, JavaScript, CSS, HTML, Node.js",
    after:
      "React 18, Next.js 14, TypeScript, Node.js, Tailwind CSS, PostgreSQL, REST APIs, Git. Add Docker, AWS, CI/CD pipelines.",
  },
];

const keywords = [
  { kw: "React", found: true, count: 6, importance: "Critical" },
  { kw: "TypeScript", found: true, count: 3, importance: "Critical" },
  { kw: "Next.js", found: true, count: 2, importance: "High" },
  { kw: "Docker", found: false, count: 0, importance: "Critical" },
  { kw: "AWS", found: false, count: 0, importance: "High" },
  { kw: "PostgreSQL", found: false, count: 0, importance: "Medium" },
  { kw: "Performance", found: true, count: 4, importance: "High" },
  { kw: "Testing", found: false, count: 0, importance: "High" },
];

function CircularProgress({
  value,
  label,
  color,
}: {
  value: number;
  label: string;
  color: string;
}) {
  const size = 110;
  const strokeWidth = 8;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - value / 100);

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="absolute -rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="rgba(255,255,255,0.06)"
            strokeWidth={strokeWidth}
          />
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          />
        </svg>

        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-2xl font-bold text-white">{value}%</span>
        </div>
      </div>

      <span className="text-xs text-white/40">{label}</span>
    </div>
  );
}

export default function ResultsPage() {
  return (
    <main className="min-h-screen bg-[#08090f] text-white">
      <Navbar />

      <section className="mx-auto max-w-6xl px-6 pt-28 pb-16">
        <div className="mb-8 flex flex-col justify-between gap-4 border-b border-white/[0.06] pb-6 md:flex-row md:items-center">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold">
                Senior Frontend Engineer @ Vercel
              </h1>

              <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2 py-0.5 text-xs text-emerald-400">
                Excellent
              </span>
            </div>

            <p className="mt-1 text-xs text-white/35">
              Analyzed today · alex_johnson_resume.pdf
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <button className="flex items-center gap-1.5 rounded-lg border border-white/[0.1] px-3 py-2 text-xs text-white/60 transition hover:border-white/20 hover:text-white">
              <Share2 className="h-3.5 w-3.5" />
              Share
            </button>

            <button className="flex items-center gap-1.5 rounded-lg border border-white/[0.1] px-3 py-2 text-xs text-white/60 transition hover:border-white/20 hover:text-white">
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
                Your resume is strong, but it still has gaps that will cost you
                interviews.
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-3">
              <CircularProgress
                value={89}
                label="Match Score"
                color="#6366f1"
              />
              <CircularProgress value={92} label="ATS Score" color="#22d3ee" />
              <CircularProgress
                value={78}
                label="Keyword Score"
                color="#a78bfa"
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
                {sectionScores.map((section) => (
                  <div key={section.name}>
                    <div className="mb-1.5 flex justify-between gap-4">
                      <div>
                        <p className="text-sm font-medium">{section.name}</p>
                        <p className="text-xs text-white/35">{section.note}</p>
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
                        style={{ backgroundColor: section.color }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.16 }}
              className="rounded-2xl border border-white/[0.07] bg-[#0e0f1d] p-6"
            >
              <h2 className="mb-5 text-lg font-semibold">Keyword Match</h2>

              <div className="grid grid-cols-2 gap-3">
                {keywords.map((keyword) => (
                  <div
                    key={keyword.kw}
                    className={`rounded-xl border p-3 ${
                      keyword.found
                        ? "border-emerald-500/20 bg-emerald-500/5"
                        : "border-red-500/20 bg-red-500/5"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">{keyword.kw}</span>

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

            <div className="space-y-4">
              {suggestions.map((suggestion) => (
                <div
                  key={suggestion.section}
                  className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-5"
                >
                  <div className="mb-4 flex items-center gap-3">
                    <div
                      className="flex h-9 w-9 items-center justify-center rounded-xl"
                      style={{ backgroundColor: `${suggestion.color}18` }}
                    >
                      <suggestion.icon
                        className="h-4 w-4"
                        style={{ color: suggestion.color }}
                      />
                    </div>

                    <h3 className="font-semibold">{suggestion.section}</h3>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <p className="mb-2 text-xs uppercase tracking-wider text-red-400">
                        Before
                      </p>
                      <p className="rounded-xl border border-red-500/10 bg-red-500/5 p-4 text-sm text-white/45">
                        {suggestion.before}
                      </p>
                    </div>

                    <div>
                      <p className="mb-2 text-xs uppercase tracking-wider text-emerald-400">
                        After
                      </p>
                      <p className="rounded-xl border border-emerald-500/10 bg-emerald-500/5 p-4 text-sm text-white/70">
                        {suggestion.after}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <div className="flex flex-col items-start justify-between gap-4 py-4 md:flex-row md:items-center">
            <p className="text-sm text-white/35">
              Make the suggested improvements and re-analyze to see your new
              score.
            </p>

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
