"use client";

import { useState } from "react";
import { Globe, LogIn } from "lucide-react";
import { analytics } from "@/lib/analytics";
import { getCookieTexts } from "@/app/_landing/lib/cookie-texts";
import { LanguageSwitcherModal } from "@/components/language-switcher/modal";
import { LinkForward } from "./link-forward";

interface HeroBrandBarControlsProps {
  locale: string;
  /** When provided, renders a Sign-in icon button. */
  signinHref?: string;
  signinLabel?: string;
}

const CONTROL_CLASS =
  "inline-flex items-center justify-center h-9 w-9 border border-border rounded-lg bg-muted/60 text-foreground/80 sm:hover:bg-muted sm:hover:text-foreground sm:hover:border-foreground/40 transition-colors";

// Language switcher + optional sign-in. Theme toggle was removed — the
// landing always renders in light mode for first-time visitors. Returning
// visitors with a previously stored theme preference (set elsewhere in
// the app, e.g. the dashboard) keep their value.
export function HeroBrandBarControls({ locale, signinHref, signinLabel }: HeroBrandBarControlsProps) {
  const cookieTexts = getCookieTexts(locale);
  const [langOpen, setLangOpen] = useState(false);

  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={() => {
          analytics.track("l_hero_language_click");
          setLangOpen(true);
        }}
        className={CONTROL_CLASS}
        aria-label={cookieTexts.languageSwitcher}
        title={cookieTexts.languageSwitcher}
      >
        <Globe className="h-4 w-4" />
      </button>
      {signinHref ? (
        <LinkForward
          href={signinHref}
          trackEvent="l_hero_signin_click"
          className={CONTROL_CLASS}
          aria-label={signinLabel ?? "Sign in"}
          title={signinLabel ?? "Sign in"}
        >
          <LogIn className="h-4 w-4" />
        </LinkForward>
      ) : null}
      <LanguageSwitcherModal
        open={langOpen}
        onClose={() => setLangOpen(false)}
        currentLocale={locale}
        title={cookieTexts.languageSwitcher}
      />
    </div>
  );
}
