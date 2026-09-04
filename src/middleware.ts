import { NextResponse, type NextRequest } from "next/server";
import { canAccessWorld, worldIdForPath } from "@/lib/access";
import { ADMIN_COOKIE, getAdminSecret } from "@/lib/admin/config";
import { verifyAdminToken } from "@/lib/admin/session";
import type { MembershipStatus } from "@/lib/auth/types";

/**
 * Guards the admin area. The login and denied screens are always reachable;
 * every other `/admin/*` route requires a valid, signed admin session cookie.
 * Unauthorised visitors are shown the 403 Access Denied page.
 */
async function guardAdmin(request: NextRequest): Promise<NextResponse> {
  const { pathname } = request.nextUrl;
  if (pathname === "/admin/login" || pathname === "/admin/denied") {
    return NextResponse.next();
  }

  const token = request.cookies.get(ADMIN_COOKIE)?.value;
  const payload = await verifyAdminToken(getAdminSecret(), token);

  if (payload) return NextResponse.next();

  const url = request.nextUrl.clone();
  url.pathname = "/admin/denied";
  const response = NextResponse.rewrite(url);
  response.headers.set("X-Robots-Tag", "noindex, nofollow");
  return response;
}

/**
 * Server half of the login + membership gate. Locked world routes are redirected
 * before any HTML is produced, so a typed URL never renders or preloads the
 * lesson.
 *
 * The cookies are only hints, not credentials — pair them with a verified
 * session and a server-checked membership record once real auth and payments
 * replace the mock provider.
 */
export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith("/admin")) {
    return guardAdmin(request);
  }

  const worldId = worldIdForPath(request.nextUrl.pathname);
  if (worldId === null) return NextResponse.next();

  const isSignedIn = request.cookies.get("bq_session")?.value === "1";
  const membershipStatus =
    (request.cookies.get("bq_membership")?.value as MembershipStatus) || "FREE";

  if (canAccessWorld(worldId, isSignedIn, membershipStatus)) {
    return NextResponse.next();
  }

  const url = request.nextUrl.clone();

  // Signed-in detectives without an active membership are sent to contribute;
  // signed-out visitors are returned to the Journey to sign up first.
  if (isSignedIn) {
    url.pathname = "/membership";
    url.hash = "";
    return NextResponse.redirect(url);
  }

  url.pathname = "/";
  url.hash = "journey";

  const response = NextResponse.redirect(url);
  // Read and cleared by the Journey page so it knows to open the sign-up gate.
  response.cookies.set("bq_gate", String(worldId), { path: "/", maxAge: 60 });
  return response;
}

export const config = {
  matcher: ["/levels/:path*", "/admin", "/admin/:path*"],
};
