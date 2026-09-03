"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import detectiveQuesty from "@/6. Detective Questy.png";
import { Container } from "@/components/ui/Container";
import { WorldCard, type WorldStatus } from "@/components/sections/WorldCard";
import { CelebrationModal } from "@/components/auth/CelebrationModal";
import { useAuth } from "@/lib/auth/AuthProvider";
import { useGame } from "@/lib/gamification/GameProvider";
import { isWorldUnlocked, LAST_FREE_WORLD_ID, useWorldProgress } from "@/lib/progress";
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
  const { awardXp } = useGame();
  const { user } = useAuth();
  const { progress, isLoaded, completeWorld, markCelebrationSeen } = useWorldProgress();
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [showCelebration, setShowCelebration] = useState(false);

  const isSignedIn = Boolean(user);

  const statuses: WorldStatus[] = worlds.map((world) => {
    if (progress.completedWorldIds.includes(world.id)) return "completed";
    // Before hydration everything reads as unlocked so the markup matches the server.
    if (isLoaded && !isWorldUnlocked(world.id, isSignedIn)) return "locked";
    return "unlocked";
  });

  const completedCount = progress.completedWorldIds.length;
  const activeIndex = statuses.indexOf("unlocked");
  const percentComplete = Math.round((completedCount / worlds.length) * 100);

  function handleComplete(worldId: number) {
    const world = worlds.find((item) => item.id === worldId);
    if (!world || progress.completedWorldIds.includes(worldId)) return;

    completeWorld(world.id, world.xp, world.reward.label);
    awardXp(world.xp, `${world.reward.badge} ${world.reward.label} earned!`);

    const finishedFreeTrial =
      worldId === LAST_FREE_WORLD_ID && !isSignedIn && !progress.celebrationSeen;

    if (finishedFreeTrial) {
      setExpandedId(null);
      setShowCelebration(true);
    }
  }

  function handleCloseCelebration() {
    markCelebrationSeen();
    setShowCelebration(false);
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
                onToggle={() => setExpandedId(expandedId === world.id ? null : world.id)}
                onComplete={() => handleComplete(world.id)}
              />
            </motion.li>
          ))}
        </ol>
      </Container>

      <AnimatePresence>
        {showCelebration && (
          <CelebrationModal
            xpEarned={progress.xpEarned}
            badgesEarned={progress.earnedBadges.length}
            worldsCompleted={progress.completedWorldIds.length}
            onClose={handleCloseCelebration}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
