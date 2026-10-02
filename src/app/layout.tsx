import type { Metadata } from "next";
import { Fredoka, Nunito } from "next/font/google";
import { GameProvider, RewardToaster } from "@/components/gamification";
import { MasterCertificateDelivery } from "@/components/gamification/MasterCertificateDelivery";
import { AppToaster } from "@/components/notifications/AppToaster";
import { AuthProvider } from "@/lib/auth/AuthProvider";
import { NotificationProvider } from "@/lib/notifications/NotificationProvider";
import { BRAND } from "@/lib/brand";
import "./globals.css";

const fredoka = Fredoka({ subsets: ["latin"], variable: "--font-fredoka", weight: ["500", "600", "700"] });
const nunito = Nunito({ subsets: ["latin"], variable: "--font-nunito" });
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim() || "https://ip2kids.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: "IP2Kids – Questy's Idea Adventures", template: "%s | IP2Kids" },
  description: BRAND.description,
  applicationName: "IP2Kids",
  keywords: ["IP2Kids", "intellectual property for kids", "trademarks for kids", "inventions for kids", "copyright for kids", "design education", "Idea Adventures"],
  alternates: { canonical: "/" },
  openGraph: { type: "website", url: "/", siteName: "IP2Kids", title: "IP2Kids – Questy's Idea Adventures", description: BRAND.description, images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "IP2Kids – Ideas Have Superpowers!" }] },
  twitter: { card: "summary_large_image", title: "IP2Kids – Questy's Idea Adventures", description: BRAND.description, images: ["/opengraph-image"] },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en" className={`${fredoka.variable} ${nunito.variable}`}><body className="font-sans"><GameProvider><NotificationProvider><AuthProvider>{children}<MasterCertificateDelivery/><RewardToaster/><AppToaster/></AuthProvider></NotificationProvider></GameProvider></body></html>; }
