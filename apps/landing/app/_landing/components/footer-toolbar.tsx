"use client";

import { useState } from "react";
import { analytics } from "@/lib/analytics";
import { getCookieTexts } from "@/app/_landing/lib/cookie-texts";
import { LanguageSwitcherModal } from "@/components/language-switcher/modal";
import { LegalModal, type LegalView } from "@/components/legal-modal";

interface FooterToolbarProps {
  locale: string;
  /** Tailwind classes applied to the row container so the parent server
   *  component can position the toolbar (justify-end on default footer,
   *  justify-center/end on LP footer, etc) without owning the modal
   *  state. */
  navClassName?: string;
}

// Client island for the four footer buttons that open modals. Isolated
// so the surrounding footer chrome (copyright, nav links, layout) stays
// server-rendered.
export function FooterToolbar({ locale, navClassName = "" }: FooterToolbarProps) {
  const cookieTexts = getCookieTexts(locale);
  const [langOpen, setLangOpen] = useState(false);
  const [legalView, setLegalView] = useState<LegalView>(null);

  return (
    <>
      <nav className={`flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground ${navClassName}`}>
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
