import { NextResponse, type NextRequest } from "next/server";
import { getServiceClient } from "@/lib/supabase/server";
import { isAdminRequest } from "@/lib/admin/guard";
import type { AdminMemberStatus } from "@/services/admin/types";

export const runtime = "nodejs";

type Body = {
  id?: string;
  name?: string;
  email?: string;
  country?: string;
  status?: AdminMemberStatus;
};

/** Maps an admin member status to the membership fields it implies. */
function membershipPatch(status: AdminMemberStatus): Record<string, unknown> {
  switch (status) {
    case "Active":
      return {
        approved: true,
        payment_status: "Paid",
        approved_at: new Date().toISOString(),
        approved_by: "admin",
      };
    case "Rejected":
      return { approved: false, payment_status: "Rejected" };
    default:
      return { approved: false, payment_status: "Pending", approved_at: null, approved_by: null };
  }
}

/** Updates a member's profile and membership status. */
export async function POST(request: NextRequest) {
  if (!(await isAdminRequest())) {
    return NextResponse.json({ ok: false, error: "Unauthorised." }, { status: 401 });
  }

  let body: Body;
  try {
    body = (await request.json()) as Body;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  const id = body.id?.trim();
  if (!id) {
    return NextResponse.json({ ok: false, error: "Missing member id." }, { status: 400 });
  }

  const supabase = getServiceClient();

  const profilePatch: Record<string, unknown> = {};
  if (body.name !== undefined) profilePatch.full_name = body.name.trim();
  if (body.country !== undefined) profilePatch.country = body.country.trim();
  if (body.email !== undefined) profilePatch.email = body.email.trim().toLowerCase();

  if (Object.keys(profilePatch).length > 0) {
    const { error } = await supabase.from("users").update(profilePatch).eq("id", id);
    if (error) {
      return NextResponse.json(
        { ok: false, error: "Could not update the member profile." },
        { status: 500 },
      );
    }
  }

  // Keep the Auth email in step with the profile email.
  if (body.email !== undefined) {
    await supabase.auth.admin.updateUserById(id, {
      email: body.email.trim().toLowerCase(),
    });
  }

  if (body.status) {
    const { data: membership } = await supabase
      .from("memberships")
      .select("id")
      .eq("user_id", id)
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    const patch = membershipPatch(body.status);
    const { error } = membership
      ? await supabase.from("memberships").update(patch).eq("id", membership.id)
      : await supabase.from("memberships").insert({ user_id: id, ...patch });

    if (error) {
      return NextResponse.json(
        { ok: false, error: "Could not update the membership status." },
        { status: 500 },
      );
    }
  }

  return NextResponse.json({ ok: true });
}
