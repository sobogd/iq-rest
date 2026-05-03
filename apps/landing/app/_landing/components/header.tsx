"use client";

import { usePathname } from "next/navigation";
import { createUrl, loginUrl } from "@/lib/dashboard-url";
import { analytics } from "@/lib/analytics";
import { CookieBanner } from "@/components/cookie-consent/banner";
import { getCookieTexts } from "@/app/_landing/lib/cookie-texts";
import type { LandingTexts } from "../types";

interface HeaderProps {
  texts: LandingTexts["header"];
  locale: string;
}

export function LandingHeader({ texts, locale }: HeaderProps) {
  // Two distinct intents: "Sign in" (returning user → plain login)
  // vs "Create" CTA (new user → create-flow wizard with cuisine + name preload).
  const signinHref = `${loginUrl(locale)}?from=landing`;
  const createHref = `${createUrl(locale)}&from=landing`;

  // Anchor links only work on the landing root. On nested pages
  // (feature pages, etc.) prefix them with the locale root so the
  // click navigates to the homepage and then scrolls to the section.
  const pathname = usePathname() || "";
  const onHome = pathname === `/${locale}` || pathname === `/${locale}/`;
  const anchor = (id: string) => (onHome ? `#${id}` : `/${locale}#${id}`);
  const homeHref = onHome ? "#top" : `/${locale}`;

  return (
    <>
    <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between gap-3 relative">
        <a
          href={homeHref}
          onClick={() => analytics.track("land_header_logo_click")}
          className="text-2xl sm:text-3xl font-semibold tracking-tight shrink-0"
        >
          IQ <span className="text-primary">Rest</span>
        </a>
        <nav className="hidden md:flex items-center gap-6 text-xs font-medium text-muted-foreground absolute left-1/2 -translate-x-1/2">
          <a href={anchor("features")} onClick={() => analytics.track("land_header_nav_features_click")} className="hover:text-foreground transition-colors">{texts.navFeatures}</a>
          <a href={anchor("how")} onClick={() => analytics.track("land_header_nav_how_click")} className="hover:text-foreground transition-colors">{texts.navHow}</a>
          <a href={anchor("pricing")} onClick={() => analytics.track("land_header_nav_pricing_click")} className="hover:text-foreground transition-colors">{texts.navPricing}</a>
          <a href={anchor("faq")} onClick={() => analytics.track("land_header_nav_faq_click")} className="hover:text-foreground transition-colors">{texts.navFaq}</a>
        </nav>
        <div className="flex items-center gap-5 shrink-0">
          <a
            href={signinHref}
            onClick={() => analytics.track("land_header_signin_click")}
            className="text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            {texts.signIn}
          </a>
          <a
            href={createHref}
            onClick={() => analytics.track("land_header_cta_click")}
            className="inline-flex items-center justify-center h-9 px-4 text-xs font-medium text-primary-foreground bg-primary rounded-lg hover:bg-primary/90 active:scale-[0.99] transition-all"
          >
            {texts.cta}
          </a>
        </div>
      </div>
    </header>
    <CookieBanner texts={getCookieTexts(locale)} />
    </>
  );
}
