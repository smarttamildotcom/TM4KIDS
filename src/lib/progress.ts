import type { PlayerState } from "@/lib/gamification/types";
import { TOTAL_WORLDS } from "@/lib/access";

/** World ids the player has not finished yet, in order. */
export function getRemainingWorldIds(state: PlayerState): number[] {
  return Array.from({ length: TOTAL_WORLDS }, (_, index) => index + 1).filter(
    (id) => !state.completedWorldIds.includes(id),
  );
}
