"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Award, Star } from "lucide-react";
import { QuestyExpression } from "@/components/illustrations/QuestyExpression";
import { QuestyProfilePanel } from "@/components/gamification/QuestyProfilePanel";
import { LevelBadge } from "./LevelBadge";
import { AnimatedNumber } from "./AnimatedNumber";
import { useGame } from "@/lib/gamification/GameProvider";

/** Questy avatar in the header. Opens the live detective profile popup. */
export function PlayerHud() {
  const { player, level, isLoaded } = useGame();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    function handleClickOutside(event: MouseEvent) {
      if (!containerRef.current?.contains(event.target as Node)) setIsOpen(false);
    }
    function handleKey(event: KeyboardEvent) {
      if (event.key === "Escape") setIsOpen(false);
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKey);
    };
  }, [isOpen]);

  if (!isLoaded) return null;

  return (
    <div ref={containerRef} className="relative">
      <motion.button
        type="button"
        onClick={() => setIsOpen((current) => !current)}
        aria-expanded={isOpen}
        aria-label={`${player.name}, ${level.current.title}, ${player.xp} XP, ${player.stats.starsEarned} stars, ${player.badgeIds.length} badges`}
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-2 rounded-full bg-detective-blue-50 px-2 py-1.5 transition-colors hover:bg-detective-blue-100"
      >
        <span className="grid h-8 w-8 shrink-0 place-items-center overflow-hidden rounded-full bg-detective-yellow-400">
          <QuestyExpression mood="happy" size={30} />
        </span>

        <LevelBadge level={level.current} size="sm" />

        <span className="hidden items-center gap-1 font-display text-sm font-bold text-detective-blue-700 sm:flex">
          <span aria-hidden="true">⚡</span>
          <AnimatedNumber value={player.xp} />
        </span>
        <span className="hidden items-center gap-1 font-display text-sm font-bold text-detective-yellow-500 sm:flex">
          <Star className="h-4 w-4" aria-hidden="true" />
          {player.stats.starsEarned}
        </span>
        <span className="flex items-center gap-1 pr-2 font-display text-sm font-bold text-detective-orange-600">
          <Award className="h-4 w-4" aria-hidden="true" />
          {player.badgeIds.length}
        </span>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.97 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="absolute right-0 top-full z-50 mt-2 w-[min(22rem,calc(100vw-2rem))] overflow-hidden rounded-3xl border-2 border-detective-blue-100 bg-white shadow-2xl"
          >
            <QuestyProfilePanel onNavigate={() => setIsOpen(false)} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
