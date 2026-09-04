"use client";

import { readAllAccounts, readSession } from "@/lib/auth/mock-auth";
import type { MembershipStatus } from "@/lib/auth/types";
import { TOTAL_WORLDS } from "@/lib/access";
import type {
  AdminData,
  AdminMember,
  AdminMemberStatus,
  AdminSettings,
  Certificate,
  MembershipRequest,
  Payment,
  PaymentMethod,
} from "./types";

/**
 * Client-side persistence for the admin dashboard. Members are always derived
 * from the real account store (`tda:accounts`); the remaining records live in
 * `tda:admin:data`. There is no seed or demo data — everything reflects real
 * user activity. Swap these functions for API calls when a backend exists.
 */

const ADMIN_DATA_KEY = "tda:admin:data";
const PLAYER_KEY = "tda:player";

/** The parts of the dashboard that are persisted (members are derived). */
type PersistedAdminData = Omit<AdminData, "members">;

function defaultSettings(): AdminSettings {
  return {
    membershipPrice: 10,
    notificationEmail:
      process.env.NEXT_PUBLIC_MEMBERSHIP_EMAIL || "advocatebala.2010@gmail.com",
    bankName: "To be updated",
    accountName: "To be updated",
    accountNumber: "To be updated",
    csrDescription:
      "Every Brand Quest membership helps fund children's charities in Singapore.",
    founderMessage:
      "Brand Quest was created to help young learners understand brands, logos and trademarks in a fun, safe way.",
  };
}

function createEmptyData(): PersistedAdminData {
  return {
    requests: [],
    payments: [],
    certificates: [],
    donations: [],
    settings: defaultSettings(),
  };
}

function membershipToStatus(status: MembershipStatus): AdminMemberStatus {
  switch (status) {
    case "ACTIVE":
      return "Active";
    case "PENDING":
      return "Pending";
    case "REJECTED":
      return "Rejected";
    default:
      return "Free";
  }
}

/** Number of worlds the current browser's player has completed. */
function readPlayerCompleted(): number {
  try {
    const raw = window.localStorage.getItem(PLAYER_KEY);
    if (!raw) return 0;
    const parsed = JSON.parse(raw) as { completedWorldIds?: number[] };
    return parsed.completedWorldIds?.length ?? 0;
  } catch {
    return 0;
  }
}

function readPersisted(): PersistedAdminData {
  if (typeof window === "undefined") return createEmptyData();
  try {
    const raw = window.localStorage.getItem(ADMIN_DATA_KEY);
    if (!raw) return createEmptyData();
    const parsed = JSON.parse(raw) as Partial<PersistedAdminData>;
    return {
      requests: parsed.requests ?? [],
      payments: parsed.payments ?? [],
      certificates: parsed.certificates ?? [],
      donations: parsed.donations ?? [],
      settings: { ...defaultSettings(), ...parsed.settings },
    };
  } catch {
    return createEmptyData();
  }
}

function savePersisted(data: PersistedAdminData): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(ADMIN_DATA_KEY, JSON.stringify(data));
  } catch {
    // Storage may be unavailable in private mode; the dashboard still works.
  }
}

/** Builds the member list from the real account store and current progress. */
function deriveMembers(certificates: Certificate[]): AdminMember[] {
  if (typeof window === "undefined") return [];

  const session = readSession();
  const currentCompleted = readPlayerCompleted();

  return readAllAccounts().map((account) => {
    const isCurrent = Boolean(
      session && session.email.toLowerCase() === account.email.toLowerCase(),
    );
    const worldsCompleted = isCurrent ? currentCompleted : 0;
    const certificate = certificates.find(
      (item) => item.email?.toLowerCase() === account.email.toLowerCase(),
    );

    return {
      id: account.id,
      name: account.studentName,
      email: account.email,
      country: account.country || "—",
      dateJoined: account.createdAt ?? "",
      status: membershipToStatus(account.membershipStatus),
      worldsCompleted,
      totalWorlds: TOTAL_WORLDS,
      certificateIssued: Boolean(certificate),
      certificateNumber: certificate?.certificateNumber,
      lastLogin: account.lastLogin,
    };
  });
}

/** Generates the next sequential certificate number, e.g. BQ-2026-0007. */
export function nextCertificateNumber(certificates: Certificate[]): string {
  const year = new Date().getFullYear();
  const count = certificates.length + 1;
  return `BQ-${year}-${String(count).padStart(4, "0")}`;
}

/**
 * Loads the full dashboard data set. Members come from real accounts; a
 * certificate is auto-issued for anyone who has completed all worlds.
 */
export function loadAdminData(): AdminData {
  const persisted = readPersisted();

  // Auto-issue a certificate for the current player once every world is done.
  if (typeof window !== "undefined") {
    const session = readSession();
    const completed = readPlayerCompleted();
    if (
      session &&
      completed >= TOTAL_WORLDS &&
      !persisted.certificates.some(
        (item) => item.email?.toLowerCase() === session.email.toLowerCase(),
      )
    ) {
      persisted.certificates = [
        {
          id: `cert-${Date.now()}`,
          name: session.studentName,
          email: session.email,
          certificateNumber: nextCertificateNumber(persisted.certificates),
          completionDate: new Date().toISOString(),
        },
        ...persisted.certificates,
      ];
      savePersisted(persisted);
    }
  }

  return { ...persisted, members: deriveMembers(persisted.certificates) };
}

/** Persists the editable (non-member) parts of the dashboard. */
export function saveAdminData(data: AdminData): void {
  const { members: _members, ...persisted } = data;
  void _members;
  savePersisted(persisted);
}

export type ContributionSubmission = {
  name: string;
  email: string;
  country: string;
  paymentMethod: PaymentMethod;
  transactionReference: string;
  contributionAmount: number;
};

/**
 * Records a contribution from the public membership flow as a pending request
 * and a pending payment, so it appears in the admin dashboard for approval.
 */
export function submitMembershipRequest(input: ContributionSubmission): void {
  const persisted = readPersisted();
  const key = input.email.trim().toLowerCase();
  const now = new Date().toISOString();

  // Replace any earlier unresolved request from the same email (resubmission).
  const requests: MembershipRequest[] = persisted.requests.filter(
    (request) =>
      request.email.toLowerCase() !== key ||
      request.status === "Approved" ||
      request.status === "Rejected",
  );
  requests.unshift({
    id: `req-${Date.now()}`,
    name: input.name,
    email: input.email,
    country: input.country,
    paymentMethod: input.paymentMethod,
    transactionReference: input.transactionReference,
    contributionAmount: input.contributionAmount,
    dateSubmitted: now,
    status: "Pending",
  });

  const payments: Payment[] = [
    {
      id: `TXN-${Date.now()}`,
      name: input.name,
      method: input.paymentMethod,
      amount: input.contributionAmount,
      status: "Pending",
      date: now,
      reference: input.transactionReference,
    },
    ...persisted.payments,
  ];

  savePersisted({ ...persisted, requests, payments });
}
