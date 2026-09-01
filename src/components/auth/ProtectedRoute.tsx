"use client";

import type { ReactNode } from "react";
import { Search } from "lucide-react";
import { useRequireAuth } from "@/lib/auth/useRequireAuth";

/**
 * Gate for pages that require a signed-in detective. Shows a friendly loading
 * state while the session is checked, then redirects guests to /login.
 */
export function ProtectedRoute({ children }: { children: ReactNode }) {
  const { isReady } = useRequireAuth();

  if (!isReady) {
    return (
      <div className="grid min-h-[50vh] place-items-center px-4 text-center">
        <div>
          <span
            aria-hidden="true"
            className="mx-auto grid h-16 w-16 animate-pulse place-items-center rounded-full bg-detective-blue-100 text-detective-blue-600"
          >
            <Search className="h-7 w-7" />
          </span>
          <p className="mt-4 font-display font-semibold text-detective-blue-700">
            Checking your BrandQuest badge…
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
