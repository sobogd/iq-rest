"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { Logo } from "@/components/Logo";
import { analytics } from "@/lib/analytics";

const NAV_LINKS = [
  { href: "/faq", key: "navigation.faq" },
  { href: "/changelog", key: "navigation.changelog" },
] as const;


export function Footer() {
  const t = useTranslations("footer");

  return (
    <footer className="border-t bg-muted/30">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
          <Link href="/" className="flex items-center gap-2 hover:opacity-80">
            <Logo height={24} />
          </Link>

          <nav className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => analytics.track("land_footer_link_click")}
              >
                {t(link.key)}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 pt-4 border-t border-border/50 text-sm text-muted-foreground">
          <p>{t("copyright")}</p>
          <nav className="flex flex-wrap items-center gap-x-4 gap-y-1">
            <a
              href="/sitemap.xml"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors"
              onClick={() => analytics.track("land_footer_link_click")}
            >
              {t("legal.sitemap")}
            </a>
          </nav>
        </div>
      </div>
    </footer>
  );
}
