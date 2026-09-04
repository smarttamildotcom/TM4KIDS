import type {
  AuthUser,
  LoginInput,
  MembershipStatus,
  RegisterInput,
  AuthResult,
} from "./types";

/**
 * Mock account store. Passwords are kept in plain text in localStorage purely
 * because this is a front-end demo with no backend — replace this entire module
 * with real API calls before handling any real user data.
 */

const ACCOUNTS_KEY = "tda:accounts";
const SESSION_KEY = "tda:session";
const SESSION_COOKIE = "bq_session";
const MEMBERSHIP_COOKIE = "bq_membership";

type StoredAccount = AuthUser & { password: string };

function readAccounts(): StoredAccount[] {
  if (typeof window === "undefined") return [];

  try {
    const raw = window.localStorage.getItem(ACCOUNTS_KEY);
    return raw ? (JSON.parse(raw) as StoredAccount[]) : [];
  } catch {
    return [];
  }
}

function writeAccounts(accounts: StoredAccount[]): void {
  if (typeof window === "undefined") return;

  try {
    window.localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(accounts));
  } catch {
    // Storage may be unavailable in private mode; the demo can continue.
  }
}

function toPublicUser({ password: _password, ...user }: StoredAccount): AuthUser {
  return user;
}

/** Simulates network latency so loading states are visible. */
function delay(ms = 700): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function registerAccount(input: RegisterInput): Promise<AuthResult> {
  await delay();

  const accounts = readAccounts();
  const emailKey = input.email.trim().toLowerCase();

  if (accounts.some((account) => account.email.toLowerCase() === emailKey)) {
    return { ok: false, error: "An account with that email already exists." };
  }

  const account: StoredAccount = {
    ...input,
    email: input.email.trim(),
    id: `user-${Date.now()}`,
    // Every new detective starts on the free tier.
    membershipStatus: "FREE",
  };

  writeAccounts([...accounts, account]);
  return { ok: true, user: toPublicUser(account) };
}

export async function loginWithPassword(input: LoginInput): Promise<AuthResult> {
  await delay();

  const emailKey = input.email.trim().toLowerCase();
  const studentNameKey = input.studentName.trim().toLowerCase();
  const account = readAccounts().find(
    (item) =>
      item.email.toLowerCase() === emailKey &&
      item.studentName.toLowerCase() === studentNameKey,
  );

  if (!account || account.password !== input.password) {
    return { ok: false, error: "We couldn't find a detective with those details." };
  }

  return { ok: true, user: toPublicUser(account) };
}

/** Stand-in for a real OAuth flow. */
export async function loginWithProvider(
  provider: "google" | "apple",
): Promise<AuthResult> {
  await delay();

  const label = provider === "google" ? "Google" : "Apple";
  return {
    ok: true,
    user: {
      id: `demo-${provider}`,
      studentName: `${label} Detective`,
      age: 10,
      country: "Demo Land",
      email: `demo@${provider}.example`,
      membershipStatus: "FREE",
    },
  };
}

export async function requestPasswordReset(email: string): Promise<AuthResult> {
  await delay();

  const emailKey = email.trim().toLowerCase();
  const account = readAccounts().find(
    (item) => item.email.toLowerCase() === emailKey,
  );

  // Always report success so the form can't be used to discover real emails.
  return account
    ? { ok: true, user: toPublicUser(account) }
    : {
        ok: true,
        user: {
          id: "unknown",
          studentName: "Detective",
          age: 0,
          country: "",
          email: email.trim(),          membershipStatus: "FREE",        },
      };
}

export function readSession(): AuthUser | null {
  if (typeof window === "undefined") return null;

  try {
    const raw =
      window.localStorage.getItem(SESSION_KEY) ??
      window.sessionStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    const user = JSON.parse(raw) as AuthUser;
    // Normalise sessions saved before membership tiers existed.
    return { ...user, membershipStatus: user.membershipStatus ?? "FREE" };
  } catch {
    return null;
  }
}

/**
 * Mirrors the session into a flag cookie so middleware can gate world routes
 * before rendering. It carries no credentials and must never be treated as
 * proof of identity — replace it with a signed session cookie alongside real auth.
 */
function writeSessionCookie(isSignedIn: boolean): void {
  if (typeof document === "undefined") return;
  document.cookie = isSignedIn
    ? `${SESSION_COOKIE}=1; path=/; max-age=2592000; samesite=lax`
    : `${SESSION_COOKIE}=; path=/; max-age=0; samesite=lax`;
}

/**
 * Mirrors the membership tier into a flag cookie so middleware can gate premium
 * world routes before rendering. Like the session cookie it is only a hint and
 * must be re-verified server-side once real auth and payments are wired up.
 */
export function writeMembershipCookie(status: MembershipStatus): void {
  if (typeof document === "undefined") return;
  document.cookie = `${MEMBERSHIP_COOKIE}=${status}; path=/; max-age=2592000; samesite=lax`;
}

/** `remember` decides whether the session survives closing the tab. */
export function writeSession(user: AuthUser, remember: boolean): void {
  if (typeof window === "undefined") return;

  try {
    const store = remember ? window.localStorage : window.sessionStorage;
    store.setItem(SESSION_KEY, JSON.stringify(user));
    writeSessionCookie(true);
    writeMembershipCookie(user.membershipStatus);
  } catch {
    // Non-critical for the demo.
  }
}

export function clearSession(): void {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(SESSION_KEY);
  window.sessionStorage.removeItem(SESSION_KEY);
  writeSessionCookie(false);
  if (typeof document !== "undefined") {
    document.cookie = `${MEMBERSHIP_COOKIE}=; path=/; max-age=0; samesite=lax`;
  }
}

/**
 * Updates the signed-in detective's membership tier across the account store,
 * the active session and the middleware cookie, returning the updated user.
 */
export function persistMembershipStatus(
  status: MembershipStatus,
): AuthUser | null {
  const current = readSession();
  if (!current) return null;

  const updated: AuthUser = { ...current, membershipStatus: status };

  const accounts = readAccounts().map((account) =>
    account.id === updated.id ? { ...account, membershipStatus: status } : account,
  );
  writeAccounts(accounts);

  try {
    if (window.localStorage.getItem(SESSION_KEY)) {
      window.localStorage.setItem(SESSION_KEY, JSON.stringify(updated));
    } else {
      window.sessionStorage.setItem(SESSION_KEY, JSON.stringify(updated));
    }
  } catch {
    // Non-critical for the demo.
  }

  writeMembershipCookie(status);
  return updated;
}
