"use client";

import { useState } from "react";
import { analytics } from "@/lib/analytics";
import { getCookieTexts } from "@/app/_landing/lib/cookie-texts";
import { LanguageSwitcherModal } from "@/components/language-switcher/modal";
import { LegalModal, type LegalView } from "@/components/legal-modal";
import type { LandingTexts } from "../types";

interface FooterProps {
  texts: LandingTexts["footer"];
  headerTexts: LandingTexts["header"];
  locale: string;
  excludeFeatureHref?: string;
}

function slugify(href: string): string {
  return href
    .replace(/^#/, "anchor_")
    .replace(/^\//, "")
    .replace(/[^a-z0-9]+/gi, "_")
    .replace(/^_+|_+$/g, "")
    .toLowerCase();
}

export function LandingFooter({ texts, headerTexts: _headerTexts, locale, excludeFeatureHref }: FooterProps) {
  const year = new Date().getFullYear();
  const copyright = texts.copyrightTemplate.replace("{year}", String(year));
  const cookieTexts = getCookieTexts(locale);
  const [langOpen, setLangOpen] = useState(false);
  const [legalView, setLegalView] = useState<LegalView>(null);
  const featureLinks = excludeFeatureHref
    ? texts.featureLinks.filter((link) => link.href !== excludeFeatureHref)
    : texts.featureLinks;

  return (
    <>
    <footer className="bg-muted/20" data-section="footer">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-10 md:gap-6">
          <nav className="flex flex-wrap items-center justify-center md:justify-start gap-x-5 gap-y-2 text-sm md:max-w-[50%]">
            {featureLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => analytics.track(`land_footer_feature_${slugify(link.href)}_click`)}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex flex-col items-center md:items-end gap-6 md:gap-2 text-center md:text-end">
            <nav className="flex flex-wrap items-center justify-center md:justify-end gap-x-5 gap-y-2 text-sm text-muted-foreground">
              <button
                type="button"
                onClick={() => {
                  analytics.track("land_footer_language_click");
                  setLangOpen(true);
                }}
                className="hover:text-foreground transition-colors"
              >
                {cookieTexts.languageSwitcher}
              </button>
              <button
                type="button"
                onClick={() => {
                  analytics.track("land_footer_privacy_policy_click");
                  setLegalView("privacy");
                }}
                className="hover:text-foreground transition-colors"
              >
                {cookieTexts.privacyPolicyLink}
              </button>
              <button
                type="button"
                onClick={() => {
                  analytics.track("land_footer_cookie_policy_click");
                  setLegalView("policy");
                }}
                className="hover:text-foreground transition-colors"
              >
                {cookieTexts.cookiePolicyLink}
              </button>
              <button
                type="button"
                onClick={() => {
                  analytics.track("land_footer_terms_click");
                  setLegalView("terms");
                }}
                className="hover:text-foreground transition-colors"
              >
                {cookieTexts.termsLink}
              </button>
            </nav>
            <p className="text-xs text-muted-foreground pt-2 md:mt-1">
              {copyright}
            </p>
          </div>
        </div>
      </div>
    </footer>
    <LanguageSwitcherModal
      open={langOpen}
      onClose={() => setLangOpen(false)}
      currentLocale={locale}
      title={cookieTexts.languageSwitcher}
    />
    <LegalModal view={legalView} onClose={() => setLegalView(null)} />
    </>
  );
}
