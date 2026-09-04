import { NextResponse } from "next/server";
import { getServiceClient } from "@/lib/supabase/server";
import { isAdminRequest } from "@/lib/admin/guard";
import { TOTAL_WORLDS } from "@/lib/access";
import type {
  MembershipRow,
  ProgressRow,
  UserRow,
} from "@/lib/supabase/types";
import type {
  AdminMember,
  AdminMemberStatus,
  Certificate,
  MembershipRequest,
  Payment,
  PaymentMethod,
} from "@/services/admin/types";

export const runtime = "nodejs";

type CertificateRow = {
  id: string;
  user_id: string;
  certificate_number: string | null;
  issued_at: string | null;
};

function memberStatus(m: MembershipRow | undefined): AdminMemberStatus {
  if (!m) return "Free";
  if (m.approved) return "Active";
  if (m.payment_status === "Rejected") return "Rejected";
  if (m.payment_reference) return "Pending";
  return "Free";
}

/** Aggregated admin dashboard data (members, payments, certificates, requests). */
export async function GET() {
  if (!(await isAdminRequest())) {
    return NextResponse.json({ ok: false, error: "Unauthorised." }, { status: 401 });
  }

  const supabase = getServiceClient();

  const [usersRes, membershipsRes, progressRes, certificatesRes] = await Promise.all([
    supabase.from("users").select("id, full_name, email, school, country, created_at"),
    supabase.from("memberships").select("*").order("created_at", { ascending: false }),
    supabase.from("progress").select("user_id, completed"),
    supabase.from("certificates").select("id, user_id, certificate_number, issued_at"),
  ]);

  const error =
    usersRes.error || membershipsRes.error || progressRes.error || certificatesRes.error;
  if (error) {
    return NextResponse.json(
      { ok: false, error: "Could not load dashboard data." },
      { status: 500 },
    );
  }

  const users = (usersRes.data ?? []) as UserRow[];
  const memberships = (membershipsRes.data ?? []) as MembershipRow[];
  const progress = (progressRes.data ?? []) as Pick<
    ProgressRow,
    "user_id" | "completed"
  >[];
  const certificateRows = (certificatesRes.data ?? []) as CertificateRow[];

  // Latest membership per user (memberships are ordered newest-first).
  const latestMembership = new Map<string, MembershipRow>();
  for (const m of memberships) {
    if (!latestMembership.has(m.user_id)) latestMembership.set(m.user_id, m);
  }

  const completedByUser = new Map<string, number>();
  for (const p of progress) {
    if (p.completed) {
      completedByUser.set(p.user_id, (completedByUser.get(p.user_id) ?? 0) + 1);
    }
  }

  const certByUser = new Map<string, CertificateRow>();
  for (const c of certificateRows) {
    if (!certByUser.has(c.user_id)) certByUser.set(c.user_id, c);
  }

  const userById = new Map(users.map((u) => [u.id, u]));

  const members: AdminMember[] = users.map((u) => {
    const membership = latestMembership.get(u.id);
    const certificate = certByUser.get(u.id);
    return {
      id: u.id,
      name: u.full_name,
      email: u.email,
      country: u.country || "—",
      dateJoined: u.created_at,
      status: memberStatus(membership),
      worldsCompleted: completedByUser.get(u.id) ?? 0,
      totalWorlds: TOTAL_WORLDS,
      certificateIssued: Boolean(certificate),
      certificateNumber: certificate?.certificate_number ?? undefined,
    };
  });

  const payments: Payment[] = memberships
    .filter((m) => m.payment_reference)
    .map((m) => ({
      id: m.payment_reference || m.id,
      name: userById.get(m.user_id)?.full_name ?? "—",
      method: (m.payment_method as PaymentMethod) ?? "Bank Transfer",
      amount: Number(m.amount) || 0,
      status: m.approved ? "Paid" : m.payment_status === "Rejected" ? "Rejected" : "Pending",
      date: m.created_at,
      reference: m.payment_reference ?? "",
    }));

  const certificates: Certificate[] = certificateRows.map((c) => ({
    id: c.id,
    name: userById.get(c.user_id)?.full_name ?? "—",
    email: userById.get(c.user_id)?.email,
    certificateNumber: c.certificate_number ?? "—",
    completionDate: c.issued_at ?? "",
  }));

  const requests: MembershipRequest[] = memberships
    .filter((m) => !m.approved && m.payment_status !== "Rejected")
    .map((m) => ({
      id: m.id,
      memberId: m.user_id,
      name: userById.get(m.user_id)?.full_name ?? "—",
      email: userById.get(m.user_id)?.email ?? "—",
      country: userById.get(m.user_id)?.country ?? "—",
      paymentMethod: (m.payment_method as PaymentMethod) ?? "Bank Transfer",
      transactionReference: m.payment_reference ?? "—",
      contributionAmount: Number(m.amount) || 0,
      dateSubmitted: m.created_at,
      status: "Pending",
    }));

  return NextResponse.json({
    ok: true,
    members,
    payments,
    certificates,
    requests,
  });
}
