"use client";

import { motion } from "framer-motion";
import { Clock } from "lucide-react";
import { fadeUp, inViewOnce, staggerContainer } from "@/lib/motion";
import { charityPartners, donationUpdates, missionPoints } from "@/lib/csr-content";

/** Three cards explaining how giving is built into Brand Quest. */
export function MissionPoints() {
  return (
    <motion.ul
      variants={staggerContainer}
      {...inViewOnce}
      className="grid gap-6 sm:grid-cols-3"
    >
      {missionPoints.map((point) => (
        <motion.li key={point.title} variants={fadeUp}>
          <motion.article
            whileHover={{ y: -8 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="h-full rounded-3xl border-2 border-detective-blue-100 bg-white p-6 shadow-sm transition-shadow hover:shadow-xl"
          >
            <motion.span
              aria-hidden="true"
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="block text-4xl"
            >
              {point.emoji}
            </motion.span>
            <h3 className="mt-4 font-display text-xl font-bold text-detective-blue-900">
              {point.title}
            </h3>
            <p className="mt-2 text-detective-blue-700/85">{point.body}</p>
          </motion.article>
        </motion.li>
      ))}
    </motion.ul>
  );
}

/** The two charity partner cards. */
export function CharityCards() {
  return (
    <motion.ul
      variants={staggerContainer}
      {...inViewOnce}
      className="grid gap-6 sm:grid-cols-2"
    >
      {charityPartners.map((partner) => {
        const Icon = partner.icon;

        return (
          <motion.li key={partner.id} variants={fadeUp}>
            <motion.article
              whileHover={{ y: -10, scale: 1.02 }}
              whileFocus={{ y: -10, scale: 1.02 }}
              tabIndex={0}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className={`h-full rounded-3xl border-2 p-6 shadow-sm transition-shadow hover:shadow-xl sm:p-8 ${partner.surface}`}
            >
              <span
                className={`grid h-14 w-14 place-items-center rounded-2xl shadow-md ${partner.badge}`}
              >
                <Icon className="h-7 w-7" aria-hidden="true" />
              </span>

              <h3 className="mt-5 font-display text-xl font-bold text-detective-blue-900 sm:text-2xl">
                {partner.name}
              </h3>
              <p className="mt-3 text-detective-blue-700/85">{partner.description}</p>
            </motion.article>
          </motion.li>
        );
      })}
    </motion.ul>
  );
}

/** Placeholder cards for future transparency reporting. */
export function DonationUpdateCards() {
  return (
    <motion.ul
      variants={staggerContainer}
      {...inViewOnce}
      className="grid gap-6 sm:grid-cols-3"
    >
      {donationUpdates.map((update) => (
        <motion.li key={update.id} variants={fadeUp}>
          <motion.article
            whileHover={{ y: -8 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="h-full rounded-3xl border-2 border-dashed border-detective-blue-200 bg-white p-6 text-center shadow-sm transition-shadow hover:shadow-lg"
          >
            <span className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-detective-blue-50 text-detective-blue-600">
              <Clock className="h-6 w-6" aria-hidden="true" />
            </span>
            <h3 className="mt-4 font-display text-lg font-bold text-detective-blue-900">
              {update.title}
            </h3>
            <p className="mt-2 font-display text-sm font-semibold uppercase tracking-widest text-detective-orange-500">
              {update.note}
            </p>
          </motion.article>
        </motion.li>
      ))}
    </motion.ul>
  );
}
