"use client";

import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import { Download, LoaderCircle, Share2, Sparkles, Star } from "lucide-react";
import { QuestyExpression } from "@/components/illustrations/QuestyExpression";
import { downloadMasterCertificatePdf } from "@/lib/gamification/master-certificate-pdf";
import { useNotify } from "@/lib/notifications/NotificationProvider";
import { BRAND } from "@/lib/brand";
import brandQuestLogo from "@/Brand Quest Logo.png";

type MasterCertificateProps = {
  studentName: string;
  completionDate: string;
  certificateId: string;
};

/** Understandings demonstrated by a Master Brand Detective. */
const UNDERSTANDINGS = [
  "Brands",
  "Trademarks",
  "Copyright",
  "Patents",
  "Designs",
  "Trade Secrets",
  "Brand Protection",
];

/** Printable A4 Master Brand Detective certificate with download + share actions. */
export function MasterCertificate({
  studentName,
  completionDate,
  certificateId,
}: MasterCertificateProps) {
  const { notify } = useNotify();
  const [isDownloading, setIsDownloading] = useState(false);

  async function handleDownload() {
    setIsDownloading(true);
    try {
      await downloadMasterCertificatePdf({ studentName, completionDate, certificateId });
    } finally {
      setIsDownloading(false);
    }
  }

  async function handleShare() {
    // A shareable link to this achievement. Clipboard is the simple fallback for now.
    const shareUrl =
      typeof window !== "undefined" ? window.location.href : "";
    const shareData = {
      title: "Brand Quest Master Detective",
      text: `${studentName} became a Master Brand Detective on Brand Quest!`,
      url: shareUrl,
    };

    try {
      if (typeof navigator !== "undefined" && navigator.share) {
        await navigator.share(shareData);
        return;
      }
      await navigator.clipboard.writeText(shareUrl);
      notify("Shareable link copied to your clipboard!", "success");
    } catch {
      notify("Couldn't share right now — please try again.", "error");
    }
  }

  return (
    <div>
      <motion.article
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        aria-label="Brand Quest Master Detective Certificate"
        className="relative mx-auto max-w-3xl overflow-hidden rounded-[2rem] border-8 border-detective-yellow-400 bg-white p-6 text-center shadow-2xl sm:p-12"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-4 rounded-[1.5rem] border-4 border-dashed border-detective-blue-200"
        />

        {/* Decorative corner stars */}
        {[
          "left-6 top-6",
          "right-6 top-6",
          "bottom-6 left-6",
          "bottom-6 right-6",
        ].map((position) => (
          <Star
            key={position}
            aria-hidden="true"
            className={`absolute ${position} h-6 w-6 fill-detective-yellow-400 text-detective-orange-500`}
          />
        ))}

        <div className="relative">
          <Image
            src={brandQuestLogo}
            alt={`${BRAND.name} logo`}
            className="mx-auto h-16 w-auto object-contain"
          />

          <div className="mt-4 flex items-center justify-center">
            <span className="grid h-20 w-20 place-items-center overflow-hidden rounded-full bg-detective-blue-50">
              <QuestyExpression mood="happy" size={72} />
            </span>
          </div>

          <p className="mt-3 font-display text-sm font-semibold uppercase tracking-[0.3em] text-detective-orange-500">
            {BRAND.name}
          </p>

          <h2 className="mt-2 font-display text-3xl font-bold text-detective-blue-900 sm:text-4xl">
            Certificate of Achievement
          </h2>

          <p className="mt-6 text-detective-blue-700/85">This certifies that</p>
          <p className="mt-2 font-display text-3xl font-bold text-detective-orange-500 sm:text-4xl">
            {studentName}
          </p>

          <p className="mx-auto mt-6 max-w-xl text-detective-blue-700/85">
            has successfully completed all 15 Brand Quest Detective Worlds and
            demonstrated an understanding of:
          </p>

          <ul className="mx-auto mt-4 grid max-w-md grid-cols-2 gap-x-6 gap-y-2 text-left">
            {UNDERSTANDINGS.map((topic) => (
              <li
                key={topic}
                className="flex items-center gap-2 font-display font-semibold text-detective-blue-900"
              >
                <Sparkles
                  className="h-4 w-4 shrink-0 text-detective-yellow-500"
                  aria-hidden="true"
                />
                {topic}
              </li>
            ))}
          </ul>

          <p className="mt-8 text-detective-blue-700/85">Awarded the title</p>
          <p className="mt-2 font-display text-2xl font-bold uppercase tracking-wide text-detective-orange-500">
            Master Brand Detective
          </p>

          {/* Gold seal */}
          <div className="mt-8 flex items-center justify-center">
            <div className="grid h-28 w-28 place-items-center rounded-full border-4 border-double border-detective-orange-500 bg-gradient-to-br from-detective-yellow-300 to-detective-yellow-400 shadow-lg">
              <div>
                <Star
                  aria-hidden="true"
                  className="mx-auto h-7 w-7 fill-detective-orange-500 text-detective-orange-500"
                />
                <p className="mt-1 font-display text-[10px] font-bold uppercase leading-tight text-detective-blue-900">
                  Master
                  <br />
                  Detective
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 grid gap-4 border-t-2 border-dashed border-detective-blue-100 pt-6 text-sm sm:grid-cols-2">
            <div className="text-left">
              <p className="font-display font-semibold text-detective-blue-900">
                Completion Date
              </p>
              <p className="text-detective-blue-700/85">{completionDate}</p>
              <p className="mt-3 break-all font-display font-semibold text-detective-blue-900">
                Certificate ID
              </p>
              <p className="break-all text-detective-blue-700/85">{certificateId}</p>
            </div>
            <div className="text-right">
              <p className="font-display text-xl font-bold italic text-detective-blue-900">
                {BRAND.founder}
              </p>
              <div className="ml-auto mt-1 h-px w-36 bg-detective-blue-400" />
              <p className="mt-1 text-xs font-semibold uppercase tracking-widest text-detective-blue-700">
                Founder
              </p>
              <p className="mt-1 text-sm font-semibold text-detective-orange-500">
                {BRAND.name}
              </p>
            </div>
          </div>
        </div>
      </motion.article>

      <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row print:hidden">
        <button
          type="button"
          onClick={handleDownload}
          disabled={isDownloading}
          className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-detective-blue-600 px-6 py-3 font-display font-semibold text-white shadow-lg transition-colors hover:bg-detective-blue-700 disabled:opacity-70 sm:w-auto"
        >
          {isDownloading ? (
            <LoaderCircle className="h-5 w-5 animate-spin" aria-hidden="true" />
          ) : (
            <Download className="h-5 w-5" aria-hidden="true" />
          )}
          {isDownloading ? "Creating PDF…" : "Download PDF"}
        </button>

        <button
          type="button"
          onClick={handleShare}
          className="inline-flex w-full items-center justify-center gap-2 rounded-full border-2 border-detective-orange-400 px-6 py-3 font-display font-semibold text-detective-orange-600 transition-colors hover:bg-detective-orange-50 sm:w-auto"
        >
          <Share2 className="h-5 w-5" aria-hidden="true" />
          Share Achievement
        </button>
      </div>
    </div>
  );
}
