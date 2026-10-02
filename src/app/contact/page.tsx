import type { Metadata } from "next";
import { Mail, School } from "lucide-react";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { Container } from "@/components/ui/Container";
import { ContactCards } from "@/components/contact/ContactCards";
import { ContactForm } from "@/components/contact/ContactForm";
import { FaqAccordion } from "@/components/contact/FaqAccordion";
import { contactCards, faqItems } from "@/lib/contact-content";

export const metadata: Metadata = { title: "Contact Us | IP2Kids", description: "Contact IP2Kids about the Adventures, books, schools, educational use and collaborations." };

export default function ContactPage() {
  return <>
    <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-detective-blue-600 focus:px-5 focus:py-3 focus:font-display focus:text-white">Skip to main content</a>
    <SiteHeader/>
    <main id="main">
      <section className="relative overflow-hidden bg-gradient-to-b from-detective-blue-50 via-white to-white py-10 sm:py-14">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden"><div className="absolute -left-24 top-0 h-64 w-64 rounded-full bg-detective-yellow-300/35 blur-3xl"/><div className="absolute -right-24 top-10 h-72 w-72 rounded-full bg-detective-orange-400/25 blur-3xl"/></div>
        <Container className="relative grid items-center gap-6 md:grid-cols-[1fr_auto]">
          <div className="text-center md:text-left">
            <p className="font-display text-xs font-bold uppercase tracking-[.18em] text-detective-orange-600">👋 Say Hello!</p>
            <h1 className="mt-2 font-display text-3xl font-bold leading-tight text-detective-blue-900 sm:text-4xl lg:text-5xl">We&apos;d love to hear from you.</h1>
            <p className="mx-auto mt-3 max-w-2xl text-base leading-7 text-detective-blue-700/85 md:mx-0 sm:text-lg">Have a question about IP2Kids, our books, schools or educational collaborations? Send us a message.</p>
          </div>
          <div aria-hidden="true" className="mx-auto hidden h-28 w-28 place-items-center rounded-full bg-white shadow-md md:grid"><div className="text-center"><div className="text-4xl">🐱</div><div className="mt-1 font-display text-xs font-bold text-detective-blue-800">Questy says hi!</div></div></div>
        </Container>
      </section>

      <section className="py-8 sm:py-10"><Container><ContactCards cards={contactCards}/></Container></section>

      <section id="contact-form" className="scroll-mt-24 bg-detective-blue-50/70 py-10 sm:py-14">
        <Container>
          <div className="mx-auto max-w-2xl text-center"><p className="font-display text-xs font-bold uppercase tracking-[.16em] text-detective-orange-600">Send us a message</p><h2 className="mt-2 font-display text-2xl font-bold text-detective-blue-900 sm:text-3xl">How can we help?</h2><p className="mt-2 text-sm leading-6 text-detective-blue-700/85 sm:text-base">This form is intended for parents, educators, schools and other adult enquiries.</p></div>
          <div className="mx-auto mt-6 max-w-2xl"><ContactForm/></div>
        </Container>
      </section>

      <section className="py-10 sm:py-14">
        <Container>
          <div className="mx-auto max-w-3xl text-center"><p className="font-display text-xs font-bold uppercase tracking-[.16em] text-detective-orange-600">Frequently asked questions</p><h2 className="mt-2 font-display text-2xl font-bold text-detective-blue-900 sm:text-3xl">A few quick answers</h2><p className="mt-2 text-sm text-detective-blue-700/85 sm:text-base">Useful information for parents, schools and educators.</p></div>
          <div className="mx-auto mt-6 max-w-3xl"><FaqAccordion items={faqItems}/></div>
        </Container>
      </section>
    </main>
    <SiteFooter/>
  </>;
}
