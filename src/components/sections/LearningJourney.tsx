"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useGame } from "@/lib/gamification/GameProvider";
import { fadeUp, inViewOnce, staggerContainer } from "@/lib/motion";
import { levels } from "@/lib/site-content";
import { lessons } from "@/lib/lessons";

/** Five clickable level cards forming the learning path. */
export function LearningJourney() {
  const { player, isLoaded } = useGame();

  return (
    <section id="journey" className="bg-detective-blue-50/70 py-16 sm:py-24">
      <Container>
        <SectionHeading
          eyebrow="Learning journey"
          title="Your BrandQuest Journey"
          subtitle="Complete exciting missions and become a certified Little Brand Detective."
        />

        <motion.ol
          variants={staggerContainer}
          {...inViewOnce}
          className="relative mt-12 grid gap-6 before:absolute before:left-7 before:top-7 before:bottom-7 before:w-1 before:rounded-full before:bg-detective-blue-200 sm:grid-cols-2 sm:before:hidden lg:grid-cols-5 lg:before:left-[10%] lg:before:right-[10%] lg:before:top-7 lg:before:block lg:before:h-1 lg:before:w-auto"
        >
          {levels.map((level) => {
            const Icon = level.icon;
            const lesson = lessons[level.id - 1];
            const isCompleted =
              isLoaded && player.completedLessonIds.includes(lesson.id);

            return (
              <motion.li
                key={level.id}
                variants={fadeUp}
                className="relative h-full pl-12 sm:pl-0"
              >
                <motion.div
                  whileHover={{ y: -8, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300, damping: 22 }}
                  className="h-full"
                >
                  <Link
                    href={level.href}
                    className="group relative flex h-full flex-col rounded-3xl border-2 border-white bg-white p-5 shadow-md transition-shadow hover:shadow-xl"
                  >
                    <div className="flex items-center gap-4">
                      <span
                        aria-label={isCompleted ? `${level.label} completed` : level.label}
                        className={`absolute -left-12 top-0 z-10 grid h-14 w-14 shrink-0 place-items-center rounded-2xl font-display text-xl font-bold text-white shadow-lg sm:static ${
                          isCompleted
                            ? "bg-green-500"
                            : `bg-gradient-to-br ${level.accent}`
                        }`}
                      >
                        {isCompleted ? (
                          <Check className="h-7 w-7" aria-hidden="true" />
                        ) : (
                          level.id
                        )}
                      </span>
                      <div>
                        <p className="font-display text-sm font-semibold uppercase tracking-widest text-detective-orange-500">
                          {level.label}
                        </p>
                        <h3 className="font-display text-xl font-bold text-detective-blue-900">
                          {level.title}
                        </h3>
                      </div>
                    </div>

                    <p className="mt-4 grow text-detective-blue-700/85">
                      {level.blurb}
                    </p>

                    <span className="mt-6 inline-flex items-center gap-2 font-display font-semibold text-detective-blue-600">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                      Start level
                      <ArrowRight
                        aria-hidden="true"
                        className="h-4 w-4 transition-transform group-hover:translate-x-1"
                      />
                    </span>
                  </Link>
                </motion.div>
              </motion.li>
            );
          })}
        </motion.ol>
      </Container>
    </section>
  );
}
