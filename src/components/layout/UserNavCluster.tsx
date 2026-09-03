"use client";

import { PlayerHud } from "@/components/gamification/PlayerHud";
import { useAuth } from "@/lib/auth/AuthProvider";

/** Detective profile cluster shown in the header once signed in. */
export function UserNavCluster() {
  const { user } = useAuth();

  if (!user) return null;

  return <PlayerHud />;
}
