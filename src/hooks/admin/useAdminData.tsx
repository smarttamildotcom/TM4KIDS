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
import {
  deleteAccountById,
  setMembershipForEmail,
  updateAccountById,
} from "@/lib/auth/mock-auth";
import type { MembershipStatus } from "@/lib/auth/types";
import { loadAdminData, saveAdminData } from "@/services/admin/store";
import type {
  AdminData,
  AdminMember,
  AdminMemberStatus,
  AdminSettings,
  CsrDonation,
} from "@/services/admin/types";

type AdminDataContextValue = {
  data: AdminData;
  approveRequest: (requestId: string) => void;
  rejectRequest: (requestId: string) => void;
  requestMoreInfo: (requestId: string) => void;
  deleteMember: (memberId: string) => void;
  updateMember: (member: AdminMember) => void;
  reissueCertificate: (certificateId: string) => void;
  addDonation: (donation: Omit<CsrDonation, "id">) => void;
  updateSettings: (settings: Partial<AdminSettings>) => void;
};

const AdminDataContext = createContext<AdminDataContextValue | null>(null);

const STATUS_TO_MEMBERSHIP: Record<AdminMemberStatus, MembershipStatus> = {
  Active: "ACTIVE",
  Pending: "PENDING",
  Rejected: "REJECTED",
  Free: "FREE",
};

/** Fire-and-forget approval emails; delivery must never block the UI. */
function sendApprovalEmail(name: string, email: string): void {
  void fetch("/api/admin/notify-approval", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email }),
  }).catch(() => {
    // Email issues are logged server-side; never surface them here.
  });
}

export function AdminDataProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<AdminData | null>(null);

  const reload = useCallback(() => {
    setData(loadAdminData());
  }, []);

  useEffect(() => {
    reload();
  }, [reload]);

  const approveRequest = useCallback(
    (requestId: string) => {
      setData((current) => {
        if (!current) return current;
        const request = current.requests.find((item) => item.id === requestId);
        if (!request) return current;

        // Activate the real account so premium worlds unlock immediately.
        setMembershipForEmail(request.email, "ACTIVE");
        sendApprovalEmail(request.name, request.email);

        const next: AdminData = {
          ...current,
          requests: current.requests.map((item) =>
            item.id === requestId ? { ...item, status: "Approved" } : item,
          ),
          payments: current.payments.map((payment) =>
            payment.reference === request.transactionReference
              ? { ...payment, status: "Paid" }
              : payment,
          ),
        };
        saveAdminData(next);
        // Re-derive members from the now-updated account store.
        return loadAdminData();
      });
    },
    [],
  );

  const rejectRequest = useCallback(
    (requestId: string) => {
      setData((current) => {
        if (!current) return current;
        const request = current.requests.find((item) => item.id === requestId);
        if (!request) return current;

        setMembershipForEmail(request.email, "REJECTED");

        const next: AdminData = {
          ...current,
          requests: current.requests.map((item) =>
            item.id === requestId ? { ...item, status: "Rejected" } : item,
          ),
          payments: current.payments.map((payment) =>
            payment.reference === request.transactionReference
              ? { ...payment, status: "Rejected" }
              : payment,
          ),
        };
        saveAdminData(next);
        return loadAdminData();
      });
    },
    [],
  );

  const requestMoreInfo = useCallback((requestId: string) => {
    setData((current) => {
      if (!current) return current;
      const next: AdminData = {
        ...current,
        requests: current.requests.map((item) =>
          item.id === requestId ? { ...item, status: "More Info" } : item,
        ),
      };
      saveAdminData(next);
      return next;
    });
  }, []);

  const deleteMember = useCallback(
    (memberId: string) => {
      deleteAccountById(memberId);
      reload();
    },
    [reload],
  );

  const updateMember = useCallback(
    (member: AdminMember) => {
      updateAccountById(member.id, {
        studentName: member.name,
        email: member.email,
        country: member.country,
        membershipStatus: STATUS_TO_MEMBERSHIP[member.status],
      });
      reload();
    },
    [reload],
  );

  const reissueCertificate = useCallback((certificateId: string) => {
    setData((current) => {
      if (!current) return current;
      const next: AdminData = {
        ...current,
        certificates: current.certificates.map((certificate) =>
          certificate.id === certificateId
            ? { ...certificate, completionDate: new Date().toISOString() }
            : certificate,
        ),
      };
      saveAdminData(next);
      return next;
    });
  }, []);

  const addDonation = useCallback((donation: Omit<CsrDonation, "id">) => {
    setData((current) => {
      if (!current) return current;
      const next: AdminData = {
        ...current,
        donations: [{ ...donation, id: `don-${Date.now()}` }, ...current.donations],
      };
      saveAdminData(next);
      return next;
    });
  }, []);

  const updateSettings = useCallback((settings: Partial<AdminSettings>) => {
    setData((current) => {
      if (!current) return current;
      const next: AdminData = {
        ...current,
        settings: { ...current.settings, ...settings },
      };
      saveAdminData(next);
      return next;
    });
  }, []);

  const value = useMemo<AdminDataContextValue | null>(() => {
    if (!data) return null;
    return {
      data,
      approveRequest,
      rejectRequest,
      requestMoreInfo,
      deleteMember,
      updateMember,
      reissueCertificate,
      addDonation,
      updateSettings,
    };
  }, [
    data,
    approveRequest,
    rejectRequest,
    requestMoreInfo,
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
