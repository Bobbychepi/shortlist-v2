"use client";

import { motion } from "motion/react";
import {
  Plus,
  Upload,
  Eye,
  Download,
  ChevronRight,
  FileText,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const scoreHistory = [
  { date: "Jun 1", score: 58 },
  { date: "Jun 5", score: 64 },
  { date: "Jun 10", score: 69 },
  { date: "Jun 14", score: 71 },
  { date: "Jun 18", score: 76 },
  { date: "Jun 22", score: 82 },
  { date: "Jun 26", score: 87 },
  { date: "Jun 30", score: 89 },
];

const recentAnalyses = [
  {
    role: "Senior Frontend Engineer",
    company: "Vercel",
    score: 89,
    ats: 92,
    date: "Today",
    status: "excellent",
  },
  {
    role: "React Developer",
    company: "Shopify",
    score: 82,
    ats: 88,
    date: "Jun 28",
    status: "good",
  },
  {
    role: "Full Stack Engineer",
    company: "Stripe",
    score: 74,
    ats: 79,
    date: "Jun 25",
    status: "fair",
  },
  {
    role: "Frontend Developer",
    company: "Linear",
    score: 67,
    ats: 71,
    date: "Jun 22",
    status: "fair",
  },
];

function StatCard({
  label,
  value,
  sub,
  color,
}: {
  label: string;
  value: string;
  sub: string;
  color: string;
}) {
  return (
    <div className="rounded-2xl border border-white/[0.07] bg-[#0e0f1d] p-5 shadow-[0_4px_24px_rgba(0,0,0,0.3)]">
      <p className="mb-2 text-xs uppercase tracking-wider text-white/40">
        {label}
      </p>

      <p
        className="mb-1 text-3xl font-bold"
        style={{
          color,
          fontFamily: "'Bricolage Grotesque', sans-serif",
        }}
      >
        {value}
      </p>

      <p className="text-xs text-white/35">{sub}</p>
    </div>
  );
}

function ScoreStatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    excellent: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    good: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20",
    fair: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    poor: "bg-red-500/10 text-red-400 border-red-500/20",
  };

  return (
    <span
      className={`rounded-full border px-2 py-0.5 text-xs capitalize ${
        styles[status] || styles.fair
      }`}
    >
      {status}
    </span>
  );
}

type TooltipPayload = {
  value: number;
};

type CustomTooltipProps = {
  active?: boolean;
  payload?: TooltipPayload[];
  label?: string;
};

