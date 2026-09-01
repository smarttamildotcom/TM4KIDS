"use client";

import { motion } from "framer-motion";
import { Award, BookOpen, Coins, Zap } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { ProfileCard } from "@/components/dashboard/ProfileCard";
import { StatCard } from "@/components/dashboard/StatCard";
import { LessonPath } from "@/components/dashboard/LessonPath";
import { NextLessonCard } from "@/components/dashboard/NextLessonCard";
import { ProgressBar } from "@/components/dashboard/ProgressBar";
import { CertificateShelf } from "@/components/dashboard/CertificateShelf";
import { BadgeCase, useGame } from "@/components/gamification";
import { badges } from "@/lib/gamification/config";
import { getLessonStatuses, lessons } from "@/lib/lessons";
import { inViewOnce, staggerContainer } from "@/lib/motion";

/** Dashboard body, driven entirely by the persisted player state. */
export function DashboardView() {
  const { player, level } = useGame();

  const statuses = getLessonStatuses(player.completedLessonIds);
  const completedCount = player.completedLessonIds.length;
  const nextEntry =
    statuses.find((entry) => entry.status === "current") ?? statuses[0];
  const coursePercent = Math.round((completedCount / lessons.length) * 100);

  return (
    <Container className="space-y-8 sm:space-y-10">
      <ProfileCard
        name={player.name}
        avatarEmoji={player.avatarEmoji}
        xp={player.xp}
        coins={player.coins}
        streakDays={player.streak.count}
        level={level.current}
        nextTitle={level.next?.title ?? null}
        percent={level.percent}
        xpToNext={level.xpToNext}
      />

      <motion.section
        aria-label="Your statistics"
        variants={staggerContainer}
        {...inViewOnce}
        className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
      >
        <StatCard
          icon={Zap}
          label="XP Points"
          value={player.xp}
          suffix="XP"
          hint="Earned from lessons and quizzes"
          surface="bg-detective-yellow-100 border-detective-yellow-300"
          badge="bg-detective-yellow-400 text-detective-blue-900"
        />
        <StatCard
          icon={Coins}
          label="Coins"
          value={player.coins}
          hint="Spend them in the detective shop soon"
          surface="bg-detective-orange-100 border-detective-orange-400"
          badge="bg-detective-orange-500 text-white"
        />
        <StatCard
          icon={BookOpen}
          label="Lessons completed"
          value={completedCount}
          suffix={`/ ${lessons.length}`}
          hint="Keep going, detective!"
          surface="bg-detective-blue-50 border-detective-blue-200"
          badge="bg-detective-blue-500 text-white"
        />
        <StatCard
          icon={Award}
          label="Badges earned"
          value={player.badgeIds.length}
          suffix={`/ ${badges.length}`}
          hint="Collect them all"
          surface="bg-white border-detective-blue-100"
          badge="bg-detective-blue-600 text-white"
        />
      </motion.section>

      <section
        aria-labelledby="progress-heading"
        className="rounded-[2rem] border-2 border-detective-blue-100 bg-white p-6 shadow-md sm:p-8"
      >
        <div className="flex flex-wrap items-end justify-between gap-2">
          <h2
            id="progress-heading"
            className="font-display text-xl font-bold text-detective-blue-900 sm:text-2xl"
          >
            BrandQuest progress
          </h2>
          <p className="font-display text-lg font-bold text-detective-orange-500">
            {coursePercent}%
          </p>
        </div>

        <ProgressBar
          percent={coursePercent}
          label="Overall BrandQuest progress"
          className="mt-4 bg-detective-blue-100"
        />

        <p className="mt-3 text-detective-blue-700/85">
          {completedCount} of {lessons.length} levels solved. Only{" "}
          {lessons.length - completedCount} cases left to crack!
        </p>
      </section>

      <div className="grid gap-8 lg:grid-cols-[1.6fr_1fr] lg:items-start">
        <section aria-labelledby="lessons-heading">
          <h2
            id="lessons-heading"
            className="mb-4 font-display text-xl font-bold text-detective-blue-900 sm:text-2xl"
          >
            Your case files
          </h2>
          <LessonPath completedIds={player.completedLessonIds} />
        </section>

        <section aria-labelledby="next-heading" className="lg:sticky lg:top-24">
          <h2 id="next-heading" className="sr-only">
            Next lesson
          </h2>
          <NextLessonCard lesson={nextEntry.lesson} />
        </section>
      </div>

      <section
        aria-labelledby="badges-heading"
        className="rounded-[2rem] border-2 border-detective-blue-100 bg-white p-6 shadow-md sm:p-8"
      >
        <h2
          id="badges-heading"
          className="mb-1 font-display text-xl font-bold text-detective-blue-900 sm:text-2xl"
        >
          Badge collection
        </h2>
        <p className="mb-6 text-detective-blue-700/85">
          {player.badgeIds.length} of {badges.length} badges earned.
        </p>
        <BadgeCase earnedIds={player.badgeIds} />
      </section>

      <section
        aria-labelledby="certificates-heading"
        className="rounded-[2rem] border-2 border-detective-blue-100 bg-white p-6 shadow-md sm:p-8"
      >
        <h2
          id="certificates-heading"
          className="mb-1 font-display text-xl font-bold text-detective-blue-900 sm:text-2xl"
        >
          Certificates
        </h2>
        <p className="mb-6 text-detective-blue-700/85">
          Finish lessons to unlock printable certificates.
        </p>
        <CertificateShelf earnedIds={player.certificateIds} />
      </section>
    </Container>
  );
}
