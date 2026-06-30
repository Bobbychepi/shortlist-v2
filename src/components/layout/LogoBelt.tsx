"use client";

import { motion } from "motion/react";

const companies = [
  "Google",
  "Microsoft",
  "Apple",
  "Amazon",
  "Meta",
  "Netflix",
  "OpenAI",
  "NVIDIA",
  "Adobe",
  "Salesforce",
  "Stripe",
  "Figma",
  "Notion",
  "Vercel",
  "Shopify",
  "Atlassian",
  "Airbnb",
  "Uber",
  "Spotify",
  "Canva",
  "Cloudflare",
  "GitHub",
  "Slack",
  "Dropbox",
  "Zoom",
  "Oracle",
  "Intel",
  "Cisco",
  "IBM",
  "Tesla",
];

export default function LogoBelt() {
  return (
    <section className="overflow-hidden border-y border-white/3 py-12">
      <div className="mx-auto mb-8 max-w-6xl px-6 text-center">
        <p className="text-xs font-medium uppercase tracking-widest text-white/30">
          Designed to help you land your next role at companies like
        </p>
      </div>

      <div className="overflow-hidden">
        <motion.div
          className="flex w-max items-center gap-12"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            duration: 22,
            ease: "linear",
            repeat: Infinity,
          }}
        >
          {[...companies, ...companies].map((company, index) => (
            <span
              key={`${company}-${index}`}
              className="whitespace-nowrap text-sm font-semibold tracking-wide text-white/20 transition-colors hover:text-white/40"
              style={{
                fontFamily: "'Bricolage Grotesque', sans-serif",
              }}
            >
              {company}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}