import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { Logo } from "@/components/Logo";

const NAV_LINKS = [
  { href: "/pricing", key: "navigation.pricing" },
  { href: "/faq", key: "navigation.faq" },
  { href: "/contacts", key: "navigation.contacts" },
  { href: "/changelog", key: "navigation.changelog" },
] as const;

const LEGAL_LINKS = [
  { href: "/terms", key: "legal.terms" },
  { href: "/privacy", key: "legal.privacy" },
  { href: "/cookies", key: "legal.cookies" },
] as const;

export async function Footer() {
  const t = await getTranslations("footer");

  return (
    <footer className="border-t bg-muted/30">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
          <Link href="/" className="flex items-center gap-2 hover:opacity-80">
            <Logo width={28} height={28} className="rounded" />
            <span className="text-xl font-bold">GrandQR</span>
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
