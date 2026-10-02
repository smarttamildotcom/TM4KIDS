import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default function OpenGraphImage() { return new ImageResponse(<div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", padding: "72px 90px", background: "linear-gradient(135deg,#EAF6FF,#FFF8D8 55%,#FFE9D5)", color: "#123B68", fontFamily: "sans-serif" }}><div style={{ fontSize: 34, fontWeight: 800, color: "#F47A35" }}>IP2Kids</div><div style={{ marginTop: 20, fontSize: 72, lineHeight: 1.05, fontWeight: 900, maxWidth: 900 }}>Questy&apos;s Idea Adventures</div><div style={{ marginTop: 26, fontSize: 32, fontWeight: 700 }}>Ideas Have Superpowers!</div><div style={{ marginTop: 34, fontSize: 24, maxWidth: 850 }}>15 playful adventures exploring creativity, brands, inventions, copyright and designs.</div></div>, size); }
