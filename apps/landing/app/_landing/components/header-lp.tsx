"use client";

import { Suspense, useEffect, useState } from "react";
import { LogIn } from "lucide-react";
import { usePathname, useSearchParams } from "next/navigation";
import { createUrl, loginUrl } from "@/lib/dashboard-url";
import { LogoIcon } from "./logo-icon";
import { LinkForward } from "./link-forward";
import type { LandingTexts } from "../types";

interface HeaderProps {
  texts: LandingTexts["header"];
  locale: string;
  /** Force anchor links to point to the current page (e.g. on KW landing
   *  pages that replicate the homepage section structure with #features,
   *  #how, #pricing, #faq). Default false — feature pages keep the
   *  cross-page `/locale#section` behaviour so clicks navigate back to the
   *  homepage and scroll into view. */
  useLocalAnchors?: boolean;
  /** Hide the Sign-in button entirely (e.g. on PPC landing pages). When
   *  false, sign-in is still hidden for visitors arriving via Google Ads
   *  (?gclid) to keep them focused on the create CTA. */
  hideSignIn?: boolean;
}

// Hide Sign in for Google Ads visitors (focus them on the create CTA).
// Isolated so its useSearchParams() bailout doesn't push the whole page
// off static rendering — only this slot suspends.
function SignInSlot({ signinHref, label }: { signinHref: string; label: string }) {
  const searchParams = useSearchParams();
  const showSignIn = !searchParams?.get("gclid");
  if (!showSignIn) return null;
  return (
    <LinkForward
      href={signinHref}
      trackEvent="land_header_signin_click"
      className="inline-flex items-center justify-center h-9 w-9 border border-border rounded-lg text-muted-foreground hover:text-foreground hover:border-foreground/40 transition-colors"
      aria-label={label}
      title={label}
    >
      <LogIn className="h-4 w-4" />
    </LinkForward>
  );
}

export function LandingHeaderLp({ texts, locale, useLocalAnchors = false, hideSignIn = false }: HeaderProps) {
  const createHref = `${createUrl(locale)}&from=landing`;
  const signinHref = `${loginUrl(locale)}?from=landing`;

  // Anchor links resolve in two modes:
  //  - homepage / KW landing page (`useLocalAnchors` true OR pathname is
  //    `/{locale}`): local `#section` — browser scrolls within current page
  //  - everywhere else (feature pages): `/{locale}#section` — full
  //    navigation back to homepage, then scroll on arrival
  const pathname = usePathname() || "";
  const onHome = pathname === `/${locale}` || pathname === `/${locale}/`;
  const useLocal = useLocalAnchors || onHome;
  const anchor = (id: string) => (useLocal ? `#${id}` : `/${locale}#${id}`);
  const homeHref = onHome ? "#top" : `/${locale}`;

  // PPC LP: header is hidden while the hero is in view (the hero has its
  // own bare logo+globe row) and slides in only once more than half of the
  // hero has scrolled out. Keeps the hero free of header chrome but brings
  // back nav + create CTA once the visitor leaves the conversion fold.
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const hero = document.querySelector('[data-section="hero"]');
    if (!hero) return;
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.intersectionRatio < 0.5),
      { threshold: [0, 0.5, 1] },
    );
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 border-b border-border bg-background/85 backdrop-blur transition-transform duration-300 ${visible ? "translate-y-0" : "-translate-y-full"}`}
    >
      <div className="container mx-auto px-4 h-16 flex items-center justify-between gap-3 relative">
        <LinkForward
          href={homeHref}
          trackEvent="land_header_logo_click"
          className="flex items-center gap-1.5 text-[18px] sm:text-[22px] font-semibold tracking-tight shrink-0 text-foreground"
        >
          <LogoIcon className="h-8 w-8 sm:h-9 sm:w-9" />
          Rest
        </LinkForward>
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-muted-foreground absolute left-1/2 -translate-x-1/2">
          <LinkForward href={anchor("features")} trackEvent="land_header_nav_features_click" className="hover:text-foreground transition-colors">{texts.navFeatures}</LinkForward>
          <LinkForward href={anchor("how")} trackEvent="land_header_nav_how_click" className="hover:text-foreground transition-colors">{texts.navHow}</LinkForward>
          <LinkForward href={anchor("pricing")} trackEvent="land_header_nav_pricing_click" className="hover:text-foreground transition-colors">{texts.navPricing}</LinkForward>
          <LinkForward href={anchor("faq")} trackEvent="land_header_nav_faq_click" className="hover:text-foreground transition-colors">{texts.navFaq}</LinkForward>
        </nav>
        <div className="flex items-center gap-2 shrink-0">
          {hideSignIn ? null : (
            <Suspense fallback={<div className="h-9 w-9" aria-hidden />}>
              <SignInSlot signinHref={signinHref} label={texts.signIn} />
            </Suspense>
          )}
          <LinkForward
            href={createHref}
            trackEvent="land_header_cta_click"
            className="inline-flex items-center justify-center h-9 px-4 text-sm font-medium text-primary-foreground bg-primary rounded-lg hover:bg-primary/90 active:scale-[0.99] transition-all whitespace-nowrap"
          >
            {texts.cta}
          </LinkForward>
        </div>
      </div>
    </header>
  );
}
