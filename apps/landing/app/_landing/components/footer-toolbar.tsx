"use client";

import { useState } from "react";
import { analytics } from "@/lib/analytics";
import { getCookieTexts } from "@/app/_landing/lib/cookie-texts";
import { LanguageSwitcherModal } from "@/components/language-switcher/modal";

interface FooterToolbarProps {
  locale: string;
  /** Tailwind classes applied to the row container so the parent server
   *  component can position the toolbar (justify-end on default footer,
   *  justify-center/end on LP footer, etc) without owning the modal
   *  state. */
  navClassName?: string;
}

// Client island for the footer toolbar. Language switcher stays modal-based;
// legal links go to dedicated pages so they're crawlable and linkable from
// Google's OAuth consent screen.
export function FooterToolbar({ locale, navClassName = "" }: FooterToolbarProps) {
  const cookieTexts = getCookieTexts(locale);
  const [langOpen, setLangOpen] = useState(false);

  return (
    <>
      <nav className={`flex flex-wrap items-center gap-x-5 gap-y-2 text-sm sm:text-base text-muted-foreground ${navClassName}`}>
        <button
          type="button"
          onClick={() => {
            analytics.track("l_footer_language_click");
            setLangOpen(true);
          }}
          className="hover:text-foreground transition-colors"
        >
          {cookieTexts.languageSwitcher}
        </button>
        <a
          href={`/${locale}/privacy`}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => analytics.track("l_footer_privacy_policy_click")}
          className="hover:text-foreground transition-colors"
        >
          {cookieTexts.privacyPolicyLink}
        </a>
        <a
          href={`/${locale}/cookies`}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => analytics.track("l_footer_cookie_policy_click")}
          className="hover:text-foreground transition-colors"
        >
          {cookieTexts.cookiePolicyLink}
        </a>
        <a
          href={`/${locale}/terms`}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => analytics.track("l_footer_terms_click")}
          className="hover:text-foreground transition-colors"
        >
          {cookieTexts.termsLink}
        </a>
      </nav>
      <LanguageSwitcherModal
        open={langOpen}
        onClose={() => setLangOpen(false)}
        currentLocale={locale}
        title={cookieTexts.languageSwitcher}
      />
    </>
  );
}
