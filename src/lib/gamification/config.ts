import type {
  BadgeDefinition,
  CertificateDefinition,
  LevelDefinition,
  PlayerState,
} from "./types";
import { TOTAL_WORLDS } from "@/lib/access";

/** Bumped to 2 when the 15-world journey replaced the Levels 1–5 demo data. */
export const STATE_VERSION = 2;

export { TOTAL_WORLDS };

export const initialPlayerState: PlayerState = {
  version: STATE_VERSION,
  name: "Junior Detective",
  avatarEmoji: "🕵️",
  xp: 0,
  coins: 0,
  badgeIds: [],
  certificateIds: [],
  certificateAwards: {},
  completedLessonIds: [],
  completedWorldIds: [],
  quizScores: {},
  streak: { count: 0, longest: 0, lastActiveDate: null },
  stats: { quizzesTaken: 0, perfectQuizzes: 0, starsEarned: 0 },
};

/** Detective ranks unlocked by total XP across the 15-world journey. */
export const levels: LevelDefinition[] = [
  {
    level: 1,
    title: "Rookie",
    minXp: 0,
    accent: "from-detective-blue-400 to-detective-blue-600",
  },
  {
    level: 2,
    title: "Junior Detective",
    minXp: 150,
    accent: "from-detective-blue-500 to-detective-blue-700",
  },
  {
    level: 3,
    title: "Senior Detective",
    minXp: 500,
    accent: "from-detective-yellow-400 to-detective-orange-500",
  },
  {
    level: 4,
    title: "Master Detective",
    minXp: 1200,
    accent: "from-detective-yellow-300 to-detective-orange-600",
  },
];

/** Coins granted per star at the end of a quiz. */
export const COINS_PER_STAR = 5;

const hasWorld = (state: PlayerState, id: number) => state.completedWorldIds.includes(id);

export const badges: BadgeDefinition[] = [
  {
    id: "first-steps",
    name: "First Steps",
    emoji: "👣",
    description: "Finish your very first world.",
    isEarned: (state) => state.completedWorldIds.length >= 1,
  },
  {
    id: "brand-basics",
    name: "Brand Basics",
    emoji: "🏷️",
    description: "Complete World 2 — What is a Brand?",
    isEarned: (state) => hasWorld(state, 2),
  },
  {
    id: "logo-spotter",
    name: "Logo Spotter",
    emoji: "🎨",
    description: "Complete World 3 — Logos Everywhere.",
    isEarned: (state) => hasWorld(state, 3),
  },
  {
    id: "brand-explorer",
    name: "Brand Explorer",
    emoji: "🌍",
    description: "Complete five worlds.",
    isEarned: (state) => state.completedWorldIds.length >= 5,
  },
  {
    id: "halfway-hero",
    name: "Halfway Hero",
    emoji: "⚡",
    description: "Complete eight worlds.",
    isEarned: (state) => state.completedWorldIds.length >= 8,
  },
  {
    id: "star-hunter",
    name: "Star Hunter",
    emoji: "⭐",
    description: "Earn 15 stars from world quizzes.",
    isEarned: (state) => state.stats.starsEarned >= 15,
  },
  {
    id: "perfect-score",
    name: "Perfect Score",
    emoji: "💯",
    description: "Answer every question in a world correctly.",
    isEarned: (state) => state.stats.perfectQuizzes >= 1,
  },
  {
    id: "streak-3",
    name: "Three Day Streak",
    emoji: "🔥",
    description: "Learn three days in a row.",
    isEarned: (state) => state.streak.count >= 3,
  },
  {
    id: "master-detective",
    name: "Master Brand Detective",
    emoji: "👑",
    description: "Complete all 15 worlds.",
    isEarned: (state) => state.completedWorldIds.length >= TOTAL_WORLDS,
  },
];

export const certificates: CertificateDefinition[] = [
  {
    id: "junior-detective",
    title: "Junior Brand Detective",
    subtitle: "For solving your very first Brand Quest case",
    emoji: "📜",
    isEarned: (state) => state.completedWorldIds.length >= 1,
  },
  {
    id: "trademark-master",
    title: "Brand Quest Master Detective Certificate",
    subtitle: "Complete all 15 worlds to unlock your certificate",
    emoji: "🏆",
    isEarned: (state) => state.completedWorldIds.length >= TOTAL_WORLDS,
  },
];

/**
 * The final certificate, awarded only after all 15 worlds are finished.
 * Referenced by the profile page and the certificate view so the id is defined
 * once here rather than hard-coded across the app.
 */
export const MASTER_CERTIFICATE_ID = "trademark-master";

/** Current rank, the next one, and progress between them. */
export function getLevelProgress(xp: number) {
  const currentIndex = levels.reduce(
    (found, level, index) => (xp >= level.minXp ? index : found),
    0,
  );
  const current = levels[currentIndex];
  const next = levels[currentIndex + 1] ?? null;

  const span = next ? next.minXp - current.minXp : 1;
  const gained = xp - current.minXp;

  return {
    current,
    next,
    percent: next ? Math.min(100, Math.max(0, Math.round((gained / span) * 100))) : 100,
    xpToNext: next ? next.minXp - xp : 0,
  };
}

/** Overall quiz accuracy across every world attempted. */
export function getQuizAccuracy(state: PlayerState): number {
  const scores = Object.values(state.quizScores);
  if (scores.length === 0) return 0;

  const correct = scores.reduce((sum, score) => sum + score.correct, 0);
  const total = scores.reduce((sum, score) => sum + score.total, 0);

  return total === 0 ? 0 : Math.round((correct / total) * 100);
}
