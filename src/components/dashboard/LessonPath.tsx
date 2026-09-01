"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { CheckCircle2, Lock, Play } from "lucide-react";
import { fadeUp, inViewOnce, staggerContainer } from "@/lib/motion";
import { getLessonStatuses, type LessonStatus } from "@/lib/lessons";

const statusStyles: Record<
  LessonStatus,
  { card: string; badge: string; label: string }
> = {
  completed: {
    card: "border-green-200 bg-green-50",
    badge: "bg-green-500 text-white",
    label: "Completed",
  },
  current: {
    card: "border-detective-orange-400 bg-detective-orange-100",
    badge: "bg-detective-orange-500 text-white",
    label: "Up next",
  },
  locked: {
    card: "border-detective-blue-100 bg-white opacity-70",
    badge: "bg-detective-blue-100 text-detective-blue-700",
    label: "Locked",
  },
};

/** Duolingo-style lesson path driven by the player's completed lessons. */
export function LessonPath({ completedIds }: { completedIds: string[] }) {
  const entries = getLessonStatuses(completedIds);

  return (
    <motion.ol variants={staggerContainer} {...inViewOnce} className="space-y-3">
      {entries.map(({ lesson, status }) => {
        const style = statusStyles[status];
        const Icon = lesson.icon;
        const isLocked = status === "locked";

        const content = (
          <>
            <span
              aria-hidden="true"
              className={`grid h-12 w-12 shrink-0 place-items-center rounded-2xl shadow-sm ${style.badge}`}
            >
              {status === "completed" ? (
                <CheckCircle2 className="h-6 w-6" />
              ) : isLocked ? (
                <Lock className="h-5 w-5" />
              ) : (
                <Play className="h-5 w-5" />
              )}
            </span>

            <span className="grow">
              <span className="block font-display text-xs font-semibold uppercase tracking-widest text-detective-blue-700/70">
                {lesson.level}
              </span>
              <span className="block font-display text-lg font-bold text-detective-blue-900">
                {lesson.title}
              </span>
            </span>

            <span className="flex shrink-0 flex-col items-end gap-1">
              <span className="inline-flex items-center gap-1 rounded-full bg-white px-3 py-1 font-display text-sm font-semibold text-detective-blue-700 shadow-sm">
                <Icon className="h-4 w-4" aria-hidden="true" />
                {lesson.xp} XP
              </span>
              <span className="text-xs font-semibold text-detective-blue-700/70">
                {style.label}
              </span>
            </span>
          </>
        );

        return (
          <motion.li key={lesson.id} variants={fadeUp}>
            {isLocked ? (
              <div
                aria-disabled="true"
                className={`flex items-center gap-4 rounded-3xl border-2 p-4 ${style.card}`}
              >
                {content}
              </div>
            ) : (
              <motion.div
                whileHover={{ x: 6 }}
                transition={{ type: "spring", stiffness: 300, damping: 22 }}
              >
                <Link
                  href={lesson.href}
                  className={`flex items-center gap-4 rounded-3xl border-2 p-4 shadow-sm transition-shadow hover:shadow-lg ${style.card}`}
                >
                  {content}
                </Link>
              </motion.div>
            )}
          </motion.li>
        );
      })}
    </motion.ol>
  );
}
