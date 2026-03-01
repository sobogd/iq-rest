import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { Logo } from "@/components/Logo";
import { MessageCircle } from "lucide-react";

const NAV_LINKS = [
  { href: "/pricing", key: "navigation.pricing" },
  { href: "/faq", key: "navigation.faq" },
  { href: "/contacts", key: "navigation.contacts" },
  { href: "/changelog", key: "navigation.changelog" },
  { href: "/languages", key: "navigation.languages" },
] as const;

const LEGAL_LINKS = [
  { href: "/terms", key: "legal.terms" },
  { href: "/privacy", key: "legal.privacy" },
] as const;

export async function Footer() {
  const [t, tPricing] = await Promise.all([
    getTranslations("footer"),
    getTranslations("pricing"),
  ]);

  return (
    <footer className="border-t bg-muted/30">
      <div className="container mx-auto px-4 pt-8 pb-6">
        <div className="text-center mb-8">
          <h3 className="text-lg font-semibold mb-2">{tPricing("questionsTitle")}</h3>
          <p className="text-sm text-muted-foreground mb-4 max-w-md mx-auto">{tPricing("questionsBody")}</p>
          <a
            href="https://wa.me/34637621754"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-md bg-[#25D366] px-5 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90"
          >
            <MessageCircle className="h-4 w-4" />
            {tPricing("questionsButton")}
          </a>
        </div>

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4 pt-6 border-t border-border/50">
          <Link href="/" className="flex items-center gap-2 hover:opacity-80">
            <Logo height={24} />
          </Link>

          <nav className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                {t(link.key)}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 pt-4 border-t border-border/50 text-xs text-muted-foreground">
          <p>{t("copyright")}</p>
          <nav className="flex flex-wrap items-center gap-x-4 gap-y-1">
            {LEGAL_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="hover:text-foreground transition-colors"
              >
                {t(link.key)}
              </Link>
            ))}
            <a
              href="/sitemap.xml"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors"
            >
              {t("legal.sitemap")}
            </a>
          </nav>
        </div>
      </div>
    </footer>
  );
}
