import { notFound } from "next/navigation";
import { WorldPageExperience } from "@/components/sections/WorldPageExperience";
import { worlds } from "@/lib/worlds";

export function generateStaticParams() {
  return worlds.map((world) => ({ worldId: String(world.id) }));
}

export default async function WorldPage({ params }: { params: Promise<{ worldId: string }> }) {
  const { worldId: rawWorldId } = await params;
  const worldId = Number(rawWorldId);
  if (!Number.isInteger(worldId) || !worlds.some((world) => world.id === worldId)) notFound();
  return <WorldPageExperience worldId={worldId} />;
}
