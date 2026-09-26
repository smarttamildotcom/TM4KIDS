"use client";

import Image from "next/image";
import Link from "next/link";
import { Clock, Lock, Play, Star, Trophy } from "lucide-react";
import { LockedWorldOverlay } from "@/components/auth/LockedWorldOverlay";
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
  caseTitle?: string;
  caseScene?: string;
};

function ProgressRing({ percent, className }: { percent: number; className: string }) {
  const radius = 26;
  const circumference = 2 * Math.PI * radius;
  return (
    <svg viewBox="0 0 64 64" className="h-14 w-14 -rotate-90" aria-hidden="true">
      <circle cx="32" cy="32" r={radius} fill="none" strokeWidth="5" className="stroke-detective-blue-100" />
      <circle cx="32" cy="32" r={radius} fill="none" strokeWidth="5" strokeLinecap="round" stroke="currentColor" className={className} strokeDasharray={circumference} strokeDashoffset={circumference - (percent / 100) * circumference} />
    </svg>
  );
}

/** Balanced 12:10 journey card. Each World opens on its own dedicated route. */
export function WorldCard({ world, status, isActive, onRequestUnlock, caseTitle }: WorldCardProps) {
  const theme = worldTheme[world.color];
  const isLocked = status === "locked";
  const isCompleted = status === "completed";
  const percent = isCompleted ? 100 : isActive ? 50 : 0;
  const isFreeTrial = world.id <= 2;
  const art = worldQuestyArt[world.id];
  const title = world.id === 1 && caseTitle ? caseTitle : world.name;

  return (
    <article id={`world-${world.id}`} className={`relative aspect-[6/5] w-full scroll-mt-24 rounded-[24px] bg-gradient-to-br p-[3px] shadow-lg transition duration-300 ${theme.gradient} ${isLocked ? "opacity-60 grayscale" : `hover:-translate-y-1 hover:shadow-2xl ${theme.glow}`} ${isActive ? "ring-4 ring-detective-yellow-300" : ""}`}>
      {isLocked && <LockedWorldOverlay worldName={world.name} onRequestUnlock={onRequestUnlock} />}
      <span aria-hidden="true" className="pointer-events-none absolute -right-2 -top-3 text-xl opacity-70">{isCompleted ? "🌟" : world.id === 15 ? "💎" : "🐾"}</span>

      <div className={`flex h-full min-h-0 flex-col rounded-[21px] border bg-white p-4 ${theme.border}`}>
        <div className="flex items-start gap-3">
          <div className="relative shrink-0">
            <ProgressRing percent={percent} className={theme.ring} />
            <span className="absolute inset-0 grid place-items-center font-display text-base font-bold text-detective-blue-900">{world.id}</span>
          </div>
          <div className="min-w-0 grow">
            <div className="flex flex-wrap items-center gap-1.5">
              <span aria-hidden="true" className="text-xl">{world.icon}</span>
              <span className={`rounded-full px-2 py-0.5 text-[11px] font-bold ${difficultyChip[world.difficulty]}`}>{world.difficulty}</span>
            </div>
            {world.id === 1 && caseTitle && <p className="mt-1 font-display text-[10px] font-bold uppercase tracking-[.12em] text-detective-orange-500">Case 1 · Creator Park</p>}
            <h3 className="mt-1 line-clamp-2 font-display text-base font-bold leading-tight text-detective-blue-900">{title}</h3>
          </div>
          <Image src={art.src} alt={art.alt} sizes="64px" className="h-16 w-16 shrink-0 object-contain drop-shadow-md" />
        </div>

        <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-detective-blue-700/80">{world.id === 1 && caseTitle ? "Help Questy solve the first Creator Park mystery." : world.description}</p>

        <div className="mt-2 flex flex-wrap gap-1.5 text-[11px] font-semibold">
          <span className={`inline-flex items-center gap-1 rounded-full px-2 py-1 ${theme.chip}`}><Star className="h-3 w-3" /> {world.xp} XP</span>
          <span className="inline-flex items-center gap-1 rounded-full bg-detective-blue-50 px-2 py-1 text-detective-blue-700"><Clock className="h-3 w-3" /> {world.time}</span>
          <span className={`inline-flex items-center gap-1 rounded-full px-2 py-1 ${isCompleted ? "bg-green-100 text-green-700" : isLocked ? "bg-detective-blue-100 text-detective-blue-700" : "bg-detective-orange-100 text-detective-orange-700"}`}>
            {isCompleted ? <><Trophy className="h-3 w-3" /> Completed</> : isLocked ? <><Lock className="h-3 w-3" /> Locked</> : "Ready to play"}
          </span>
          {isFreeTrial && !isLocked && <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-2 py-1 text-green-700">✨ Free</span>}
        </div>

        <div className="mt-auto pt-3">
          {isLocked ? (
            <button type="button" onClick={onRequestUnlock} className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-detective-blue-200 px-4 py-2.5 font-display text-xs font-bold text-detective-blue-800"><Lock className="h-3.5 w-3.5" /> Unlock World</button>
          ) : (
            <Link href={`/worlds/${world.id}`} className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-detective-orange-500 px-4 py-2.5 font-display text-xs font-bold text-white shadow-md transition-colors hover:bg-detective-orange-600"><Play className="h-3.5 w-3.5" /> {isCompleted ? "Replay World" : "Start World"}</Link>
          )}
        </div>
      </div>
    </article>
  );
}
