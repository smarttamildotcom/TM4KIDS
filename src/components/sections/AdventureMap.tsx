"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { cityCase } from "@/lib/idea-city";
import { Container } from "@/components/ui/Container";
import { WorldCard, type WorldStatus } from "@/components/sections/WorldCard";
import { CelebrationModal } from "@/components/auth/CelebrationModal";
import { PremiumGateModal } from "@/components/auth/PremiumGateModal";
import { useAuth } from "@/lib/auth/AuthProvider";
import { useGame } from "@/lib/gamification/GameProvider";
import {
  canAccessWorld,
  clearPendingWorld,
  consumeGateFlag,
  LAST_FREE_WORLD_ID,
  readPendingWorld,
  rememberPendingWorld,
} from "@/lib/access";
import { journeyChapters, worlds } from "@/lib/worlds";

/** Treasure-map scenery floating behind the path. Decorative only. */
const scenery: { emoji: string; className: string; duration: number }[] = [
  { emoji: "☁️", className: "left-[3%] top-[3%]", duration: 6 },
  { emoji: "⭐", className: "right-[5%] top-[7%]", duration: 4.2 },
  { emoji: "🐾", className: "left-[6%] top-[34%]", duration: 5.4 },
  { emoji: "💎", className: "right-[4%] top-[42%]", duration: 4.8 },
  { emoji: "🗺️", className: "left-[4%] top-[66%]", duration: 5.8 },
  { emoji: "🏴‍☠️", className: "right-[6%] top-[74%]", duration: 5 },
  { emoji: "⭐", className: "left-[7%] top-[90%]", duration: 4.6 },
  { emoji: "🐾", className: "right-[3%] top-[94%]", duration: 5.2 },
];

/** Column offsets that make the 3-up grid read as a winding trail on desktop. */
function zigzagClass(index: number) {
  const column = index % 3;
  if (column === 1) return "lg:translate-y-12";
  if (column === 2) return "lg:translate-y-4";
  return "";
}

