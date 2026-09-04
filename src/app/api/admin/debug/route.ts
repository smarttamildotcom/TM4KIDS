import { NextResponse } from "next/server";

// Temporary diagnostic route. Reports only whether each admin variable is
// present at runtime — never the values. Remove once production is verified.
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export function GET() {
  return NextResponse.json({
    ADMIN_USER_ID: Boolean(process.env.ADMIN_USER_ID),
    ADMIN_PASSWORD: Boolean(process.env.ADMIN_PASSWORD),
    ADMIN_SESSION_SECRET: Boolean(process.env.ADMIN_SESSION_SECRET),
  });
}
