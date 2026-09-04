/**
 * Single source of truth for world access.
 *
 * Every entry point — world cards, buttons, route guards and post-login
 * redirects — must go through `canAccessWorld`. Do not re-implement this rule
 * anywhere else.
 */

import type { MembershipStatus } from "@/lib/auth/types";

/** Worlds playable without an account or membership. */
export const FREE_WORLD_IDS = [1, 2] as const;

/** Finishing this world triggers the sign-up celebration. */
export const LAST_FREE_WORLD_ID = 2;

export const TOTAL_WORLDS = 15;

export function isFreeWorld(worldNumber: number): boolean {
  return (FREE_WORLD_IDS as readonly number[]).includes(worldNumber);
}

/**
 * Worlds 1–2 are always open. Worlds 3–15 require a signed-in detective whose
 * membership has been verified (`ACTIVE`). A logged-in but FREE/PENDING account
 * cannot open premium worlds. Swapping the mock session in
 * `src/lib/auth/mock-auth.ts` for Firebase or Supabase is enough to make this
 * production-ready — this rule does not change.
 */
export function canAccessWorld(
  worldNumber: number,
  isLoggedIn: boolean,
  membershipStatus: MembershipStatus = "FREE",
): boolean {
  if (isFreeWorld(worldNumber)) return true;
  return isLoggedIn && membershipStatus === "ACTIVE";
}

/** Standalone lesson routes that belong to a world, for route-level guarding. */
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

const PENDING_WORLD_KEY = "brandquest.pending-world";
const GATE_FLAG_KEY = "brandquest.show-gate";

/** Remembers which world the visitor wanted, so login can return them to it. */
export function rememberPendingWorld(worldNumber: number) {
  try {
    window.sessionStorage.setItem(PENDING_WORLD_KEY, String(worldNumber));
  } catch {
    // Session storage can be unavailable; the gate still works without it.
  }
}

export function readPendingWorld(): number | null {
  try {
    const raw = window.sessionStorage.getItem(PENDING_WORLD_KEY);
    return raw ? Number(raw) : null;
  } catch {
    return null;
  }
}

export function clearPendingWorld() {
  try {
    window.sessionStorage.removeItem(PENDING_WORLD_KEY);
  } catch {
    // Nothing to clean up.
  }
}

/** Set by a blocked route so the Journey page knows to show the gate on arrival. */
export function flagGateOnReturn() {
  try {
    window.sessionStorage.setItem(GATE_FLAG_KEY, "1");
  } catch {
    // Ignored.
  }
}

/** Reads the flag set by either the middleware cookie or the client guard. */
export function consumeGateFlag(): boolean {
  let flagged = false;

  try {
    if (window.sessionStorage.getItem(GATE_FLAG_KEY)) {
      window.sessionStorage.removeItem(GATE_FLAG_KEY);
      flagged = true;
    }
  } catch {
    // Ignored.
  }

  const match = document.cookie.match(/(?:^|;\s*)bq_gate=(\d+)/);
  if (match) {
    rememberPendingWorld(Number(match[1]));
    document.cookie = "bq_gate=; path=/; max-age=0";
    flagged = true;
  }

  return flagged;
}
