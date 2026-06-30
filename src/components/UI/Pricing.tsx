"use client";

import { motion } from "motion/react";
import { CheckCircle } from "lucide-react";
import { fadeUp } from "@/lib/animations/fadeUp";
import { plans } from "@/constants/pricing";


export default function Pricing() {
  return (
    <section id="pricing" className="py-24">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <p className="mb-4 text-xs font-medium uppercase tracking-widest text-indigo-400">
            Pricing
          </p>

          <h2
            className="mb-4 text-4xl font-bold text-white md:text-5xl"
            style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}
          >
            Simple, transparent pricing.
          </h2>

          <p className="text-lg text-white/50">
            No hidden fees. Cancel anytime.
          </p>
        </motion.div>

        <div className="grid items-start gap-5 md:grid-cols-3">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              custom={index}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className={`relative rounded-2xl border p-7 ${
                plan.highlighted
                  ? "border-primary/40 bg-primary"
                  : "border-white/[0.07] bg-card"
              }`}
              style={
                plan.highlighted
                  ? {
                      boxShadow:
                        "0 0 0 1px #6366f140, 0 0 48px rgba(99,102,241,.25), 0 16px 48px rgba(0,0,0,.5)",
                    }
                  : {
                      boxShadow:
                        "0 0 0 1px rgba(255,255,255,.03), 0 8px 32px rgba(0,0,0,.4)",
                    }
              }
            >
              {plan.highlighted && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <span className="rounded-full bg-amber-400 px-3 py-1 text-xs font-bold text-amber-900">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="mb-6">
                <p
                  className={`mb-1 text-sm font-medium ${
                    plan.highlighted
                      ? "text-white/80"
                      : "text-white/40"
                  }`}
                  style={{
                    fontFamily: "'Bricolage Grotesque', sans-serif",
                  }}
                >
                  {plan.name}
                </p>

                <div className="mb-2 flex items-end gap-1.5">
                  <span
                    className="text-4xl font-bold text-white"
                    style={{
                      fontFamily: "'Bricolage Grotesque', sans-serif",
                    }}
                  >
                    {plan.price}
                  </span>

                  <span
                    className={`mb-1 text-sm ${
                      plan.highlighted
                        ? "text-white/60"
                        : "text-white/30"
                    }`}
                  >
                    /{plan.period}
                  </span>
                </div>

                <p
                  className={`text-sm leading-snug ${
                    plan.highlighted
                      ? "text-white/70"
                      : "text-white/40"
                  }`}
                >
                  {plan.desc}
                </p>
              </div>

              <ul className="mb-7 space-y-3">
                {plan.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-2.5"
                  >
                    <CheckCircle
                      className={`mt-0.5 h-4 w-4 shrink-0 ${
                        plan.highlighted
                          ? "text-white"
                          : "text-indigo-400"
                      }`}
                    />

                    <span
                      className={`text-sm ${
                        plan.highlighted
                          ? "text-white/80"
                          : "text-white/55"
                      }`}
                    >
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <button
                className={`w-full rounded-xl py-3 text-sm font-medium transition-all duration-200 ${
                  plan.highlighted
                    ? "bg-white text-indigo-600 hover:bg-white/90"
                    : "border border-white/8 bg-muted text-white hover:bg-white/10"
                }`}
              >
                {plan.cta}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}