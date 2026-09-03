"use client";

import { useCallback, useEffect, useState } from "react";

/**
 * Worlds playable without an account. Everything else needs a Detective
 * Account, so this is the single switch controlling the free trial.
 */
export const FREE_WORLD_IDS = [1, 2] as const;

/** Finishing this world triggers the sign-up celebration. */
export const LAST_FREE_WORLD_ID = 2;

const STORAGE_KEY = "brandquest.world-progress";
const VERSION = 1;

export type WorldProgress = {
  version: number;
  completedWorldIds: number[];
  earnedBadges: string[];
  xpEarned: number;
  /** Stops the free-trial celebration re-opening on every visit. */
  celebrationSeen: boolean;
};

export const emptyProgress: WorldProgress = {
  version: VERSION,
  completedWorldIds: [],
  earnedBadges: [],
  xpEarned: 0,
  celebrationSeen: false,
};

/**
 * True when a world may be opened. Swapping the mock session in
 * `src/lib/auth/mock-auth.ts` for Firebase or Supabase is enough to make this
 * production-ready — the rule itself does not change.
 */
export function isWorldUnlocked(worldId: number, isSignedIn: boolean): boolean {
  if (isSignedIn) return true;
  return (FREE_WORLD_IDS as readonly number[]).includes(worldId);
}

function readProgress(): WorldProgress {
  if (typeof window === "undefined") return emptyProgress;

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return emptyProgress;

    const parsed = JSON.parse(raw) as WorldProgress;
    if (parsed.version !== VERSION) return emptyProgress;

    return { ...emptyProgress, ...parsed };
  } catch {
    return emptyProgress;
  }
}

function writeProgress(progress: WorldProgress) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch {
    // Storage can be unavailable in private mode; progress is best-effort.
  }
}

/**
 * World completion state, persisted to localStorage so free-trial progress
 * survives a refresh and is still there after the child signs up.
 */
export function useWorldProgress() {
  const [progress, setProgress] = useState<WorldProgress>(emptyProgress);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setProgress(readProgress());
    setIsLoaded(true);
  }, []);

  const update = useCallback((next: (current: WorldProgress) => WorldProgress) => {
    setProgress((current) => {
      const value = next(current);
      writeProgress(value);
      return value;
    });
  }, []);

  const completeWorld = useCallback(
    (worldId: number, xp: number, badge: string) => {
      update((current) => {
        if (current.completedWorldIds.includes(worldId)) return current;

        return {
          ...current,
          completedWorldIds: [...current.completedWorldIds, worldId],
          earnedBadges: [...current.earnedBadges, badge],
          xpEarned: current.xpEarned + xp,
        };
      });
    },
    [update],
  );

  const markCelebrationSeen = useCallback(() => {
    update((current) => ({ ...current, celebrationSeen: true }));
  }, [update]);

  return { progress, isLoaded, completeWorld, markCelebrationSeen };
}
