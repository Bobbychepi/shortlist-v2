"use client";

import { motion } from "motion/react";
import { fadeUp } from "@/lib/animations/fadeUp";
import { features } from "@/constants/features";

export default function Features() {
  return (
    <section
      id="features"
      className="py-24"
    >
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mb-16 text-center"
        >
          <p className="mb-4 text-xs font-medium uppercase tracking-widest text-indigo-400 cursor-default">
            Features
          </p>

          <h2
            className="mb-4 text-4xl font-bold text-white md:text-5xl cursor-default"
          >
            Everything you need
            <br />
            <span className="text-white/40 cursor-default">
              to land the interview
            </span>
          </h2>

          <p className="mx-auto max-w-xl text-lg text-white/50 cursor-default" >
            One analysis gives you a complete picture of where you stand and
            exactly what to do next.
          </p>
        </motion.div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              custom={index}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              whileHover={{
                y: -3,
                transition: {
                  duration: 0.1,
                },
              }}
              className="group relative cursor-default rounded-2xl border border-white/[0.07] bg-card p-6"
              style={{
                boxShadow:
                  "0 0 0 1px rgba(255,255,255,0.03), 0 4px 24px rgba(0,0,0,0.3)",
              }}
            >
              <div
                className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl"
                style={{
                  backgroundColor: `${feature.color}18`,
                }}
              >
                <feature.icon
                  className="h-5 w-5"
                  style={{
                    color: feature.color,
                  }}
                />
              </div>

              <h3
                className="mb-2 text-base font-semibold text-white"
                style={{
                  fontFamily: "'Bricolage Grotesque', sans-serif",
                }}
              >
                {feature.title}
              </h3>

              <p className="text-sm leading-relaxed text-white/50">
                {feature.desc}
              </p>

              <div
                className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{
                  background: `radial-gradient(circle at 30% 40%, ${feature.color}08, transparent 60%)`,
                }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}