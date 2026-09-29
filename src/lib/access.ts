/**
 * Single source of truth for world access.
 *
 * IP2Kids is a free educational initiative. All 15 learning worlds are open to
 * every visitor. Accounts remain useful for saving progress, XP, badges and
 * certificates, but payment or membership status never controls learning access.
 */

import type { MembershipStatus } from "@/lib/auth/types";

export const TOTAL_WORLDS = 15;

/** All learning worlds are free. Kept as an exported list for existing UI code. */
export const FREE_WORLD_IDS = Array.from({ length: TOTAL_WORLDS }, (_, index) => index + 1);

/** Legacy export retained so existing celebration logic does not break. */
export const LAST_FREE_WORLD_ID = TOTAL_WORLDS;

export function isFreeWorld(worldNumber: number): boolean {
  return Number.isInteger(worldNumber) && worldNumber >= 1 && worldNumber <= TOTAL_WORLDS;
}

/**
 * Learning access is intentionally independent of login and membership state.
 * Parameters are retained for backwards compatibility with existing callers.
 */
export function canAccessWorld(
  worldNumber: number,
  _isLoggedIn: boolean,
  _membershipStatus: MembershipStatus = "FREE",
): boolean {
  return isFreeWorld(worldNumber);
}

/** Standalone lesson routes that belong to a world. */
export const worldRoutes: Record<string, number> = {
  "/levels/brand-names": 2,
  "/levels/logos": 3,
  "/levels/what-is-a-trademark": 5,
  "/levels/mascots": 8,
  "/levels/trademark-master": 15,
};

export function worldIdForPath(pathname: string): number | null {
  return worldRoutes[pathname] ?? null;
}

// Legacy gate helpers remain temporarily so older components compile while the
// membership UI is retired. They no longer affect access to any learning world.
const PENDING_WORLD_KEY = "brandquest.pending-world";
const GATE_FLAG_KEY = "brandquest.show-gate";

export function rememberPendingWorld(worldNumber: number) {
  try { window.sessionStorage.setItem(PENDING_WORLD_KEY, String(worldNumber)); } catch {}
}
export function readPendingWorld(): number | null {
  try { const raw = window.sessionStorage.getItem(PENDING_WORLD_KEY); return raw ? Number(raw) : null; } catch { return null; }
}
export function clearPendingWorld() {
  try { window.sessionStorage.removeItem(PENDING_WORLD_KEY); } catch {}
}
export function flagGateOnReturn() {
  try { window.sessionStorage.setItem(GATE_FLAG_KEY, "1"); } catch {}
}
export function consumeGateFlag(): boolean {
  let flagged = false;
  try {
    if (window.sessionStorage.getItem(GATE_FLAG_KEY)) {
      window.sessionStorage.removeItem(GATE_FLAG_KEY);
      flagged = true;
    }
  } catch {}
  const match = document.cookie.match(/(?:^|;\s*)bq_gate=(\d+)/);
  if (match) {
    rememberPendingWorld(Number(match[1]));
    document.cookie = "bq_gate=; path=/; max-age=0";
    flagged = true;
  }
  return flagged;
}
