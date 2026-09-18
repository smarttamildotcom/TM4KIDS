import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { getServiceClient } from "@/lib/supabase/server";
import { sendEmail } from "@/lib/email/mailer";
import { buildMemberEmail } from "@/lib/email/member-notification";

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

  // Confirmation links must always return to the public site, rather than an
  // incidental Vercel deployment URL. The environment value permits a later
  // domain change; the production fallback keeps the configured IP2Kids domain
  // correct even before that optional value is added.
  const publicSiteUrl =
    process.env.NEXT_PUBLIC_SITE_URL?.trim() || "https://www.ip2kids.com";
  let emailRedirectTo: string;
  try {
    emailRedirectTo = new URL("/login", publicSiteUrl).toString();
  } catch {
    emailRedirectTo = new URL("/login", request.nextUrl.origin).toString();
  }

  // A prior attempt can already have created a profile/auth record. Check
  // before sign-up so a second attempt never reaches the unique email error.
  let existingProfile: { id: string } | null = null;
  let supabase: ReturnType<typeof getServiceClient>;
  try {
    supabase = getServiceClient();
    const { data, error } = await supabase
      .from("users")
      .select("id")
      .eq("email", email)
      .maybeSingle();
    if (error) throw error;
    existingProfile = data;
  } catch (error) {
    console.error("[auth/register] Could not check the existing profile.", error);
    return NextResponse.json(
      { ok: false, error: "Registration is temporarily unavailable. Please try again later." },
      { status: 500 },
    );
  }

  if (existingProfile) {
    const { data: existingAuth } = await supabase.auth.admin.getUserById(existingProfile.id);
    const existingUser = existingAuth.user;

    if (existingUser && !existingUser.email_confirmed_at) {
      const { error: resendError } = await auth.auth.resend({
        type: "signup",
        email,
        options: { emailRedirectTo },
      });
      if (!resendError) {
        return NextResponse.json({ ok: true, verificationRequired: true });
      }
      console.error("[auth/register] Could not resend verification email.", resendError);
    }

    return NextResponse.json(
      { ok: false, error: "An account with that email already exists. Please sign in, reset your password, or check your inbox for the verification email." },
      { status: 409 },
    );
  }

  // signUp is the Supabase flow that sends the confirmation email when
  // Confirm Email is enabled in the project's Email provider settings.
  const { data: created, error: createError } = await auth.auth.signUp({
    email,
    password,
    options: {
      data: metadata,
      emailRedirectTo,
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

  // Upsert safely completes a profile left behind by an interrupted prior
  // registration attempt, rather than treating it as a fatal duplicate.
  const { error: profileError } = await supabase.from("users").upsert(
    {
      id: userId,
      full_name: fullName,
      email,
      school: body.school ?? null,
      country: body.country ?? null,
    },
    { onConflict: "id" },
  );

  if (profileError) {
    console.error("[auth/register] Profile write failed", {
      code: profileError.code,
      message: profileError.message,
      details: profileError.details,
      hint: profileError.hint,
    });
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

  // Send the site-owner notice from the server after all new-member details are
  // safely stored. This survives page navigation and never blocks registration.
  const adminEmail =
    process.env.ADMIN_NOTIFICATION_EMAIL || process.env.NEXT_PUBLIC_MEMBERSHIP_EMAIL;
  if (!adminEmail) {
    console.warn("[auth/register] No admin notification email is configured.");
  } else {
    const notice = buildMemberEmail({
      name: fullName,
      email,
      country: body.country,
      parentName: body.parentName ?? undefined,
      age: body.age,
      school: body.school ?? undefined,
      registrationDate: new Date().toISOString(),
      membershipType: "Brand Quest Explorer",
      paymentStatus: "Pending admin approval",
    });
    const delivery = await sendEmail({
      to: adminEmail,
      subject: notice.subject,
      text: notice.text,
      html: notice.html,
    });
    if (!delivery.ok) {
      console.error("[auth/register] New-member notification was not delivered.", delivery);
    }
  }

  return NextResponse.json({ ok: true, verificationRequired: true });
}