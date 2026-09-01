"use client";

import { motion } from "framer-motion";
import { Building2, HeadphonesIcon, Mail, type LucideIcon } from "lucide-react";
import { fadeUp, inViewOnce, staggerContainer } from "@/lib/motion";
import type { ContactCard } from "@/lib/contact-content";

const icons: Record<ContactCard["icon"], LucideIcon> = {
  mail: Mail,
  building: Building2,
  support: HeadphonesIcon,
};

/** Colourful icon cards for each contact channel. */
export function ContactCards({ cards }: { cards: ContactCard[] }) {
  return (
    <motion.ul
      variants={staggerContainer}
      {...inViewOnce}
      className="grid gap-6 sm:grid-cols-3"
    >
      {cards.map((card) => {
        const Icon = icons[card.icon];

        return (
          <motion.li key={card.id} variants={fadeUp}>
            <motion.div
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className={`h-full rounded-3xl border-2 p-6 text-center shadow-sm transition-shadow hover:shadow-lg ${card.surface}`}
            >
              <span
                className={`mx-auto grid h-14 w-14 place-items-center rounded-2xl shadow-md ${card.badge}`}
              >
                <Icon className="h-7 w-7" aria-hidden="true" />
              </span>

              <h3 className="mt-4 font-display text-xl font-bold text-detective-blue-900">
                {card.title}
              </h3>
              <p className="mt-2 text-detective-blue-700/85">{card.description}</p>
              <a
                href={`mailto:${card.email}`}
                className="mt-4 inline-block font-display font-semibold text-detective-blue-700 underline-offset-4 hover:underline"
              >
                {card.email}
              </a>
            </motion.div>
          </motion.li>
        );
      })}
    </motion.ul>
  );
}
