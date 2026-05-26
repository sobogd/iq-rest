"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { Globe, LogIn, Menu, X } from "lucide-react";
import { LogoIcon } from "./logo-icon";
import { LinkForward } from "./link-forward";
import { usePrimaryCta } from "./onboarding/use-primary-cta";
import { useOnboardingModal } from "./onboarding/onboarding-modal-provider";
import { useLandingAuth } from "./onboarding/use-landing-auth";
import { getCookieTexts } from "@/app/_landing/lib/cookie-texts";
import { LanguageSwitcherModal } from "@/components/language-switcher/modal";
import { dashboardUrl } from "@/lib/dashboard-url";
import { LOCALE_SLUG_OVERRIDES } from "@/lib/locale-slug-overrides";
import { localeHome, localePath } from "@/lib/locale-paths";
import { analytics } from "@/lib/analytics";
import type { LandingTexts } from "../types";

interface HeaderProps {
  texts: LandingTexts["header"];
  locale: string;
  /** Force anchor links to point to the current page (homepage / KW landing). */
  useLocalAnchors?: boolean;
  /** Feature link list shown in the desktop nav and the burger menu. */
  featureLinks?: LandingTexts["footer"]["featureLinks"];
  /** Keep the header hidden until the visitor scrolls past the first viewport,
   *  then slide it in. Homepage only — the hero hosts its own `variant="hero"`
   *  bar, so the sticky one stays out of the way until scrolled. */
  revealOnScroll?: boolean;
  /** `solid` (default): opaque sticky/fixed bar on a light background.
   *  `hero`: transparent, white, in-flow bar rendered over the hero image. */
  variant?: "solid" | "hero";
}

