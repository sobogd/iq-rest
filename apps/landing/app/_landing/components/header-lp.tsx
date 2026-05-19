"use client";

import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { LogoIcon } from "./logo-icon";
import { LinkForward } from "./link-forward";
import { useOnboardingModal } from "./onboarding/onboarding-modal-provider";
import { useLandingAuth } from "./onboarding/use-landing-auth";
import { dashboardUrl } from "@/lib/dashboard-url";
import { analytics } from "@/lib/analytics";
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
  const modal = useOnboardingModal();
  const auth = useLandingAuth();
  const tAuth = useTranslations("auth");
  const dashHref = auth.legacyDashboard ? `/${locale}/dashboard` : `${dashboardUrl()}/${locale}/dashboard`;

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
      <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-14">
        <div className="h-16 flex items-center justify-between gap-3 relative">
          <LinkForward
            href={homeHref}
            trackEvent="land_header_logo_click"
            className="flex items-center gap-1.5 text-lg sm:text-xl font-semibold tracking-tight shrink-0 text-foreground"
          >
            <LogoIcon className="h-8 w-8 sm:h-9 sm:w-9" />
            Rest
          </LinkForward>
          <nav className="hidden md:flex items-center gap-7 text-base font-semibold text-foreground mr-auto ml-8">
            <LinkForward href={anchor("features")} trackEvent="land_header_nav_features_click" className="border-b-2 border-transparent hover:border-foreground transition-colors">{texts.navFeatures}</LinkForward>
            <LinkForward href={anchor("how")} trackEvent="land_header_nav_how_click" className="border-b-2 border-transparent hover:border-foreground transition-colors">{texts.navHow}</LinkForward>
            <LinkForward href={anchor("pricing")} trackEvent="land_header_nav_pricing_click" className="border-b-2 border-transparent hover:border-foreground transition-colors">{texts.navPricing}</LinkForward>
            <LinkForward href={anchor("faq")} trackEvent="land_header_nav_faq_click" className="border-b-2 border-transparent hover:border-foreground transition-colors">{texts.navFaq}</LinkForward>
          </nav>
          <div className="flex items-center gap-5 shrink-0">
            {auth.authenticated ? (
              <a
                href={dashHref}
                onClick={() => analytics.track("land_header_dashboard_click")}
                className="inline-flex items-center justify-center h-9 px-4 text-sm font-semibold text-white bg-gradient-to-br from-[hsl(9,100%,58%)] to-[hsl(35,95%,55%)] rounded-lg hover:opacity-90 active:scale-[0.99] transition-all whitespace-nowrap"
              >
                {tAuth("goToDashboard")}
              </a>
            ) : (
              <>
                <button
                  type="button"
                  onClick={() => {
                    analytics.track("land_header_signin_click");
                    modal.open("signin");
                  }}
                  className="hidden sm:inline-flex text-sm font-semibold text-foreground border-b-2 border-transparent hover:border-foreground transition-colors"
                >
                  {texts.signIn}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    analytics.track("land_header_cta_click");
                    modal.open();
                  }}
                  className="inline-flex items-center justify-center h-9 px-4 text-sm font-semibold text-white bg-gradient-to-br from-[hsl(9,100%,58%)] to-[hsl(35,95%,55%)] rounded-lg hover:opacity-90 active:scale-[0.99] transition-all whitespace-nowrap"
                >
                  {texts.cta}
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
