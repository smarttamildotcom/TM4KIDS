"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Award, Globe2, Star } from "lucide-react";
import celebratingQuesty from "@/4. Celebrating Questy.png";

type CelebrationModalProps = {
  xpEarned: number;
  badgesEarned: number;
  worldsCompleted: number;
  onClose: () => void;
};

const confettiPieces = Array.from({ length: 18 }, (_, index) => ({
  id: index,
  left: `${(index * 5.5 + 4) % 96}%`,
  emoji: ["⭐", "🎉", "🏅", "✨", "🐾"][index % 5],
  delay: (index % 6) * 0.15,
  duration: 3 + (index % 4) * 0.5,
}));

/** Full-screen celebration shown once the free trial (Worlds 1–2) is finished. */
export function CelebrationModal({
  xpEarned,
  badgesEarned,
  worldsCompleted,
  onClose,
}: CelebrationModalProps) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    closeRef.current?.focus();

    function handleKey(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }

    document.addEventListener("keydown", handleKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [onClose]);

  const stats = [
    { icon: Star, label: "XP earned", value: xpEarned.toLocaleString(), emoji: "⭐" },
    { icon: Award, label: "Badges collected", value: badgesEarned, emoji: "🏅" },
    { icon: Globe2, label: "Worlds completed", value: `${worldsCompleted} of 15`, emoji: "🌍" },
  ];

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-labelledby="celebration-title"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] grid place-items-center overflow-y-auto bg-detective-blue-900/70 p-4 backdrop-blur-sm"
    >
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 overflow-hidden">
        {confettiPieces.map((piece) => (
          <motion.span
            key={piece.id}
            initial={{ y: -60, opacity: 0 }}
            animate={{ y: "105vh", opacity: [0, 1, 1, 0], rotate: 360 }}
            transition={{
              duration: piece.duration,
              delay: piece.delay,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{ left: piece.left }}
            className="absolute top-0 text-2xl"
          >
            {piece.emoji}
          </motion.span>
        ))}
      </div>

      <motion.div
        initial={{ scale: 0.9, y: 30 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 220, damping: 24 }}
        className="relative my-8 w-full max-w-2xl rounded-[32px] border-4 border-detective-yellow-300 bg-white p-6 text-center shadow-2xl sm:p-10"
      >
        <motion.div
          animate={{ y: [0, -12, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="mx-auto w-fit"
        >
          <Image
            src={celebratingQuesty}
            alt="Questy the detective mascot celebrating"
            sizes="(min-width: 640px) 200px, 150px"
            className="h-[150px] w-auto object-contain drop-shadow-xl sm:h-[200px]"
          />
        </motion.div>

        <h2
          id="celebration-title"
          className="mt-4 font-display text-3xl font-bold text-detective-blue-900 sm:text-4xl"
        >
          🎉 Fantastic Detective Work!
        </h2>

        <p className="mt-3 font-display text-lg font-semibold text-detective-orange-500">
          Questy is impressed!
          <br />
          You&apos;ve completed the free detective training.
        </p>

        <p className="mx-auto mt-4 max-w-lg text-base text-detective-blue-700/85">
          You&apos;re now ready to explore the remaining 13 detective worlds, unlock exclusive
          missions, collect badges and become a Brand Quest Master Detective.
        </p>

        <ul className="mt-8 grid gap-4 sm:grid-cols-3">
          {stats.map((stat) => (
            <li
              key={stat.label}
              className="rounded-3xl border-2 border-detective-blue-100 bg-detective-blue-50/60 p-4"
            >
              <span aria-hidden="true" className="block text-2xl">
                {stat.emoji}
              </span>
              <p className="mt-1 font-display text-2xl font-bold text-detective-blue-900">
                {stat.value}
              </p>
              <p className="text-sm font-semibold text-detective-blue-700/80">{stat.label}</p>
            </li>
          ))}
        </ul>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/login?redirect=%2F%23journey"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-detective-orange-500 px-8 py-4 font-display text-lg font-semibold text-white shadow-lg transition-colors hover:bg-detective-orange-600"
          >
            Continue Adventure
            <ArrowRight className="h-5 w-5" aria-hidden="true" />
          </Link>

          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            className="inline-flex items-center justify-center rounded-full border-2 border-detective-blue-200 bg-white px-8 py-4 font-display text-lg font-semibold text-detective-blue-700 transition-colors hover:bg-detective-blue-50"
          >
            Maybe Later
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
