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
import { loadLocalExtras, saveLocalExtras } from "@/services/admin/store";
import type {
  AdminData,
  AdminMember,
  AdminSettings,
  Certificate,
  CsrDonation,
  MembershipRequest,
  Payment,
} from "@/services/admin/types";

type AdminDataContextValue = {
  data: AdminData;
  deleteMember: (memberId: string) => void;
  updateMember: (member: AdminMember) => void;
  reissueCertificate: (certificateId: string) => void;
  addDonation: (donation: Omit<CsrDonation, "id">) => void;
  updateSettings: (settings: Partial<AdminSettings>) => void;
};

const AdminDataContext = createContext<AdminDataContextValue | null>(null);

type Overview = {
  members: AdminMember[];
  payments: Payment[];
  certificates: Certificate[];
  requests: MembershipRequest[];
};

const EMPTY_OVERVIEW: Overview = {
  members: [],
  payments: [],
  certificates: [],
  requests: [],
};

export function AdminDataProvider({ children }: { children: ReactNode }) {
  const [overview, setOverview] = useState<Overview | null>(null);
  const [extras, setExtras] = useState<{
    donations: CsrDonation[];
    settings: AdminSettings;
  } | null>(null);

  const refresh = useCallback(async () => {
    setExtras(loadLocalExtras());
    try {
      const response = await fetch("/api/admin/overview", { cache: "no-store" });
      const payload = (await response.json().catch(() => ({}))) as Partial<Overview> & {
        ok?: boolean;
      };
      if (response.ok && payload.ok) {
        setOverview({
          members: payload.members ?? [],
          payments: payload.payments ?? [],
          certificates: payload.certificates ?? [],
          requests: payload.requests ?? [],
        });
      } else {
        setOverview(EMPTY_OVERVIEW);
      }
    } catch {
      setOverview(EMPTY_OVERVIEW);
    }
  }, []);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  const persistExtras = useCallback(
    (next: { donations: CsrDonation[]; settings: AdminSettings }) => {
      setExtras(next);
      saveLocalExtras(next);
    },
    [],
  );

  const deleteMember = useCallback(
    (memberId: string) => {
      void fetch("/api/admin/members/delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: memberId }),
      }).then(() => refresh());
    },
    [refresh],
  );

  const updateMember = useCallback(
    (member: AdminMember) => {
      void fetch("/api/admin/members/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: member.id,
          name: member.name,
          email: member.email,
          country: member.country,
          status: member.status,
        }),
      }).then(() => refresh());
    },
    [refresh],
  );

  const reissueCertificate = useCallback(
    (certificateId: string) => {
      void fetch("/api/admin/certificates/reissue", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: certificateId }),
      }).then(() => refresh());
    },
    [refresh],
  );

  const addDonation = useCallback(
    (donation: Omit<CsrDonation, "id">) => {
      setExtras((current) => {
        if (!current) return current;
        const next = {
          ...current,
          donations: [
            { ...donation, id: `don-${Date.now()}` },
            ...current.donations,
          ],
        };
        saveLocalExtras(next);
        return next;
      });
    },
    [],
  );

  const updateSettings = useCallback(
    (settings: Partial<AdminSettings>) => {
      setExtras((current) => {
        if (!current) return current;
        const next = { ...current, settings: { ...current.settings, ...settings } };
        saveLocalExtras(next);
        return next;
      });
    },
    [],
  );

  const value = useMemo<AdminDataContextValue | null>(() => {
    if (!overview || !extras) return null;
    const data: AdminData = {
      members: overview.members,
      requests: overview.requests,
      payments: overview.payments,
      certificates: overview.certificates,
      donations: extras.donations,
      settings: extras.settings,
    };
    return {
      data,
      deleteMember,
      updateMember,
      reissueCertificate,
      addDonation,
      updateSettings,
    };
  }, [
    overview,
    extras,
    deleteMember,
    updateMember,
    reissueCertificate,
    addDonation,
    updateSettings,
  ]);

  return (
    <AdminDataContext.Provider value={value}>{children}</AdminDataContext.Provider>
  );
}

/** Access the admin data store. Returns null until the client has hydrated. */
export function useAdminData(): AdminDataContextValue | null {
  return useContext(AdminDataContext);
}
