"use client";

import { motion } from "framer-motion";
import { Flame } from "lucide-react";

/** Daily streak pill with a flickering flame. */
export function StreakFlame({
  days,
  tone = "dark",
}: {
  days: number;
  tone?: "light" | "dark";
}) {
  const isActive = days > 0;

  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full px-4 py-2 font-display font-semibold ${
        tone === "light"
          ? "bg-white/15 text-white"
          : "bg-detective-orange-100 text-detective-blue-900"
      }`}
    >
      <motion.span
        aria-hidden="true"
        animate={isActive ? { scale: [1, 1.2, 1], rotate: [-4, 4, -4] } : undefined}
        transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
      >
        <Flame
          className={`h-5 w-5 ${
            isActive ? "text-detective-orange-500" : "text-detective-blue-200"
          }`}
        />
      </motion.span>
      {days}-day streak
    </span>
  );
}
