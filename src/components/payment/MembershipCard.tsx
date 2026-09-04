"use client";

import { Check, Star } from "lucide-react";
import { MEMBERSHIP_PRICE, membershipBenefits } from "@/lib/membership";

/**
 * Premium membership card summarising the one-time contribution and its
 * benefits. Pure presentation so it can be reused anywhere.
 */
export function MembershipCard() {
  return (
    <article className="relative overflow-hidden rounded-[2rem] border-2 border-detective-yellow-300 bg-gradient-to-br from-detective-blue-600 to-detective-blue-900 p-[3px] shadow-2xl">
      <div className="rounded-[1.85rem] bg-gradient-to-br from-detective-blue-600 to-detective-blue-900 p-8 sm:p-10">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-10 -top-10 h-48 w-48 rounded-full bg-detective-yellow-400/20 blur-2xl"
        />

        <div className="relative flex items-center gap-2 font-display text-sm font-semibold uppercase tracking-[0.2em] text-detective-yellow-300">
          <Star className="h-5 w-5 fill-detective-yellow-300" aria-hidden="true" />
          Brand Quest Membership
        </div>

        <p className="relative mt-6 font-display text-lg font-semibold text-detective-blue-100">
          One-time Contribution
        </p>
        <p className="relative mt-1 font-display text-5xl font-bold text-white sm:text-6xl">
          {MEMBERSHIP_PRICE}
        </p>

        <ul className="relative mt-8 space-y-3">
          {membershipBenefits.map((benefit) => (
            <li key={benefit} className="flex items-start gap-3 text-white">
              <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-detective-yellow-400 text-detective-blue-900">
                <Check className="h-4 w-4" aria-hidden="true" />
              </span>
              <span className="text-base text-detective-blue-50">{benefit}</span>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}
