import { NextResponse, type NextRequest } from "next/server";
import { canAccessWorld, worldIdForPath } from "@/lib/access";

/**
 * Server half of the login gate. Locked world routes are redirected before any
 * HTML is produced, so a typed URL never renders or preloads the lesson.
 *
 * The cookie is only a signed-in marker, not a credential — pair this with a
 * verified session cookie once real auth replaces the mock provider.
 */
export function middleware(request: NextRequest) {
  const worldId = worldIdForPath(request.nextUrl.pathname);
  if (worldId === null) return NextResponse.next();

  const isSignedIn = request.cookies.get("bq_session")?.value === "1";
  if (canAccessWorld(worldId, isSignedIn)) return NextResponse.next();

  const url = request.nextUrl.clone();
  url.pathname = "/";
  url.hash = "journey";

  const response = NextResponse.redirect(url);
  // Read and cleared by the Journey page so it knows to open the sign-up gate.
  response.cookies.set("bq_gate", String(worldId), { path: "/", maxAge: 60 });
  return response;
}

export const config = {
  matcher: ["/levels/:path*"],
};
