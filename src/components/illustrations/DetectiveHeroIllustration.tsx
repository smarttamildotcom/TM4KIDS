"use client";

import { motion } from "framer-motion";

const float = (distance: number, duration: number, delay = 0) => ({
  animate: { y: [0, -distance, 0], rotate: [-1, 2, -1] },
  transition: { duration, delay, repeat: Infinity, ease: "easeInOut" as const },
});

/** Layered vector scene for the academy homepage hero. */
export function DetectiveHeroIllustration() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.94 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.65, ease: "easeOut", delay: 0.1 }}
      className="relative mx-auto w-full max-w-[34rem]"
    >
      <svg
        viewBox="0 0 560 500"
        role="img"
        aria-labelledby="detective-hero-title detective-hero-description"
        className="h-auto w-full drop-shadow-2xl"
      >
        <title id="detective-hero-title">Young Brand Detective</title>
        <desc id="detective-hero-description">
          A cartoon child detective studies clues, fictional logos, a treasure map,
          notebook, footprints, stars, badges and a friendly mascot.
        </desc>

        <path
          d="M68 125C92 55 190 18 279 37c91 20 187 19 216 92 30 76-3 171 10 249 10 63-78 100-166 94-92-7-191 31-246-31-56-63-50-151-37-220 7-37 1-65 12-96Z"
          fill="#D9EDFF"
        />
        <circle cx="452" cy="110" r="46" fill="#FFD84D" opacity=".72" />
        <circle cx="96" cy="355" r="54" fill="#FFEADB" />

        {/* Treasure map and clue trail. */}
        <g transform="translate(54 292) rotate(-7)">
          <path d="m0 20 76-14 60 16 73-15v122l-73 15-60-16-76 14Z" fill="#FFF6D6" stroke="#F5B500" strokeWidth="5" />
          <path d="M76 6v122M136 22v122" stroke="#F5B500" strokeWidth="3" strokeDasharray="7 7" />
          <path d="M23 94c30-48 64 14 100-30 31-38 48 13 63-22" fill="none" stroke="#F97316" strokeWidth="4" strokeDasharray="8 8" />
          <path d="m174 30 15 18m0-18-15 18" stroke="#E05A05" strokeWidth="6" strokeLinecap="round" />
        </g>

        {/* Child detective. */}
        <g>
          <path d="M216 285c-15 72-14 133-12 168h130c4-47 1-110-16-169Z" fill="#0B68CC" />
          <path d="M236 279 275 326l35-47" fill="#fff" />
          <path d="m253 295 22 31 20-31-8 99-26 1Z" fill="#F97316" />
          <circle cx="274" cy="215" r="73" fill="#BCE0FF" />
          <circle cx="274" cy="224" r="59" fill="#EFB88C" />
          <path d="M216 211c4-57 26-81 63-81 40 0 63 31 61 77-17-7-30-23-37-40-22 28-50 40-87 44Z" fill="#0B2F5C" />
          <path d="M216 183c7-50 35-78 74-78 37 0 67 26 75 67l-149 11Z" fill="#0B68CC" />
          <path d="M235 118c21-15 77-17 105 6l-8 27-102 7Z" fill="#1A86F0" />
          <path d="M208 177c41 13 113 10 164-9" fill="none" stroke="#FFC820" strokeWidth="13" strokeLinecap="round" />
          <circle cx="252" cy="224" r="5" fill="#0B2F5C" />
          <circle cx="299" cy="224" r="5" fill="#0B2F5C" />
          <path d="M259 252c12 9 26 9 38-1" fill="none" stroke="#9A4C36" strokeWidth="4" strokeLinecap="round" />
          <path d="M220 307c-44 13-70 34-91 71" fill="none" stroke="#EFB88C" strokeWidth="21" strokeLinecap="round" />
          <path d="M322 306c31 13 50 34 67 59" fill="none" stroke="#EFB88C" strokeWidth="21" strokeLinecap="round" />
        </g>

        {/* Magnifying glass. */}
        <g transform="translate(344 291) rotate(-15)">
          <circle cx="45" cy="45" r="39" fill="#fff" fillOpacity=".5" stroke="#0B2F5C" strokeWidth="12" />
          <path d="m73 73 52 58" stroke="#0B2F5C" strokeWidth="17" strokeLinecap="round" />
          <path d="M29 26c10-9 23-11 34-6" fill="none" stroke="#fff" strokeWidth="7" strokeLinecap="round" opacity=".8" />
        </g>

        {/* Detective notebook. */}
        <g transform="translate(367 373) rotate(7)">
          <rect width="100" height="78" rx="10" fill="#FFC820" stroke="#0B2F5C" strokeWidth="5" />
          <path d="M20 22h59M20 39h49M20 56h56" stroke="#0B68CC" strokeWidth="5" strokeLinecap="round" />
          <path d="M10 10v58" stroke="#F97316" strokeWidth="5" />
        </g>

        {/* Footprints leading toward the clue. */}
        <g fill="#0B68CC" opacity=".45">
          <ellipse cx="102" cy="267" rx="10" ry="17" transform="rotate(-28 102 267)" />
          <ellipse cx="131" cy="244" rx="10" ry="17" transform="rotate(22 131 244)" />
          <ellipse cx="153" cy="213" rx="9" ry="15" transform="rotate(-25 153 213)" />
        </g>

        {/* Friendly mascot. */}
        <g transform="translate(418 196)">
          <circle cx="48" cy="53" r="43" fill="#FF8F3C" />
          <path d="m17 25 2-24 25 19M79 25 77 1 52 20" fill="#FF8F3C" stroke="#0B2F5C" strokeWidth="4" strokeLinejoin="round" />
          <circle cx="34" cy="49" r="5" fill="#0B2F5C" />
          <circle cx="62" cy="49" r="5" fill="#0B2F5C" />
          <path d="M36 68c9 8 18 8 26 0" fill="none" stroke="#0B2F5C" strokeWidth="4" strokeLinecap="round" />
          <path d="M24 42 9 35M72 42l15-7M25 58 7 61M71 58l18 3" stroke="#0B2F5C" strokeWidth="3" strokeLinecap="round" />
        </g>

        {/* Fictional logo tiles. */}
        <g>
          <rect x="77" y="112" width="70" height="70" rx="20" fill="#fff" stroke="#40A3FF" strokeWidth="4" />
          <path d="m112 128 9 19 21 3-15 15 4 21-19-10-19 10 4-21-15-15 21-3Z" fill="#FFC820" />
          <rect x="397" y="67" width="72" height="72" rx="20" fill="#fff" stroke="#FF8F3C" strokeWidth="4" />
          <path d="M416 112c24-38 37-30 39-25-8 10-15 24-39 25Z" fill="#0B68CC" />
        </g>
      </svg>

      <motion.span
        aria-hidden="true"
        {...float(12, 4.2)}
        className="absolute left-[7%] top-[9%] grid h-12 w-12 place-items-center rounded-full bg-detective-yellow-400 text-xl shadow-lg"
      >
        ⭐
      </motion.span>
      <motion.span
        aria-hidden="true"
        {...float(15, 5, 0.4)}
        className="absolute right-[2%] top-[2%] grid h-14 w-14 place-items-center rounded-2xl bg-white text-2xl shadow-xl"
      >
        🏅
      </motion.span>
      <motion.span
        aria-hidden="true"
        {...float(10, 3.8, 0.8)}
        className="absolute right-[5%] top-[48%] grid h-12 w-12 place-items-center rounded-full bg-detective-blue-600 text-xl shadow-lg"
      >
        🛡️
      </motion.span>
    </motion.div>
  );
}
