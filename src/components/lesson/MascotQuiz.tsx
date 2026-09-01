"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Quiz } from "@/components/quiz";
import { useGame } from "@/components/gamification";
import { quizQuestions } from "@/lib/lesson-four";
import { lessons } from "@/lib/lessons";

const lesson = lessons.find((item) => item.id === "mascots")!;

/** Lesson 4's scored quiz, rewarding XP, coins and the Mascot Hero badge. */
export function MascotQuiz() {
  const { completeLesson } = useGame();

  return (
    <Quiz
      questions={quizQuestions}
      onComplete={(result) =>
        completeLesson(lesson.id, {
          xp: lesson.xp,
          coins: lesson.coins,
          stars: result.stars,
        })
      }
      reward={() => <MascotHeroBadge />}
      resultActions={
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 rounded-full bg-detective-orange-500 px-6 py-3 font-display font-semibold text-white shadow-lg transition-colors hover:bg-detective-orange-600"
        >
          See my rewards
          <ArrowRight className="h-5 w-5" aria-hidden="true" />
        </Link>
      }
    />
  );
}

/** Celebratory badge revealed on the results screen. */
function MascotHeroBadge() {
  return (
    <motion.div
      initial={{ scale: 0, rotate: -30, opacity: 0 }}
      animate={{ scale: 1, rotate: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 180, damping: 14 }}
      className="flex flex-col items-center"
    >
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="relative grid h-36 w-36 place-items-center rounded-full bg-gradient-to-br from-detective-yellow-300 to-detective-orange-500 shadow-2xl"
      >
        <motion.span
          aria-hidden="true"
          animate={{ rotate: 360 }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          className="absolute inset-2 rounded-full border-4 border-dashed border-white/70"
        />
        <span aria-hidden="true" className="text-6xl">
          🦸
        </span>
      </motion.div>

      <p className="mt-5 font-display text-2xl font-bold text-detective-blue-900">
        🦸 Mascot Hero badge earned!
      </p>
      <p className="mt-1 font-display text-lg font-semibold text-detective-orange-500">
        +200 XP
      </p>
    </motion.div>
  );
}
