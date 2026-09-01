"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useGame } from "@/lib/gamification/GameProvider";
import { LevelBadge } from "./LevelBadge";
import { AnimatedNumber } from "./AnimatedNumber";

/** Compact XP / coins / streak readout for the site header. */
export function PlayerHud() {
  const { player, level, isLoaded } = useGame();

  if (!isLoaded) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center gap-2"
    >
      <Link
        href="/dashboard"
        aria-label={`Level ${level.current.level}, ${player.xp} XP, ${player.coins} coins, ${player.streak.count} day streak`}
        className="flex items-center gap-2 rounded-full bg-detective-blue-50 px-2 py-1.5 transition-colors hover:bg-detective-blue-100"
      >
        <LevelBadge level={level.current} size="sm" />

        <span className="hidden items-center gap-1 font-display text-sm font-bold text-detective-blue-700 sm:flex">
          <span aria-hidden="true">⚡</span>
          <AnimatedNumber value={player.xp} />
        </span>
        <span className="flex items-center gap-1 font-display text-sm font-bold text-detective-orange-600">
          <span aria-hidden="true">🪙</span>
          <AnimatedNumber value={player.coins} />
        </span>
        <span className="hidden items-center gap-1 pr-2 font-display text-sm font-bold text-detective-orange-500 sm:flex">
          <span aria-hidden="true">🔥</span>
          {player.streak.count}
        </span>
      </Link>
    </motion.div>
  );
}
