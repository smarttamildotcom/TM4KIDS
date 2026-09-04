import type { MembershipStatus } from "@/lib/auth/types";

/** Row shapes for the Brand Quest database tables. */

export type UserRow = {
  id: string;
  full_name: string;
  email: string;
  school: string | null;
  country: string | null;
  created_at: string;
};

export type MembershipRow = {
  id: string;
  user_id: string;
  membership_type: string;
  amount: number | string;
  currency: string;
  payment_method: string | null;
  payment_reference: string | null;
  payment_status: string;
  approved: boolean;
  approved_by: string | null;
  approved_at: string | null;
  created_at: string;
};

export type ProgressRow = {
  id: string;
  user_id: string;
  world_number: number;
  completed: boolean;
  score: number;
  xp: number;
  stars: number;
  completed_at: string | null;
};

/**
 * Maps a membership record to the app's membership tier. Only an approved
 * membership unlocks Worlds 3–15.
 */
export function deriveMembershipStatus(
  membership: Pick<MembershipRow, "approved" | "payment_status"> | null | undefined,
): MembershipStatus {
  if (!membership) return "FREE";
  if (membership.approved) return "ACTIVE";
  if (membership.payment_status === "Rejected") return "REJECTED";
  return "PENDING";
}
