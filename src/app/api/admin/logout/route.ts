import { NextResponse } from "next/server";
import { ADMIN_COOKIE } from "@/lib/admin/config";

export const runtime = "nodejs";

/** Clears the admin session cookie. */
export async function POST() {
  const response = NextResponse.json({ ok: true });
  response.cookies.set(ADMIN_COOKIE, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });
  return response;
}