// One landing header in two skins. `solid` is the opaque sticky bar used across
// the site; on the homepage it's `revealOnScroll` (fixed, hidden until scrolled,
// then minimal: CTA + burger only). `hero` is the transparent white bar that
// lives inside the homepage hero over the photo. Both share logo, nav, burger
// menu and language switcher — only colours/positioning differ.
export function LandingHeader({
  texts,
  locale,
  useLocalAnchors = false,
  featureLinks,
  revealOnScroll = false,
  variant = "solid",
}: HeaderProps) {
  const isHero = variant === "hero";
  // The solid reveal-on-scroll header is only ever shown once scrolled, so it
  // always renders in its minimal form (CTA + burger, no nav/sign-in/globe).
  const minimal = !isHero && revealOnScroll;

  const [revealed, setRevealed] = useState(!revealOnScroll);
  useEffect(() => {
    if (!revealOnScroll) return;
    const onScroll = () => setRevealed(window.scrollY > window.innerHeight * 0.7);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [revealOnScroll]);

  const cookieTexts = getCookieTexts(locale);
  const dashHref = `${dashboardUrl()}/${locale}/dashboard`;
  const cta = usePrimaryCta(texts.cta);
  const auth = useLandingAuth();
  const modal = useOnboardingModal();

  const pathname = usePathname() || "";
  const homeHref = localeHome(locale);
  const onHome = pathname === homeHref || pathname === `${homeHref}/`;
  const useLocal = useLocalAnchors || onHome;
  const anchor = (id: string) => (useLocal ? `#${id}` : `${homeHref}#${id}`);
  const pricingSlug = LOCALE_SLUG_OVERRIDES["/pricing"]?.[locale];
  const pricingHref = pricingSlug ? localePath(locale, pricingSlug) : anchor("pricing");
  const hasFeatureLinks = !!featureLinks && featureLinks.length > 0;

  const normalizedPath = pathname.replace(/\/$/, "");
  const isLinkActive = (href: string) => normalizedPath === href.replace(/\/$/, "");
  const pricingActive = pricingSlug
    ? normalizedPath === localePath(locale, pricingSlug).replace(/\/$/, "")
    : false;

  const [menuOpen, setMenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);

  // Close the burger dropdown on outside click / Escape.
  const menuRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!menuOpen) return;
    const onDown = (e: PointerEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setMenuOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  // variant-specific styling tokens
  const iconBtn = isHero
    ? "text-white bg-white/15 hover:bg-white/25 backdrop-blur"
    : "text-foreground bg-muted hover:bg-muted/70";
  const navHover = isHero ? "hover:border-white" : "hover:border-foreground";
  const navActive = isHero ? "border-white" : "border-foreground";
  const navClass = (active: boolean) =>
    `border-b-2 transition-colors ${active ? navActive : `border-transparent ${navHover}`}`;

  const barClass = isHero
    ? "relative z-30 w-full"
    : `${revealOnScroll ? "fixed" : "sticky"} top-0 inset-x-0 z-40 border-b border-border bg-background/85 backdrop-blur transition-transform duration-300 ${
        revealed ? "translate-y-0" : "-translate-y-full"
      }`;

  return (
    <header className={barClass}>
      <div className={`w-full px-4 sm:px-6 lg:px-10 xl:px-14 ${isHero ? "pt-5 sm:pt-7" : ""}`}>
        <div className={`flex items-center justify-between gap-3 ${isHero ? "" : "h-16"} ${isHero ? "text-white" : "text-foreground"}`}>
          <LinkForward
            href={homeHref}
            trackEvent="l_header_logo_click"
            className="flex items-center gap-1.5 text-lg sm:text-xl font-semibold tracking-tight shrink-0"
          >
            <LogoIcon className="h-8 w-8 sm:h-9 sm:w-9" />
            Rest
          </LinkForward>

            <nav className="hidden lg:flex items-center gap-7 text-base font-semibold mr-auto ml-8">
              {hasFeatureLinks
                ? featureLinks!.map((link) => (
                    <LinkForward
                      key={link.href}
                      href={link.href}
                      prefetch={false}
                      trackEvent={`l_header_nav_${link.href.replace(/[^a-z0-9]+/gi, "_")}_click`}
                      className={navClass(isLinkActive(link.href))}
                    >
                      {link.label}
                    </LinkForward>
                  ))
                : (
                  <LinkForward href={anchor("features")} trackEvent="l_header_nav_features_click" className={navClass(false)}>
                    {texts.navFeatures}
                  </LinkForward>
                )}
              <LinkForward href={pricingHref} trackEvent="l_header_nav_pricing_click" className={navClass(pricingActive)}>
                {texts.navPricing}
              </LinkForward>
            </nav>

          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {minimal ? (
              <button
                type="button"
                onClick={() => cta.onClick("l_header_cta_click")}
                className="inline-flex items-center justify-center h-9 px-4 text-sm font-semibold text-white bg-gradient-to-br from-[hsl(9,100%,58%)] to-[hsl(35,95%,55%)] rounded-lg hover:opacity-90 active:scale-[0.99] transition-all whitespace-nowrap"
              >
                {cta.label}
              </button>
            ) : (
              <>
                {auth.authenticated ? (
                  <a
                    href={dashHref}
                    aria-label={texts.signIn}
                    onClick={() => analytics.track("l_header_dashboard_click")}
                    className={`inline-flex items-center justify-center h-9 w-9 lg:w-auto lg:px-4 text-sm font-semibold rounded-lg transition-colors whitespace-nowrap ${iconBtn}`}
                  >
                    <LogIn className="h-5 w-5 lg:hidden" />
                    <span className="hidden lg:inline">{texts.signIn}</span>
                  </a>
                ) : (
                  <button
                    type="button"
                    aria-label={texts.signIn}
                    onClick={() => {
                      analytics.track("l_header_signin_click");
                      modal.open("signin");
                    }}
                    className={`inline-flex items-center justify-center h-9 w-9 lg:w-auto lg:px-4 text-sm font-semibold rounded-lg transition-colors whitespace-nowrap ${iconBtn}`}
                  >
                    <LogIn className="h-5 w-5 lg:hidden" />
                    <span className="hidden lg:inline">{texts.signIn}</span>
                  </button>
                )}
                <button
                  type="button"
                  aria-label={cookieTexts.languageSwitcher}
                  onClick={() => {
                    analytics.track("l_header_language_click");
                    setLangOpen(true);
                  }}
                  className={`inline-flex items-center justify-center h-9 w-9 rounded-lg transition-colors ${iconBtn}`}
                >
                  <Globe className="h-5 w-5" />
                </button>
              </>
            )}

            <div className="relative" ref={menuRef}>
              <button
                type="button"
                aria-label="Menu"
                aria-expanded={menuOpen}
                onClick={() => {
                  analytics.track(`l_header_burger_${menuOpen ? "close" : "open"}`);
                  setMenuOpen((v) => !v);
                }}
                className={`lg:hidden inline-flex items-center justify-center h-9 w-9 rounded-lg transition-colors ${iconBtn}`}
              >
                {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
              {menuOpen ? (
                <div className="absolute right-0 top-full mt-2 min-w-[220px] bg-background text-foreground border border-border rounded-2xl shadow-xl p-2 flex flex-col z-50">
                  {hasFeatureLinks
                    ? featureLinks!.map((link) => (
                        <LinkForward
                          key={link.href}
                          href={link.href}
                          prefetch={false}
                          trackEvent={`l_header_menu_${link.href.replace(/[^a-z0-9]+/gi, "_")}_click`}
                          className="text-sm font-medium px-3 py-2 rounded-lg hover:bg-muted/50 transition-colors"
                          onClick={closeMenu}
                        >
                          {link.label}
                        </LinkForward>
                      ))
                    : (
                      <LinkForward
                        href={anchor("features")}
                        trackEvent="l_header_menu_features_click"
                        className="text-sm font-medium px-3 py-2 rounded-lg hover:bg-muted/50 transition-colors"
                        onClick={closeMenu}
                      >
                        {texts.navFeatures}
                      </LinkForward>
                    )}
                  <LinkForward
                    href={pricingHref}
                    prefetch={false}
                    trackEvent="l_header_menu_pricing_click"
                    className="text-sm font-medium px-3 py-2 rounded-lg hover:bg-muted/50 transition-colors"
                    onClick={closeMenu}
                  >
                    {texts.navPricing}
                  </LinkForward>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>

      <LanguageSwitcherModal
        open={langOpen}
        onClose={() => setLangOpen(false)}
        currentLocale={locale}
        title={cookieTexts.languageSwitcher}
      />
    </header>
  );
}
