import { NextResponse, type NextRequest } from "next/server";
import { getServiceClient } from "@/lib/supabase/server";

// Node.js runtime so the service-role key stays server-side.
export const runtime = "nodejs";

type RegisterBody = {
  email?: string;
  password?: string;
  fullName?: string;
  parentName?: string | null;
  age?: number;
  school?: string | null;
  country?: string;
};

/**
 * Creates a Supabase Auth user, inserts the profile row and a Pending
 * membership record. Runs with the service role so it works regardless of the
 * project's email-confirmation setting.
 */
export async function POST(request: NextRequest) {
  let body: RegisterBody;
  try {
    body = (await request.json()) as RegisterBody;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  const email = body.email?.trim().toLowerCase() ?? "";
  const password = body.password ?? "";
  const fullName = body.fullName?.trim() ?? "";

  if (!email || !password || !fullName) {
    return NextResponse.json(
      { ok: false, error: "Name, email and password are required." },
      { status: 400 },
    );
  }
  if (password.length < 8) {
    return NextResponse.json(
      { ok: false, error: "Passwords need at least 8 characters." },
      { status: 400 },
    );
  }

  const supabase = getServiceClient();

  const { data: created, error: createError } = await supabase.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
    user_metadata: {
      full_name: fullName,
      parent_name: body.parentName ?? null,
      age: body.age ?? null,
      school: body.school ?? null,
      country: body.country ?? null,
    },
  });

  if (createError || !created.user) {
    return NextResponse.json(
      { ok: false, error: createError?.message ?? "Could not create the account." },
      { status: 400 },
    );
  }

  const userId = created.user.id;

  const { error: profileError } = await supabase.from("users").insert({
    id: userId,
    full_name: fullName,
    email,
    school: body.school ?? null,
    country: body.country ?? null,
  });

  if (profileError) {
    // Roll back the auth user so the email can be reused after a failure.
    await supabase.auth.admin.deleteUser(userId);
    return NextResponse.json(
      { ok: false, error: "Could not save your profile. Please try again." },
      { status: 500 },
    );
  }

  const { error: membershipError } = await supabase.from("memberships").insert({
    user_id: userId,
    membership_type: "Brand Quest Explorer",
    amount: 10.0,
    currency: "SGD",
    payment_status: "Pending",
    approved: false,
  });

  if (membershipError) {
    return NextResponse.json(
      { ok: false, error: "Could not set up your membership. Please try again." },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true });
}
