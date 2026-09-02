"use client";

import { motion } from "framer-motion";
import { MapPin } from "lucide-react";

/** Dashed placeholder standing in for an embedded map. */
export function MapPlaceholder() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      role="img"
      aria-label="Map placeholder showing the Brand Quest location"
      className="grid aspect-[16/9] w-full place-items-center rounded-3xl border-4 border-dashed border-detective-blue-200 bg-detective-blue-50/60"
    >
      <div className="text-center">
        <MapPin className="mx-auto h-12 w-12 text-detective-blue-400" aria-hidden="true" />
        <p className="mt-3 font-display font-semibold text-detective-blue-700">
          Map coming soon
        </p>
      </div>
    </motion.div>
  );
}
