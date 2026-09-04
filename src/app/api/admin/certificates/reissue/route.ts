import { NextResponse, type NextRequest } from "next/server";
import { getServiceClient } from "@/lib/supabase/server";
import { isAdminRequest } from "@/lib/admin/guard";

export const runtime = "nodejs";

/** Re-stamps a certificate's issue date. */
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
    return NextResponse.json({ ok: false, error: "Missing certificate id." }, { status: 400 });
  }

  const supabase = getServiceClient();
  const { error } = await supabase
    .from("certificates")
    .update({ issued_at: new Date().toISOString() })
    .eq("id", id);

  if (error) {
    return NextResponse.json(
      { ok: false, error: "Could not reissue the certificate." },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true });
}
