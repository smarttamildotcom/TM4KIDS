"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Lock, Star } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useGame } from "@/lib/gamification/GameProvider";
import { fadeUp, inViewOnce, staggerContainer } from "@/lib/motion";
import { missions, type Difficulty } from "@/lib/home-content";
import { lessons } from "@/lib/lessons";

const difficultyStyles: Record<Difficulty, string> = {
  Easy: "bg-green-100 text-green-700",
  Medium: "bg-detective-yellow-100 text-detective-orange-600",
  Hard: "bg-detective-orange-100 text-detective-orange-700",
};

/** Decorative scenery scattered along the winding adventure path. */
const scenery: { emoji: string; className: string; duration: number }[] = [
  { emoji: "🌳", className: "left-[2%] top-[10%]", duration: 5 },
  { emoji: "☁️", className: "right-[4%] top-[4%]", duration: 6 },
  { emoji: "⭐", className: "left-[6%] top-[32%]", duration: 4.2 },
  { emoji: "🚩", className: "right-[2%] top-[38%]", duration: 4.8 },
  { emoji: "🧰", className: "left-[3%] top-[58%]", duration: 5.4 },
  { emoji: "☁️", className: "right-[6%] top-[64%]", duration: 5.8 },
  { emoji: "🐾", className: "left-[8%] top-[82%]", duration: 4.4 },
  { emoji: "🌳", className: "right-[3%] top-[88%]", duration: 5.2 },
];

/** The 20-mission winding adventure map — the centerpiece of the homepage. */
export function AdventureMap() {
  const { player, isLoaded } = useGame();

  return (
    <section id="adventure-map" className="relative overflow-hidden bg-detective-blue-50/70 py-16 sm:py-24">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 hidden sm:block">
        {scenery.map((item, index) => (
          <motion.span
            key={`${item.emoji}-${index}`}
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: item.duration, repeat: Infinity, ease: "easeInOut" }}
            className={`absolute text-3xl opacity-60 ${item.className}`}
          >
            {item.emoji}
          </motion.span>
        ))}
      </div>

      <Container className="relative">
        <SectionHeading
          eyebrow="The centerpiece"
          title="20-Level Adventure Map"
          subtitle="A winding trail of missions — every step unlocks new badges, stars and detective ranks."
        />

        <motion.ol
          variants={staggerContainer}
          {...inViewOnce}
          className="relative mx-auto mt-14 max-w-3xl space-y-6 before:absolute before:left-7 before:top-2 before:bottom-2 before:w-1 before:rounded-full before:bg-detective-blue-200 sm:before:left-1/2 sm:before:-translate-x-1/2"
        >
          {missions.map((mission, index) => {
            const isRight = index % 2 === 1;
            const lesson = lessons.find((item) => item.href === mission.href);
            const isCompleted = Boolean(
              isLoaded && lesson && player.completedLessonIds.includes(lesson.id),
            );
            const isLocked = !mission.href;

            const card = (
              <div
                className={`relative flex items-center gap-4 rounded-3xl border-2 bg-white p-5 shadow-md transition-shadow ${
                  mission.isMilestone ? "border-detective-yellow-400 shadow-lg" : "border-white"
                } ${isCompleted ? "ring-4 ring-detective-yellow-300 shadow-[0_0_28px_rgba(255,200,32,0.45)]" : ""} ${
                  isLocked ? "opacity-70" : "hover:shadow-xl"
                }`}
              >
                <span
                  aria-hidden="true"
                  className={`grid shrink-0 place-items-center rounded-2xl font-display font-bold text-white shadow-lg ${
                    mission.isMilestone ? "h-16 w-16 text-2xl" : "h-12 w-12 text-lg"
                  } ${isLocked ? "bg-detective-blue-200 text-detective-blue-500" : "bg-gradient-to-br from-detective-blue-500 to-detective-blue-700"}`}
                >
                  {isLocked ? <Lock className="h-5 w-5" /> : mission.badgeEmoji}
                </span>

                <div className="min-w-0 grow">
                  <p className="font-display text-xs font-semibold uppercase tracking-widest text-detective-orange-500">
                    Mission {mission.id}
                    {mission.isMilestone && (
                      <span className="ml-2 inline-flex items-center gap-1 rounded-full bg-detective-yellow-400 px-2 py-0.5 text-detective-blue-900">
                        <Star className="h-3 w-3" aria-hidden="true" /> Milestone
                      </span>
                    )}
                  </p>
                  <h3 className="truncate font-display text-lg font-bold text-detective-blue-900">
                    {mission.title}
                  </h3>
                  <div className="mt-2 flex flex-wrap items-center gap-2 text-sm">
                    <span
                      className={`rounded-full px-2.5 py-0.5 font-semibold ${difficultyStyles[mission.difficulty]}`}
                    >
                      {mission.difficulty}
                    </span>
                    <span className="rounded-full bg-detective-blue-50 px-2.5 py-0.5 font-semibold text-detective-blue-700">
                      {mission.reward}
                    </span>
                    <span className="font-semibold text-detective-blue-700/70">
                      {isLocked ? "Locked" : isCompleted ? "Completed" : "Unlocked"}
                    </span>
                  </div>
                </div>
              </div>
            );

            return (
              <motion.li
                key={mission.id}
                variants={fadeUp}
                className={`relative pl-16 sm:w-1/2 sm:pl-0 ${
                  isRight ? "sm:ml-auto sm:pl-10" : "sm:mr-auto sm:pr-10"
                }`}
              >
                {isLocked ? (
                  <div aria-disabled="true">{card}</div>
                ) : (
                  <motion.div
                    whileHover={{ y: -6, scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300, damping: 22 }}
                  >
                    <Link href={mission.href!}>{card}</Link>
                  </motion.div>
                )}
              </motion.li>
            );
          })}
        </motion.ol>
      </Container>
    </section>
  );
}
