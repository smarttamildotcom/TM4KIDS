"use client";

import { motion } from "framer-motion";
import { Lock } from "lucide-react";

/**
 * Dimming veil and bouncing lock shown over Worlds 3–15 until the child has an
 * active Brand Quest membership. The world stays visible on purpose — seeing
 * what is ahead is part of the motivation. Clicking anywhere opens the gate.
 */
export function LockedWorldOverlay({
  worldName,
  onRequestUnlock,
}: {
  worldName: string;
  onRequestUnlock: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onRequestUnlock}
      aria-label={`${worldName} is locked. Become a member to unlock it.`}
      className="group/lock absolute inset-0 z-20 w-full cursor-pointer rounded-[24px] bg-white/35"
    >
      <motion.span
        aria-hidden="true"
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute right-3 top-3 grid h-11 w-11 place-items-center rounded-full bg-detective-blue-900/90 text-white shadow-lg"
      >
        <Lock className="h-5 w-5" />
      </motion.span>

      <span className="absolute inset-x-4 bottom-4 rounded-2xl bg-detective-blue-900 px-4 py-3 text-center font-display text-sm font-semibold text-white opacity-0 shadow-xl transition-opacity duration-200 group-hover/lock:opacity-100 group-focus-visible/lock:opacity-100">
        🔒 Membership Required
        <span className="mt-1 block text-xs font-normal text-detective-blue-100">
          Become a Brand Quest member to unlock this world.
        </span>
      </span>
    </button>
  );
}
