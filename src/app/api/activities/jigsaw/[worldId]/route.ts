import { NextResponse } from "next/server";
import { getJigsawImage } from "@/lib/assets/jigsaw-images";

export const runtime = "nodejs";

export async function GET(_request: Request, { params }: { params: Promise<{ worldId: string }> }) {
  const { worldId: value } = await params;
  const worldId = Number(value);
  const image = getJigsawImage(worldId);
  if (!image) return new NextResponse("Not found", { status: 404 });

  return new NextResponse(Buffer.from(image, "base64"), {
    headers: {
      "Content-Type": "image/jpeg",
      "Cache-Control": "public, max-age=31536000, immutable",
      "Content-Disposition": `inline; filename=world-${worldId}-jigsaw.jpg`,
    },
  });
}
