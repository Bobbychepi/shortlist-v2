"use client";

import { ArrowRight, Sparkles } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";

export default function CTASection() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-4xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-3xl px-8 py-20 text-center"
          style={{
            background:
              "linear-gradient(135deg, #1a1b3a 0%, #0e0f1d 40%, #1a1040 100%)",
            boxShadow:
              "0 0 0 1px rgba(99,102,241,0.2), 0 32px 80px rgba(0,0,0,0.6)",
          }}
        >
          <div
            className="pointer-events-none absolute left-1/2 top-20 h-75 w-125 -translate-x-1/2 rounded-full opacity-30"
            style={{
              background:
                "radial-gradient(ellipse, #6366f1 0%, transparent 70%)",
            }}
          />

          <div className="relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="mb-8 inline-flex items-center gap-2 rounded-full border border-indigo-500/25 bg-indigo-500/15 px-3 py-1.5 text-xs font-medium text-indigo-300"
            >
              <Sparkles className="h-3 w-3" />
              Free to start — no credit card required
            </motion.div>

            <h2
              className="mb-5 text-4xl font-bold leading-tight text-white md:text-6xl"
            >
              Ready to get
              <br />
              shortlisted?
            </h2>

            <p className="mx-auto mb-10 max-w-lg text-lg text-white/50">
              Join job seekers using Shortlist to turn weak applications into
              stronger interview opportunities.
            </p>

            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/dashboard"
                className="group bg-primary hover:bg-accent flex items-center justify-center gap-2 rounded-xl px-6 py-3.5 font-medium text-white transition-all duration-200 hover:-translate-y-0.5"
              >
                Analyze my resume
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>


            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}