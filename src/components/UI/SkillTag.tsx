"use client";

import { CheckCircle } from "lucide-react";

interface SkillTagProps {
  label: string;
  variant?: "found" | "missing" | "suggested";
}

const styles = {
  found: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  missing: "bg-red-500/10 text-red-400 border-red-500/20",
  suggested: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20",
} as const;

export default function SkillTag({
  label,
  variant = "found",
}: SkillTagProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium ${styles[variant]}`}
    >
      {variant === "found" && (
        <CheckCircle className="mr-1.5 h-3 w-3" />
      )}

      {label}
    </span>
  );
}