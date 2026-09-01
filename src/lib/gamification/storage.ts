import { STATE_VERSION, initialPlayerState } from "./config";
import type { PlayerState } from "./types";

const STORAGE_KEY = "tda:player";

/** Reads the saved player, falling back to a fresh profile. */
export function loadPlayerState(): PlayerState {
  if (typeof window === "undefined") return initialPlayerState;

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return initialPlayerState;

    const parsed = JSON.parse(raw) as Partial<PlayerState>;
    if (parsed.version !== STATE_VERSION) return initialPlayerState;

    // Merge so fields added since the save still get sensible defaults.
    return {
      ...initialPlayerState,
      ...parsed,
      streak: { ...initialPlayerState.streak, ...parsed.streak },
      stats: { ...initialPlayerState.stats, ...parsed.stats },
    };
  } catch {
    return initialPlayerState;
  }
}

export function savePlayerState(state: PlayerState): void {
  if (typeof window === "undefined") return;

  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Storage can be full or blocked (private mode); progress is non-critical.
  }
}

export function clearPlayerState(): void {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(STORAGE_KEY);
}
