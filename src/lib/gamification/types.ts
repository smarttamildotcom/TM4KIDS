/** Core data model for the gamification system. */

export type PlayerStats = {
  quizzesTaken: number;
  perfectQuizzes: number;
  starsEarned: number;
};

export type PlayerStreak = {
  /** Consecutive days of activity, including today. */
  count: number;
  longest: number;
  /** ISO date (YYYY-MM-DD) of the last recorded activity. */
  lastActiveDate: string | null;
};

export type CertificateAward = {
  certificateId: string;
  certificateNumber: string;
  /** ISO timestamp captured when the certificate first unlocks. */
  awardedAt: string;
};

export type PlayerState = {
  /** Bumped when the shape changes so stale saves can be discarded. */
  version: number;
  name: string;
  avatarEmoji: string;
  xp: number;
  coins: number;
  badgeIds: string[];
  certificateIds: string[];
  certificateAwards: Record<string, CertificateAward>;
  completedLessonIds: string[];
  /** Worlds finished on the 15-world journey. */
  completedWorldIds: number[];
  /** Per-world quiz results, used for the accuracy stat. */
  quizScores: Record<string, { correct: number; total: number }>;
  streak: PlayerStreak;
  stats: PlayerStats;
};

export type LevelDefinition = {
  level: number;
  /** Detective rank shown to the child. */
  title: string;
  minXp: number;
  /** Tailwind gradient classes for the level medallion. */
  accent: string;
};

export type BadgeDefinition = {
  id: string;
  name: string;
  emoji: string;
  /** Kid-friendly hint describing how to unlock it. */
  description: string;
  /** Unlock condition, evaluated after every state change. */
  isEarned: (state: PlayerState) => boolean;
};

export type CertificateDefinition = {
  id: string;
  title: string;
  subtitle: string;
  emoji: string;
  isEarned: (state: PlayerState) => boolean;
};

export type RewardKind = "xp" | "coins" | "badge" | "certificate" | "streak";

export type RewardToastItem = {
  id: string;
  kind: RewardKind;
  label: string;
};

export type LessonReward = {
  xp: number;
  coins: number;
  stars: number;
};
