"use client";

import { BadgeCase, useGame } from "@/components/gamification";
import { CertificateShelf } from "@/components/dashboard/CertificateShelf";
import { badges } from "@/lib/gamification/config";

/** Achievements body: badge case + certificate shelf, driven by live player state. */
export function AchievementsView() {
  const { player } = useGame();

  return (
    <div className="space-y-8">
      <section
        aria-labelledby="badges-heading"
        className="rounded-[2rem] border-2 border-detective-blue-100 bg-white p-6 shadow-md sm:p-8"
      >
        <h2
          id="badges-heading"
          className="mb-1 font-display text-xl font-bold text-detective-blue-900 sm:text-2xl"
        >
          Badge collection
        </h2>
        <p className="mb-6 text-detective-blue-700/85">
          {player.badgeIds.length} of {badges.length} badges earned.
        </p>
        <BadgeCase earnedIds={player.badgeIds} />
      </section>

      <section
        aria-labelledby="certificates-heading"
        className="rounded-[2rem] border-2 border-detective-blue-100 bg-white p-6 shadow-md sm:p-8"
      >
        <h2
          id="certificates-heading"
          className="mb-1 font-display text-xl font-bold text-detective-blue-900 sm:text-2xl"
        >
          Certificates
        </h2>
        <p className="mb-6 text-detective-blue-700/85">
          Finish lessons to unlock printable certificates.
        </p>
        <CertificateShelf earnedIds={player.certificateIds} />
      </section>
    </div>
  );
}
