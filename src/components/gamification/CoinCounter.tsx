"use client";

import { motion } from "framer-motion";
import { AnimatedNumber } from "./AnimatedNumber";

/** Coin purse pill with a spinning coin. */
export function CoinCounter({
  coins,
  tone = "dark",
}: {
  coins: number;
  tone?: "light" | "dark";
}) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full px-4 py-2 font-display font-semibold ${
        tone === "light"
          ? "bg-white/15 text-white"
          : "bg-detective-yellow-100 text-detective-blue-900"
      }`}
    >
      <motion.span
        aria-hidden="true"
        animate={{ rotateY: [0, 180, 360] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="text-lg"
      >
        🪙
      </motion.span>
      <AnimatedNumber value={coins} />
      <span className="sr-only">coins</span>
    </span>
  );
}
