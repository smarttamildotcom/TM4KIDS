import type { QuizResult } from "./types";

/** Minimum score fraction required for 1, 2 and 3 stars. */
export const starThresholds = [0.34, 0.67, 1] as const;

export function calculateStars(correct: number, total: number): number {
  if (total === 0) return 0;
  const ratio = correct / total;
  return starThresholds.filter((threshold) => ratio >= threshold).length;
}

export function buildQuizResult(correct: number, total: number): QuizResult {
  return {
    correct,
    total,
    percent: total === 0 ? 0 : Math.round((correct / total) * 100),
    stars: calculateStars(correct, total),
  };
}

/** Encouraging message tuned to how many stars were earned. */
export function getResultMessage(stars: number): string {
  switch (stars) {
    case 3:
      return "A perfect case file — outstanding detective work!";
    case 2:
      return "Great work, detective! One more clue and you'll be perfect.";
    case 1:
      return "Good start! Replay the quiz to collect more stars.";
    default:
      return "Every detective needs practice. Give it another go!";
  }
}
