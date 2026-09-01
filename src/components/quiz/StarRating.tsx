"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

type StarRatingProps = {
  earned: number;
  total?: number;
  /** Tailwind size classes for each star. */
  size?: string;
};

/** Animated star row used on quiz results and badges. */
export function StarRating({
  earned,
  total = 3,
  size = "h-9 w-9",
}: StarRatingProps) {
  return (
    <div
      className="flex justify-center gap-1"
      role="img"
      aria-label={`${earned} out of ${total} stars`}
    >
      {Array.from({ length: total }, (_, position) => (
        <motion.span
          key={position}
          initial={{ scale: 0, rotate: -90 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.25 + position * 0.15, type: "spring", stiffness: 220 }}
        >
          <Star
            aria-hidden="true"
            className={`${size} ${
              position < earned
                ? "fill-detective-yellow-400 text-detective-yellow-500"
                : "text-detective-blue-200"
            }`}
          />
        </motion.span>
      ))}
    </div>
  );
}
