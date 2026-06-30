"use client";

import { motion } from "motion/react";
import { fadeUp } from "@/lib/animations/fadeUp";
import { steps } from "@/constants/steps";

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="bg-secondary/30 py-24"
    >
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <p className="mb-4 text-xs font-medium uppercase tracking-widest text-indigo-400">
            How it works
          </p>

          <h2
            className="text-4xl font-bold text-white md:text-5xl"

          >
            Three steps.
            <br />
            <span className="text-white/40">
              Three seconds.
            </span>
          </h2>
          <p className="text-white/30 font-bold md:text-4xl">...sort of.</p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-3">
          {steps.map((step, index) => (
            <motion.div
              key={step.n}
              custom={index}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="relative"
            >
              {index < steps.length - 1 && (
                <div className="absolute right-0 top-8 hidden h-px bg-linear-to-r from-white/10 to-transparent md:block left-[calc(50%+32px)]" />
              )}

              <div className="text-center">
                <div
                  className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10"
                  style={{
                    backgroundColor: `${step.color}12`,
                    boxShadow: `0 0 0 1px ${step.color}20`,
                  }}
                >
                  <step.icon
                    className="h-7 w-7"
                    style={{
                      color: step.color,
                    }}
                  />
                </div>

                <div
                  className="mb-2 text-xs font-bold"
                  style={{
                    color: step.color,
                  }}
                >
                  {step.n}
                </div>

                <h3
                  className="mb-3 text-xl font-semibold text-white"
                >
                  {step.title}
                </h3>

                <p className="text-sm leading-relaxed text-white/50">
                  {step.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}