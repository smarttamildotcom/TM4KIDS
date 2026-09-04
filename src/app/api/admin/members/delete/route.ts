import { NextResponse, type NextRequest } from "next/server";
import { getServiceClient } from "@/lib/supabase/server";
import { isAdminRequest } from "@/lib/admin/guard";

export const runtime = "nodejs";

/** Permanently deletes a member. Cascades to memberships, progress and certificates. */
export async function POST(request: NextRequest) {
  if (!(await isAdminRequest())) {
    return NextResponse.json({ ok: false, error: "Unauthorised." }, { status: 401 });
  }

  let body: { id?: string };
  try {
    body = (await request.json()) as { id?: string };
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  const id = body.id?.trim();
  if (!id) {
    return NextResponse.json({ ok: false, error: "Missing member id." }, { status: 400 });
  }

  const supabase = getServiceClient();
  const { error } = await supabase.auth.admin.deleteUser(id);

  if (error) {
    return NextResponse.json(
      { ok: false, error: "Could not delete the member." },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true });
}
