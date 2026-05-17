"use client";

import { usePathname } from "next/navigation";
import { loginUrl } from "@/lib/dashboard-url";
import { LogoIcon } from "./logo-icon";
import { LinkForward } from "./link-forward";
import { HeroBrandBarControls } from "./hero-brand-bar-controls";
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
}

// Single sticky landing header — always visible across LP, SEO landings,
// and the organic homepage. Hosts logo, nav, theme + language switcher,
// and one short Start CTA that doubles as login and signup (OTP flow
// covers both in a single entry point).
export function LandingHeaderLp({ texts, locale, useLocalAnchors = false }: HeaderProps) {
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

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto h-16 flex items-center justify-between gap-3 relative">
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
            <HeroBrandBarControls locale={locale} />
            <LinkForward
              href={signinHref}
              trackEvent="land_header_cta_click"
              className="inline-flex items-center justify-center h-9 px-4 text-sm font-medium text-primary-foreground bg-primary rounded-lg hover:bg-primary/90 active:scale-[0.99] transition-all whitespace-nowrap"
            >
              {texts.cta}
            </LinkForward>
          </div>
        </div>
      </div>
    </header>
  );
}
