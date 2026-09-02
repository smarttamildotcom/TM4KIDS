"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import type { ReactNode } from "react";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { BRAND } from "@/lib/brand";

type AuthLayoutProps = {
  headline: string;
  subtitle: string;
  illustrationLabel: string;
  illustrationEmoji: string;
  children: ReactNode;
};

/** Split-screen shell shared by the login, register and reset pages. */
export function AuthLayout({
  headline,
  subtitle,
  illustrationLabel,
  illustrationEmoji,
  children,
}: AuthLayoutProps) {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      {/* Left: branding + illustration */}
      <section className="relative overflow-hidden bg-gradient-to-br from-detective-blue-600 to-detective-blue-900 px-6 py-12 text-white sm:px-10 lg:py-16">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-detective-yellow-400/25 blur-3xl" />
          <div className="absolute -bottom-24 left-0 h-64 w-64 rounded-full bg-detective-orange-500/25 blur-3xl" />
        </div>

        <div className="relative mx-auto flex h-full max-w-lg flex-col">
          <Link
            href="/"
            className="inline-flex items-center gap-2 font-display text-lg font-bold text-white"
          >
            <span
              aria-hidden="true"
              className="grid h-10 w-10 place-items-center rounded-full bg-detective-yellow-400 text-detective-blue-900"
            >
              <Search className="h-5 w-5" />
            </span>
            <span className="leading-none">
              <span className="block">{BRAND.wordmarkPrimary}</span>
              {BRAND.wordmarkSecondary ? (
                <span className="block text-detective-yellow-300">
                  {BRAND.wordmarkSecondary}
                </span>
              ) : null}
              <span className="mt-1 block text-[10px] font-semibold text-detective-blue-100">
                {BRAND.tagline}
              </span>
            </span>
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="mt-10 lg:mt-16"
          >
            <h1 className="font-display text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
              {headline}
            </h1>
            <p className="mt-4 text-lg text-detective-blue-100">{subtitle}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.15, ease: "easeOut" }}
            className="relative mx-auto mt-10 w-full max-w-sm"
          >
            <ImagePlaceholder
              label={illustrationLabel}
              emoji={illustrationEmoji}
              className="aspect-square w-full border-white/40 bg-white/10 text-white"
            />

            <motion.span
              aria-hidden="true"
              animate={{ y: [0, -16, 0], rotate: [-6, 6, -6] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -right-3 -top-5 grid h-20 w-20 place-items-center rounded-full bg-detective-yellow-400 shadow-2xl"
            >
              <Search className="h-10 w-10 text-detective-blue-900" />
            </motion.span>
          </motion.div>
        </div>
      </section>

      {/* Right: form card */}
      <section className="flex items-center justify-center bg-detective-blue-50/50 px-4 py-12 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
          className="w-full max-w-md rounded-[2rem] border-2 border-detective-blue-100 bg-white p-6 shadow-2xl sm:p-8"
        >
          {children}
        </motion.div>
      </section>
    </div>
  );
}
