"use client";

import { motion } from "framer-motion";
import { CoinCounter, StreakFlame, XpBar } from "@/components/gamification";
import { LevelBadge } from "@/components/gamification/LevelBadge";
import type { LevelDefinition } from "@/lib/gamification/types";

type ProfileCardProps = {
  name: string;
  avatarEmoji: string;
  xp: number;
  coins: number;
  streakDays: number;
  level: LevelDefinition;
  nextTitle: string | null;
  percent: number;
  xpToNext: number;
};

/** Hero profile card: avatar, level, XP bar, coins and streak. */
export function ProfileCard({
  name,
  avatarEmoji,
  xp,
  coins,
  streakDays,
  level,
  nextTitle,
  percent,
  xpToNext,
}: ProfileCardProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      aria-labelledby="profile-heading"
      className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-detective-blue-600 to-detective-blue-900 p-6 text-white shadow-2xl sm:p-8"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-detective-yellow-400/25 blur-2xl" />
        <div className="absolute -bottom-20 left-10 h-56 w-56 rounded-full bg-detective-orange-500/25 blur-2xl" />
      </div>

      <div className="relative flex flex-col items-center gap-6 sm:flex-row sm:items-start">
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="relative shrink-0"
        >
          <div
            role="img"
            aria-label={`${name}'s avatar`}
            className="grid h-28 w-28 place-items-center rounded-full border-4 border-white/80 bg-detective-yellow-400 text-6xl shadow-xl"
          >
            <span aria-hidden="true">{avatarEmoji}</span>
          </div>
          <span className="absolute -bottom-1 -right-1 rounded-full ring-4 ring-detective-blue-900">
            <LevelBadge level={level} size="sm" />
          </span>
        </motion.div>

        <div className="w-full text-center sm:text-left">
          <p className="font-display text-sm font-semibold uppercase tracking-widest text-detective-yellow-300">
            Level {level.level} · BrandQuest rank
          </p>
          <h1
            id="profile-heading"
            className="mt-1 font-display text-3xl font-bold sm:text-4xl"
          >
            {name} · {level.title}
          </h1>

          <div className="mt-3 flex flex-wrap items-center justify-center gap-3 sm:justify-start">
            <CoinCounter coins={coins} tone="light" />
            <StreakFlame days={streakDays} tone="light" />
          </div>

          <div className="mt-6">
            <XpBar
              xp={xp}
              percent={percent}
              currentTitle={level.title}
              nextTitle={nextTitle}
              xpToNext={xpToNext}
              tone="light"
            />
          </div>
        </div>
      </div>
    </motion.section>
  );
}
