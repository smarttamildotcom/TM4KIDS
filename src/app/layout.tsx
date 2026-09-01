import type { Metadata } from "next";
import { Fredoka, Nunito } from "next/font/google";
import { GameProvider, RewardToaster } from "@/components/gamification";
import { AuthProvider } from "@/lib/auth/AuthProvider";
import { BRAND } from "@/lib/brand";
import "./globals.css";

const fredoka = Fredoka({
  subsets: ["latin"],
  variable: "--font-fredoka",
  weight: ["500", "600", "700"],
});

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
});

export const metadata: Metadata = {
  title: `${BRAND.name} | ${BRAND.tagline}`,
  description: BRAND.description,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${fredoka.variable} ${nunito.variable}`}>
      <body className="font-sans">
        <GameProvider>
          <AuthProvider>
            {children}
            <RewardToaster />
          </AuthProvider>
        </GameProvider>
      </body>
    </html>
  );
}
