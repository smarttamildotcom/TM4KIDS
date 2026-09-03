"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Clock } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { worldQuestyArt } from "@/lib/questy-art";
import type { World } from "@/lib/worlds";

/** Highlighted "continue where you left off" card for the next unfinished world. */
export function NextLessonCard({ world }: { world: World }) {
  const art = worldQuestyArt[world.id];

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="relative overflow-hidden rounded-[2rem] border-2 border-detective-yellow-300 bg-gradient-to-br from-detective-yellow-100 to-detective-orange-100 p-6 shadow-lg sm:p-8"
    >
      <motion.div
        aria-hidden="true"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -right-2 -top-2"
      >
        <Image
          src={art.src}
          alt=""
          sizes="96px"
          className="h-[96px] w-auto object-contain opacity-90"
        />
      </motion.div>

      <p className="font-display text-sm font-semibold uppercase tracking-widest text-detective-orange-600">
        Next world
      </p>
      <h3 className="mt-2 max-w-xs font-display text-2xl font-bold text-detective-blue-900 sm:text-3xl">
        World {world.id}: {world.name}
      </h3>

      <p className="mt-3 inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 font-display text-sm font-semibold text-detective-blue-700">
        <Clock className="h-4 w-4" aria-hidden="true" />
        {world.time} · {world.xp} XP
      </p>

      <div className="mt-6">
        <Button href="/#journey" size="lg">
          Continue
          <ArrowRight className="h-5 w-5" aria-hidden="true" />
        </Button>
      </div>
    </motion.div>
  );
}
