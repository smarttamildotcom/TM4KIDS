"use client";

import Image from "next/image";
import Link from "next/link";
import { Clock, Play } from "lucide-react";
import { worldQuestyArt } from "@/lib/questy-art";
import { difficultyChip, worldTheme, type World } from "@/lib/worlds";

export type WorldStatus = "locked" | "unlocked" | "completed";
type WorldCardProps = { world: World; status: WorldStatus; isActive: boolean; isExpanded: boolean; onToggle: () => void; onRequestUnlock: () => void; onComplete: (correct: number, total: number) => void; onNextWorld: (worldId: number) => void; caseTitle?: string; caseScene?: string; };

export function WorldCard({ world, status, isActive, caseTitle, caseScene }: WorldCardProps) {
  const theme = worldTheme[world.color];
  const isCompleted = status === "completed";
  const art = worldQuestyArt[world.id];
  return <article id={`world-${world.id}`} className={`relative min-h-[330px] w-full scroll-mt-24 rounded-[24px] bg-gradient-to-br p-[3px] shadow-lg transition duration-300 sm:aspect-[6/5] sm:min-h-0 ${theme.gradient} hover:-translate-y-1 hover:shadow-2xl ${theme.glow} ${isActive ? "ring-4 ring-detective-yellow-300" : ""}`}>
    <span aria-hidden="true" className="pointer-events-none absolute -right-2 -top-3 text-xl opacity-70">{isCompleted ? "✨" : world.id === 15 ? "🏆" : "💡"}</span>
    <div className={`flex h-full min-h-0 flex-col rounded-[21px] border bg-white p-4 ${theme.border}`}>
      <div className="grid grid-cols-[52px_minmax(0,1fr)] items-start gap-3 sm:grid-cols-[52px_minmax(0,1fr)_64px]">
        <div className={`grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br font-display text-lg font-bold text-white shadow-md ${theme.gradient}`}>{world.id}</div>
        <div className="min-w-0"><div className="flex flex-wrap items-center gap-1.5"><span aria-hidden="true" className="text-xl">{caseScene ?? world.icon}</span><span className={`rounded-full px-2 py-0.5 text-[11px] font-bold ${difficultyChip[world.difficulty]}`}>{world.difficulty}</span></div><p className="mt-1 font-display text-[10px] font-bold uppercase tracking-[.12em] text-detective-orange-500">Idea Adventure {world.id}</p><h3 className="mt-1 line-clamp-2 font-display text-base font-bold leading-tight text-detective-blue-900">{caseTitle ?? world.name}</h3></div>
        <div className="col-span-2 flex justify-center sm:col-span-1 sm:block"><Image src={art.src} alt={art.alt} sizes="64px" className="h-20 w-20 object-contain object-center drop-shadow-md sm:h-16 sm:w-16"/></div>
      </div>
      <p className="mt-3 line-clamp-3 text-center text-xs leading-relaxed text-detective-blue-700/80 sm:text-left">{world.description}</p>
      <div className="mt-3 flex flex-wrap justify-center gap-1.5 text-[11px] font-semibold sm:justify-start"><span className="inline-flex items-center gap-1 rounded-full bg-detective-blue-50 px-2 py-1 text-detective-blue-700"><Clock className="h-3 w-3"/> {world.time}</span><span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-2 py-1 text-green-700">✨ Free to explore</span></div>
      <div className="mt-auto pt-3"><Link href={`/worlds/${world.id}`} className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-detective-orange-500 px-4 py-2.5 font-display text-xs font-bold text-white shadow-md transition-colors hover:bg-detective-orange-600"><Play className="h-3.5 w-3.5"/>{isCompleted ? "Explore Again" : "Start Adventure"}</Link></div>
    </div>
  </article>;
}
