"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { fadeUp, inViewOnce, staggerContainer } from "@/lib/motion";
import { pricingPlans } from "@/lib/home-content";

type Billing = "monthly" | "yearly";

/** Three pricing cards with a monthly/yearly toggle. The middle plan is highlighted. */
export function Pricing() {
  const [billing, setBilling] = useState<Billing>("monthly");

  return (
    <section id="pricing" className="py-16 sm:py-24">
      <Container>
        <SectionHeading
          eyebrow="Simple pricing"
          title="Pick Your Detective Plan"
          subtitle="Start free, upgrade any time. Cancel whenever you like."
        />

        <div className="mt-8 flex justify-center">
          <div className="inline-flex rounded-full border-2 border-detective-blue-100 bg-white p-1 shadow-sm">
            {(["monthly", "yearly"] as const).map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => setBilling(option)}
                aria-pressed={billing === option}
                className={`rounded-full px-5 py-2 font-display text-sm font-semibold capitalize transition-colors ${
                  billing === option
                    ? "bg-detective-blue-600 text-white shadow"
                    : "text-detective-blue-700"
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        <motion.ul
          variants={staggerContainer}
          {...inViewOnce}
          className="mt-10 grid gap-6 lg:grid-cols-3"
        >
          {pricingPlans.map((plan) => {
            const price = billing === "monthly" ? plan.monthlyPrice : plan.yearlyPrice;

            return (
              <motion.li key={plan.id} variants={fadeUp}>
                <motion.article
                  whileHover={{ y: -8 }}
                  transition={{ type: "spring", stiffness: 300, damping: 22 }}
                  className={`relative flex h-full flex-col rounded-3xl border-2 p-7 shadow-md ${
                    plan.isPopular
                      ? "border-detective-orange-400 bg-detective-orange-50 shadow-xl lg:scale-105"
                      : "border-detective-blue-100 bg-white"
                  }`}
                >
                  {plan.isPopular && (
                    <span className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-detective-orange-500 px-4 py-1 font-display text-xs font-bold uppercase tracking-wide text-white shadow">
                      Most Popular
                    </span>
                  )}

                  <h3 className="font-display text-xl font-bold text-detective-blue-900">
                    {plan.name}
                  </h3>
                  <p className="mt-1 text-sm text-detective-blue-700/80">{plan.description}</p>

                  <p className="mt-5 font-display text-4xl font-bold text-detective-blue-900">
                    {price === 0 ? "Free" : `$${price}`}
                    {price !== 0 && (
                      <span className="text-base font-semibold text-detective-blue-700/70">
                        /{billing === "monthly" ? "mo" : "yr"}
                      </span>
                    )}
                  </p>

                  <ul className="mt-6 grow space-y-3">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-detective-blue-700/90">
                        <Check className="h-4 w-4 shrink-0 text-detective-orange-500" aria-hidden="true" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <Button
                    href="/register"
                    size="lg"
                    variant={plan.isPopular ? "primary" : "outline"}
                    className="mt-8 w-full"
                  >
                    {plan.ctaLabel}
                  </Button>
                </motion.article>
              </motion.li>
            );
          })}
        </motion.ul>
      </Container>
    </section>
  );
}
