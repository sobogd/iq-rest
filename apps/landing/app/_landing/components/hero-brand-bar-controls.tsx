"use client";

import { Suspense, useState } from "react";
import { Globe, LogIn } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { analytics } from "@/lib/analytics";
import { getCookieTexts } from "@/app/_landing/lib/cookie-texts";
import { LanguageSwitcherModal } from "@/components/language-switcher/modal";
import { LinkForward } from "./link-forward";

interface HeroBrandBarControlsProps {
  locale: string;
  /** When provided, renders a Sign-in icon button. Visitors arriving via
   *  Google Ads (?gclid) still don't see it — keeps PPC focused on the
   *  primary CTA. */
  signinHref?: string;
  signinLabel?: string;
}

const CONTROL_CLASS =
  "inline-flex items-center justify-center h-9 w-9 border border-border rounded-lg bg-muted/60 text-foreground/80 sm:hover:bg-muted sm:hover:text-foreground sm:hover:border-foreground/40 transition-colors";

// Hide sign-in for Google Ads visitors. Isolated so the useSearchParams
// bailout suspends only this slot, not the whole hero.
function SignInSlot({ href, label }: { href: string; label: string }) {
  const searchParams = useSearchParams();
  if (searchParams?.get("gclid")) return null;
  return (
    <LinkForward
      href={href}
      trackEvent="land_hero_signin_click"
      className={CONTROL_CLASS}
      aria-label={label}
      title={label}
    >
      <LogIn className="h-4 w-4" />
    </LinkForward>
  );
}

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
          analytics.track("land_hero_language_click");
          setLangOpen(true);
        }}
        className={CONTROL_CLASS}
        aria-label={cookieTexts.languageSwitcher}
        title={cookieTexts.languageSwitcher}
      >
        <Globe className="h-4 w-4" />
      </button>
      {signinHref ? (
        <Suspense fallback={<div className="h-9 w-9" aria-hidden />}>
          <SignInSlot href={signinHref} label={signinLabel ?? "Sign in"} />
        </Suspense>
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
