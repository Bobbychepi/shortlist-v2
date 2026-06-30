"use client";

import { Sparkles } from "lucide-react";

const links = {
  Product: ["Features", "Pricing", "Changelog", "Roadmap"],
  Resources: ["Documentation", "Blog", "Sample Report", "Help Center"],
  Company: ["About", "Careers", "Privacy", "Terms"],
};

export default function Footer() {
  return (
    <footer className="border-t border-white/6 py-16">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-12 grid gap-12 md:grid-cols-4">
          {/* Brand */}
          <div>
            <div className="mb-4 flex items-center gap-2">
              <div className="bg-primary flex h-7 w-7 items-center justify-center rounded-lg">
                <Sparkles className="h-4 w-4 text-white" />
              </div>

              <span
                className="text-lg font-semibold text-white"
                style={{
                  fontFamily: "'Bricolage Grotesque', sans-serif",
                }}
              >
                Shortlist
              </span>
            </div>

            <p className="text-sm leading-relaxed text-white/35">
              AI-powered resume analysis that helps you get shortlisted, not
              overlooked.
            </p>
          </div>

          {/* Links */}
          {Object.entries(links).map(([category, items]) => (
            <div key={category}>
              <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-white/30">
                {category}
              </p>

              <ul className="space-y-3">
                {items.map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-sm text-white/45 transition-colors hover:text-white/80"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-8 sm:flex-row">
          <p className="text-xs text-white/25">
            © 2026 Shortlist. All rights reserved.
          </p>

          <p className="text-xs text-white/20">
            Built for job seekers, by people who have been there.
          </p>
        </div>
      </div>
    </footer>
  );
}