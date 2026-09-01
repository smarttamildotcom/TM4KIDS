"use client";

import { motion } from "framer-motion";
import { Lock } from "lucide-react";
import { badges } from "@/lib/gamification/config";
import { fadeUp, inViewOnce, staggerContainer } from "@/lib/motion";

/** Trophy case of every badge, with locked ones greyed out. */
export function BadgeCase({ earnedIds }: { earnedIds: string[] }) {
  return (
    <motion.ul
      variants={staggerContainer}
      {...inViewOnce}
      className="grid grid-cols-2 gap-4 sm:grid-cols-4"
    >
      {badges.map((badge) => {
        const isEarned = earnedIds.includes(badge.id);

        return (
          <motion.li key={badge.id} variants={fadeUp}>
            <motion.div
              whileHover={isEarned ? { scale: 1.06, rotate: -3 } : { scale: 1.02 }}
              transition={{ type: "spring", stiffness: 320, damping: 18 }}
              className={`flex h-full flex-col items-center rounded-3xl border-2 p-4 text-center shadow-sm ${
                isEarned
                  ? "border-detective-yellow-300 bg-detective-yellow-100"
                  : "border-detective-blue-100 bg-detective-blue-50/60"
              }`}
            >
              <span
                aria-hidden="true"
                className={`grid h-16 w-16 place-items-center rounded-full text-3xl shadow-inner ${
                  isEarned
                    ? "bg-gradient-to-br from-detective-yellow-300 to-detective-orange-500"
                    : "bg-detective-blue-100"
                }`}
              >
                {isEarned ? (
                  badge.emoji
                ) : (
                  <Lock className="h-6 w-6 text-detective-blue-700" />
                )}
              </span>

              <p className="mt-3 font-display text-sm font-bold text-detective-blue-900">
                {badge.name}
              </p>
              <p className="mt-1 text-xs text-detective-blue-700/75">
                {isEarned ? "Earned" : badge.description}
              </p>
            </motion.div>
          </motion.li>
        );
      })}
    </motion.ul>
  );
}
