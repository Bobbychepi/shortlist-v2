"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { ArrowRight, Sparkles, Menu, X } from "lucide-react";
import Link from "next/link";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);

    window.addEventListener("scroll", handler);

    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <motion.header
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#08090f]/90 border-b border-white/6 backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="bg-primary flex h-7 w-7 items-center justify-center rounded-lg">
            <Sparkles className="h-4 w-4 text-white" />
          </div>

          <span
            className="cursor-pointer text-lg font-semibold tracking-tight text-white"
            onClick={() =>
              document.getElementById("hero")?.scrollIntoView({
                behavior: "smooth",
              })
            }
          >
            Shortlist
          </span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-8 md:flex">
          {["Features", "How it works", "Pricing", "FAQ"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
              className="text-sm text-white/60 transition-colors hover:text-white"
            >
              {item}
            </a>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden items-center gap-3 md:flex">
          <Link
            href="/sign-in"
            className="cursor-pointer text-sm text-white/60 transition-colors hover:text-white"
          >
            Sign in
          </Link>

          <Link
            href="/sign-up"
            className="bg-primary hover:bg-accent flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-medium text-white transition-colors"
          >
            Get started
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="text-white/60 transition-colors hover:text-white md:hidden"
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          {menuOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-secondary border-t border-white/6 px-6 py-4 md:hidden"
        >
          <div className="space-y-4">
            {["Features", "How it works", "Pricing", "FAQ"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
                onClick={() => setMenuOpen(false)}
                className="block text-sm text-white/60 transition-colors hover:text-white"
              >
                {item}
              </a>
            ))}

            <div className="space-y-3 pt-2">
              <Link
                href="/sign-in"
                onClick={() => setMenuOpen(false)}
                className="block text-center text-sm text-white/60 transition-colors hover:text-white"
              >
                Sign in
              </Link>

              <Link
                href="/sign-up"
                onClick={() => setMenuOpen(false)}
                className="bg-primary hover:bg-accent block w-full rounded-lg px-4 py-2.5 text-center text-sm font-medium text-white transition-colors"
              >
                Get started
              </Link>
            </div>
          </div>
        </motion.div>
      )}
    </motion.header>
  );
}