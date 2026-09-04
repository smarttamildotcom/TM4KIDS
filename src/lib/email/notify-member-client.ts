"use client";

import type { MemberNotificationPayload } from "./member-notification";

/**
 * Fire-and-forget call to the member-notification API. Reusable for both the
 * registration flow and any future membership-purchase flow.
 *
 * Email delivery must never affect the user's journey, so any failure here is
 * logged and swallowed — the caller does not await a meaningful result.
 */
export async function notifyNewMember(
  payload: MemberNotificationPayload,
): Promise<void> {
  try {
    await fetch("/api/notify-member", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  } catch (error) {
    // Never surface email errors to the user.
    console.error("[notify-member] Request failed:", error);
  }
}
