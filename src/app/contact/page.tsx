import type { Metadata } from "next";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ContactCards } from "@/components/contact/ContactCards";
import { ContactForm } from "@/components/contact/ContactForm";
import { FaqAccordion } from "@/components/contact/FaqAccordion";
import { SocialLinks } from "@/components/contact/SocialLinks";
import { MapPlaceholder } from "@/components/contact/MapPlaceholder";
import { CallToAction } from "@/components/sections/CallToAction";
import { contactCards, faqItems, socialLinks } from "@/lib/contact-content";

export const metadata: Metadata = {
  title: "Contact Us | BrandQuest Kids",
  description:
    "Get in touch with BrandQuest Kids for general enquiries, school partnerships or technical support.",
};

export default function ContactPage() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-detective-blue-600 focus:px-5 focus:py-3 focus:font-display focus:text-white"
      >
        Skip to main content
      </a>

      <SiteHeader />

      <main id="main">
        {/* Hero */}
        <section className="relative overflow-hidden bg-gradient-to-b from-detective-blue-50 via-white to-white py-16 sm:py-24">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 overflow-hidden"
          >
            <div className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-detective-yellow-300/40 blur-3xl" />
            <div className="absolute -right-20 top-40 h-80 w-80 rounded-full bg-detective-orange-400/30 blur-3xl" />
          </div>

          <Container className="relative text-center">
            <h1 className="font-display text-4xl font-bold leading-tight text-detective-blue-900 sm:text-5xl lg:text-6xl">
              Contact Us
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-lg text-detective-blue-700/85 sm:text-xl">
              We would love to hear from you.
            </p>
          </Container>
        </section>

        {/* Contact cards */}
        <section className="py-12 sm:py-16">
          <Container>
            <ContactCards cards={contactCards} />
          </Container>
        </section>

        {/* Contact form */}
        <section className="bg-detective-blue-50/70 py-12 sm:py-16">
          <Container>
            <SectionHeading
              eyebrow="Send a message"
              title="Get in touch"
              subtitle="Fill out the form and our team will write back soon."
            />
            <div className="mx-auto mt-10 max-w-2xl">
              <ContactForm />
            </div>
          </Container>
        </section>

        {/* FAQ */}
        <section className="py-12 sm:py-16">
          <Container>
            <SectionHeading
              eyebrow="Frequently asked questions"
              title="Got questions?"
              subtitle="Here are answers to the questions we hear most often."
            />
            <div className="mt-10">
              <FaqAccordion items={faqItems} />
            </div>
          </Container>
        </section>

        {/* Social media */}
        <section className="bg-detective-blue-50/70 py-12 sm:py-16">
          <Container>
            <SectionHeading eyebrow="Follow along" title="Find us online" />
            <div className="mt-8">
              <SocialLinks links={socialLinks} />
            </div>
          </Container>
        </section>

        {/* Map */}
        <section className="py-12 sm:py-16">
          <Container>
            <SectionHeading eyebrow="Visit us" title="Where we are" />
            <div className="mx-auto mt-8 max-w-3xl">
              <MapPlaceholder />
            </div>
          </Container>
        </section>

        {/* Closing CTA */}
        <CallToAction
          title="Become a Little Brand Detective today!"
          subtitle="Join thousands of young detectives learning how brands protect their names, logos and mascots."
          buttonLabel="Start Adventure"
          buttonHref="/#journey"
        />
      </main>

      <SiteFooter />
    </>
  );
}
