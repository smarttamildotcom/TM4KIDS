import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { BRAND } from "@/lib/brand";
import { footerLinks } from "@/lib/site-content";

export function SiteFooter() {
  return <footer className="bg-detective-blue-900 text-detective-blue-100">
    <Container className="flex flex-col items-center gap-8 py-12 text-center md:flex-row md:justify-between md:text-left">
      <div className="flex flex-col items-center gap-3 md:flex-row"><Image src="/ip2kids-logo.png" alt="IP2Kids" width={144} height={144} sizes="72px" className="h-[72px] w-[72px] rounded-2xl bg-white object-contain p-1 shadow-md"/><div><p className="font-display text-lg font-bold text-white">{BRAND.name}</p><p className="text-sm text-detective-blue-200">Helping young minds discover the world of ideas, brands, inventions, creativity and design.</p></div></div>
      <nav aria-label="Footer"><ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">{footerLinks.map(link=><li key={link.href}><Link href={link.href} className="font-display font-semibold transition-colors hover:text-detective-yellow-300">{link.label}</Link></li>)}</ul></nav>
    </Container>
    <div className="border-t border-white/10 py-5">
      <Container className="flex flex-col gap-4 text-center md:flex-row md:items-center md:justify-between md:gap-8 md:text-left">
        <div className="max-w-3xl">
          <p className="font-display text-xs font-bold text-white">Disclaimer</p>
          <p className="mt-1 text-xs leading-5 text-detective-blue-200">IP2Kids is an independent educational initiative designed to introduce intellectual property concepts to young learners in a child-friendly and engaging way. The content is provided for educational purposes only and does not constitute legal advice or replace formal legal or classroom instruction.</p>
        </div>
        <p className="shrink-0 text-sm text-detective-blue-200 md:text-right">{BRAND.copyright}</p>
      </Container>
    </div>
  </footer>;
}
