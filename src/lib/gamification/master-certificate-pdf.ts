import { BRAND } from "@/lib/brand";

export type MasterCertificatePdfData = {
  studentName: string;
  completionDate: string;
  certificateId: string;
};

/** Understandings demonstrated by a Master Brand Detective, printed on the award. */
const UNDERSTANDINGS = [
  "Brands",
  "Trademarks",
  "Copyright",
  "Patents",
  "Designs",
  "Trade Secrets",
  "Brand Protection",
];

// Brand Quest palette as RGB tuples for jsPDF.
const NAVY: [number, number, number] = [11, 47, 92];
const BLUE: [number, number, number] = [26, 134, 240];
const ORANGE: [number, number, number] = [224, 90, 5];
const GOLD: [number, number, number] = [255, 200, 32];

/** Draws a five-point gold star centred on (cx, cy). */
function drawStar(
  doc: import("jspdf").jsPDF,
  cx: number,
  cy: number,
  radius: number,
) {
  const points: [number, number][] = [];
  for (let i = 0; i < 5; i += 1) {
    const outerAngle = (Math.PI / 2) * -1 + (i * 2 * Math.PI) / 5;
    const innerAngle = outerAngle + Math.PI / 5;
    points.push([cx + radius * Math.cos(outerAngle), cy + radius * Math.sin(outerAngle)]);
    points.push([
      cx + (radius / 2.4) * Math.cos(innerAngle),
      cy + (radius / 2.4) * Math.sin(innerAngle),
    ]);
  }

  doc.setFillColor(...GOLD);
  doc.setDrawColor(...ORANGE);
  doc.setLineWidth(0.3);
  // jsPDF has no polygon helper, so stitch the points with short lines/triangles.
  for (let i = 1; i < points.length - 1; i += 1) {
    doc.triangle(
      points[0][0],
      points[0][1],
      points[i][0],
      points[i][1],
      points[i + 1][0],
      points[i + 1][1],
      "F",
    );
  }
}

/** Fetches the Brand Quest logo and returns it as a PNG data URL (best effort). */
async function loadLogoDataUrl(): Promise<string | null> {
  try {
    const response = await fetch("/Brand%20Quest%20Logo.png");
    if (!response.ok) return null;
    const blob = await response.blob();
    return await new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = () => resolve(null);
      reader.readAsDataURL(blob);
    });
  } catch {
    return null;
  }
}

/**
 * Generates and downloads the high-resolution A4 (portrait) Master Brand
 * Detective certificate, awarded after all 15 worlds are complete.
 */
export async function downloadMasterCertificatePdf(data: MasterCertificatePdfData) {
  const { jsPDF } = await import("jspdf");
  const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
  const width = doc.internal.pageSize.getWidth();
  const height = doc.internal.pageSize.getHeight();
  const centre = width / 2;

  // Background and decorative double border.
  doc.setFillColor(255, 255, 255);
  doc.rect(0, 0, width, height, "F");
  doc.setDrawColor(...GOLD);
  doc.setLineWidth(3.5);
  doc.rect(10, 10, width - 20, height - 20);
  doc.setDrawColor(...BLUE);
  doc.setLineWidth(1);
  doc.rect(15, 15, width - 30, height - 30);

  // Decorative corner stars.
  drawStar(doc, 24, 24, 5);
  drawStar(doc, width - 24, 24, 5);
  drawStar(doc, 24, height - 24, 5);
  drawStar(doc, width - 24, height - 24, 5);

  // Brand Quest logo (best effort) with a wordmark fallback.
  const logo = await loadLogoDataUrl();
  if (logo) {
    try {
      doc.addImage(logo, "PNG", centre - 20, 24, 40, 26, undefined, "FAST");
    } catch {
      // Ignore malformed image data; the wordmark below still identifies the brand.
    }
  }

  doc.setTextColor(...NAVY);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.text(BRAND.name.toUpperCase(), centre, 58, { align: "center" });

  doc.setTextColor(...ORANGE);
  doc.setFontSize(26);
  doc.text("Certificate of Achievement", centre, 74, { align: "center" });

  doc.setDrawColor(...GOLD);
  doc.setLineWidth(0.8);
  doc.line(centre - 45, 79, centre + 45, 79);

  doc.setTextColor(...NAVY);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(12);
  doc.text("This certifies that", centre, 92, { align: "center" });

  doc.setFont("helvetica", "bold");
  doc.setFontSize(28);
  doc.text(data.studentName, centre, 106, { align: "center" });

  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  doc.setTextColor(...NAVY);
  const intro = doc.splitTextToSize(
    "has successfully completed all 15 Brand Quest Detective Worlds and demonstrated an understanding of:",
    width - 70,
  );
  doc.text(intro, centre, 120, { align: "center" });

  // Two-column list of understandings.
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.setTextColor(...BLUE);
  const listTop = 134;
  UNDERSTANDINGS.forEach((topic, index) => {
    const column = index % 2;
    const row = Math.floor(index / 2);
    const x = column === 0 ? centre - 42 : centre + 6;
    doc.text(`•  ${topic}`, x, listTop + row * 8);
  });

  doc.setTextColor(...NAVY);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(12);
  doc.text("Awarded the title", centre, 176, { align: "center" });

  doc.setFont("helvetica", "bold");
  doc.setTextColor(...ORANGE);
  doc.setFontSize(20);
  doc.text("MASTER BRAND DETECTIVE", centre, 187, { align: "center" });

  // Gold seal with decorative stars.
  doc.setFillColor(...GOLD);
  doc.circle(centre, 208, 15, "F");
  doc.setDrawColor(...ORANGE);
  doc.setLineWidth(1);
  doc.circle(centre, 208, 12);
  doc.setTextColor(...NAVY);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(8);
  doc.text("MASTER", centre, 206, { align: "center" });
  doc.text("DETECTIVE", centre, 211, { align: "center" });
  drawStar(doc, centre - 22, 208, 4);
  drawStar(doc, centre + 22, 208, 4);

  // Footer: completion date, certificate id and founder.
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(...NAVY);
  doc.text(`Completion Date: ${data.completionDate}`, 28, 238);
  doc.text(`Certificate ID: ${data.certificateId}`, 28, 246);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  doc.text(BRAND.founder, width - 28, 236, { align: "right" });
  doc.setDrawColor(...NAVY);
  doc.setLineWidth(0.4);
  doc.line(width - 78, 239, width - 28, 239);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.text("Founder", width - 28, 245, { align: "right" });
  doc.text(BRAND.name, width - 28, 250, { align: "right" });

  const fileName = `${data.studentName.trim().replaceAll(/\s+/g, "-").toLowerCase()}-master-brand-detective-certificate.pdf`;
  doc.save(fileName);
}
