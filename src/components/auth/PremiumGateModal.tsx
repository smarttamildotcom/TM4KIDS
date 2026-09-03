"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { LogIn, Sparkles } from "lucide-react";
import { questyArt } from "@/lib/questy-art";

/** Shown when a signed-out visitor tries to open Worlds 3–15. */
export function PremiumGateModal({ onClose }: { onClose: () => void }) {
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

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-labelledby="premium-gate-title"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-[100] grid place-items-center overflow-y-auto bg-detective-blue-900/70 p-4 backdrop-blur-sm"
    >
      <motion.div
        initial={{ scale: 0.9, y: 30 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 220, damping: 24 }}
        onClick={(event) => event.stopPropagation()}
        className="relative my-8 w-full max-w-lg rounded-[32px] border-4 border-detective-yellow-300 bg-white p-6 text-center shadow-2xl sm:p-10"
      >
        <motion.div
          animate={{ y: [0, -12, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="mx-auto w-fit"
        >
          <Image
            src={questyArt.detective}
            alt="Questy the detective mascot holding a magnifying glass"
            sizes="(min-width: 640px) 180px, 140px"
            className="h-[140px] w-auto object-contain drop-shadow-xl sm:h-[180px]"
          />
        </motion.div>

        <h2
          id="premium-gate-title"
          className="mt-4 font-display text-2xl font-bold text-detective-blue-900 sm:text-3xl"
        >
          🔒 Continue Your Adventure!
        </h2>

        <p className="mt-3 font-display text-lg font-semibold text-detective-orange-500">
          You&apos;ve completed the free worlds!
        </p>

        <p className="mx-auto mt-3 max-w-md text-base text-detective-blue-700/85">
          Create your free account to continue exploring the remaining 13 worlds, save your
          progress, earn badges and become a Master Brand Detective.
        </p>

        <div className="mt-8 flex flex-col gap-3">
          <Link
            href="/login?redirect=%2F%23journey"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-detective-orange-500 px-8 py-4 font-display text-lg font-semibold text-white shadow-lg transition-colors hover:bg-detective-orange-600"
          >
            <LogIn className="h-5 w-5" aria-hidden="true" />
            Login
          </Link>

          <Link
            href="/register?redirect=%2F%23journey"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-detective-blue-600 px-8 py-4 font-display text-lg font-semibold text-white shadow-lg transition-colors hover:bg-detective-blue-700"
          >
            <Sparkles className="h-5 w-5" aria-hidden="true" />
            Create Free Account
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
