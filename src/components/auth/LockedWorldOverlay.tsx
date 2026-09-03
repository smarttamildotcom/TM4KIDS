"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Lock } from "lucide-react";

/**
 * Dimming veil and lock badge shown over Worlds 3–15 until the child has a
 * Detective Account. The world stays visible on purpose — seeing what is
 * ahead is part of the motivation.
 */
export function LockedWorldOverlay({ worldName }: { worldName: string }) {
  return (
    <div className="group/lock absolute inset-0 z-20 rounded-[24px]">
      <div className="absolute inset-0 rounded-[24px] bg-white/35" />

      <span className="absolute right-3 top-3 grid h-10 w-10 place-items-center rounded-full bg-detective-blue-900/85 text-white shadow-lg">
        <Lock className="h-5 w-5" aria-hidden="true" />
      </span>

      <Link
        href="/login?redirect=%2F%23journey"
        aria-label={`${worldName} is locked. Sign in to unlock this world.`}
        className="absolute inset-0 rounded-[24px] focus-visible:outline-none"
      />

      <motion.span
        aria-hidden="true"
        initial={{ opacity: 0, y: 6 }}
        whileHover={{ opacity: 1, y: 0 }}
        className="pointer-events-none absolute inset-x-4 bottom-4 rounded-2xl bg-detective-blue-900 px-4 py-3 text-center font-display text-sm font-semibold text-white opacity-0 shadow-xl transition-opacity duration-200 group-hover/lock:opacity-100"
      >
        🔒 Login to continue your detective adventure.
        <span className="mt-1 block text-xs font-normal text-detective-blue-100">
          Complete your Detective Account to unlock.
        </span>
      </motion.span>
    </div>
  );
}