/** The 15-world journey — the centrepiece of the Adventures page. */
export function AdventureMap() {
  const { player, isLoaded, completeWorld } = useGame();
  const { user, isLoaded: isAuthLoaded } = useAuth();
  const router = useRouter();
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [showCelebration, setShowCelebration] = useState(false);
  const [showGate, setShowGate] = useState(false);
  const hasResumed = useRef(false);

  const hasActiveSession = isAuthLoaded && Boolean(user);
  const isSignedIn = hasActiveSession;
  const membershipStatus = user?.membershipStatus ?? "FREE";
  const completedWorldIds = hasActiveSession ? player.completedWorldIds : [];

  const openWorld = useCallback((worldId: number) => {
    setExpandedId(worldId);

    const scrollToWorldStart = () => {
      const target = document.getElementById(`world-${worldId}`);
      if (!target) return;
      const headerOffset = 104;
      const top = target.getBoundingClientRect().top + window.scrollY - headerOffset;
      window.scrollTo({ top: Math.max(0, top), behavior: "auto" });
    };

    requestAnimationFrame(() => {
      scrollToWorldStart();
      window.setTimeout(scrollToWorldStart, 380);
    });
  }, []);

  const gateWorld = useCallback(
    (worldId: number) => {
      if (!isSignedIn) {
        rememberPendingWorld(worldId);
        setShowGate(true);
      } else {
        router.push("/membership");
      }
    },
    [isSignedIn, router],
  );

  useEffect(() => {
    if (!isAuthLoaded || hasResumed.current) return;
    hasResumed.current = true;

    const blocked = consumeGateFlag();
    const pending = readPendingWorld();

    if (pending && canAccessWorld(pending, isSignedIn, membershipStatus)) {
      clearPendingWorld();
      openWorld(pending);
      return;
    }

    if (blocked) setShowGate(true);
  }, [isAuthLoaded, isSignedIn, membershipStatus, openWorld]);

  const statuses: WorldStatus[] = worlds.map((world) => {
    if (completedWorldIds.includes(world.id)) return "completed";
    if (isLoaded && isAuthLoaded && !canAccessWorld(world.id, isSignedIn, membershipStatus))
      return "locked";
    return "unlocked";
  });

  const activeIndex = statuses.indexOf("unlocked");

  function handleToggle(worldId: number) {
    if (!canAccessWorld(worldId, isSignedIn, membershipStatus)) {
      gateWorld(worldId);
      return;
    }

    if (expandedId === worldId) {
      setExpandedId(null);
      return;
    }

    openWorld(worldId);
  }

  function handleNextWorld(worldId: number) {
    if (!canAccessWorld(worldId, isSignedIn, membershipStatus)) {
      gateWorld(worldId);
      return;
    }

    openWorld(worldId);
  }

  function handleComplete(worldId: number, correct: number, total: number) {
    const world = worlds.find((item) => item.id === worldId);
    if (!world || player.completedWorldIds.includes(worldId)) return;

    const stars = total > 0 ? Math.max(1, Math.round((correct / total) * 3)) : 1;

    completeWorld({
      worldId,
      xp: world.xp,
      stars,
      correct,
      total,
      badgeLabel: `${world.reward.badge} ${world.reward.label}`,
    });

    if (worldId === LAST_FREE_WORLD_ID && !isSignedIn) {
      setExpandedId(null);
      setShowCelebration(true);
    }
  }

  return (
    <section
      id="journey"
      className="relative scroll-mt-24 overflow-hidden bg-gradient-to-b from-detective-blue-50 via-white to-detective-blue-50/60 py-8 sm:py-12"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 hidden sm:block">
        {scenery.map((item, index) => (
          <motion.span
            key={`${item.emoji}-${index}`}
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: item.duration, repeat: Infinity, ease: "easeInOut" }}
            className={`absolute text-3xl opacity-50 ${item.className}`}
          >
            {item.emoji}
          </motion.span>
        ))}
      </div>

      <svg
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full opacity-25"
        preserveAspectRatio="none"
        viewBox="0 0 100 100"
      >
        <path
          d="M12 4 C 45 12, 5 22, 35 32 S 92 52, 22 62 S 68 82, 14 96"
          fill="none"
          stroke="var(--color-detective-blue-400)"
          strokeWidth="0.5"
          strokeDasharray="1.6 2.6"
          strokeLinecap="round"
        />
      </svg>

      <Container className="relative">
        <div className="space-y-14">
          {journeyChapters.map((chapter) => {
            const chapterWorlds = worlds.filter((world) => chapter.worldIds.includes(world.id));
            const chapterComplete = chapterWorlds.filter((world) => player.completedWorldIds.includes(world.id)).length;
            return (
              <section key={chapter.id} aria-labelledby={`chapter-${chapter.id}`} className="rounded-[2rem] border-2 border-detective-blue-100 bg-white/60 p-4 shadow-sm sm:p-6">
                <div className="mb-7 flex flex-col gap-2 rounded-3xl bg-detective-blue-900 px-5 py-4 text-white sm:flex-row sm:items-center sm:justify-between">
                  <div><p className="font-display text-xs font-semibold uppercase tracking-[.2em] text-detective-yellow-300">Idea City district · {chapter.focus}</p><h3 id={`chapter-${chapter.id}`} className="mt-1 font-display text-2xl font-bold">{["Creator Park","Brand Street","Inventor Lab","Creator Studio + Design District","Detective HQ"][chapter.id-1]}</h3><p className="mt-1 text-sm text-white/80">{chapter.setting}</p></div>
                  <span className="rounded-full bg-white/15 px-4 py-2 font-display text-sm font-semibold">{chapterComplete} / {chapterWorlds.length} Worlds Complete</span>
                </div>
                <ol className="grid list-none grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                  {chapterWorlds.map((world) => {
                    const index = world.id - 1;
                    return <motion.li key={world.id} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.15 }} transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }} className={`${zigzagClass(index)} ${expandedId === world.id ? "sm:col-span-2 lg:col-span-3 lg:translate-y-0" : ""}`}>
                      <WorldCard world={world} status={statuses[index]} isActive={index === activeIndex} isExpanded={expandedId === world.id} onToggle={() => handleToggle(world.id)} onRequestUnlock={() => gateWorld(world.id)} onComplete={(correct, total) => handleComplete(world.id, correct, total)} onNextWorld={handleNextWorld} caseTitle={(world.id === 1 || completedWorldIds.includes(world.id-1)) ? cityCase(world.id).title : "???"} caseScene={cityCase(world.id).scene} />
                    </motion.li>;
                  })}
                </ol>
              </section>
            );
          })}
        </div>
      </Container>

      <AnimatePresence>
        {showGate && (
          <PremiumGateModal
            onClose={() => {
              clearPendingWorld();
              setShowGate(false);
            }}
          />
        )}
        {showCelebration && (
          <CelebrationModal
            xpEarned={player.xp}
            badgesEarned={player.badgeIds.length}
            worldsCompleted={player.completedWorldIds.length}
            onClose={() => setShowCelebration(false)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
