"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { AdventureButton } from "@/components/auth/AdventureButton";
import { Container } from "@/components/ui/Container";
import { UserNavCluster } from "@/components/layout/UserNavCluster";
import { BRAND } from "@/lib/brand";
import brandQuestLogo from "@/Brand Quest Logo.png";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Journey", href: "/#journey" },
  { label: "About", href: "/about" },
  { label: "CSR", href: "/csr" },
  { label: "Contact", href: "/contact" },
];

/** Sticky site header with a mobile disclosure menu. Nav links change once signed in. */
export function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-detective-blue-100 bg-white/90 backdrop-blur">
      <Container className="flex h-16 items-center justify-between sm:h-20">
        <Link
          href="/"
          aria-label={`${BRAND.name} home`}
          className="flex min-w-0 items-center"
        >
          <Image
            src={brandQuestLogo}
            alt={`${BRAND.name} — ${BRAND.tagline}`}
            priority
            sizes="(min-width: 640px) 90px, 66px"
            className="h-[44px] w-auto object-contain sm:h-[60px]"
          />
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-display font-semibold text-detective-blue-700 transition-colors hover:text-detective-orange-500"
            >
              {link.label}
            </Link>
          ))}
          <AdventureButton />
        </nav>

        <div className="flex items-center gap-2">
          <UserNavCluster />

          <button
            type="button"
            onClick={() => setIsOpen((open) => !open)}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            aria-label={isOpen ? "Close menu" : "Open menu"}
            className="grid h-11 w-11 place-items-center rounded-full bg-detective-blue-50 text-detective-blue-700 lg:hidden"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </Container>

      {isOpen && (
        <div id="mobile-menu" className="border-t border-detective-blue-100 lg:hidden">
          <Container className="flex flex-col gap-2 py-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="rounded-xl px-3 py-3 font-display font-semibold text-detective-blue-700 hover:bg-detective-blue-50"
              >
                {link.label}
              </Link>
            ))}
            <AdventureButton className="mt-2 w-full" />
          </Container>
        </div>
      )}
    </header>
  );
}

