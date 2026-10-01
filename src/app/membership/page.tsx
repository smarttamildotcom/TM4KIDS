import type { Metadata } from "next";
import Image from "next/image";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { MembershipView } from "@/components/membership/MembershipView";
import { CallToAction } from "@/components/sections/CallToAction";
import { CharityCards, DonationUpdateCards, MissionPoints } from "@/components/csr/CsrSections";
import { questyArt } from "@/lib/questy-art";

export const metadata: Metadata = { title: "Support IP2Kids", description: "Optional support for the free IP2Kids educational initiative and its giving mission." };

export default function MembershipPage() {
  return <><SiteHeader/><main id="main"><section className="relative overflow-hidden bg-gradient-to-b from-detective-blue-50 via-white to-white py-16 sm:py-24"><Container className="relative"><div className="flex flex-col items-center gap-8 text-center lg:flex-row lg:gap-12 lg:text-left"><div className="flex shrink-0 justify-center"><Image src={questyArt.detective} alt="Questy" priority sizes="(min-width: 1024px) 260px, 190px" className="h-[190px] w-auto object-contain drop-shadow-2xl lg:h-[260px]"/></div><div><p className="font-display text-sm font-semibold uppercase tracking-[0.2em] text-detective-orange-500">Optional support</p><h1 className="mt-3 font-display text-4xl font-bold leading-tight text-detective-blue-900 sm:text-5xl lg:text-6xl">Support IP2Kids</h1><p className="mt-6 max-w-xl text-lg text-detective-blue-700/85 sm:text-xl">All 15 learning adventures are free. Contributions are optional and help us continue creating child-friendly educational experiences and supporting our giving mission.</p><p className="mt-4 rounded-2xl bg-green-100 px-5 py-3 font-display font-bold text-green-800">No contribution is required to access any IP2Kids adventure.</p></div></div></Container></section><MembershipView/><section className="border-t border-detective-blue-100 bg-detective-blue-50/70 py-16 sm:py-24"><Container><SectionHeading eyebrow="Our shared mission" title="Learning That Gives Back" subtitle="Optional support helps IP2Kids grow while our giving mission reaches further."/><div className="mt-12"><MissionPoints/></div></Container></section><section className="py-16 sm:py-24"><Container><SectionHeading eyebrow="Where it goes" title="Our Charity Partners" subtitle="Singapore charities supporting children and families through cancer."/><div className="mx-auto mt-12 max-w-4xl"><CharityCards/></div></Container></section><section className="bg-detective-blue-50/70 py-16 sm:py-24"><Container><SectionHeading eyebrow="Transparency" title="Donation Updates" subtitle="Donation summaries, acknowledgements and annual impact updates will be published here."/><div className="mt-12"><DonationUpdateCards/></div></Container></section><CallToAction title="Learn. Play. Read More." subtitle="Start any free adventure with Questy." buttonLabel="Explore Adventures" buttonHref="/#journey"/></main><SiteFooter/></>;
}
