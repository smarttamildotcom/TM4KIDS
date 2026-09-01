"use client";

import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { AnimatedNumber } from "@/components/gamification";
import { fadeUp } from "@/lib/motion";

type StatCardProps = {
  icon: LucideIcon;
  label: string;
  value: number;
  /** Text shown after the number, e.g. "XP" or "/ 5". */
  suffix?: string;
  hint?: string;
  surface: string;
  badge: string;
};

/** Compact metric tile with a count-up value. */
export function StatCard({
  icon: Icon,
  label,
  value,
  suffix,
  hint,
  surface,
  badge,
}: StatCardProps) {
  return (
    <motion.div
      variants={fadeUp}
      whileHover={{ y: -6, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={`rounded-3xl border-2 p-5 shadow-sm transition-shadow hover:shadow-lg ${surface}`}
    >
      <span className={`grid h-11 w-11 place-items-center rounded-2xl shadow-md ${badge}`}>
        <Icon className="h-6 w-6" aria-hidden="true" />
      </span>

      <p className="mt-4 font-display text-3xl font-bold text-detective-blue-900">
        <AnimatedNumber value={value} />
        {suffix && (
          <span className="ml-1 text-lg font-semibold text-detective-blue-700/70">
            {suffix}
          </span>
        )}
      </p>

      <p className="font-display font-semibold text-detective-blue-900">{label}</p>
      {hint && <p className="mt-1 text-sm text-detective-blue-700/75">{hint}</p>}
    </motion.div>
  );
}
