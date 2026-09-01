import type { PlayerStreak } from "./types";

/** Local calendar day as YYYY-MM-DD. */
export function toDateKey(date: Date = new Date()): string {
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, "0");
  const day = `${date.getDate()}`.padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function daysBetween(fromKey: string, toKey: string): number {
  const from = new Date(`${fromKey}T00:00:00`);
  const to = new Date(`${toKey}T00:00:00`);
  return Math.round((to.getTime() - from.getTime()) / 86_400_000);
}

/**
 * Advances the streak for today's visit: +1 if yesterday counted,
 * reset to 1 after a missed day, unchanged if already recorded today.
 */
export function recordStreak(
  streak: PlayerStreak,
  today = toDateKey(),
): { streak: PlayerStreak; changed: boolean } {
  if (streak.lastActiveDate === today) {
    return { streak, changed: false };
  }

  const gap = streak.lastActiveDate
    ? daysBetween(streak.lastActiveDate, today)
    : Infinity;
  const count = gap === 1 ? streak.count + 1 : 1;

  return {
    streak: {
      count,
      longest: Math.max(streak.longest, count),
      lastActiveDate: today,
    },
    changed: true,
  };
}
