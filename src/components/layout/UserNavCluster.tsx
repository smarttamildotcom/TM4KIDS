"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Award } from "lucide-react";
import { useAuth } from "@/lib/auth/AuthProvider";
import { useGame } from "@/lib/gamification/GameProvider";
import { LevelBadge } from "@/components/gamification/LevelBadge";
import { AnimatedNumber } from "@/components/gamification/AnimatedNumber";

/** Avatar + level + XP + badge count cluster shown when a detective is signed in. */
export function UserNavCluster() {
  const { user } = useAuth();
  const { player, level, isLoaded } = useGame();

  if (!user || !isLoaded) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center gap-2"
    >
      <Link
        href="/dashboard"
        aria-label={`${user.studentName}, level ${level.current.level}, ${player.xp} XP, ${player.badgeIds.length} badges`}
        className="flex items-center gap-2 rounded-full bg-detective-blue-50 px-2 py-1.5 transition-colors hover:bg-detective-blue-100"
      >
        <span
          aria-hidden="true"
          className="grid h-8 w-8 place-items-center rounded-full bg-detective-yellow-400 text-lg"
        >
          {player.avatarEmoji}
        </span>

        <LevelBadge level={level.current} size="sm" />

        <span className="hidden items-center gap-1 font-display text-sm font-bold text-detective-blue-700 sm:flex">
          <span aria-hidden="true">⚡</span>
          <AnimatedNumber value={player.xp} />
        </span>
        <span className="hidden items-center gap-1 pr-2 font-display text-sm font-bold text-detective-orange-600 sm:flex">
          <Award className="h-4 w-4" aria-hidden="true" />
          {player.badgeIds.length}
        </span>
      </Link>
    </motion.div>
  );
}
