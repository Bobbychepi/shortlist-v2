"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { ArrowRight, Sparkles, Menu, X } from "lucide-react";
import Link from "next/link";
import { useAuth, UserButton } from "@clerk/nextjs";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { isLoaded, isSignedIn } = useAuth();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);

    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const navLinks = [
    { label: "Features", href: "/#features" },
    { label: "How it works", href: "/#how-it-works" },
    { label: "Pricing", href: "/#pricing" },
    { label: "FAQ", href: "/#faq" },
  ];

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
        <Link href="/" className="flex items-center gap-2">
          <div className="bg-primary flex h-7 w-7 items-center justify-center rounded-lg">
            <Sparkles className="h-4 w-4 text-white" />
          </div>

          <span className="text-lg font-semibold tracking-tight text-white">
            Shortlist
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="text-sm text-white/60 transition-colors hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          {!isLoaded ? null : !isSignedIn ? (
            <>
              <Link
                href="/sign-in"
                className="text-sm text-white/60 transition-colors hover:text-white"
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
            </>
          ) : (
            <>
              <Link
                href="/dashboard"
                className="text-sm text-white/60 transition-colors hover:text-white"
              >
                Dashboard
              </Link>

              <UserButton />
            </>
          )}
        </div>

        <button
          className="text-white/60 transition-colors hover:text-white md:hidden"
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {menuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-secondary border-t border-white/6 px-6 py-4 md:hidden"
        >
          <div className="space-y-4">
            {navLinks.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="block text-sm text-white/60 transition-colors hover:text-white"
              >
                {item.label}
              </Link>
            ))}

            <div className="space-y-3 pt-2">
              {!isLoaded ? null : !isSignedIn ? (
                <>
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
                </>
              ) : (
                <>
                  <Link
                    href="/dashboard"
                    onClick={() => setMenuOpen(false)}
                    className="block text-center text-sm text-white/60 transition-colors hover:text-white"
                  >
                    Dashboard
                  </Link>

                  <div className="flex justify-center">
                    <UserButton />
                  </div>
                </>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </motion.header>
  );
}