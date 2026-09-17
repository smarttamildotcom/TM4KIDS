import { NextResponse } from "next/server";
import { FRUIT_ANIMAL_JIGSAW_PNG } from "@/lib/assets/fruit-animal-jigsaw";

export const runtime = "nodejs";

export async function GET() {
  return new NextResponse(Buffer.from(FRUIT_ANIMAL_JIGSAW_PNG, "base64"), {
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": "public, max-age=31536000, immutable",
      "Content-Disposition": "inline; filename=fruit-animal-logo-jigsaw.png",
    },
  });
}
