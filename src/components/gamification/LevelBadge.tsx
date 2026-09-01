"use client";

import { motion } from "framer-motion";
import type { LevelDefinition } from "@/lib/gamification/types";

/** Circular level medallion showing the player's current rank number. */
export function LevelBadge({
  level,
  size = "md",
}: {
  level: LevelDefinition;
  size?: "sm" | "md" | "lg";
}) {
  const dimensions = {
    sm: "h-10 w-10 text-base",
    md: "h-14 w-14 text-xl",
    lg: "h-20 w-20 text-3xl",
  }[size];

  return (
    <motion.span
      initial={{ scale: 0.7, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 260, damping: 18 }}
      title={level.title}
      className={`grid shrink-0 place-items-center rounded-full bg-gradient-to-br font-display font-bold text-white shadow-lg ${level.accent} ${dimensions}`}
    >
      <span className="sr-only">Level </span>
      {level.level}
    </motion.span>
  );
}
