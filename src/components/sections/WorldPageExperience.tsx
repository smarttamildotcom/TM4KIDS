"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight, Map } from "lucide-react";
import { WorldRouteGuard } from "@/components/auth/WorldRouteGuard";
import { WorldDetailPanel } from "@/components/sections/WorldDetailPanel";
import { useGame } from "@/lib/gamification/GameProvider";
import { worlds } from "@/lib/worlds";

export function WorldPageExperience({ worldId }: { worldId: number }) {
  const router = useRouter();
  const { player, completeWorld } = useGame();
  const world = worlds.find((item) => item.id === worldId);

  if (!world) {
    return (
      <main className="mx-auto max-w-3xl px-4 py-20 text-center">
        <h1 className="font-display text-3xl font-bold text-detective-blue-900">World not found</h1>
        <Link href="/#journey" className="mt-6 inline-flex rounded-full bg-detective-orange-500 px-6 py-3 font-display font-bold text-white">Return to Idea City</Link>
      </main>
    );
  }

  const currentWorld = world;
  const isCompleted = player.completedWorldIds.includes(worldId);

  function handleComplete(correct: number, total: number) {
    if (player.completedWorldIds.includes(worldId)) return;
    const stars = total > 0 ? Math.max(1, Math.round((correct / total) * 3)) : 1;
    completeWorld({
      worldId,
      xp: currentWorld.xp,
      stars,
      correct,
      total,
      badgeLabel: `${currentWorld.reward.badge} ${currentWorld.reward.label}`,
    });
  }

  function handleNextWorld(nextWorldId: number) {
    router.push(`/worlds/${nextWorldId}`);
    window.scrollTo({ top: 0, behavior: "auto" });
  }

  return (
    <WorldRouteGuard worldId={worldId}>
      <main className="min-h-screen bg-gradient-to-b from-detective-blue-50 via-white to-detective-blue-50/60 py-8 sm:py-12">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
          <nav aria-label="World navigation" className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <Link href="/#journey" className="inline-flex items-center gap-2 rounded-full border-2 border-detective-blue-200 bg-white px-4 py-2 font-display text-sm font-bold text-detective-blue-800 hover:bg-detective-blue-50">
              <Map className="h-4 w-4" /> Idea City
            </Link>
            <span className="rounded-full bg-detective-blue-900 px-4 py-2 font-display text-sm font-bold text-white">World {currentWorld.id} of {worlds.length}</span>
          </nav>

          <header className="mb-7 rounded-[2rem] border-2 border-detective-blue-100 bg-white p-5 shadow-md sm:p-7">
            <p className="font-display text-sm font-bold uppercase tracking-[.18em] text-detective-orange-500">{currentWorld.id === 1 ? "Case 1 · Creator Park" : `World ${currentWorld.id}`}</p>
            <h1 className="mt-2 font-display text-3xl font-bold text-detective-blue-900 sm:text-4xl">{currentWorld.id === 1 ? "Questy’s First Mystery" : currentWorld.name}</h1>
            <p className="mt-3 max-w-3xl text-detective-blue-700/85">{currentWorld.description}</p>
          </header>

          <section className="rounded-[2rem] border-2 border-detective-blue-100 bg-white p-4 shadow-lg sm:p-6 lg:p-8">
            <WorldDetailPanel world={currentWorld} isCompleted={isCompleted} onComplete={handleComplete} onNextWorld={handleNextWorld} />
          </section>

          <nav aria-label="Move between worlds" className="mt-8 grid gap-3 sm:grid-cols-3">
            {worldId > 1 ? (
              <Link href={`/worlds/${worldId - 1}`} className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-detective-blue-200 bg-white px-5 py-3 font-display font-bold text-detective-blue-800 hover:bg-detective-blue-50"><ArrowLeft className="h-4 w-4" /> Previous World</Link>
            ) : <span />}
            <Link href="/#journey" className="inline-flex items-center justify-center gap-2 rounded-full bg-detective-blue-900 px-5 py-3 font-display font-bold text-white hover:bg-detective-blue-800"><Map className="h-4 w-4" /> Idea City</Link>
            {worldId < worlds.length ? (
              <Link href={`/worlds/${worldId + 1}`} className="inline-flex items-center justify-center gap-2 rounded-full bg-detective-orange-500 px-5 py-3 font-display font-bold text-white hover:bg-detective-orange-600">Next World <ArrowRight className="h-4 w-4" /></Link>
            ) : <span />}
          </nav>
        </div>
      </main>
    </WorldRouteGuard>
  );
}
