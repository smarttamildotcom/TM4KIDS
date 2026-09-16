import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { getServiceClient } from "@/lib/supabase/server";

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
 * Creates an unconfirmed Supabase account and sends its confirmation email.
 * Profile and membership rows are inserted with the service role afterwards.
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

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey =
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ??
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anonKey) {
    return NextResponse.json(
      { ok: false, error: "Registration is not configured yet. Please try again later." },
      { status: 500 },
    );
  }

  let auth;
  try {
    auth = createClient(url, anonKey, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
  } catch {
    console.error("[auth/register] Supabase client configuration is invalid.");
    return NextResponse.json(
      { ok: false, error: "Registration is not configured correctly yet. Please try again later." },
      { status: 500 },
    );
  }
  const metadata = {
    full_name: fullName,
    parent_name: body.parentName ?? null,
    age: body.age ?? null,
    school: body.school ?? null,
    country: body.country ?? null,
  };

  // signUp is the Supabase flow that sends the confirmation email when
  // Confirm Email is enabled in the project's Email provider settings.
  const { data: created, error: createError } = await auth.auth.signUp({
    email,
    password,
    options: {
      data: metadata,
      emailRedirectTo: new URL("/login", request.nextUrl.origin).toString(),
    },
  });

  if (createError || !created.user) {
    console.error("[auth/register] Supabase signup failed", {
      message: createError?.message ?? "No user returned",
      status: createError?.status ?? null,
    });
    return NextResponse.json(
      { ok: false, error: createError?.message ?? "Could not create the account." },
      { status: 400 },
    );
  }

  const userId = created.user.id;
  const supabase = getServiceClient();

  const { error: profileError } = await supabase.from("users").insert({
    id: userId,
    full_name: fullName,
    email,
    school: body.school ?? null,
    country: body.country ?? null,
  });

  if (profileError) {
    // Roll back an account created during this request so the email can be reused.
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
    await supabase.auth.admin.deleteUser(userId);
    return NextResponse.json(
      { ok: false, error: "Could not set up your membership. Please try again." },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true, verificationRequired: true });
}
