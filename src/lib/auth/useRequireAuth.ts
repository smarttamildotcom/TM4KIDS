"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "./AuthProvider";

/**
 * Redirects to /login (preserving the current path) if the visitor isn't
 * signed in. Returns whether the caller should render its protected content.
 */
export function useRequireAuth(): { isReady: boolean } {
  const { user, isLoaded } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (isLoaded && !user) {
      router.replace(`/login?redirect=${encodeURIComponent(pathname)}`);
    }
  }, [isLoaded, user, router, pathname]);

  return { isReady: isLoaded && !!user };
}
