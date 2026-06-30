"use client";

import { motion } from "motion/react";
import { Star } from "lucide-react";
import { fadeUp } from "@/lib/animations/fadeUp";


const testimonials = [
  {
    name: "Alicia Torres",
    role: "Junior Frontend Developer",
    company: "Hired at Figma",
    avatar: "AT",
    color: "#f87171",
    rating: 5,
    text: "I had been applying for months with no callbacks. Shortlist showed me what was broken, and I fixed it before sending another application.",
  },
  {
    name: "Marcus Reid",
    role: "Career changer",
    company: "Hired at Stripe",
    avatar: "MR",
    color: "#60a5fa",
    rating: 5,
    text: "The skills gap analysis helped me translate my old experience into language recruiters actually understood.",
  },
  {
    name: "Priya Nair",
    role: "CS Graduate",
    company: "Hired at Shopify",
    avatar: "PN",
    color: "#4ade80",
    rating: 5,
    text: "The section scores showed me exactly what to fix first. My resume went from weak to interview-ready.",
  },
];

export default function Testimonials() {
  return (
    <section className="bg-secondary/20 py-24">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="mb-16 text-center"
        >
          <p className="mb-4 text-xs font-medium uppercase tracking-widest text-indigo-400">
            Testimonials
          </p>

          <h2
            className="text-4xl font-bold text-white md:text-5xl"
            style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}
          >
            They got the job.
            <br />
            <span className="text-white/40">You can too.</span>
          </h2>
        </motion.div>

        <div className="grid gap-5 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              custom={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="flex flex-col gap-4 rounded-2xl border border-white/[0.07] bg-card p-6"
              style={{
                boxShadow:
                  "0 0 0 1px rgba(255,255,255,0.03), 0 8px 32px rgba(0,0,0,0.4)",
              }}
            >
              <div className="flex items-center gap-1">
                {Array.from({ length: testimonial.rating }).map((_, item) => (
                  <Star
                    key={item}
                    className="h-3.5 w-3.5 fill-amber-400 text-amber-400"
                  />
                ))}
              </div>

              <p className="flex-1 text-sm leading-relaxed text-white/65">
                &ldquo;{testimonial.text}&rdquo;
              </p>

              <div className="flex items-center gap-3 border-t border-white/6 pt-2">
                <div
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white"
                  style={{
                    backgroundColor: `${testimonial.color}40`,
                    border: `1px solid ${testimonial.color}40`,
                  }}
                >
                  {testimonial.avatar}
                </div>

                <div>
                  <p className="text-sm font-medium text-white">
                    {testimonial.name}
                  </p>
                  <p className="text-xs text-white/40">
                    {testimonial.role}
                  </p>
                </div>

                <div className="ml-auto">
                  <span className="whitespace-nowrap rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2 py-0.5 text-xs text-emerald-400">
                    {testimonial.company}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}