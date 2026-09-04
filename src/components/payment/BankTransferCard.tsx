"use client";

import { Landmark } from "lucide-react";

type BankDetail = { label: string; value: string };

/**
 * Bank transfer contribution option. Values are placeholders — update
 * `bankDetails` with the real account information when it is ready. No other
 * code changes are required.
 */
const bankDetails: BankDetail[] = [
  { label: "Bank Name", value: "To be updated" },
  { label: "Account Name", value: "To be updated" },
  { label: "Account Number", value: "To be updated" },
];

export function BankTransferCard() {
  return (
    <article className="flex h-full flex-col rounded-3xl border-2 border-detective-blue-100 bg-white p-6 shadow-sm sm:p-8">
      <div className="flex items-center gap-3">
        <span className="grid h-12 w-12 place-items-center rounded-2xl bg-detective-orange-500 text-white shadow-md">
          <Landmark className="h-6 w-6" aria-hidden="true" />
        </span>
        <h3 className="font-display text-xl font-bold text-detective-blue-900 sm:text-2xl">
          Bank Transfer
        </h3>
      </div>

      <dl className="mt-6 space-y-4">
        {bankDetails.map((detail) => (
          <div
            key={detail.label}
            className="rounded-2xl border border-detective-blue-100 bg-detective-blue-50/60 px-4 py-3"
          >
            <dt className="font-display text-xs font-semibold uppercase tracking-widest text-detective-blue-500">
              {detail.label}
            </dt>
            <dd className="mt-1 font-display text-lg font-bold text-detective-blue-900">
              {detail.value}
            </dd>
          </div>
        ))}
      </dl>
    </article>
  );
}
