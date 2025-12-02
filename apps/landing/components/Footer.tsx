"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import Image from "next/image";

export default function Footer() {
  const t = useTranslations("footer");

  return (
    <footer className="border-t bg-muted/30">
      <div className="container mx-auto px-4 py-6">
        {/* Main Footer Row */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 hover:opacity-80">
            <Image
              src="/logo.svg"
              alt="SobogdQR"
              width={28}
              height={28}
              className="rounded"
            />
            <span className="text-xl font-bold">SobogdQR</span>
          </Link>

          {/* Links */}
          <nav className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
            <Link
              href="/pricing"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              {t("navigation.pricing")}
            </Link>
            <Link
              href="/features"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              {t("navigation.features")}
            </Link>
            <Link
              href="/faq"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              {t("navigation.faq")}
            </Link>
            <Link
              href="/contacts"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              {t("navigation.contacts")}
            </Link>
            <Link
              href="/changelog"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              {t("navigation.changelog")}
            </Link>
          </nav>
        </div>

        {/* Bottom Row */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 pt-4 border-t border-border/50 text-xs text-muted-foreground">
          <p>{t("copyright")}</p>
          <nav className="flex flex-wrap items-center gap-x-4 gap-y-1">
            <Link href="/terms" className="hover:text-foreground transition-colors">
              {t("legal.terms")}
            </Link>
            <Link href="/privacy" className="hover:text-foreground transition-colors">
              {t("legal.privacy")}
            </Link>
            <Link href="/cookies" className="hover:text-foreground transition-colors">
              {t("legal.cookies")}
            </Link>
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
