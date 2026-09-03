"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import detectiveQuesty from "@/6. Detective Questy.png";
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
import { totalJourneyXp, worlds } from "@/lib/worlds";

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

/** The 15-world detective journey — the centrepiece of the homepage. */
export function AdventureMap() {
  const { player, isLoaded, completeWorld } = useGame();
  const { user, isLoaded: isAuthLoaded } = useAuth();
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [showCelebration, setShowCelebration] = useState(false);
  const [showGate, setShowGate] = useState(false);
  const hasResumed = useRef(false);

  const isSignedIn = Boolean(user);

  const openWorld = useCallback((worldId: number) => {
    setExpandedId(worldId);
    requestAnimationFrame(() => {
      document.getElementById(`world-${worldId}`)?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    });
  }, []);

  // A blocked route redirects here; pick the gate or the remembered world back up.
  useEffect(() => {
    if (!isAuthLoaded || hasResumed.current) return;
    hasResumed.current = true;

    const blocked = consumeGateFlag();
    const pending = readPendingWorld();

    if (pending && canAccessWorld(pending, isSignedIn)) {
      clearPendingWorld();
      openWorld(pending);
      return;
    }

    if (blocked) setShowGate(true);
  }, [isAuthLoaded, isSignedIn, openWorld]);

  const statuses: WorldStatus[] = worlds.map((world) => {
    if (player.completedWorldIds.includes(world.id)) return "completed";
    // Before hydration everything reads as unlocked so the markup matches the server.
    if (isLoaded && isAuthLoaded && !canAccessWorld(world.id, isSignedIn)) return "locked";
    return "unlocked";
  });

  const completedCount = player.completedWorldIds.length;
  const activeIndex = statuses.indexOf("unlocked");
  const percentComplete = Math.round((completedCount / worlds.length) * 100);

  function handleToggle(worldId: number) {
    if (!canAccessWorld(worldId, isSignedIn)) {
      rememberPendingWorld(worldId);
      setShowGate(true);
      return;
    }

    setExpandedId(expandedId === worldId ? null : worldId);
  }

  /** Same gate as every other entry point, then scroll the next world into view. */
  function handleNextWorld(worldId: number) {
    if (!canAccessWorld(worldId, isSignedIn)) {
      rememberPendingWorld(worldId);
      setShowGate(true);
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
      className="relative scroll-mt-24 overflow-hidden bg-gradient-to-b from-detective-blue-50 via-white to-detective-blue-50/60 py-16 sm:py-24"
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
        <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-center sm:justify-center sm:gap-10">
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="flex shrink-0 items-center justify-center"
          >
            <Image
              src={detectiveQuesty}
              alt="Questy the detective mascot introducing the adventure"
              sizes="(min-width: 640px) 220px, 160px"
              className="h-[160px] w-auto object-contain drop-shadow-xl sm:h-[220px]"
            />
          </motion.div>

          <div className="max-w-xl text-center sm:text-left">
            <p className="font-display text-sm font-semibold uppercase tracking-[0.2em] text-detective-orange-500">
              The 15-World Journey
            </p>
            <h2 className="mt-2 font-display text-3xl font-bold text-detective-blue-900 sm:text-4xl lg:text-5xl">
              Become a Brand Detective!
            </h2>
            <p className="mt-4 text-base text-detective-blue-700/80 sm:text-lg">
              Complete all 15 worlds to become a Master Brand Detective. Every world has a story, a
              mini lesson, quizzes and a detective challenge.
            </p>
          </div>
        </div>

        <div className="mx-auto mt-10 max-w-xl rounded-3xl border-2 border-detective-blue-100 bg-white/90 p-5 shadow-md">
          <div className="flex items-center justify-between font-display text-sm font-bold text-detective-blue-900">
            <span>
              🕵️ {completedCount} of {worlds.length} worlds solved
            </span>
            <span className="text-detective-orange-500">{totalJourneyXp.toLocaleString()} XP total</span>
          </div>
          <div className="mt-3 h-4 overflow-hidden rounded-full bg-detective-blue-100">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${percentComplete}%` }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="h-full rounded-full bg-gradient-to-r from-detective-yellow-400 to-detective-orange-500"
            />
          </div>
        </div>

        <ol className="mt-14 grid list-none grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {worlds.map((world, index) => (
            <motion.li
              key={world.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className={`${zigzagClass(index)} ${expandedId === world.id ? "sm:col-span-2 lg:col-span-3 lg:translate-y-0" : ""}`}
            >
              <WorldCard
                world={world}
                status={statuses[index]}
                isActive={index === activeIndex}
                isExpanded={expandedId === world.id}
                onToggle={() => handleToggle(world.id)}
                onRequestUnlock={() => {
                  rememberPendingWorld(world.id);
                  setShowGate(true);
                }}
                onComplete={(correct, total) => handleComplete(world.id, correct, total)}
                onNextWorld={handleNextWorld}
              />
            </motion.li>
          ))}
        </ol>
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
