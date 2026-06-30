"use client";

import { motion } from "motion/react";
import { ArrowRight, FileText, Lightbulb, Sparkles, Star,} from "lucide-react";
import CircularProgress from "../UI/CircularProgress";
import MiniBar from "../UI/MiniBar";
import SkillTag from "../UI/SkillTag";

export default function Hero() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden pt-16">
      <div
        className="pointer-events-none absolute right-0 top-0 h-150 w-150 rounded-full opacity-20"
        style={{
          background: "radial-gradient(circle, #6366f1 0%, transparent 70%)",
          transform: "translate(25%, -25%)",
        }}
      />

      <div
        className="pointer-events-none absolute bottom-0 left-0 h-100 w-100 rounded-full opacity-10"
        style={{
          background: "radial-gradient(circle, #818cf8 0%, transparent 70%)",
          transform: "translate(-30%, 30%)",
        }}
      />

      <div
        id="hero"
        className="mx-auto grid w-full max-w-6xl items-center gap-12 px-6 py-24 md:grid-cols-2"
      >
        <div className="space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-indigo-500/20 bg-indigo-500/10 px-3 py-1.5 text-xs font-medium text-indigo-400">
              <Sparkles className="h-3 w-3" />
              AI-powered resume analysis
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl font-bold leading-[1.08] tracking-tight text-white md:text-6xl"
            style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}
          >
            Get shortlisted,
            <br />
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage:
                  "linear-gradient(135deg, #818cf8 0%, #6366f1 50%, #a78bfa 100%)",
              }}
            >
              not overlooked.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="max-w-md text-lg leading-relaxed text-white/55"
          >
            Upload your resume, paste the job description, and get instant AI
            feedback that tells you exactly what to fix before you apply.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col gap-3 sm:flex-row"
          >
            <button className="group bg-primary hover:bg-accent flex items-center justify-center gap-2 rounded-xl px-6 py-3.5 font-medium text-white transition-all duration-200 hover:-translate-y-0.5">
              Analyze my resume
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </button>

            <button className="flex items-center justify-center gap-2 rounded-xl border border-white/10 px-6 py-3.5 text-white/60 transition-all duration-200 hover:border-white/20 hover:text-white">
              <FileText className="h-4 w-4" />
              See a sample report
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex items-center gap-6 pt-2"
          >
            <div className="-space-x-2 flex">
              {["#f87171", "#fb923c", "#facc15", "#4ade80", "#60a5fa"].map(
                (color, index) => (
                  <div
                    key={color}
                    className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-[#08090f] text-xs font-bold text-white"
                    style={{ backgroundColor: color }}
                  >
                    {["A", "M", "J", "S", "R"][index]}
                  </div>
                ),
              )}
            </div>

            <div>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((item) => (
                  <Star
                    key={item}
                    className="h-3.5 w-3.5 fill-amber-400 text-amber-400"
                  />
                ))}
              </div>

              <p className="mt-0.5 text-xs text-white/40">
                Loved by{" "}
                <span className="font-medium text-white/60">12,000+</span> job
                seekers
              </p>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 32, y: 16 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }}
          className="relative"
        >
          <div
            className="relative rounded-2xl border border-white/10 bg-[#0e0f1d] p-6 shadow-2xl"
            style={{
              boxShadow:
                "0 0 0 1px rgba(255,255,255,0.04), 0 32px 64px rgba(0,0,0,0.6)",
            }}
          >
            <div className="mb-5 flex items-center justify-between">
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-white/40">
                  Analysis complete
                </p>
                <p className="mt-0.5 text-sm font-medium text-white">
                  Senior Frontend Engineer @ Vercel
                </p>
              </div>

              <span className="flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-1 text-xs text-emerald-400">
                <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
                Live
              </span>
            </div>

            <div className="mb-5 flex items-center justify-around border-y border-white/6 py-4">
              <CircularProgress
                value={87}
                size={88}
                label="Match Score"
                color="#6366f1"
              />
              <CircularProgress
                value={92}
                size={88}
                label="ATS Score"
                color="#22d3ee"
              />
              <CircularProgress
                value={78}
                size={88}
                label="Keywords"
                color="#a78bfa"
              />
            </div>

            <div className="mb-5 space-y-3">
              <p className="text-xs font-medium uppercase tracking-wider text-white/40">
                Job Match Breakdown
              </p>

              <MiniBar
                label="Technical Skills"
                value={91}
                color="#6366f1"
                delay={0.1}
              />
              <MiniBar
                label="Experience Level"
                value={84}
                color="#22d3ee"
                delay={0.2}
              />
              <MiniBar
                label="Soft Skills"
                value={76}
                color="#a78bfa"
                delay={0.3}
              />
              <MiniBar
                label="Education"
                value={95}
                color="#34d399"
                delay={0.4}
              />
            </div>

            <div className="space-y-2">
              <p className="text-xs font-medium uppercase tracking-wider text-white/40">
                Matched Skills
              </p>

              <div className="flex flex-wrap gap-1.5">
                {["React", "TypeScript", "Next.js", "Node.js", "Git"].map(
                  (skill) => (
                    <SkillTag key={skill} label={skill} variant="found" />
                  ),
                )}

                <SkillTag label="Docker" variant="missing" />
                <SkillTag label="AWS" variant="suggested" />
              </div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.1 }}
            className="absolute -bottom-5 -left-8 max-w-50 rounded-xl border border-white/10 bg-[#0e0f1d] px-4 py-3 shadow-xl"
            style={{
              boxShadow:
                "0 0 0 1px rgba(255,255,255,0.04), 0 16px 32px rgba(0,0,0,0.5)",
            }}
          >
            <div className="flex items-start gap-2">
              <Lightbulb className="mt-0.5 h-4 w-4 shrink-0 text-amber-400" />

              <p className="text-xs leading-snug text-white/70">
                Add <span className="font-medium text-white">CI/CD</span>{" "}
                experience to boost your score by 6%
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}