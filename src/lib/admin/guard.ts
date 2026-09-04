import { cookies } from "next/headers";
import { ADMIN_COOKIE, getAdminSecret } from "./config";
import { verifyAdminToken } from "./session";

/**
 * Verifies the signed admin session cookie. API route handlers under
 * `/api/admin/*` must call this — the middleware only guards `/admin/*` pages,
 * not API routes.
 */
export async function isAdminRequest(): Promise<boolean> {
  const store = await cookies();
  const token = store.get(ADMIN_COOKIE)?.value;
  const payload = await verifyAdminToken(getAdminSecret(), token);
  return Boolean(payload);
}
