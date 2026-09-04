"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { questyArt } from "@/lib/questy-art";

/**
 * Shown when a contribution has been rejected. Lets the detective submit a new
 * contribution reference to try again.
 */
export function MembershipRejected({ onResubmit }: { onResubmit: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="mx-auto max-w-2xl rounded-[2rem] border-2 border-red-200 bg-red-50/70 p-8 text-center shadow-sm sm:p-12"
    >
      <div aria-hidden="true" className="mx-auto w-fit">
        <Image
          src={questyArt.thinking}
          alt="Questy the detective mascot"
          sizes="(min-width: 640px) 180px, 140px"
          className="h-[140px] w-auto object-contain drop-shadow-xl sm:h-[180px]"
        />
      </div>

      <h2 className="mt-6 font-display text-3xl font-bold text-detective-blue-900 sm:text-4xl">
        Verification Unsuccessful
      </h2>

      <div className="mx-auto mt-4 max-w-lg space-y-2 text-base text-detective-blue-700/85">
        <p>Your contribution could not be verified.</p>
        <p>Please contact us or submit another contribution reference.</p>
      </div>

      <button
        type="button"
        onClick={onResubmit}
        className="mt-8 inline-flex items-center justify-center rounded-full bg-detective-orange-500 px-8 py-4 font-display text-lg font-semibold text-white shadow-lg transition-colors hover:bg-detective-orange-600"
      >
        Resubmit Contribution
      </button>
    </motion.div>
  );
}
