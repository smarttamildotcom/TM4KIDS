"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type MembershipRequestRow = {
  id: string;
  userId: string;
  name: string;
  email: string;
  school: string;
  paymentMethod: string;
  paymentReference: string;
  dateSubmitted: string;
  status: "Pending";
};

type ContextValue = {
  requests: MembershipRequestRow[];
  pendingCount: number;
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
  approve: (id: string) => Promise<boolean>;
  reject: (id: string) => Promise<boolean>;
};

const MembershipRequestsContext = createContext<ContextValue | null>(null);

/** Loads pending membership requests from Supabase for the admin dashboard. */
export function MembershipRequestsProvider({ children }: { children: ReactNode }) {
  const [requests, setRequests] = useState<MembershipRequestRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/admin/requests", { cache: "no-store" });
      const payload = (await response.json().catch(() => ({}))) as {
        ok?: boolean;
        requests?: MembershipRequestRow[];
        error?: string;
      };
      if (!response.ok || !payload.ok) {
        throw new Error(payload.error ?? "Could not load membership requests.");
      }
      setRequests(payload.requests ?? []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not load requests.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  const act = useCallback(
    async (id: string, action: "approve" | "reject") => {
      const response = await fetch("/api/admin/requests/approve", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, action }),
      });
      const payload = (await response.json().catch(() => ({}))) as { ok?: boolean };
      if (!response.ok || !payload.ok) return false;
      // Re-fetch so the list and the sidebar badge update without a reload.
      await refresh();
      return true;
    },
    [refresh],
  );

  const approve = useCallback((id: string) => act(id, "approve"), [act]);
  const reject = useCallback((id: string) => act(id, "reject"), [act]);

  const value = useMemo<ContextValue>(
    () => ({
      requests,
      pendingCount: requests.length,
      loading,
      error,
      refresh,
      approve,
      reject,
    }),
    [requests, loading, error, refresh, approve, reject],
  );

  return (
    <MembershipRequestsContext.Provider value={value}>
      {children}
    </MembershipRequestsContext.Provider>
  );
}

export function useMembershipRequests(): ContextValue | null {
  return useContext(MembershipRequestsContext);
}
