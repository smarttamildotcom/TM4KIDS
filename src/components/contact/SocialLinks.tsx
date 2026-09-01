"use client";

import { motion } from "framer-motion";
import {
  Facebook,
  Instagram,
  Linkedin,
  Youtube,
  type LucideIcon,
} from "lucide-react";
import { fadeUp, inViewOnce, staggerContainer } from "@/lib/motion";
import type { SocialLink } from "@/lib/contact-content";

const icons: Record<SocialLink["icon"], LucideIcon> = {
  facebook: Facebook,
  instagram: Instagram,
  youtube: Youtube,
  linkedin: Linkedin,
};

/** Row of social-media placeholder icons; swap `href` values once profiles exist. */
export function SocialLinks({ links }: { links: SocialLink[] }) {
  return (
    <motion.ul
      variants={staggerContainer}
      {...inViewOnce}
      className="flex flex-wrap items-center justify-center gap-4"
    >
      {links.map((link) => {
        const Icon = icons[link.icon];

        return (
          <motion.li key={link.id} variants={fadeUp}>
            <motion.a
              href={link.href}
              aria-label={link.label}
              whileHover={{ scale: 1.12, rotate: -4 }}
              whileTap={{ scale: 0.95 }}
              className="grid h-14 w-14 place-items-center rounded-full bg-detective-blue-50 text-detective-blue-700 shadow-sm transition-colors hover:bg-detective-blue-100"
            >
              <Icon className="h-6 w-6" aria-hidden="true" />
            </motion.a>
          </motion.li>
        );
      })}
    </motion.ul>
  );
}
