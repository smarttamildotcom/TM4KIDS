import type { CertificateAward } from "./types";

/** Creates stable metadata when a certificate is unlocked. */
export function createCertificateAward(
  certificateId: string,
  awardedAt = new Date(),
): CertificateAward {
  const datePart = awardedAt.toISOString().slice(0, 10).replaceAll("-", "");
  const randomPart = Math.random().toString(36).slice(2, 8).toUpperCase();

  return {
    certificateId,
    certificateNumber: `TDA-${datePart}-${randomPart}`,
    awardedAt: awardedAt.toISOString(),
  };
}

export function formatCertificateDate(isoDate: string): string {
  return new Intl.DateTimeFormat(undefined, {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(isoDate));
}
