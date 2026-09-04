"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { questyArt } from "@/lib/questy-art";

/**
 * Manual-verification holding state, shown after a contribution is submitted or
 * whenever the account is PENDING. Membership is activated by hand within 24h.
 */
export function PendingVerification() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="mx-auto max-w-2xl rounded-[2rem] border-2 border-detective-yellow-300 bg-detective-yellow-100/60 p-8 text-center shadow-sm sm:p-12"
    >
      <motion.div
        aria-hidden="true"
        animate={{ y: [0, -12, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="mx-auto w-fit"
      >
        <Image
          src={questyArt.celebrating}
          alt="Questy the detective mascot celebrating"
          sizes="(min-width: 640px) 200px, 150px"
          className="h-[150px] w-auto object-contain drop-shadow-xl sm:h-[200px]"
        />
      </motion.div>

      <h2 className="mt-6 font-display text-3xl font-bold text-detective-blue-900 sm:text-4xl">
        Contribution Received!
      </h2>

      <p className="mt-4 text-lg font-semibold text-detective-orange-500">
        Thank you for supporting Brand Quest.
      </p>

      <div className="mx-auto mt-4 max-w-lg space-y-2 text-base text-detective-blue-700/85">
        <p>Your membership will be activated after verification.</p>
        <p>This normally takes less than 24 hours.</p>
        <p>You&apos;ll receive an email once your membership becomes active.</p>
      </div>

      <Link
        href="/#journey"
        className="mt-8 inline-flex items-center justify-center rounded-full bg-detective-orange-500 px-8 py-4 font-display text-lg font-semibold text-white shadow-lg transition-colors hover:bg-detective-orange-600"
      >
        Back to the Journey
      </Link>
    </motion.div>
  );
}
