"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Download, LoaderCircle, ShieldCheck } from "lucide-react";
import { downloadCertificatePdf } from "@/lib/gamification/certificate-pdf";
import { BRAND } from "@/lib/brand";
import type { CertificateDefinition } from "@/lib/gamification/types";

type CertificateProps = {
  certificate: CertificateDefinition;
  studentName: string;
  levelTitle: string;
  awardedOn: string;
  certificateNumber: string;
  courseName?: string;
  achievement?: string;
  xpEarned?: number;
};

/** Printable award certificate. */
export function Certificate({
  certificate,
  studentName,
  levelTitle,
  awardedOn,
  certificateNumber,
  courseName = BRAND.courseName,
  achievement = BRAND.achievement,
  xpEarned,
}: CertificateProps) {
  const [isDownloading, setIsDownloading] = useState(false);

  async function handleDownload() {
    setIsDownloading(true);
    try {
      await downloadCertificatePdf({
        studentName,
        completionDate: awardedOn,
        certificateNumber,
        courseName,
        achievement,
        detectiveRank: levelTitle,
        xpEarned: xpEarned ?? 0,
      });
    } finally {
      setIsDownloading(false);
    }
  }

  return (
    <div>
      <motion.article
        initial={{ opacity: 0, scale: 0.94, rotate: -1 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative overflow-hidden rounded-[2rem] border-8 border-detective-yellow-400 bg-white p-8 text-center shadow-2xl sm:p-12"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-4 rounded-[1.5rem] border-4 border-dashed border-detective-blue-200"
        />

        <div className="relative">
          <motion.span
            aria-hidden="true"
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="block text-6xl"
          >
            {certificate.emoji}
          </motion.span>

          <p className="mt-4 font-display text-sm font-semibold uppercase tracking-[0.3em] text-detective-orange-500">
            {BRAND.name}
          </p>

          <h2 className="mt-3 font-display text-3xl font-bold text-detective-blue-900 sm:text-4xl">
            Certificate of Achievement
          </h2>

          <p className="mt-6 text-detective-blue-700/85">
            Awarded to
          </p>
          <p className="mt-2 font-display text-3xl font-bold text-detective-orange-500 sm:text-4xl">
            {studentName}
          </p>

          <p className="mx-auto mt-6 max-w-xl text-detective-blue-700/85">
            Congratulations! You have successfully completed the {BRAND.name}
            programme and earned the title
          </p>

          <p className="mt-3 font-display text-2xl font-bold text-detective-orange-500">
            {achievement}
          </p>
          <p className="mt-3 text-sm font-semibold uppercase tracking-widest text-detective-blue-700">
            Course: {courseName}
          </p>

          <div className="mt-8 grid gap-4 border-t-2 border-dashed border-detective-blue-100 pt-6 text-sm sm:grid-cols-2 lg:grid-cols-4">
            <p className="font-display font-semibold text-detective-blue-900">
              Rank: {levelTitle}
            </p>
            {typeof xpEarned === "number" && (
              <p className="font-display font-semibold text-detective-blue-900">
                XP Earned: {xpEarned.toLocaleString()}
              </p>
            )}
            <p className="font-display font-semibold text-detective-blue-900">
              Completed: {awardedOn}
            </p>
            <p className="break-all font-display font-semibold text-detective-blue-900">
              No. {certificateNumber}
            </p>
          </div>

          <div className="mt-8 flex flex-col items-center justify-between gap-6 sm:flex-row">
            <div className="text-center">
              <p className="font-display text-xl font-bold italic text-detective-blue-900">
                {BRAND.signature}
              </p>
              <div className="mx-auto mt-1 h-px w-36 bg-detective-blue-400" />
              <p className="mt-1 text-xs font-semibold uppercase tracking-widest text-detective-blue-700">
                Digital Signature
              </p>
            </div>

            <div
              aria-label="Certificate verification QR code placeholder"
              className="grid h-24 w-24 grid-cols-5 gap-1 rounded-xl border-2 border-detective-blue-900 bg-white p-2"
            >
              {Array.from({ length: 25 }, (_, index) => (
                <span
                  key={index}
                  className={`rounded-sm ${
                    (certificateNumber.charCodeAt(index % certificateNumber.length) + index) % 3
                      ? "bg-detective-blue-900"
                      : "bg-white"
                  }`}
                />
              ))}
            </div>

            <div className="grid h-24 w-24 place-items-center rounded-full border-4 border-double border-detective-orange-500 bg-detective-yellow-300 shadow-md">
              <div>
                <ShieldCheck
                  aria-hidden="true"
                  className="mx-auto h-8 w-8 text-detective-blue-900"
                />
                <p className="mt-1 font-display text-[10px] font-bold uppercase text-detective-blue-900">
                  Official Seal
                </p>
              </div>
            </div>
          </div>

          <p className="mt-6 inline-flex rounded-full bg-detective-yellow-100 px-5 py-2 font-display font-bold text-detective-orange-600">
            Badge earned: BrandQuest Champion
          </p>
        </div>
      </motion.article>

      <div className="mt-6 flex justify-center print:hidden">
        <button
          type="button"
          onClick={handleDownload}
          disabled={isDownloading}
          className="inline-flex items-center gap-2 rounded-full bg-detective-blue-600 px-6 py-3 font-display font-semibold text-white shadow-lg transition-colors hover:bg-detective-blue-700"
        >
          {isDownloading ? (
            <LoaderCircle className="h-5 w-5 animate-spin" aria-hidden="true" />
          ) : (
            <Download className="h-5 w-5" aria-hidden="true" />
          )}
          {isDownloading ? "Creating PDF…" : "Download Certificate"}
        </button>
      </div>
    </div>
  );
}
