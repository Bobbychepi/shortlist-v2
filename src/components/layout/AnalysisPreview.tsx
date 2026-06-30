"use client";

import { motion } from "motion/react";
import { Award, CheckCircle, Shield, Sparkles } from "lucide-react";
import { fadeUp } from "@/lib/animations/fadeUp";
import CircularProgress from "../UI/CircularProgress";
import SkillTag from "../UI/SkillTag";



const sections = [
  { name: "Summary", score: 68, color: "#fb923c" },
  { name: "Experience", score: 91, color: "#34d399" },
  { name: "Education", score: 95, color: "#34d399" },
  { name: "Projects", score: 82, color: "#6366f1" },
  { name: "Skills", score: 74, color: "#facc15" },
  { name: "Certifications", score: 45, color: "#f87171" },
];

const strengths = [
  "Strong action verbs throughout experience section",
  "Quantified achievements — 4 metrics found",
  "Clear education section with relevant coursework",
  "Well-structured project descriptions",
];

const weaknesses = [
  "Summary lacks specific technical focus",
  "Missing Docker and Kubernetes experience",
  "No certifications relevant to target role",
  "GitHub/portfolio URL not included",
];

const keywords = [
  { kw: "React", found: true, count: 8 },
  { kw: "TypeScript", found: true, count: 5 },
  { kw: "Next.js", found: true, count: 3 },
  { kw: "CI/CD", found: false, count: 0 },
  { kw: "Kubernetes", found: false, count: 0 },
  { kw: "AWS", found: false, count: 0 },
];

export default function AnalysisPreview() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="mb-16 text-center"
        >
          <p className="mb-4 text-xs font-medium uppercase tracking-widest text-indigo-400">
            Sample Report
          </p>

          <h2
            className="mb-4 text-4xl font-bold text-white md:text-5xl"
            style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}
          >
            A complete picture,
            <br />
            <span className="text-white/40">not guesswork.</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="overflow-hidden rounded-3xl border border-white/[0.07] bg-card"
          style={{
            boxShadow:
              "0 0 0 1px rgba(255,255,255,0.03), 0 32px 80px rgba(0,0,0,0.5)",
          }}
        >
          <div className="flex items-center gap-3 border-b border-white/6 bg-muted/50 px-6 py-4">
            <div className="flex gap-1.5">
              <div className="h-3 w-3 rounded-full bg-red-500/60" />
              <div className="h-3 w-3 rounded-full bg-amber-400/60" />
              <div className="h-3 w-3 rounded-full bg-emerald-500/60" />
            </div>

            <span className="ml-2 text-xs text-white/30">
              Shortlist — Analysis Report
            </span>
          </div>

          <div className="grid gap-8 p-8 lg:grid-cols-5">
            <div className="space-y-8 lg:col-span-2">
              <div>
                <p className="mb-4 text-xs font-medium uppercase tracking-wider text-white/40">
                  Overall Scores
                </p>

                <div className="flex justify-around">
                  <CircularProgress
                    value={87}
                    size={80}
                    label="Match"
                    color="#6366f1"
                  />
                  <CircularProgress
                    value={92}
                    size={80}
                    label="ATS"
                    color="#22d3ee"
                  />
                  <CircularProgress
                    value={78}
                    size={80}
                    label="Keywords"
                    color="#a78bfa"
                  />
                </div>
              </div>

              <div>
                <p className="mb-4 text-xs font-medium uppercase tracking-wider text-white/40">
                  Section Scores
                </p>

                <div className="space-y-3">
                  {sections.map((section, index) => (
                    <div key={section.name} className="flex items-center gap-3">
                      <span className="w-24 text-xs text-white/50">
                        {section.name}
                      </span>

                      <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/8">
                        <motion.div
                          className="h-full rounded-full"
                          style={{ backgroundColor: section.color }}
                          initial={{ width: 0 }}
                          whileInView={{ width: `${section.score}%` }}
                          viewport={{ once: true }}
                          transition={{
                            duration: 0.8,
                            ease: "easeOut",
                            delay: index * 0.07,
                          }}
                        />
                      </div>

                      <span className="w-8 text-right text-xs font-medium text-white/60">
                        {section.score}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <p className="mb-3 text-xs font-medium uppercase tracking-wider text-white/40">
                  Missing Skills
                </p>

                <div className="flex flex-wrap gap-2">
                  {["Docker", "AWS", "PostgreSQL", "CI/CD", "Kubernetes", "Redis"].map(
                    (skill) => (
                      <SkillTag key={skill} label={skill} variant="missing" />
                    ),
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-6 lg:col-span-3">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-emerald-500/15 bg-emerald-500/5 p-5">
                  <div className="mb-4 flex items-center gap-2">
                    <Award className="h-4 w-4 text-emerald-400" />
                    <p className="text-sm font-medium text-emerald-400">
                      Strengths
                    </p>
                  </div>

                  <ul className="space-y-2.5">
                    {strengths.map((strength) => (
                      <li key={strength} className="flex items-start gap-2">
                        <CheckCircle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-400" />
                        <span className="text-xs leading-snug text-white/60">
                          {strength}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-2xl border border-red-500/15 bg-red-500/5 p-5">
                  <div className="mb-4 flex items-center gap-2">
                    <Shield className="h-4 w-4 text-red-400" />
                    <p className="text-sm font-medium text-red-400">
                      Needs Work
                    </p>
                  </div>

                  <ul className="space-y-2.5">
                    {weaknesses.map((weakness) => (
                      <li key={weakness} className="flex items-start gap-2">
                        <div className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-red-400" />
                        <span className="text-xs leading-snug text-white/60">
                          {weakness}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="rounded-2xl border border-indigo-500/20 bg-indigo-500/8 p-5">
                <div className="flex items-start gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-indigo-500/20">
                    <Sparkles className="h-4 w-4 text-indigo-400" />
                  </div>

                  <div>
                    <p className="mb-2 text-sm font-medium text-indigo-300">
                      AI Rewrite — Summary
                    </p>

                    <p className="mb-2 text-xs text-white/40 line-through">
                      &quot;Experienced developer looking for challenging
                      opportunities to grow my skills.&quot;
                    </p>

                    <p className="text-xs leading-relaxed text-white/70">
                      {`"Frontend engineer with 4 years building performant React applications at scale. Led migration from Create React App to Next.js, reducing Time to First Byte by 40%. Seeking to bring deep TypeScript expertise and product intuition to Vercel's developer experience team."`}
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <p className="mb-3 text-xs font-medium uppercase tracking-wider text-white/40">
                  Top Keywords
                </p>

                <div className="grid grid-cols-2 gap-2">
                  {keywords.map((keyword) => (
                    <div
                      key={keyword.kw}
                      className="flex items-center justify-between rounded-lg border border-white/6 bg-white/2 px-3 py-2"
                    >
                      <span className="text-xs text-white/70">
                        {keyword.kw}
                      </span>

                      {keyword.found ? (
                        <span className="text-xs text-emerald-400">
                          ×{keyword.count}
                        </span>
                      ) : (
                        <span className="text-xs text-red-400/70">
                          missing
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}