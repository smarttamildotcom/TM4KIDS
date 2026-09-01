"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { RotateCcw } from "lucide-react";
import { Confetti } from "@/components/quiz/Confetti";
import { StarRating } from "@/components/quiz/StarRating";
import { getResultMessage } from "@/lib/quiz/scoring";
import type { QuizResult } from "@/lib/quiz/types";

type QuizResultsProps = {
  result: QuizResult;
  onReplay: () => void;
  /** Optional badge artwork shown above the score. */
  children?: ReactNode;
  /** Extra actions rendered beside the replay button, e.g. "Next lesson". */
  actions?: ReactNode;
};

/** End-of-quiz screen showing score, stars and a replay button. */
export function QuizResults({
  result,
  onReplay,
  children,
  actions,
}: QuizResultsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="rounded-[2rem] border-2 border-detective-yellow-300 bg-detective-yellow-100/60 p-8 text-center shadow-xl sm:p-12"
    >
      <Confetti pieceCount={result.stars === 3 ? 60 : 36} />

      {children}

      <div className="mt-6">
        <StarRating earned={result.stars} />
      </div>

      <p className="mt-5 font-display text-2xl font-bold text-detective-blue-900">
        {result.correct} out of {result.total} correct ({result.percent}%)
      </p>
      <p className="mt-2 text-lg text-detective-blue-700/85">
        {getResultMessage(result.stars)}
      </p>

      <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
        <button
          type="button"
          onClick={onReplay}
          className="inline-flex items-center gap-2 rounded-full border-2 border-detective-blue-500 bg-white px-6 py-3 font-display font-semibold text-detective-blue-700 transition-colors hover:bg-detective-blue-50"
        >
          <RotateCcw className="h-5 w-5" aria-hidden="true" />
          Play again
        </button>
        {actions}
      </div>
    </motion.div>
  );
}
