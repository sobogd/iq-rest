"use client";

import { useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { ChevronDown, Menu, X } from "lucide-react";
import { LogoIcon } from "./logo-icon";
import { LinkForward } from "./link-forward";
import { useOnboardingModal } from "./onboarding/onboarding-modal-provider";
import { useLandingAuth } from "./onboarding/use-landing-auth";
import { dashboardUrl } from "@/lib/dashboard-url";
import { LOCALE_SLUG_OVERRIDES } from "@/lib/locale-slug-overrides";
import { localeHome, localePath } from "@/lib/locale-paths";
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
  /** Feature link list shown in the "Features" header dropdown. When
   *  omitted, "Features" stays a regular anchor link to #features. */
  featureLinks?: LandingTexts["footer"]["featureLinks"];
}

// Single sticky landing header — always visible across LP, SEO landings,
// and the organic homepage. Hosts logo, nav, theme + language switcher,
// and one short Start CTA that doubles as login and signup (OTP flow
// covers both in a single entry point).
export function LandingHeader({ texts, locale, useLocalAnchors = false, featureLinks }: HeaderProps) {
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
  const homeHref = localeHome(locale);
  const onHome = pathname === homeHref || pathname === `${homeHref}/`;
  const useLocal = useLocalAnchors || onHome;
  const anchor = (id: string) => (useLocal ? `#${id}` : `${homeHref}#${id}`);
  // Per-locale pricing page overrides — locales with a dedicated /pricing
  // page link there instead of scrolling to the homepage #pricing section.
  const pricingSlug = LOCALE_SLUG_OVERRIDES["/pricing"]?.[locale];
  const pricingHref = pricingSlug ? localePath(locale, pricingSlug) : anchor("pricing");

  // Features dropdown — open on hover (desktop) or click (any device).
  // Close on mouseleave with a short delay so the gap between the trigger
  // and the panel doesn't immediately dismiss it.
  const [featuresOpen, setFeaturesOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hasFeatureLinks = !!featureLinks && featureLinks.length > 0;
  // Render featureLinks inline in the nav when there are few of them (≤ 5).
  // Larger lists collapse into a dropdown so the header doesn't overflow.
  const featuresInline = hasFeatureLinks && featureLinks!.length <= 5;
  const hasDropdown = hasFeatureLinks && !featuresInline;

  const openFeatures = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
    setFeaturesOpen(true);
  };
  const scheduleClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setFeaturesOpen(false), 120);
  };

  // Mobile burger menu — full-width slide-down panel under the header.
  const [mobileOpen, setMobileOpen] = useState(false);
  const closeMobile = () => setMobileOpen(false);

  const normalizedPath = pathname.replace(/\/$/, "");
  const pricingActive = pricingSlug
    ? normalizedPath === localePath(locale, pricingSlug).replace(/\/$/, "")
    : false;
  const featuresActive = !!featureLinks?.some(
    (l) => normalizedPath === l.href.replace(/\/$/, ""),
  );
  const isLinkActive = (href: string) => normalizedPath === href.replace(/\/$/, "");
  const navClass = (active: boolean) =>
    `border-b-2 transition-colors ${active ? "border-foreground" : "border-transparent hover:border-foreground"}`;

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur">
      <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-14">
        <div className="h-16 flex items-center justify-between gap-3 relative">
          <LinkForward
            href={homeHref}
            trackEvent="l_header_logo_click"
            className="flex items-center gap-1.5 text-lg sm:text-xl font-semibold tracking-tight shrink-0 text-foreground"
          >
            <LogoIcon className="h-8 w-8 sm:h-9 sm:w-9" />
            Rest
          </LinkForward>
          <nav className="hidden lg:flex items-center gap-7 text-base font-semibold text-foreground mr-auto ml-8">
            {featuresInline ? (
              <>
                {featureLinks!.map((link) => (
                  <LinkForward
                    key={link.href}
                    href={link.href}
                    prefetch={false}
                    trackEvent={`l_header_nav_${link.href.replace(/[^a-z0-9]+/gi, "_")}_click`}
                    className={navClass(isLinkActive(link.href))}
                  >
                    {link.label}
                  </LinkForward>
                ))}
              </>
            ) : hasDropdown ? (
              <div
                className="relative"
                onMouseEnter={openFeatures}
                onMouseLeave={scheduleClose}
              >
                <button
                  type="button"
                  onClick={() => {
                    analytics.track("l_header_nav_features_click");
                    setFeaturesOpen((v) => !v);
                  }}
                  aria-expanded={featuresOpen}
                  aria-haspopup="true"
                  className="inline-flex items-center gap-1 group/featbtn"
                >
                  <span className={navClass(featuresActive)}>{texts.navFeatures}</span>
                  <ChevronDown
                    className={`h-4 w-4 transition-transform ${featuresOpen ? "rotate-180" : ""}`}
                  />
                </button>
                {featuresOpen ? (
                  <div
                    className="absolute left-0 top-full pt-2"
                    onMouseEnter={openFeatures}
                    onMouseLeave={scheduleClose}
                  >
                    <div className="min-w-[260px] bg-background border border-border rounded-2xl shadow-xl p-2 flex flex-col">
                      {featureLinks!.map((link) => (
                        <LinkForward
                          key={link.href}
                          href={link.href}
                          prefetch={false}
                          trackEvent={`l_header_features_dd_${link.href.replace(/[^a-z0-9]+/gi, "_")}_click`}
                          className="text-sm font-medium text-foreground/90 px-3 py-2 rounded-lg hover:bg-muted/50 transition-colors"
                          onClick={() => setFeaturesOpen(false)}
                        >
                          {link.label}
                        </LinkForward>
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>
            ) : (
              <LinkForward
                href={anchor("features")}
                trackEvent="l_header_nav_features_click"
                className={navClass(featuresActive)}
              >
                {texts.navFeatures}
              </LinkForward>
            )}
            <LinkForward href={pricingHref} trackEvent="l_header_nav_pricing_click" className={navClass(pricingActive)}>{texts.navPricing}</LinkForward>
          </nav>
          <div className="flex items-center gap-3 sm:gap-5 shrink-0">
            {auth.authenticated ? (
              <a
                href={dashHref}
                onClick={() => analytics.track("l_header_dashboard_click")}
                className="inline-flex items-center justify-center h-9 px-4 text-sm font-semibold text-white bg-gradient-to-br from-[hsl(9,100%,58%)] to-[hsl(35,95%,55%)] rounded-lg hover:opacity-90 active:scale-[0.99] transition-all whitespace-nowrap"
              >
                {tAuth("goToDashboard")}
              </a>
            ) : (
              <>
                <button
                  type="button"
                  onClick={() => {
                    analytics.track("l_header_signin_click");
                    modal.open("signin");
                  }}
                  className="hidden lg:inline-flex text-sm font-semibold text-foreground border-b-2 border-transparent hover:border-foreground transition-colors"
                >
                  {texts.signIn}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    analytics.track("l_header_cta_click");
                    modal.open();
                  }}
                  className="inline-flex items-center justify-center h-9 px-4 text-sm font-semibold text-white bg-gradient-to-br from-[hsl(9,100%,58%)] to-[hsl(35,95%,55%)] rounded-lg hover:opacity-90 active:scale-[0.99] transition-all whitespace-nowrap"
                >
                  {texts.cta}
                </button>
              </>
            )}
            <button
              type="button"
              onClick={() => {
                analytics.track(`l_header_burger_${mobileOpen ? "close" : "open"}`);
                setMobileOpen((v) => !v);
              }}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              className="lg:hidden inline-flex items-center justify-center h-11 w-11 rounded-lg text-foreground hover:bg-muted/50 transition-colors"
            >
              {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {mobileOpen ? (
        <div className="lg:hidden border-t border-border bg-background max-h-[calc(100vh-4rem)] overflow-y-auto">
          <div className="w-full px-4 sm:px-6 py-4 flex flex-col gap-1">
            {featuresInline ? (
              featureLinks!.map((link) => {
                const active = isLinkActive(link.href);
                return (
                  <LinkForward
                    key={link.href}
                    href={link.href}
                    prefetch={false}
                    trackEvent={`l_header_mobile_features_${link.href.replace(/[^a-z0-9]+/gi, "_")}_click`}
                    className={`text-base font-semibold px-3 py-2.5 rounded-lg hover:bg-muted/50 transition-colors ${active ? "text-foreground underline underline-offset-4" : "text-foreground"}`}
                    onClick={closeMobile}
                  >
                    {link.label}
                  </LinkForward>
                );
              })
            ) : hasDropdown ? (
              <>
                <p className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground px-3 pt-2 pb-1">
                  {texts.navFeatures}
                </p>
                {featureLinks!.map((link) => {
                  const active = isLinkActive(link.href);
                  return (
                    <LinkForward
                      key={link.href}
                      href={link.href}
                      prefetch={false}
                      trackEvent={`l_header_mobile_features_${link.href.replace(/[^a-z0-9]+/gi, "_")}_click`}
                      className={`text-base font-medium px-3 py-2.5 rounded-lg hover:bg-muted/50 transition-colors ${active ? "text-foreground underline underline-offset-4" : "text-foreground/90"}`}
                      onClick={closeMobile}
                    >
                      {link.label}
                    </LinkForward>
                  );
                })}
              </>
            ) : (
              <LinkForward
                href={anchor("features")}
                trackEvent="l_header_mobile_nav_features_click"
                className="text-base font-semibold text-foreground px-3 py-2.5 rounded-lg hover:bg-muted/50 transition-colors"
                onClick={closeMobile}
              >
                {texts.navFeatures}
              </LinkForward>
            )}
            <div className="h-px bg-border my-2" />
            <LinkForward
              href={pricingHref}
              trackEvent="l_header_mobile_nav_pricing_click"
              className={`text-base font-semibold text-foreground px-3 py-2.5 rounded-lg hover:bg-muted/50 transition-colors ${pricingActive ? "underline underline-offset-4" : ""}`}
              onClick={closeMobile}
            >
              {texts.navPricing}
            </LinkForward>
            {!auth.authenticated ? (
              <>
                <div className="h-px bg-border my-2" />
                <button
                  type="button"
                  onClick={() => {
                    analytics.track("l_header_mobile_signin_click");
                    closeMobile();
                    modal.open("signin");
                  }}
                  className="text-start text-base font-semibold text-foreground px-3 py-2.5 rounded-lg hover:bg-muted/50 transition-colors"
                >
                  {texts.signIn}
                </button>
              </>
            ) : null}
          </div>
        </div>
      ) : null}
    </header>
  );
}
