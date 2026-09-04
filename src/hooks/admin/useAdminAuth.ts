"use client";

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";

/** Handles the admin logout flow: clears the session cookie, then redirects. */
export function useAdminAuth() {
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const logout = useCallback(async () => {
    setIsLoggingOut(true);
    try {
      await fetch("/api/admin/logout", { method: "POST" });
    } catch {
      // Even if the request fails, send the admin back to the login screen.
    }
    router.replace("/admin/login");
    router.refresh();
  }, [router]);

  return { logout, isLoggingOut };
}
