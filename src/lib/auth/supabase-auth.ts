"use client";

import { supabase } from "@/lib/supabase";
import { deriveMembershipStatus, type ProgressRow } from "@/lib/supabase/types";
import type {
  AuthResult,
  AuthUser,
  LoginInput,
  MembershipStatus,
  RegisterInput,
} from "./types";
import type { User as SupabaseUser } from "@supabase/supabase-js";

const SESSION_COOKIE = "bq_session";
const MEMBERSHIP_COOKIE = "bq_membership";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 30; // 30 days

function setCookie(name: string, value: string, maxAge: number): void {
  if (typeof document === "undefined") return;
  document.cookie = `${name}=${value}; path=/; max-age=${maxAge}; samesite=lax`;
}

/** Mirrors the signed-in flag into a cookie so middleware can gate routes. */
export function writeSessionCookie(isSignedIn: boolean): void {
  setCookie(SESSION_COOKIE, isSignedIn ? "1" : "", isSignedIn ? COOKIE_MAX_AGE : 0);
}

/** Mirrors the membership tier into a cookie so middleware can gate premium worlds. */
export function writeMembershipCookie(status: MembershipStatus): void {
  setCookie(MEMBERSHIP_COOKIE, status, COOKIE_MAX_AGE);
}

export function clearAuthCookies(): void {
  setCookie(SESSION_COOKIE, "", 0);
  setCookie(MEMBERSHIP_COOKIE, "", 0);
}

/** Turns raw Supabase/Postgres errors into kid-friendly messages. */
function friendlyError(message: string | undefined): string {
  const text = (message ?? "").toLowerCase();
  if (text.includes("invalid login credentials")) {
    return "That email or password doesn't match our records. Please try again.";
  }
  if (text.includes("email not confirmed")) {
    return "Please confirm your email address before signing in.";
  }
  if (text.includes("already registered") || text.includes("already exists")) {
    return "An account with that email already exists. Try logging in instead.";
  }
  if (text.includes("password")) {
    return "Passwords need at least 8 characters. Please choose a longer one.";
  }
  if (text.includes("network") || text.includes("fetch")) {
    return "We couldn't reach the server. Please check your connection and try again.";
  }
  return message || "Something went wrong. Please try again.";
}

/** Builds the app's user object from the Supabase auth user + profile tables. */
async function hydrateUser(authUser: SupabaseUser): Promise<AuthUser> {
  const uid = authUser.id;
  const meta = (authUser.user_metadata ?? {}) as Record<string, unknown>;

  const [{ data: profile }, { data: membership }] = await Promise.all([
    supabase.from("users").select("*").eq("id", uid).maybeSingle(),
    supabase
      .from("memberships")
      .select("approved, payment_status, created_at")
      .eq("user_id", uid)
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle(),
  ]);

  return {
    id: uid,
    studentName:
      profile?.full_name ?? (meta.full_name as string) ?? "Detective",
    parentName: (meta.parent_name as string) || undefined,
    age: Number(meta.age ?? 0),
    school: profile?.school ?? (meta.school as string) ?? undefined,
    country: profile?.country ?? (meta.country as string) ?? "",
    email: profile?.email ?? authUser.email ?? "",
    membershipStatus: deriveMembershipStatus(membership),
    createdAt: profile?.created_at ?? undefined,
    lastLogin: authUser.last_sign_in_at ?? undefined,
  };
}

/** Reads the current Supabase session and hydrates the app user, if any. */
export async function loadCurrentUser(): Promise<AuthUser | null> {
  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (!session?.user) return null;
  return hydrateUser(session.user);
}

/** Loads the signed-in detective's world progress. */
export async function loadProgress(userId: string): Promise<ProgressRow[]> {
  const { data } = await supabase
    .from("progress")
    .select("*")
    .eq("user_id", userId)
    .order("world_number", { ascending: true });
  return (data ?? []) as ProgressRow[];
}

export async function loginWithPassword(input: LoginInput): Promise<AuthResult> {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: input.email.trim(),
    password: input.password,
  });

  if (error || !data.user) {
    return { ok: false, error: friendlyError(error?.message) };
  }

  return { ok: true, user: await hydrateUser(data.user) };
}

export async function registerAccount(input: RegisterInput): Promise<AuthResult> {
  let response: Response;
  try {
    response = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: input.email.trim(),
        password: input.password,
        fullName: input.studentName.trim(),
        parentName: input.parentName?.trim() || null,
        age: input.age,
        school: input.school?.trim() || null,
        country: input.country,
      }),
    });
  } catch {
    return { ok: false, error: friendlyError("network") };
  }

  const payload = (await response.json().catch(() => ({}))) as {
    ok?: boolean;
    error?: string;
  };

  if (!response.ok || !payload.ok) {
    return { ok: false, error: friendlyError(payload.error) };
  }

  // Establish the session immediately so the detective is signed in on return.
  return loginWithPassword({
    studentName: input.studentName,
    email: input.email,
    password: input.password,
    rememberMe: true,
  });
}

/** Social sign-in placeholder — no OAuth providers are configured yet. */
export async function loginWithProvider(
  _provider: "google" | "apple",
): Promise<AuthResult> {
  void _provider;
  return {
    ok: false,
    error: "Social sign-in is coming soon. Please use your email and password.",
  };
}

export async function requestPasswordReset(email: string): Promise<AuthResult> {
  const trimmed = email.trim();
  await supabase.auth.resetPasswordForEmail(trimmed, {
    redirectTo:
      typeof window !== "undefined" ? `${window.location.origin}/login` : undefined,
  });

  // Always report success so the form can't be used to discover real emails.
  return {
    ok: true,
    user: {
      id: "unknown",
      studentName: "Detective",
      age: 0,
      country: "",
      email: trimmed,
      membershipStatus: "FREE",
    },
  };
}

/** Records the member's contribution payment details on their membership. */
export async function submitContribution(input: {
  paymentMethod: string;
  paymentReference: string;
  amount: number;
  membershipType: string;
}): Promise<{ ok: boolean; error?: string }> {
  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (!session) return { ok: false, error: "Please sign in first." };

  try {
    const response = await fetch("/api/membership/contribute", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.access_token}`,
      },
      body: JSON.stringify(input),
    });
    const payload = (await response.json().catch(() => ({}))) as {
      ok?: boolean;
      error?: string;
    };
    if (!response.ok || !payload.ok) {
      return { ok: false, error: payload.error ?? "Could not save your contribution." };
    }
    return { ok: true };
  } catch {
    return { ok: false, error: "We couldn't reach the server. Please try again." };
  }
}

export async function signOut(): Promise<void> {
  await supabase.auth.signOut();
  clearAuthCookies();
}
