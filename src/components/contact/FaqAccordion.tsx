"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { QuestyExpression, type QuestyMood } from "@/components/illustrations/QuestyExpression";
import { fadeUp, inViewOnce, staggerContainer } from "@/lib/motion";
import type { FaqItem } from "@/lib/contact-content";

type AccordionItem = FaqItem & { mood?: QuestyMood };

/** Single expand/collapse question, animated with a height transition. */
function FaqRow({
  item,
  isOpen,
  onToggle,
}: {
  item: AccordionItem;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <motion.li
      variants={fadeUp}
      className="overflow-hidden rounded-2xl border-2 border-detective-blue-100 bg-white shadow-sm"
    >
      <h3>
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={isOpen}
          className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left font-display font-semibold text-detective-blue-900"
        >
          <span className="flex min-w-0 items-center gap-3">
            {item.mood && (
              <span className="grid h-10 w-10 shrink-0 place-items-center overflow-hidden rounded-full bg-detective-blue-50">
                <QuestyExpression mood={item.mood} size={38} />
              </span>
            )}
            {item.question}
          </span>
          <motion.span
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.2 }}
            className="shrink-0"
          >
            <ChevronDown className="h-5 w-5 text-detective-blue-500" aria-hidden="true" />
          </motion.span>
        </button>
      </h3>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="overflow-hidden"
          >
            <p className="px-5 pb-5 text-detective-blue-700/85">{item.answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.li>
  );
}

/** Accordion of frequently asked questions. Only one entry is open at a time. */
export function FaqAccordion({ items }: { items: AccordionItem[] }) {
  const [openId, setOpenId] = useState<string | null>(items[0]?.id ?? null);

  return (
    <motion.ul
      variants={staggerContainer}
      {...inViewOnce}
      className="mx-auto max-w-2xl space-y-3"
    >
      {items.map((item) => (
        <FaqRow
          key={item.id}
          item={item}
          isOpen={openId === item.id}
          onToggle={() => setOpenId((current) => (current === item.id ? null : item.id))}
        />
      ))}
    </motion.ul>
  );
}
