import { BRAND } from "@/lib/brand";

export type CertificatePdfData = {
  studentName: string;
  completionDate: string;
  certificateNumber: string;
  courseName: string;
  achievement: string;
  detectiveRank: string;
  xpEarned: number;
};

function drawQrPlaceholder(
  doc: import("jspdf").jsPDF,
  value: string,
  startX: number,
  startY: number,
) {
  const size = 3.2;
  const grid = 9;
  let seed = [...value].reduce((total, character) => total + character.charCodeAt(0), 0);

  doc.setDrawColor(11, 47, 92);
  doc.rect(startX - 2, startY - 2, grid * size + 4, grid * size + 4);

  for (let row = 0; row < grid; row += 1) {
    for (let column = 0; column < grid; column += 1) {
      seed = (seed * 9301 + 49297) % 233280;
      const finder =
        (row < 3 && column < 3) ||
        (row < 3 && column >= grid - 3) ||
        (row >= grid - 3 && column < 3);
      if (finder || seed / 233280 > 0.52) {
        doc.setFillColor(11, 47, 92);
        doc.rect(startX + column * size, startY + row * size, size, size, "F");
      }
    }
  }
}

/** Generates and downloads an official-looking landscape PDF certificate. */
export async function downloadCertificatePdf(data: CertificatePdfData) {
  const { jsPDF } = await import("jspdf");
  const doc = new jsPDF({ orientation: "landscape", unit: "mm", format: "a4" });
  const width = doc.internal.pageSize.getWidth();
  const height = doc.internal.pageSize.getHeight();

  doc.setFillColor(255, 255, 255);
  doc.rect(0, 0, width, height, "F");
  doc.setDrawColor(255, 200, 32);
  doc.setLineWidth(4);
  doc.rect(8, 8, width - 16, height - 16);
  doc.setDrawColor(26, 134, 240);
  doc.setLineWidth(1.2);
  doc.rect(14, 14, width - 28, height - 28);

  doc.setTextColor(11, 47, 92);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(15);
  doc.text(BRAND.name.toUpperCase(), width / 2, 30, { align: "center" });

  doc.setTextColor(224, 90, 5);
  doc.setFontSize(28);
  doc.text("Certificate of Achievement", width / 2, 51, { align: "center" });

  doc.setTextColor(10, 82, 161);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(12);
  doc.text("Awarded to", width / 2, 68, {
    align: "center",
  });

  doc.setTextColor(11, 47, 92);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(30);
  doc.text(data.studentName, width / 2, 88, { align: "center" });

  doc.setDrawColor(255, 200, 32);
  doc.setLineWidth(1);
  doc.line(72, 94, width - 72, 94);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(12);
  doc.text("Congratulations! You have successfully completed the", width / 2, 106, {
    align: "center",
  });
  doc.text(`${BRAND.name} programme and earned the title`, width / 2, 114, {
    align: "center",
  });
  doc.setFont("helvetica", "bold");
  doc.setTextColor(224, 90, 5);
  doc.setFontSize(16);
  doc.text(data.achievement, width / 2, 126, { align: "center" });

  doc.setTextColor(11, 47, 92);
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text(`Completion Date: ${data.completionDate}`, 30, 145);
  doc.text(`Detective Rank: ${data.detectiveRank}`, 30, 155);
  doc.text(`XP Earned: ${data.xpEarned.toLocaleString()}`, 30, 165);
  doc.text(`Certificate No: ${data.certificateNumber}`, 30, 175);

  doc.setFont("helvetica", "italic");
  doc.setFontSize(14);
  doc.text(BRAND.signature, width / 2, 154, { align: "center" });
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.text("Digital Signature", width / 2, 161, { align: "center" });

  doc.setFillColor(255, 200, 32);
  doc.circle(width - 64, 153, 19, "F");
  doc.setDrawColor(224, 90, 5);
  doc.setLineWidth(1.2);
  doc.circle(width - 64, 153, 15);
  doc.setTextColor(11, 47, 92);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.text("OFFICIAL", width - 64, 150, { align: "center" });
  doc.text("BQK SEAL", width - 64, 157, { align: "center" });

  drawQrPlaceholder(doc, data.certificateNumber, width - 39, 28);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(7);
  doc.text("Verification QR", width - 25, 62, { align: "center" });
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.text("Badge earned: BrandQuest Champion", width / 2, 179, {
    align: "center",
  });

  const fileName = `${data.studentName.trim().replaceAll(/\s+/g, "-").toLowerCase()}-brandquest-certificate.pdf`;
  doc.save(fileName);
}
