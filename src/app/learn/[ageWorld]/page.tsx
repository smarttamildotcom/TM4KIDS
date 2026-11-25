import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { learningWorlds } from "@/lib/learning-worlds";

export function generateStaticParams() {
  return learningWorlds.map(w => ({ ageWorld: w.slug }));
}

export default async function LearningWorldPage({params}: {params: Promise<{ageWorld:string}>}) {
  const {ageWorld} = await params;
  const world = learningWorlds.find(w => w.slug === ageWorld);
  if (!world) notFound();
  return <>
    <SiteHeader />
    <main className="mx-auto max-w-6xl px-5 py-10">
      <Link href="/#journey" className="font-semibold text-blue-700">← All learning worlds</Link>
      <header className="my-8 rounded-3xl bg-blue-50 p-7">
        <span className="text-4xl" aria-hidden="true">{world.icon}</span>
        <p className="mt-3 font-semibold">Ages {world.age} · 15 Adventures</p>
        <h1 className="mt-2 text-3xl font-bold text-slate-900">{world.name}</h1>
        <p className="mt-2 text-slate-700">{world.description}</p>
      </header>
      <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {world.titles.map((title,index) => {
          const ready = world.slug === "junior-detectives" && index < 2;
          return <li key={title} className="flex flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-semibold text-slate-600">Adventure {index+1}</p>
            <h2 className="my-3 flex-1 text-xl font-bold text-slate-900">{title}</h2>
            {ready ? <Link href={"/worlds/"+(index+1)} className="rounded-xl bg-blue-700 px-4 py-3 text-center font-bold text-white">Start adventure</Link> : <p className="rounded-xl bg-slate-100 px-4 py-3 text-sm text-slate-700">Coming soon</p>}
          </li>;
        })}
      </ol>
      <p className="mt-8 text-sm text-slate-600">New adventures are being prepared. Existing Idea City lessons remain available below.</p>
      <Link href="/#legacy-journey" className="mt-3 inline-block font-semibold text-blue-700">Explore existing adventures →</Link>
    </main>
    <SiteFooter />
  </>;
}
