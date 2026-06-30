"use client";

import { motion } from "motion/react";

interface MiniBarProps {
  label: string;
  value: number;
  color?: string;
  delay?: number;
}

export default function MiniBar({
  label,
  value,
  color = "#6366f1",
  delay = 0,
}: MiniBarProps) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <span className="text-xs text-white/60">
          {label}
        </span>

        <span className="text-xs font-medium text-white/80">
          {value}%
        </span>
      </div>

      <div className="h-1.5 overflow-hidden rounded-full bg-white/8">
        <motion.div
          className="h-full rounded-full"
          style={{ backgroundColor: color }}
          initial={{ width: 0 }}
          whileInView={{ width: `${value}%` }}
          viewport={{ once: true }}
          transition={{
            duration: 1,
            ease: "easeOut",
            delay,
          }}
        />
      </div>
    </div>
  );
}