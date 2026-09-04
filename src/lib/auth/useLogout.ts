"use client";

import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "./AuthProvider";
import { useGame } from "@/lib/gamification/GameProvider";
import { useNotify } from "@/lib/notifications/NotificationProvider";

/**
 * Centralised log-out flow so every entry point behaves the same:
 *  1. Clear the auth session (localStorage, sessionStorage and the bq_session cookie).
 *  2. Reset the current session's progress. There is no database yet, so the
 *     locally stored progress is cleared. Swap this for a "keep DB progress"
 *     branch once real accounts persist server-side.
 *  3. Show a confirmation toast that survives navigation.
 *  4. Redirect to the Home page.
 */
export function useLogout(): () => void {
  const { logout } = useAuth();
  const { resetProgress } = useGame();
  const { notify } = useNotify();
  const router = useRouter();

  return useCallback(() => {
    logout();
    resetProgress();
    notify("You have been logged out successfully.", "success");
    router.push("/");
  }, [logout, resetProgress, notify, router]);
}
