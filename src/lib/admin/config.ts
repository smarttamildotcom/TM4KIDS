/**
 * Server-side configuration for the admin area. All secrets are read from the
 * environment — nothing is ever hard-coded. Import this only from server code
 * (route handlers and middleware), never from client components.
 */

/** Name of the signed, HTTP-only cookie that carries the admin session. */
export const ADMIN_COOKIE = "bq_admin";

/** How long an admin session stays valid, in seconds (8 hours). */
export const ADMIN_SESSION_MAX_AGE = 60 * 60 * 8;

/**
 * Secret used to sign the admin session token. A development-only fallback keeps
 * local setups working, but production must set ADMIN_SESSION_SECRET.
 */
export function getAdminSecret(): string {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (secret && secret.length > 0) return secret;

  if (process.env.NODE_ENV === "production") {
    throw new Error(
      "ADMIN_SESSION_SECRET must be set in production to secure the admin area.",
    );
  }

  // Development fallback only — never used when the env var is provided.
  return "brand-quest-dev-admin-secret";
}

/** The configured admin credentials, or null when the environment is missing them. */
export function getAdminCredentials(): { userId: string; password: string } | null {
  const userId = process.env.ADMIN_USER_ID;
  const password = process.env.ADMIN_PASSWORD;
  if (!userId || !password) return null;
  return { userId, password };
}
