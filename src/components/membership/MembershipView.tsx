"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Heart, LogIn, Sparkles } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { MembershipCard } from "@/components/payment/MembershipCard";
import { PayNowCard } from "@/components/payment/PayNowCard";
import { BankTransferCard } from "@/components/payment/BankTransferCard";
import { ContributionForm } from "@/components/membership/ContributionForm";
import { PendingVerification } from "@/components/membership/PendingVerification";
import { MembershipRejected } from "@/components/membership/MembershipRejected";
import { useAuth } from "@/lib/auth/AuthProvider";

/** Client orchestrator for the membership page — renders the right state per tier. */
export function MembershipView() {
  const { user, isLoaded } = useAuth();
  const [justSubmitted, setJustSubmitted] = useState(false);
  const [resubmitting, setResubmitting] = useState(false);

  const status = user?.membershipStatus ?? "FREE";

  // Approved members keep their active status and unlocks; this page intentionally has no confirmation card.
  if (isLoaded && status === "ACTIVE") return null;

  if (isLoaded && (status === "PENDING" || justSubmitted)) {
    return (
      <section className="py-16 sm:py-24">
        <Container>
          <PendingVerification />
        </Container>
      </section>
    );
  }

  if (isLoaded && status === "REJECTED" && !resubmitting) {
    return (
      <section className="py-16 sm:py-24">
        <Container>
          <MembershipRejected onResubmit={() => setResubmitting(true)} />
        </Container>
      </section>
    );
  }

  return (
    <>
      {/* Membership card */}
      <section className="py-16 sm:py-24">
        <Container>
          <div className="mx-auto max-w-xl">
            <MembershipCard />
          </div>
        </Container>
      </section>

      {/* CSR highlight */}
      <section className="bg-detective-blue-50/70 py-16 sm:py-24">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="mx-auto max-w-3xl rounded-[2rem] border-2 border-detective-orange-200 bg-white p-8 shadow-sm sm:p-12"
          >
            <div className="flex items-center gap-3">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-detective-orange-500 text-white shadow-md">
                <Heart className="h-6 w-6" aria-hidden="true" />
              </span>
              <h2 className="font-display text-2xl font-bold text-detective-blue-900 sm:text-3xl">
                Every Adventure Gives Back ❤️
              </h2>
            </div>

            <p className="mt-6 text-lg leading-relaxed text-detective-blue-700/85">
              Every membership contribution helps IP2Kids continue creating educational
              adventures for children. Donations are made periodically by the founder to
              children&apos;s charities in Singapore, including organisations supporting children
              affected by cancer.
            </p>

            <p className="mt-4 text-sm font-semibold text-detective-orange-500">
              Donation updates will be published regularly here on the Membership page.
            </p>
          </motion.div>
        </Container>
      </section>

      {/* Contribution methods */}
      <section className="py-16 sm:py-24">
        <Container>
          <SectionHeading
            eyebrow="How to contribute"
            title="Choose Your Contribution Method"
            subtitle="Make your one-time SGD 10 contribution using either option below."
          />
          <div className="mx-auto mt-12 grid max-w-4xl gap-6 md:grid-cols-2">
            <PayNowCard />
            <BankTransferCard />
          </div>
        </Container>
      </section>

      {/* Confirmation */}
      <section className="bg-detective-blue-50/70 py-16 sm:py-24">
        <Container>
          <SectionHeading title="I've Completed My Contribution" />
          <div className="mx-auto mt-12 max-w-2xl rounded-[2rem] border-2 border-detective-blue-100 bg-white p-6 shadow-sm sm:p-10">
            {!isLoaded ? (
              <p className="text-center font-display font-semibold text-detective-blue-700">
                Checking your IP Detective badge…
              </p>
            ) : user ? (
              <ContributionForm onSubmitted={() => setJustSubmitted(true)} />
            ) : (
              <div className="text-center">
                <p className="text-lg text-detective-blue-700/85">
                  Please log in or create your free account so we can link your contribution to
                  your detective profile.
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
                  <Link
                    href="/login?redirect=%2Fmembership"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-detective-orange-500 px-8 py-4 font-display text-lg font-semibold text-white shadow-lg transition-colors hover:bg-detective-orange-600"
                  >
                    <LogIn className="h-5 w-5" aria-hidden="true" />
                    Login
                  </Link>
                  <Link
                    href="/register?redirect=%2Fmembership"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-detective-blue-600 px-8 py-4 font-display text-lg font-semibold text-white shadow-lg transition-colors hover:bg-detective-blue-700"
                  >
                    <Sparkles className="h-5 w-5" aria-hidden="true" />
                    Create Free Account
                  </Link>
                </div>
              </div>
            )}
          </div>
        </Container>
      </section>
    </>
  );
}