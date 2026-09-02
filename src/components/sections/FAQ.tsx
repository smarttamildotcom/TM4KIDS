"use client";

import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FaqAccordion } from "@/components/contact/FaqAccordion";
import { homeFaqItems } from "@/lib/home-content";

/** Homepage FAQ — reuses the shared accordion with mission-focused questions. */
export function FAQ() {
  return (
    <section id="faq" className="bg-detective-blue-50/70 py-16 sm:py-24">
      <Container>
        <SectionHeading
          eyebrow="Questions?"
          title="Frequently Asked Questions"
          subtitle="Everything parents and teachers ask before starting the adventure."
        />

        <div className="mt-12">
          <FaqAccordion items={homeFaqItems} />
        </div>
      </Container>
    </section>
  );
}