function CustomTooltip({ active, payload, label }: CustomTooltipProps) {
  if (!active || !payload?.length) return null;

  return (
    <div className="rounded-lg border border-white/10 bg-[#13142a] px-3 py-2 text-xs shadow-xl">
      <p className="mb-1 text-white/40">{label}</p>
      <p className="font-semibold text-white">{payload[0].value}% match</p>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-[#08090f] text-white">
      <Navbar />

      <section className="mx-auto max-w-7xl px-6 pt-28 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="space-y-7"
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1
                className="text-3xl font-bold tracking-tight text-white"
                style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}
              >
                Dashboard
              </h1>
              <p className="mt-1 text-sm text-white/35">
                Track your resume scores, recent analyses, and application
                progress.
              </p>
            </div>

            <button className="flex items-center gap-2 rounded-xl bg-indigo-500 px-5 py-2.5 text-sm font-medium text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-indigo-400">
              <Plus className="h-4 w-4" />
              New Analysis
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            <StatCard
              label="Total Analyses"
              value="23"
              sub="+3 this week"
              color="#818cf8"
            />
            <StatCard
              label="Avg Match Score"
              value="74%"
              sub="↑ 8% from last week"
              color="#34d399"
            />
            <StatCard
              label="Best Score"
              value="89%"
              sub="Vercel — today"
              color="#a78bfa"
            />
            <StatCard
              label="Applications"
              value="11"
              sub="Tracked this month"
              color="#fb923c"
            />
          </div>

          <div className="grid gap-6 lg:grid-cols-5">
            <div className="rounded-2xl border border-white/[0.07] bg-[#0e0f1d] p-6 shadow-[0_4px_24px_rgba(0,0,0,0.3)] lg:col-span-3">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <p
                    className="text-base font-semibold text-white"
                    style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}
                  >
                    Score Timeline
                  </p>
                  <p className="mt-0.5 text-xs text-white/35">
                    Your resume match score over time
                  </p>
                </div>

                <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-1 text-xs text-emerald-400">
                  ↑ 31pts this month
                </span>
              </div>

              <ResponsiveContainer width="100%" height={220}>
                <AreaChart
                  data={scoreHistory}
                  margin={{ top: 4, right: 4, left: -28, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="scoreGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop
                        offset="5%"
                        stopColor="#6366f1"
                        stopOpacity={0.25}
                      />
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                    </linearGradient>
                  </defs>

                  <XAxis
                    dataKey="date"
                    tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 10 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    domain={[40, 100]}
                    tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 10 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Area
                    type="monotone"
                    dataKey="score"
                    stroke="#6366f1"
                    strokeWidth={2.5}
                    fill="url(#scoreGrad)"
                    dot={{ fill: "#6366f1", r: 3.5, strokeWidth: 0 }}
                    activeDot={{ fill: "#818cf8", r: 5, strokeWidth: 0 }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div className="space-y-4 lg:col-span-2">
              <div className="rounded-2xl border border-white/[0.07] bg-[#0e0f1d] p-5 shadow-[0_4px_24px_rgba(0,0,0,0.3)]">
                <p
                  className="mb-4 text-sm font-semibold text-white"
                  style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}
                >
                  Quick Actions
                </p>

                <div className="space-y-2">
                  {[
                    {
                      icon: Upload,
                      label: "Upload new resume",
                      sub: "PDF or DOCX",
                      color: "#6366f1",
                    },
                    {
                      icon: Eye,
                      label: "View latest report",
                      sub: "Vercel — 89% match",
                      color: "#22d3ee",
                    },
                    {
                      icon: Download,
                      label: "Download report PDF",
                      sub: "Last analysis",
                      color: "#a78bfa",
                    },
                  ].map((action) => (
                    <button
                      key={action.label}
                      className="group flex w-full items-center gap-3 rounded-xl p-3 text-left transition-colors hover:bg-white/4"
                    >
                      <div
                        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg"
                        style={{ backgroundColor: `${action.color}18` }}
                      >
                        <action.icon
                          className="h-4 w-4"
                          style={{ color: action.color }}
                        />
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className="text-sm text-white group-hover:text-white/90">
                          {action.label}
                        </p>
                        <p className="text-xs text-white/30">{action.sub}</p>
                      </div>

                      <ChevronRight className="h-3.5 w-3.5 text-white/20 transition-colors group-hover:text-white/40" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="overflow-hidden rounded-2xl border border-white/[0.07] bg-[#0e0f1d] shadow-[0_4px_24px_rgba(0,0,0,0.3)]">
            <div className="flex items-center justify-between border-b border-white/6 px-6 py-4">
              <p
                className="text-base font-semibold text-white"
                style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}
              >
                Recent Analyses
              </p>

              <button className="text-xs text-indigo-400 transition-colors hover:text-indigo-300">
                View all
              </button>
            </div>

            <div className="divide-y divide-white/5">
              {recentAnalyses.map((analysis, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 px-6 py-4 transition-colors hover:bg-white/2"
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/4">
                    <FileText className="h-4 w-4 text-white/40" />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-white">
                      {analysis.role}
                    </p>
                    <p className="text-xs text-white/35">
                      {analysis.company} · {analysis.date}
                    </p>
                  </div>

                  <div className="hidden items-center gap-3 sm:flex">
                    <div className="text-right">
                      <p className="text-xs text-white/30">Match</p>
                      <p
                        className="text-sm font-semibold text-white"
                        style={{
                          fontFamily: "'Bricolage Grotesque', sans-serif",
                        }}
                      >
                        {analysis.score}%
                      </p>
                    </div>

                    <div className="text-right">
                      <p className="text-xs text-white/30">ATS</p>
                      <p
                        className="text-sm font-semibold text-white"
                        style={{
                          fontFamily: "'Bricolage Grotesque', sans-serif",
                        }}
                      >
                        {analysis.ats}%
                      </p>
                    </div>

                    <ScoreStatusBadge status={analysis.status} />

                    <button className="text-white/25 transition-colors hover:text-white/60">
                      <Eye className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      <Footer />
    </main>
  );
}
