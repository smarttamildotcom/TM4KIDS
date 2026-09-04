"use client";

import { useEffect, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { useAuth } from "@/lib/auth/AuthProvider";
import {
  canAccessWorld,
  flagGateOnReturn,
  rememberPendingWorld,
} from "@/lib/access";

function Checking({ label }: { label: string }) {
  return (
    <div className="grid min-h-[50vh] place-items-center px-4 text-center">
      <div>
        <span
          aria-hidden="true"
          className="mx-auto grid h-16 w-16 animate-pulse place-items-center rounded-full bg-detective-blue-100 text-detective-blue-600"
        >
          <Search className="h-7 w-7" />
        </span>
        <p className="mt-4 font-display font-semibold text-detective-blue-700">{label}</p>
      </div>
    </div>
  );
}

/**
 * Route-level half of the login gate. Typing a locked world's URL directly
 * never renders the lesson — the visitor is sent back to the Journey page and
 * the sign-up modal opens there.
 */
export function WorldRouteGuard({
  worldId,
  children,
}: {
  worldId: number;
  children: ReactNode;
}) {
  const { user, isLoaded } = useAuth();
  const router = useRouter();
  const membershipStatus = user?.membershipStatus ?? "FREE";
  const allowed = canAccessWorld(worldId, Boolean(user), membershipStatus);

  useEffect(() => {
    if (!isLoaded || allowed) return;

    // Signed-in detectives without an active membership go to contribute;
    // guests are returned to the Journey so they can sign up first.
    if (user) {
      router.replace("/membership");
      return;
    }

    rememberPendingWorld(worldId);
    flagGateOnReturn();
    router.replace("/#journey");
  }, [isLoaded, allowed, worldId, user, router]);

  if (!isLoaded) return <Checking label="Checking your BrandQuest badge…" />;
  if (!allowed) return <Checking label="This world is locked — taking you back…" />;

  return <>{children}</>;
}
