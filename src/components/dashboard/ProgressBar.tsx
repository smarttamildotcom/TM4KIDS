"use client";

import { motion } from "framer-motion";

type ProgressBarProps = {
  /** 0–100. */
  percent: number;
  label: string;
  /** Tailwind gradient classes for the filled portion. */
  gradient?: string;
  className?: string;
};

/** Rounded, animated progress track used across the dashboard. */
export function ProgressBar({
  percent,
  label,
  gradient = "from-detective-yellow-400 to-detective-orange-500",
  className = "",
}: ProgressBarProps) {
  return (
    <div
      role="progressbar"
      aria-valuenow={percent}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={label}
      className={`h-4 w-full overflow-hidden rounded-full bg-black/10 ${className}`}
    >
      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: `${percent}%` }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
        className={`h-full rounded-full bg-gradient-to-r ${gradient}`}
      />
    </div>
  );
}
