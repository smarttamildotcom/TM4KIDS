import type { AuthUser, LoginInput, RegisterInput, AuthResult } from "./types";

/**
 * Mock account store. Passwords are kept in plain text in localStorage purely
 * because this is a front-end demo with no backend — replace this entire module
 * with real API calls before handling any real user data.
 */

const ACCOUNTS_KEY = "tda:accounts";
const SESSION_KEY = "tda:session";

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
  provider: "google" | "microsoft",
): Promise<AuthResult> {
  await delay();

  const label = provider === "google" ? "Google" : "Microsoft";
  return {
    ok: true,
    user: {
      id: `demo-${provider}`,
      studentName: `${label} Detective`,
      age: 10,
      country: "Demo Land",
      email: `demo@${provider}.example`,
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
          email: email.trim(),
        },
      };
}

export function readSession(): AuthUser | null {
  if (typeof window === "undefined") return null;

  try {
    const raw =
      window.localStorage.getItem(SESSION_KEY) ??
      window.sessionStorage.getItem(SESSION_KEY);
    return raw ? (JSON.parse(raw) as AuthUser) : null;
  } catch {
    return null;
  }
}

/** `remember` decides whether the session survives closing the tab. */
export function writeSession(user: AuthUser, remember: boolean): void {
  if (typeof window === "undefined") return;

  try {
    const store = remember ? window.localStorage : window.sessionStorage;
    store.setItem(SESSION_KEY, JSON.stringify(user));
  } catch {
    // Non-critical for the demo.
  }
}

export function clearSession(): void {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(SESSION_KEY);
  window.sessionStorage.removeItem(SESSION_KEY);
}
