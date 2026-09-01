"use client";

import { AnimatePresence, motion } from "framer-motion";
import type { AnswerResult } from "@/lib/quiz/types";

/** Animated correct/wrong banner with a burst of sparkles on success. */
export function FeedbackBanner({ result }: { result: AnswerResult | null }) {
  return (
    <AnimatePresence>
      {result && (
        <motion.div
          initial={{ opacity: 0, height: 0, y: 8 }}
          animate={{ opacity: 1, height: "auto", y: 0 }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          role="status"
          aria-live="polite"
          className="overflow-hidden"
        >
          <motion.div
            initial={result.isCorrect ? { scale: 0.9 } : { x: 0 }}
            animate={
              result.isCorrect
                ? { scale: [0.9, 1.04, 1] }
                : { x: [0, -10, 10, -6, 6, 0] }
            }
            transition={{ duration: 0.45 }}
            className={`relative mt-5 flex items-start gap-3 rounded-2xl px-5 py-4 font-medium ${
              result.isCorrect
                ? "bg-green-50 text-green-800"
                : "bg-detective-yellow-100 text-detective-orange-600"
            }`}
          >
            <span aria-hidden="true" className="text-xl">
              {result.isCorrect ? "🎉" : "💡"}
            </span>
            <p>{result.feedback}</p>

            {result.isCorrect && <Sparkles />}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/** Small celebratory particles that pop outward on a correct answer. */
function Sparkles() {
  const particles = [
    { x: -30, y: -26 },
    { x: 20, y: -34 },
    { x: 46, y: -18 },
    { x: -12, y: -40 },
  ];

  return (
    <span aria-hidden="true" className="pointer-events-none absolute left-6 top-2">
      {particles.map((particle, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0, x: 0, y: 0, scale: 0.4 }}
          animate={{ opacity: [0, 1, 0], x: particle.x, y: particle.y, scale: 1 }}
          transition={{ duration: 0.9, delay: index * 0.06, ease: "easeOut" }}
          className="absolute text-lg"
        >
          ✨
        </motion.span>
      ))}
    </span>
  );
}
