import type { MembershipStatus } from "@/lib/auth/types";

/** One-time membership contribution amount, shown across the membership flow. */
export const MEMBERSHIP_PRICE = "SGD 10";

/** Everything a member unlocks — reused on the membership card. */
export const membershipBenefits = [
  "Access to all 15 worlds",
  "Unlimited learning",
  "Progress automatically saved",
  "Earn XP and Detective Badges",
  "Download your Detective Certificate",
  "Help support children's charities in Singapore",
] as const;

export type MembershipBadgeInfo = { label: string; className: string };

/** Badge shown beside the profile avatar, one per membership tier. */
export const membershipBadge: Record<MembershipStatus, MembershipBadgeInfo> = {
  ACTIVE: {
    label: "⭐ Member",
    className: "bg-detective-yellow-400 text-detective-blue-900",
  },
  PENDING: {
    label: "Pending Verification",
    className: "bg-detective-orange-100 text-detective-orange-700",
  },
  REJECTED: {
    label: "Verification Failed",
    className: "bg-red-100 text-red-700",
  },
  FREE: {
    label: "Free Explorer",
    className: "bg-detective-blue-100 text-detective-blue-700",
  },
};
