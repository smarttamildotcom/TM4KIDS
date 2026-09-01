"use client";

import { motion } from "framer-motion";
import { ArrowRight, Clock } from "lucide-react";
import { Button } from "@/components/ui/Button";
import type { LessonSummary } from "@/lib/lessons";

/** Highlighted "continue where you left off" card. */
export function NextLessonCard({ lesson }: { lesson: LessonSummary }) {
  const Icon = lesson.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="relative overflow-hidden rounded-[2rem] border-2 border-detective-yellow-300 bg-gradient-to-br from-detective-yellow-100 to-detective-orange-100 p-6 shadow-lg sm:p-8"
    >
      <motion.span
        aria-hidden="true"
        animate={{ y: [0, -10, 0], rotate: [-4, 4, -4] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -right-4 -top-4 grid h-24 w-24 place-items-center rounded-full bg-detective-orange-500/20"
      >
        <Icon className="h-10 w-10 text-detective-orange-600" />
      </motion.span>

      <p className="font-display text-sm font-semibold uppercase tracking-widest text-detective-orange-600">
        Next lesson
      </p>
      <h3 className="mt-2 max-w-xs font-display text-2xl font-bold text-detective-blue-900 sm:text-3xl">
        {lesson.level}: {lesson.title}
      </h3>

      <p className="mt-3 inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 font-display text-sm font-semibold text-detective-blue-700">
        <Clock className="h-4 w-4" aria-hidden="true" />
        About 5 minutes · {lesson.xp} XP
      </p>

      <div className="mt-6">
        <Button href={lesson.href} size="lg">
          Continue
          <ArrowRight className="h-5 w-5" aria-hidden="true" />
        </Button>
      </div>
    </motion.div>
  );
}
