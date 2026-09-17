import { NextResponse } from "next/server";
import { WORLD_ONE_COLOURING_PAGE_PNG } from "@/lib/assets/world-one-colouring-page";

export const runtime = "nodejs";

export async function GET() {
  return new NextResponse(Buffer.from(WORLD_ONE_COLOURING_PAGE_PNG, "base64"), {
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": "public, max-age=31536000, immutable",
      "Content-Disposition": "inline; filename=world-1-questy-colouring-page.png",
    },
  });
}
