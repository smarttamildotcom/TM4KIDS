import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { BookOpen, Lightbulb, Palette, Rocket, Sparkles } from "lucide-react";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { Container } from "@/components/ui/Container";
import { questyArt } from "@/lib/questy-art";

export const metadata: Metadata = {
  title: "Book Corner | IP2Kids",
  description: "Discover the IP2Kids Book Corner and continue Questy's idea adventures through reading.",
};

const shelves = [
  { icon: Lightbulb, title: "Big Ideas", text: "Stories that help children notice inventions and clever solutions in everyday life." },
  { icon: Palette, title: "Creative Worlds", text: "Explore stories, drawings, designs and the people who create them." },
  { icon: Rocket, title: "Brands & Adventures", text: "Follow playful characters as they discover names, logos and memorable brand clues." },
];

export default function BooksPage() {
  return <><SiteHeader/><main className="min-h-screen bg-gradient-to-b from-detective-blue-50 via-white to-detective-yellow-50/40">
    <section className="py-14 sm:py-20"><Container><div className="grid items-center gap-10 lg:grid-cols-[1fr_360px]">
      <div><p className="font-display text-sm font-bold uppercase tracking-[.2em] text-detective-orange-500">📚 IP2Kids Book Corner</p><h1 className="mt-3 font-display text-4xl font-bold text-detective-blue-900 sm:text-5xl">The adventure doesn&apos;t end on the screen.</h1><p className="mt-6 max-w-2xl text-lg leading-relaxed text-detective-blue-700/85">IP2Kids is designed to spark curiosity. Our books will take children further into the worlds of ideas, creativity, inventions, brands and design through stories they can enjoy at their own pace.</p><div className="mt-7 inline-flex items-center gap-2 rounded-full bg-detective-yellow-100 px-5 py-3 font-display font-bold text-detective-blue-900"><Sparkles className="h-5 w-5 text-detective-orange-500"/>Questy&apos;s first IP2Kids books are coming soon!</div></div>
      <Image src={questyArt.detective} alt="Questy inviting children to read more" sizes="(min-width: 1024px) 340px, 220px" className="mx-auto h-auto w-[220px] object-contain drop-shadow-xl lg:w-[340px]"/>
    </div></Container></section>
    <section className="bg-white py-14 sm:py-20"><Container><div className="mx-auto max-w-3xl text-center"><BookOpen className="mx-auto h-10 w-10 text-detective-orange-500"/><h2 className="mt-4 font-display text-3xl font-bold text-detective-blue-900">Read. Imagine. Create.</h2><p className="mt-4 text-lg text-detective-blue-700/80">The website gives children a playful introduction. The Book Corner is where they can slow down, read more stories and keep exploring their own ideas.</p></div><div className="mt-10 grid gap-5 md:grid-cols-3">{shelves.map(({icon:Icon,title,text})=><article key={title} className="rounded-[2rem] border-2 border-detective-blue-100 bg-detective-blue-50/40 p-6 text-center shadow-sm"><Icon className="mx-auto h-8 w-8 text-detective-orange-500"/><h3 className="mt-4 font-display text-xl font-bold text-detective-blue-900">{title}</h3><p className="mt-3 leading-relaxed text-detective-blue-700/80">{text}</p></article>)}</div></Container></section>
    <section className="py-14 sm:py-20"><Container><div className="mx-auto max-w-3xl rounded-[2rem] bg-detective-blue-900 p-8 text-center text-white shadow-xl sm:p-10"><p className="font-display text-sm font-bold uppercase tracking-[.2em] text-detective-yellow-300">While you wait...</p><h2 className="mt-3 font-display text-3xl font-bold">Keep exploring with Questy!</h2><p className="mx-auto mt-4 max-w-xl text-white/80">Every free adventure introduces one small idea. Play, listen, answer a few fun questions and discover what interests you most.</p><Link href="/#journey" className="mt-7 inline-flex rounded-full bg-detective-orange-500 px-7 py-4 font-display font-bold text-white">Explore Free Adventures →</Link></div></Container></section>
  </main><SiteFooter/></>;
}
