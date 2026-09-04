import { NextResponse, type NextRequest } from "next/server";
import { getAdminCredentials, getAdminSecret, ADMIN_COOKIE, ADMIN_SESSION_MAX_AGE } from "@/lib/admin/config";
import { signAdminToken } from "@/lib/admin/session";

// Uses the Node.js runtime so environment secrets stay server-side.
export const runtime = "nodejs";

type LoginBody = { userId?: string; password?: string };

/**
 * Verifies admin credentials from the environment and, on success, issues a
 * signed HTTP-only session cookie. Credentials are never hard-coded and never
 * returned to the client.
 */
export async function POST(request: NextRequest) {
  const credentials = getAdminCredentials();
  if (!credentials) {
    return NextResponse.json(
      { ok: false, error: "Admin login is not configured." },
      { status: 500 },
    );
  }

  let body: LoginBody;
  try {
    body = (await request.json()) as LoginBody;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  const userId = body.userId?.trim() ?? "";
  const password = body.password ?? "";

  if (userId !== credentials.userId || password !== credentials.password) {
    return NextResponse.json(
      { ok: false, error: "Incorrect admin ID or password." },
      { status: 401 },
    );
  }

  const token = await signAdminToken(getAdminSecret(), {
    sub: "admin",
    exp: Date.now() + ADMIN_SESSION_MAX_AGE * 1000,
  });

  const response = NextResponse.json({ ok: true });
  response.cookies.set(ADMIN_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: ADMIN_SESSION_MAX_AGE,
  });
  return response;
}
