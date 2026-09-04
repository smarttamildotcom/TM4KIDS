import { NextResponse } from "next/server";
import { getServiceClient } from "@/lib/supabase/server";
import { isAdminRequest } from "@/lib/admin/guard";
import type { MembershipRow, UserRow } from "@/lib/supabase/types";

export const runtime = "nodejs";

type JoinedRow = Pick<
  MembershipRow,
  | "id"
  | "user_id"
  | "payment_method"
  | "payment_reference"
  | "payment_status"
  | "created_at"
> & {
  users: Pick<UserRow, "full_name" | "email" | "school"> | null;
};

/** Returns pending membership requests (not yet approved) for the admin dashboard. */
export async function GET() {
  if (!(await isAdminRequest())) {
    return NextResponse.json({ ok: false, error: "Unauthorised." }, { status: 401 });
  }

  const supabase = getServiceClient();

  const { data, error } = await supabase
    .from("memberships")
    .select(
      "id, user_id, payment_method, payment_reference, payment_status, created_at, users(full_name, email, school)",
    )
    .eq("approved", false)
    .neq("payment_status", "Rejected")
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json(
      { ok: false, error: "Could not load membership requests." },
      { status: 500 },
    );
  }

  const requests = ((data ?? []) as unknown as JoinedRow[]).map((row) => ({
    id: row.id,
    userId: row.user_id,
    name: row.users?.full_name ?? "—",
    email: row.users?.email ?? "—",
    school: row.users?.school ?? "—",
    paymentMethod: row.payment_method ?? "—",
    paymentReference: row.payment_reference ?? "—",
    dateSubmitted: row.created_at,
    status: "Pending" as const,
  }));

  return NextResponse.json({ ok: true, requests });
}
