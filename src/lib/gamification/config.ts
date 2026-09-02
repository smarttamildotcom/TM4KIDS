import type {
  BadgeDefinition,
  CertificateDefinition,
  LevelDefinition,
  PlayerState,
} from "./types";

export const STATE_VERSION = 1;

export const initialPlayerState: PlayerState = {
  version: STATE_VERSION,
  name: "Detective",
  avatarEmoji: "🕵️",
  xp: 0,
  coins: 0,
  badgeIds: [],
  certificateIds: [],
  certificateAwards: {},
  completedLessonIds: [],
  streak: { count: 0, longest: 0, lastActiveDate: null },
  stats: { quizzesTaken: 0, perfectQuizzes: 0, starsEarned: 0 },
};

/** Detective ranks unlocked by total XP. */
export const levels: LevelDefinition[] = [
  {
    level: 1,
    title: "Rookie Brand Detective",
    minXp: 0,
    accent: "from-detective-blue-400 to-detective-blue-600",
  },
  {
    level: 2,
    title: "Junior Brand Detective",
    minXp: 150,
    accent: "from-detective-blue-500 to-detective-blue-700",
  },
  {
    level: 3,
    title: "Senior Brand Detective",
    minXp: 400,
    accent: "from-detective-yellow-400 to-detective-orange-500",
  },
  {
    level: 4,
    title: "Lead Brand Detective",
    minXp: 750,
    accent: "from-detective-orange-400 to-detective-orange-600",
  },
  {
    level: 5,
    title: "BrandQuest Champion",
    minXp: 1200,
    accent: "from-detective-yellow-300 to-detective-orange-600",
  },
];

/** Coins granted per star at the end of a quiz. */
export const COINS_PER_STAR = 5;

export const badges: BadgeDefinition[] = [
  {
    id: "first-case",
    name: "First BrandQuest Case",
    emoji: "🕵️",
    description: "Finish your very first lesson.",
    isEarned: (state) => state.completedLessonIds.length >= 1,
  },
  {
    id: "brand-name-badge",
    name: "Brand Name Explorer",
    emoji: "🏷️",
    description: "Complete the Brand Names lesson.",
    isEarned: (state) => state.completedLessonIds.includes("brand-names"),
  },
  {
    id: "logo-detective-badge",
    name: "Logo Expert",
    emoji: "🔍",
    description: "Complete the Logos lesson.",
    isEarned: (state) => state.completedLessonIds.includes("logos"),
  },
  {
    id: "mascot-hero-badge",
    name: "Mascot Hero",
    emoji: "🦸",
    description: "Complete the Mascots lesson.",
    isEarned: (state) => state.completedLessonIds.includes("mascots"),
  },
  {
    id: "perfect-score",
    name: "BrandQuest Perfect Score",
    emoji: "💯",
    description: "Get every question in a quiz right.",
    isEarned: (state) => state.stats.perfectQuizzes >= 1,
  },
  {
    id: "streak-3",
    name: "BrandQuest Streak",
    emoji: "🔥",
    description: "Learn three days in a row.",
    isEarned: (state) => state.streak.count >= 3,
  },
  {
    id: "streak-7",
    name: "BrandQuest Week Explorer",
    emoji: "📅",
    description: "Learn seven days in a row.",
    isEarned: (state) => state.streak.count >= 7,
  },
  {
    id: "coin-collector",
    name: "BrandQuest Coin Collector",
    emoji: "🪙",
    description: "Collect 100 detective coins.",
    isEarned: (state) => state.coins >= 100,
  },
  {
    id: "star-hunter",
    name: "BrandQuest Star Hunter",
    emoji: "⭐",
    description: "Earn 9 stars from quizzes.",
    isEarned: (state) => state.stats.starsEarned >= 9,
  },
  {
    id: "quiz-champion",
    name: "BrandQuest Quiz Champion",
    emoji: "🧠",
    description: "Take ten quizzes in total.",
    isEarned: (state) => state.stats.quizzesTaken >= 10,
  },
  {
    id: "gold-detective-badge",
    name: "BrandQuest Champion",
    emoji: "🏅",
    description: "Complete every level in Brand Quest.",
    isEarned: (state) =>
      state.completedLessonIds.includes("trademark-master"),
  },
];

export const certificates: CertificateDefinition[] = [
  {
    id: "junior-detective",
    title: "Junior Brand Detective",
    subtitle: "For solving your very first BrandQuest case",
    emoji: "📜",
    isEarned: (state) => state.completedLessonIds.length >= 1,
  },
  {
    id: "trademark-master",
    title: "Brand Quest Certificate",
    subtitle: "For completing the Brand Quest programme",
    emoji: "🏆",
    isEarned: (state) =>
      state.completedLessonIds.includes("trademark-master"),
  },
];

/** Current level, the next one, and progress between them. */
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
