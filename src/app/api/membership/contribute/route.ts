import { NextResponse, type NextRequest } from "next/server";
import { getServiceClient } from "@/lib/supabase/server";

export const runtime = "nodejs";

type ContributeBody = {
  paymentMethod?: string;
  paymentReference?: string;
  amount?: number;
  membershipType?: string;
};

/**
 * Records a member's contribution payment details on their latest membership.
 * The caller is identified by their Supabase access token; only payment fields
 * are written, never the approval fields (those are admin-only).
 */
export async function POST(request: NextRequest) {
  const authHeader = request.headers.get("authorization") ?? "";
  const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : "";
  if (!token) {
    return NextResponse.json({ ok: false, error: "Not signed in." }, { status: 401 });
  }

  const supabase = getServiceClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser(token);

  if (authError || !user) {
    return NextResponse.json({ ok: false, error: "Not signed in." }, { status: 401 });
  }

  let body: ContributeBody;
  try {
    body = (await request.json()) as ContributeBody;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  const patch = {
    payment_method: body.paymentMethod?.trim() || null,
    payment_reference: body.paymentReference?.trim() || null,
    amount: typeof body.amount === "number" ? body.amount : 10.0,
    membership_type: body.membershipType?.trim() || "Brand Quest Explorer",
    payment_status: "Pending",
  };

  // Update the latest membership for this user, or create one if none exists.
  const { data: existing } = await supabase
    .from("memberships")
    .select("id")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  const { error } = existing
    ? await supabase.from("memberships").update(patch).eq("id", existing.id)
    : await supabase.from("memberships").insert({ user_id: user.id, ...patch });

  if (error) {
    return NextResponse.json(
      { ok: false, error: "Could not save your contribution. Please try again." },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true });
}
