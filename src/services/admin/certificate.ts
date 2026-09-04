"use client";

import { jsPDF } from "jspdf";
import { formatDate } from "./format";

/** Generates a simple, branded completion certificate as a downloadable PDF. */
export function downloadCertificatePdf(
  name: string,
  certificateNumber: string,
  completionDate: string,
): void {
  const doc = new jsPDF({ orientation: "landscape", unit: "pt", format: "a4" });
  const width = doc.internal.pageSize.getWidth();
  const height = doc.internal.pageSize.getHeight();

  doc.setFillColor(239, 248, 255);
  doc.rect(0, 0, width, height, "F");
  doc.setDrawColor(11, 104, 204);
  doc.setLineWidth(6);
  doc.rect(24, 24, width - 48, height - 48);

  doc.setTextColor(224, 90, 5);
  doc.setFontSize(30);
  doc.text("Brand Quest", width / 2, 120, { align: "center" });

  doc.setTextColor(11, 47, 92);
  doc.setFontSize(20);
  doc.text("Certificate of Completion", width / 2, 165, { align: "center" });

  doc.setFontSize(14);
  doc.text("This certifies that", width / 2, 220, { align: "center" });

  doc.setFontSize(28);
  doc.setTextColor(11, 104, 204);
  doc.text(name, width / 2, 265, { align: "center" });

  doc.setFontSize(14);
  doc.setTextColor(11, 47, 92);
  doc.text(
    "has successfully completed all 15 worlds of the Brand Quest programme.",
    width / 2,
    305,
    { align: "center" },
  );

  doc.setFontSize(11);
  doc.setTextColor(90, 90, 90);
  doc.text(`Certificate No: ${certificateNumber}`, width / 2, 355, {
    align: "center",
  });
  doc.text(`Date: ${formatDate(completionDate)}`, width / 2, 375, {
    align: "center",
  });

  doc.save(`brand-quest-certificate-${certificateNumber}.pdf`);
}
