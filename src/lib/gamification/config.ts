import type { BadgeDefinition, CertificateDefinition, LevelDefinition, PlayerState } from "./types";
import { TOTAL_WORLDS } from "@/lib/access";

export const STATE_VERSION = 2;
export { TOTAL_WORLDS };

export const initialPlayerState: PlayerState = {
  version: STATE_VERSION, name: "Idea Adventurer", avatarEmoji: "✨", xp: 0, coins: 0,
  badgeIds: [], certificateIds: [], certificateAwards: {}, completedLessonIds: [], completedWorldIds: [], quizScores: {},
  streak: { count: 0, longest: 0, lastActiveDate: null }, stats: { quizzesTaken: 0, perfectQuizzes: 0, starsEarned: 0 },
};

export const levels: LevelDefinition[] = [
  { level: 1, title: "Curious Explorer", minXp: 0, accent: "from-detective-blue-400 to-detective-blue-600" },
  { level: 2, title: "Idea Explorer", minXp: 150, accent: "from-detective-blue-500 to-detective-blue-700" },
  { level: 3, title: "Idea Adventurer", minXp: 500, accent: "from-detective-yellow-400 to-detective-orange-500" },
  { level: 4, title: "Superpower Creator", minXp: 1200, accent: "from-detective-yellow-300 to-detective-orange-600" },
];

export const COINS_PER_STAR = 5;
const hasWorld = (state: PlayerState, id: number) => state.completedWorldIds.includes(id);

export const badges: BadgeDefinition[] = [
  { id: "first-steps", name: "First Adventure", emoji: "👣", description: "Finish your very first adventure.", isEarned: (state) => state.completedWorldIds.length >= 1 },
  { id: "brand-basics", name: "Brand Explorer", emoji: "🏷️", description: "Discover an adventure about brands and trademarks.", isEarned: (state) => hasWorld(state, 2) },
  { id: "logo-spotter", name: "Invention Explorer", emoji: "💡", description: "Discover an adventure about inventions and patents.", isEarned: (state) => hasWorld(state, 8) },
  { id: "brand-explorer", name: "Creative Explorer", emoji: "🎨", description: "Discover an adventure about creative works and copyright.", isEarned: (state) => state.completedWorldIds.length >= 5 },
  { id: "halfway-hero", name: "Design Explorer", emoji: "✨", description: "Discover an adventure about design.", isEarned: (state) => state.completedWorldIds.length >= 8 },
  { id: "star-hunter", name: "Star Hunter", emoji: "⭐", description: "Earn 15 stars from adventure questions.", isEarned: (state) => state.stats.starsEarned >= 15 },
  { id: "perfect-score", name: "Question Champion", emoji: "💯", description: "Answer every question in an adventure correctly.", isEarned: (state) => state.stats.perfectQuizzes >= 1 },
  { id: "streak-3", name: "Three Day Explorer", emoji: "🔥", description: "Explore three days in a row.", isEarned: (state) => state.streak.count >= 3 },
  { id: "master-detective", name: "IP2Kids Idea Adventurer", emoji: "👑", description: "Complete all 15 Questy's Idea Adventures.", isEarned: (state) => state.completedWorldIds.length >= TOTAL_WORLDS },
];

export const certificates: CertificateDefinition[] = [
  { id: "junior-detective", title: "IP2Kids Idea Explorer", subtitle: "For completing your first Questy's Idea Adventure", emoji: "📜", isEarned: (state) => state.completedWorldIds.length >= 1 },
  { id: "trademark-master", title: "IP2Kids Idea Adventurer Certificate of Completion", subtitle: "Complete Adventure 15 to unlock your Certificate of Completion", emoji: "🏆", isEarned: (state) => hasWorld(state, TOTAL_WORLDS) },
];

export const MASTER_CERTIFICATE_ID = "trademark-master";

export function getLevelProgress(xp: number) {
  const currentIndex = levels.reduce((found, level, index) => (xp >= level.minXp ? index : found), 0);
  const current = levels[currentIndex]; const next = levels[currentIndex + 1] ?? null;
  const span = next ? next.minXp - current.minXp : 1; const gained = xp - current.minXp;
  return { current, next, percent: next ? Math.min(100, Math.max(0, Math.round((gained / span) * 100))) : 100, xpToNext: next ? next.minXp - xp : 0 };
}

export function getQuizAccuracy(state: PlayerState): number {
  const scores = Object.values(state.quizScores); if (scores.length === 0) return 0;
  const correct = scores.reduce((sum, score) => sum + score.correct, 0); const total = scores.reduce((sum, score) => sum + score.total, 0);
  return total === 0 ? 0 : Math.round((correct / total) * 100);
}
