import { STATE_VERSION, initialPlayerState } from "./config";
import type { PlayerState } from "./types";

const LEGACY_STORAGE_KEY = "tda:player";
const storageKey = (userId: string) => `tda:player:${userId}`;

function normalise(value: string | undefined) {
  return (value ?? "").trim().toLocaleLowerCase();
}

function parse(raw: string | null): PlayerState {
  if (!raw) return initialPlayerState;
  try {
    const parsed = JSON.parse(raw) as Partial<PlayerState>;
    if (parsed.version !== STATE_VERSION) return initialPlayerState;
    return { ...initialPlayerState, ...parsed, streak: { ...initialPlayerState.streak, ...parsed.streak }, stats: { ...initialPlayerState.stats, ...parsed.stats } };
  } catch {
    return initialPlayerState;
  }
}

/**
 * Player state is session-scoped. A very small, safe legacy migration is made
 * only when the legacy display name matches the authenticated student's name.
 */
export function loadPlayerState(userId: string, studentName: string): PlayerState {
  if (typeof window === "undefined") return initialPlayerState;
  const scopedRaw = window.localStorage.getItem(storageKey(userId));
  if (scopedRaw) return parse(scopedRaw);

  const legacy = parse(window.localStorage.getItem(LEGACY_STORAGE_KEY));
  if (normalise(legacy.name) && normalise(legacy.name) === normalise(studentName)) {
    savePlayerState(legacy, userId);
    return legacy;
  }
  return initialPlayerState;
}

export function savePlayerState(state: PlayerState, userId: string): void {
  if (typeof window === "undefined") return;
  try { window.localStorage.setItem(storageKey(userId), JSON.stringify(state)); } catch {}
}

export function clearPlayerState(userId: string): void {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(storageKey(userId));
}