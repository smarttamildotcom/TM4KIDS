"use client";

import { motion } from "framer-motion";
import { GraduationCap, Mail } from "lucide-react";
import { fadeUp, inViewOnce } from "@/lib/motion";
import type { ContactCard } from "@/lib/contact-content";

export function ContactCards({ cards }: { cards: ContactCard[] }) {
  return (
    <motion.div variants={fadeUp} {...inViewOnce} className="mx-auto grid max-w-3xl gap-4 sm:grid-cols-2">
      {cards.map((card) => {
        const Icon = card.kind === "school" ? GraduationCap : Mail;
        return (
          <motion.a
            key={card.id}
            href="#contact-form"
            whileHover={{ y: -4 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className={`rounded-2xl border-2 p-5 text-center shadow-sm transition-shadow hover:shadow-md sm:p-6 ${card.surface}`}
          >
            <span className={`mx-auto grid h-11 w-11 place-items-center rounded-xl shadow-sm ${card.badge}`}>
              <Icon className="h-5 w-5" aria-hidden="true" />
            </span>
            <h2 className="mt-3 font-display text-lg font-bold text-detective-blue-900">{card.title}</h2>
            <p className="mt-1.5 text-sm leading-6 text-detective-blue-700/85">{card.description}</p>
            <span className="mt-3 inline-block font-display text-sm font-semibold text-detective-blue-700">Send us a message →</span>
          </motion.a>
        );
      })}
    </motion.div>
  );
}
