import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { BRAND } from "@/lib/brand";
import { footerLinks } from "@/lib/site-content";

/** Site footer with the required About / Contact / Privacy Policy links. */
export function SiteFooter() {
  return (
    <footer className="bg-detective-blue-900 text-detective-blue-100">
      <Container className="flex flex-col items-center gap-8 py-12 text-center md:flex-row md:justify-between md:text-left">
        <div className="flex flex-col items-center gap-3 md:flex-row">
          <Image
            src="/ip2kids-logo.png"
            alt="IP2Kids"
            width={144}
            height={144}
            sizes="72px"
            className="h-[72px] w-[72px] rounded-2xl bg-white object-contain p-1 shadow-md"
          />
          <div>
            <p className="font-display text-lg font-bold text-white">
              {BRAND.name}
            </p>
            <p className="text-sm text-detective-blue-200">
              Helping young minds discover the exciting world of brands,
              creativity and trademarks.
            </p>
          </div>
        </div>

        <nav aria-label="Footer">
          <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
            {footerLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="font-display font-semibold transition-colors hover:text-detective-yellow-300"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </Container>

      <div className="border-t border-white/10 py-6">
        <Container>
          <p className="text-center text-sm text-detective-blue-200">
            {BRAND.copyright}
          </p>
        </Container>
      </div>
    </footer>
  );
}
