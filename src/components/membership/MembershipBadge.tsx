"use client";

import { membershipBadge } from "@/lib/membership";
import type { MembershipStatus } from "@/lib/auth/types";

/** Small tier badge shown beside the profile avatar and on the profile page. */
export function MembershipBadge({
  status,
  className = "",
}: {
  status: MembershipStatus;
  className?: string;
}) {
  const badge = membershipBadge[status] ?? membershipBadge.FREE;

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 font-display text-xs font-bold ${badge.className} ${className}`}
    >
      {badge.label}
    </span>
  );
}
