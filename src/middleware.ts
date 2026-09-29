import { NextResponse, type NextRequest } from "next/server";
import { ADMIN_COOKIE, getAdminSecret } from "@/lib/admin/config";
import { verifyAdminToken } from "@/lib/admin/session";

/** Admin routes remain protected. Learning routes are intentionally public. */
async function guardAdmin(request: NextRequest): Promise<NextResponse> {
  const { pathname } = request.nextUrl;
  if (pathname === "/admin/login" || pathname === "/admin/denied") return NextResponse.next();
  const token = request.cookies.get(ADMIN_COOKIE)?.value;
  const payload = await verifyAdminToken(getAdminSecret(), token);
  if (payload) return NextResponse.next();
  const url = request.nextUrl.clone();
  url.pathname = "/admin/denied";
  const response = NextResponse.rewrite(url);
  response.headers.set("X-Robots-Tag", "noindex, nofollow");
  return response;
}

export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith("/admin")) return guardAdmin(request);
  // IP2Kids is a free educational initiative: no learning route is paywalled.
  return NextResponse.next();
}

export const config = { matcher: ["/levels/:path*", "/admin", "/admin/:path*"] };
