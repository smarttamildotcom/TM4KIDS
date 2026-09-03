"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Clock, Lock, Play, Star, Trophy } from "lucide-react";
import { LockedWorldOverlay } from "@/components/auth/LockedWorldOverlay";
import { WorldDetailPanel } from "@/components/sections/WorldDetailPanel";
import { worldQuestyArt } from "@/lib/questy-art";
import { difficultyChip, worldTheme, type World } from "@/lib/worlds";

export type WorldStatus = "locked" | "unlocked" | "completed";

type WorldCardProps = {
  world: World;
  status: WorldStatus;
  isActive: boolean;
  isExpanded: boolean;
  onToggle: () => void;
  onRequestUnlock: () => void;
  onComplete: (correct: number, total: number) => void;
  onNextWorld: (worldId: number) => void;
};

/** Circular progress indicator drawn around the world number. */
function ProgressRing({ percent, className }: { percent: number; className: string }) {
  const radius = 26;
  const circumference = 2 * Math.PI * radius;

  return (
    <svg viewBox="0 0 64 64" className="h-16 w-16 -rotate-90" aria-hidden="true">
      <circle
        cx="32"
        cy="32"
        r={radius}
        fill="none"
        strokeWidth="5"
        className="stroke-detective-blue-100"
      />
      <circle
        cx="32"
        cy="32"
        r={radius}
        fill="none"
        strokeWidth="5"
        strokeLinecap="round"
        stroke="currentColor"
        className={className}
        strokeDasharray={circumference}
        strokeDashoffset={circumference - (percent / 100) * circumference}
      />
    </svg>
  );
}

/** A single world on the adventure path — summary card plus an expandable mission briefing. */
export function WorldCard({
  world,
  status,
  isActive,
  isExpanded,
  onToggle,
  onRequestUnlock,
  onComplete,
  onNextWorld,
}: WorldCardProps) {
  const theme = worldTheme[world.color];
  const isLocked = status === "locked";
  const isCompleted = status === "completed";
  const percent = isCompleted ? 100 : isActive ? 50 : 0;
  const panelId = `world-panel-${world.id}`;
  const isFreeTrial = world.id <= 2;
  const art = worldQuestyArt[world.id];

  return (
    <motion.article
      id={`world-${world.id}`}
      whileHover={isLocked ? undefined : { y: -6 }}
      transition={{ type: "spring", stiffness: 260, damping: 22 }}
      className={`relative h-full scroll-mt-24 rounded-[24px] bg-gradient-to-br p-[3px] shadow-lg transition-shadow duration-300 ${theme.gradient} ${
        isLocked ? "opacity-60 grayscale" : `hover:shadow-2xl ${theme.glow}`
      } ${isActive ? "ring-4 ring-detective-yellow-300" : ""}`}
    >
      {isLocked && (
        <LockedWorldOverlay worldName={world.name} onRequestUnlock={onRequestUnlock} />
      )}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -right-2 -top-3 text-xl opacity-70"
      >
        {isCompleted ? "🌟" : world.id === 15 ? "💎" : "🐾"}
      </span>

      <div className={`flex h-full flex-col rounded-[21px] border bg-white p-5 ${theme.border}`}>
        <div className="flex items-start gap-4">
          <div className="relative shrink-0">
            <ProgressRing percent={percent} className={theme.ring} />
            <span className="absolute inset-0 grid place-items-center font-display text-lg font-bold text-detective-blue-900">
              {world.id}
            </span>
          </div>

          <div className="min-w-0 grow">
            <div className="flex flex-wrap items-center gap-2">
              <span aria-hidden="true" className="text-2xl">
                {world.icon}
              </span>
              <span
                className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${difficultyChip[world.difficulty]}`}
              >
                {world.difficulty}
              </span>
            </div>
            <h3 className="mt-1 font-display text-lg font-bold text-detective-blue-900">
              {world.name}
            </h3>
            <p className="mt-1 text-sm text-detective-blue-700/80">{world.description}</p>
          </div>

          <motion.div
            whileHover={{ y: -4, scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="hidden shrink-0 sm:block"
          >
            <Image
              src={art.src}
              alt={art.alt}
              sizes="88px"
              className="h-[88px] w-auto object-contain drop-shadow-md"
            />
          </motion.div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2 text-xs font-semibold">
          <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 ${theme.chip}`}>
            <Star className="h-3.5 w-3.5" aria-hidden="true" /> {world.xp} XP
          </span>
          <span className="inline-flex items-center gap-1 rounded-full bg-detective-blue-50 px-2.5 py-1 text-detective-blue-700">
            <Clock className="h-3.5 w-3.5" aria-hidden="true" /> {world.time}
          </span>
          <span
            className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 ${
              isCompleted
                ? "bg-green-100 text-green-700"
                : isLocked
                  ? "bg-detective-blue-100 text-detective-blue-700"
                  : "bg-detective-orange-100 text-detective-orange-700"
            }`}
          >
            {isCompleted ? (
              <>
                <Trophy className="h-3.5 w-3.5" aria-hidden="true" /> Completed
              </>
            ) : isLocked ? (
              <>
                <Lock className="h-3.5 w-3.5" aria-hidden="true" /> Locked
              </>
            ) : (
              "Ready to play"
            )}
          </span>
          {isFreeTrial && !isLocked && (
            <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-2.5 py-1 text-green-700">
              ✨ Free
            </span>
          )}
        </div>

        <div className="mt-auto flex flex-wrap gap-2 pt-5">
          <button
            type="button"
            onClick={onToggle}
            aria-expanded={isExpanded}
            aria-controls={panelId}
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-detective-orange-500 px-5 py-2.5 font-display text-sm font-semibold text-white shadow-md transition-colors hover:bg-detective-orange-600"
          >
            <Play className="h-4 w-4" aria-hidden="true" />
            {isExpanded ? "Close lesson" : "Start"}
          </button>

          <button
            type="button"
            onClick={onToggle}
            aria-expanded={isExpanded}
            aria-controls={panelId}
            className="inline-flex items-center justify-center gap-1 rounded-full border-2 border-detective-blue-200 px-4 py-2.5 font-display text-sm font-semibold text-detective-blue-700 transition-colors hover:bg-detective-blue-50"
          >
            {isExpanded ? "Close" : "Details"}
            <ChevronDown
              className={`h-4 w-4 transition-transform ${isExpanded ? "rotate-180" : ""}`}
              aria-hidden="true"
            />
          </button>
        </div>

        <div id={panelId}>
          <AnimatePresence initial={false}>
            {isExpanded && !isLocked && (
              <WorldDetailPanel
                world={world}
                isCompleted={isCompleted}
                onComplete={onComplete}
                onNextWorld={onNextWorld}
              />
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.article>
  );
}
