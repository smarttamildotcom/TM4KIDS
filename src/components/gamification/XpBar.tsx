"use client";

import { motion } from "framer-motion";
import { AnimatedNumber } from "./AnimatedNumber";

type XpBarProps = {
  xp: number;
  percent: number;
  currentTitle: string;
  nextTitle: string | null;
  xpToNext: number;
  /** Light styling for dark backgrounds. */
  tone?: "light" | "dark";
};

/** XP progress toward the next detective rank. */
export function XpBar({
  xp,
  percent,
  currentTitle,
  nextTitle,
  xpToNext,
  tone = "dark",
}: XpBarProps) {
  const isLight = tone === "light";

  return (
    <div>
      <div
        className={`mb-2 flex items-center justify-between text-sm font-semibold ${
          isLight ? "text-detective-blue-100" : "text-detective-blue-700"
        }`}
      >
        <span>{currentTitle}</span>
        <span>
          <AnimatedNumber value={xp} /> XP
        </span>
      </div>

      <div
        role="progressbar"
        aria-valuenow={percent}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`Progress to ${nextTitle ?? "top rank"}`}
        className={`h-4 w-full overflow-hidden rounded-full ${
          isLight ? "bg-white/20" : "bg-detective-blue-100"
        }`}
      >
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percent}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="h-full rounded-full bg-gradient-to-r from-detective-yellow-400 to-detective-orange-500"
        />
      </div>

      <p
        className={`mt-2 text-sm ${
          isLight ? "text-detective-blue-100" : "text-detective-blue-700/85"
        }`}
      >
        {nextTitle
          ? `Only ${xpToNext} XP to become a ${nextTitle}!`
          : "You have reached the highest BrandQuest rank."}
      </p>
    </div>
  );
}
