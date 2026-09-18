"use client";

import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "./AuthProvider";
import { useNotify } from "@/lib/notifications/NotificationProvider";

/** Centralised log-out flow. AuthProvider immediately closes the active
 * user-scoped session before Supabase sign-out completes. Browser records are
 * retained for the same account; no broad storage clearing occurs. */
export function useLogout(): () => void {
  const { logout } = useAuth();
  const { notify } = useNotify();
  const router = useRouter();

  return useCallback(() => {
    void logout();
    notify("You have been logged out successfully.", "success");
    router.push("/");
  }, [logout, notify, router]);
}