"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import LanguageSelector from "./LanguageSelector";
import { ThemeToggle } from "./ThemeToggle";

export default function Header() {
  const t = useTranslations("header");

  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold hover:opacity-80">
            {t("logo")}
          </Link>

          {/* Center Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="/pricing"
              className="text-foreground hover:text-primary transition-colors"
            >
              {t("nav.pricing")}
            </Link>
            <Link
              href="/features"
              className="text-foreground hover:text-primary transition-colors"
            >
              {t("nav.features")}
            </Link>
            <Link
              href="/contacts"
              className="text-foreground hover:text-primary transition-colors"
            >
              {t("nav.contacts")}
            </Link>
          </nav>

          {/* Right Side - Theme, Language Selector & Get Started */}
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <LanguageSelector />
            <Button asChild>
              <Link href="/get-started">{t("getStarted")}</Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
