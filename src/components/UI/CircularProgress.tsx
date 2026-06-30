"use client";

import { motion } from "motion/react";

interface CircularProgressProps {
  value: number;
  size?: number;
  strokeWidth?: number;
  color?: string;
  label?: string;
}

export default function CircularProgress({
  value,
  size = 96,
  strokeWidth = 7,
  color = "#6366f1",
  label,
}: CircularProgressProps) {
  const r = (size - strokeWidth) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ * (1 - value / 100);

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative" style={{ width: size, height: size }}>
        <svg
          width={size}
          height={size}
          style={{ position: "absolute", transform: "rotate(-90deg)" }}
        >
          <circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            fill="none"
            stroke="rgba(255,255,255,0.06)"
            strokeWidth={strokeWidth}
          />

          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circ}
            initial={{ strokeDashoffset: circ }}
            whileInView={{ strokeDashoffset: offset }}
            viewport={{ once: true }}
            transition={{
              duration: 1.4,
              ease: "easeOut",
              delay: 0.3,
            }}
          />
        </svg>

        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span
            className="text-white font-bold leading-none"
            style={{
              fontSize: size * 0.22,
              fontFamily: "'Bricolage Grotesque', sans-serif",
            }}
          >
            {value}%
          </span>
        </div>
      </div>

      {label && (
        <span className="text-xs text-white/50 text-center leading-tight">
          {label}
        </span>
      )}
    </div>
  );
}