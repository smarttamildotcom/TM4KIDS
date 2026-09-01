"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Lock } from "lucide-react";
import { certificates } from "@/lib/gamification/config";
import { fadeUp, inViewOnce, staggerContainer } from "@/lib/motion";

/** Shows which certificates have been unlocked, linking to the printable view. */
export function CertificateShelf({ earnedIds }: { earnedIds: string[] }) {
  return (
    <motion.ul
      variants={staggerContainer}
      {...inViewOnce}
      className="grid gap-4 sm:grid-cols-2"
    >
      {certificates.map((certificate) => {
        const isEarned = earnedIds.includes(certificate.id);

        const body = (
          <>
            <span
              aria-hidden="true"
              className={`grid h-14 w-14 shrink-0 place-items-center rounded-2xl text-3xl ${
                isEarned
                  ? "bg-gradient-to-br from-detective-yellow-300 to-detective-orange-500"
                  : "bg-detective-blue-100"
              }`}
            >
              {isEarned ? certificate.emoji : <Lock className="h-6 w-6 text-detective-blue-700" />}
            </span>
            <span>
              <span className="block font-display text-lg font-bold text-detective-blue-900">
                {certificate.title}
              </span>
              <span className="block text-sm text-detective-blue-700/80">
                {isEarned ? "Tap to view and print" : certificate.subtitle}
              </span>
            </span>
          </>
        );

        return (
          <motion.li key={certificate.id} variants={fadeUp}>
            {isEarned ? (
              <motion.div whileHover={{ y: -6 }}>
                <Link
                  href={`/certificates/${certificate.id}`}
                  className="flex items-center gap-4 rounded-3xl border-2 border-detective-yellow-300 bg-detective-yellow-100 p-4 shadow-sm transition-shadow hover:shadow-lg"
                >
                  {body}
                </Link>
              </motion.div>
            ) : (
              <div
                aria-disabled="true"
                className="flex items-center gap-4 rounded-3xl border-2 border-detective-blue-100 bg-detective-blue-50/60 p-4 opacity-75"
              >
                {body}
              </div>
            )}
          </motion.li>
        );
      })}
    </motion.ul>
  );
}
