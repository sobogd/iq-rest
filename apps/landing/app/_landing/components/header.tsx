"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { ChevronDown, HelpCircle, LogIn, Menu, X } from "lucide-react";
import { LogoIcon } from "./logo-icon";
import { LinkForward } from "./link-forward";
import { usePrimaryCta } from "./onboarding/use-primary-cta";
import { useLandingAuth } from "./onboarding/use-landing-auth";
import { dashboardUrl } from "@/lib/dashboard-url";
import { LOCALE_SLUG_OVERRIDES, localizedHref, localizedFeatureLinks } from "@/lib/locale-slug-overrides";
import { localeHome, localePath } from "@/lib/locale-paths";
import { analytics } from "@/lib/analytics";
import { featureKeyFromHref, featureLabel } from "@/lib/track-keys";
import { helpHref as guideHrefFor } from "../help/registry";
import { NARROW } from "./shell";
import { useCommonTexts } from "../lib/landing-strings";
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
  /** Inner wrapper classes — defaults to the shared `Container` column
   *  (`NARROW`), same box every page's `Content` uses. */
  containerClass?: string;
  /** Shorter bar with a smaller logo and nav — for the narrow-column home. */
  compact?: boolean;
  /** `flat` (default): every feature link sits directly in the bar.
   *  `grouped`: products dropdown + pricing + guide on the left, plain-text
   *  sign-in and the primary CTA on the right (v2 home). */
  navLayout?: "flat" | "grouped";
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
  containerClass = NARROW,
  compact = false,
  navLayout = "flat",
}: HeaderProps) {
  const grouped = navLayout === "grouped";
  const isHero = variant === "hero";
  // The solid reveal-on-scroll header is only ever shown once scrolled, so it
  // always renders in its minimal form (CTA + burger, no nav/sign-in/globe).
  const minimal = !isHero && revealOnScroll;

  const common = useCommonTexts();
  const [revealed, setRevealed] = useState(!revealOnScroll);
  useEffect(() => {
    if (!revealOnScroll) return;
    const onScroll = () => setRevealed(window.scrollY > window.innerHeight * 0.7);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [revealOnScroll]);

  const dashHref = `${dashboardUrl()}/${locale}/dashboard`;
  const cta = usePrimaryCta(texts.cta);
  const auth = useLandingAuth();
  const router = useRouter();
  const goToSignIn = () => router.push(`/${locale}/login`);

  const pathname = usePathname() || "";
  const homeHref = localeHome(locale);
  const onHome = pathname === homeHref || pathname === `${homeHref}/`;
  const useLocal = useLocalAnchors || onHome;
  const anchor = (id: string) => (useLocal ? `#${id}` : `${homeHref}#${id}`);
  const pricingSlug = LOCALE_SLUG_OVERRIDES["/pricing"]?.[locale];
  const pricingHref = pricingSlug ? localePath(locale, pricingSlug) : anchor("pricing");
  // Feature-link hrefs come from the slug mapping (JSON carries labels only),
  // so the nav never points at a stale /ru/… slug on non-ru locales.
  const productLinks = featureLinks ? localizedFeatureLinks(locale, featureLinks) : undefined;
  const hasFeatureLinks = !!productLinks && productLinks.length > 0;
  const helpHref = guideHrefFor(locale);
  const aboutHref = localizedHref("/about", locale);

  const normalizedPath = pathname.replace(/\/$/, "");
  const isLinkActive = (href: string) => normalizedPath === href.replace(/\/$/, "");
  const pricingActive = pricingSlug
    ? normalizedPath === localePath(locale, pricingSlug).replace(/\/$/, "")
    : false;

  const [menuOpen, setMenuOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);

  // The products panel is a second bar under the header, so the pointer has to
  // cross the header's own padding to reach it. Closing is therefore deferred
  // by a beat and cancelled the moment the pointer lands on either half.
  const productsTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const openProducts = () => {
    if (productsTimer.current) clearTimeout(productsTimer.current);
    setProductsOpen(true);
  };
  const closeProductsSoon = () => {
    if (productsTimer.current) clearTimeout(productsTimer.current);
    productsTimer.current = setTimeout(() => setProductsOpen(false), 120);
  };
  useEffect(() => () => {
    if (productsTimer.current) clearTimeout(productsTimer.current);
  }, []);

  const productsLabel = texts.navProducts ?? texts.navFeatures;
  const guideLabel = texts.navGuide ?? texts.navHow;
  const aboutLabel = texts.navAbout;

  // The panel hangs off the header, not off the trigger: it must start at the
  // bar's bottom edge, and it can't live inside the blurred bar (a nested
  // backdrop-filter has nothing left to sample and renders as flat
  // transparency). It is therefore a sibling of the bar, positioned by hand
  // under the trigger.
  const headerRef = useRef<HTMLElement>(null);
  const productsRef = useRef<HTMLDivElement>(null);
  const [productsLeft, setProductsLeft] = useState(0);
  useEffect(() => {
    if (!grouped) return;
    const measure = () => {
      const header = headerRef.current;
      const trigger = productsRef.current;
      if (!header || !trigger) return;
      setProductsLeft(trigger.getBoundingClientRect().left - header.getBoundingClientRect().left);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [grouped, productsOpen]);

  // Close the burger dropdown on outside click / Escape. The grouped panel is
  // a sibling of the bar (it hangs off the header like the desktop products
  // panel), so the outside check has to consult both refs.
  const menuRef = useRef<HTMLDivElement>(null);
  const mobilePanelRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!menuOpen) return;
    const onDown = (e: PointerEvent) => {
      const t = e.target as Node;
      if (menuRef.current?.contains(t)) return;
      if (mobilePanelRef.current?.contains(t)) return;
      setMenuOpen(false);
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
  const navHoverBorder = isHero ? "hover:border-white" : "hover:border-foreground";
  const navActive = isHero ? "border-white" : "border-foreground";
  const navClass = (active: boolean) =>
    `border-b-2 transition-colors ${active ? navActive : `border-transparent ${navHoverBorder}`}`;

  // Grouped nav: plain links — no pill, no underline, no active marker. Only a
  // light fade under the pointer.
  const groupedNavClass = "inline-flex items-center transition-opacity hover:opacity-70";

  // Backdrop-blur on desktop only: on iOS a blurred sticky element un-sticks
  // during downward scroll (WebKit re-layouts it a frame behind the blur
  // repaint) and only catches up the instant you scroll back up — so mobile
  // keeps a solid bg and skips the per-frame blur repaint entirely.
  const barBg = "bg-background lg:bg-background/85 lg:backdrop-blur-md";

  // The shell carries position/stacking only; the skin (tint, blur, hairline)
  // sits on an inner element so the products panel can be a sibling of it and
  // run its own backdrop-filter. `translateZ(0)` forces the bar onto its own
  // compositor layer — on iOS Safari a plain `sticky` element can otherwise
  // un-stick for a frame during downward scroll (WebKit repaints it a beat
  // behind the rest of the page) and only catch up once you scroll back up.
  const shellClass = isHero
    ? "relative z-30 w-full"
    : `${revealOnScroll ? "fixed" : "sticky"} top-0 inset-x-0 z-40${
        revealOnScroll
          ? ` transition-transform duration-300 ${revealed ? "translate-y-0" : "-translate-y-full"}`
          : " [transform:translateZ(0)]"
      }`;
  const skinClass = isHero ? "" : `border-b border-border ${barBg}`;

  return (
    <header ref={headerRef} className={shellClass}>
      <div className={skinClass}>
      <div className={containerClass}>
        <div className={`flex items-center justify-between ${grouped ? "gap-12" : "gap-3"} ${compact ? "h-14 sm:h-16" : "h-16 sm:h-20"} ${isHero ? "text-white" : "text-foreground"}`}>
          <LinkForward
            href={homeHref}
            trackName="Header logo"
            className={`flex items-center gap-1.5 font-semibold tracking-tight shrink-0 ${compact ? "text-lg sm:text-xl" : "text-lg sm:text-xl"}`}
          >
            <LogoIcon className={compact ? "h-7 w-7 sm:h-8 sm:w-8" : "h-8 w-8 sm:h-9 sm:w-9"} />
            Rest
          </LinkForward>

            {grouped ? (
              // Items carry their own side padding for the hover pill, so the gap
              // between them is small — the padding does the spacing. The negative
              // left margin keeps the first label optically aligned with the logo
              // instead of with the pill's edge.
              // self-stretch: the nav itself spans the bar's full height, so its
              // items can stretch too — otherwise they'd only fill the nav's own
              // text-height box and the bar's top/bottom strips would be dead.
              <nav className={`hidden lg:flex self-stretch items-center font-semibold mr-auto ${compact ? "gap-6 text-sm" : "gap-6 text-base"}`}>
                {/* Products — hover-opened dropdown anchored under the trigger. */}
                <div
                  ref={productsRef}
                  className="self-stretch flex items-center"
                  onMouseEnter={openProducts}
                  onMouseLeave={closeProductsSoon}
                >
                  <button
                    type="button"
                    aria-expanded={productsOpen}
                    onClick={() => setProductsOpen((v) => !v)}
                    // -mr-2 pulls the next item back over the chevron's own side
                    // bearing, so the gaps read as even.
                    className={`self-stretch gap-1 -mr-2 ${groupedNavClass}`}
                  >
                    {productsLabel}
                    {/* Small and muted: it is an affordance ("this expands"), not
                        part of the label — this item is the only one that opens a
                        panel instead of navigating. */}
                    <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
                  </button>

                </div>

                <LinkForward
                  href={pricingHref}
                  trackName="Header nav: pricing"
                  className={`self-stretch ${groupedNavClass}`}
                >
                  {texts.navPricing}
                </LinkForward>

                <a
                  href={helpHref}
                  onClick={() => {
                    analytics.track("Click", "Header nav: guide");
                    analytics.flush();
                  }}
                  className={`self-stretch ${groupedNavClass}`}
                >
                  {guideLabel}
                </a>

                <LinkForward
                  href={aboutHref}
                  trackName="Header nav: about"
                  className={`self-stretch ${groupedNavClass}`}
                >
                  {aboutLabel}
                </LinkForward>
              </nav>
            ) : (
            <nav className={`hidden lg:flex items-center font-semibold mr-auto ${compact ? "gap-5 text-sm ml-7" : "gap-7 text-base ml-8"}`}>
              {hasFeatureLinks
                ? productLinks!.map((link) => (
                    <LinkForward
                      key={link.href}
                      href={link.href}
                      prefetch={false}
                      trackName={`Header nav: ${featureLabel(featureKeyFromHref(link.href))}`}
                      className={navClass(isLinkActive(link.href))}
                    >
                      {link.label}
                    </LinkForward>
                  ))
                : (
                  <LinkForward href={anchor("features")} trackName="Header nav: features" className={navClass(false)}>
                    {texts.navFeatures}
                  </LinkForward>
                )}
              <LinkForward href={pricingHref} trackName="Header nav: pricing" className={navClass(pricingActive)}>
                {texts.navPricing}
              </LinkForward>
            </nav>
            )}

          <div className={`flex items-center gap-2 sm:gap-3 shrink-0 ${grouped ? "lg:gap-6" : ""}`}>
            {minimal ? (
              <button
                type="button"
                onClick={() => cta.onClick("Header CTA")}
                className="inline-flex items-center justify-center h-9 px-4 text-sm font-semibold text-white bg-gradient-to-br from-[hsl(9,100%,58%)] to-[hsl(35,95%,55%)] rounded-lg hover:opacity-90 active:scale-[0.99] transition-all whitespace-nowrap"
              >
                {cta.label}
              </button>
            ) : grouped ? (
              <>
                {/* Sign-in reads as one more nav item — plain text, no chip. */}
                {auth.authenticated ? (
                  <a
                    href={dashHref}
                    onClick={() => {
                      analytics.track("Click", "Header dashboard");
                      analytics.flush();
                    }}
                    className={`hidden lg:inline-flex items-center text-sm font-semibold ${groupedNavClass}`}
                    >
                    {texts.signIn}
                  </a>
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      analytics.track("Click", "Header sign in");
                      goToSignIn();
                    }}
                    className={`hidden lg:inline-flex items-center text-sm font-semibold ${groupedNavClass}`}
                    >
                    {texts.signIn}
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => cta.onClick("Header CTA")}
                  className="inline-flex items-center justify-center h-9 px-4 text-sm font-semibold text-white bg-gradient-to-br from-[hsl(9,100%,58%)] to-[hsl(35,95%,55%)] rounded-lg hover:opacity-90 active:scale-[0.99] transition-all whitespace-nowrap"
                >
                  {cta.label}
                </button>
              </>
            ) : (
              <>
                {auth.authenticated ? (
                  <a
                    href={dashHref}
                    aria-label={texts.signIn}
                    onClick={() => {
                      analytics.track("Click", "Header dashboard");
                      // Plain anchor to another origin — flush before unload.
                      analytics.flush();
                    }}
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
                      analytics.track("Click", "Header sign in");
                      goToSignIn();
                    }}
                    className={`inline-flex items-center justify-center h-9 w-9 lg:w-auto lg:px-4 text-sm font-semibold rounded-lg transition-colors whitespace-nowrap ${iconBtn}`}
                  >
                    <LogIn className="h-5 w-5 lg:hidden" />
                    <span className="hidden lg:inline">{texts.signIn}</span>
                  </button>
                )}
                <a
                  href={helpHref}
                  aria-label={common.help}
                  onClick={() => {
                    analytics.track("Click", "Header help");
                    // Plain anchor — full document navigation, not a soft route change.
                    analytics.flush();
                  }}
                  className={`inline-flex items-center justify-center h-9 w-9 rounded-lg transition-colors ${iconBtn}`}
                >
                  <HelpCircle className="h-5 w-5" />
                </a>
              </>
            )}

            {/* Hidden as a whole on desktop: the button inside was already
                lg:hidden, but the wrapper stayed a zero-width flex child and
                the row's gap after the CTA still applied, pushing the cluster
                off the right edge. */}
            <div className="relative lg:hidden" ref={menuRef}>
              <button
                type="button"
                aria-label={common.menu}
                aria-expanded={menuOpen}
                onClick={() => {
                  analytics.track("Click", `Header menu ${menuOpen ? "close" : "open"}`);
                  setMenuOpen((v) => !v);
                }}
                className={`lg:hidden inline-flex items-center justify-center h-9 w-9 rounded-lg transition-colors ${iconBtn}`}
              >
                {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
              {menuOpen && !grouped ? (
                <div className="absolute right-0 top-full mt-2 min-w-[220px] bg-background text-foreground border border-border rounded-2xl shadow-xl p-2 flex flex-col z-50">
                  {hasFeatureLinks ? (
                    productLinks!.map((link) => (
                      <LinkForward
                        key={link.href}
                        href={link.href}
                        prefetch={false}
                        trackName={`Mobile menu: ${featureLabel(featureKeyFromHref(link.href))}`}
                        className="text-sm font-medium px-3 py-2 rounded-lg hover:bg-muted/50 transition-colors"
                        onClick={closeMenu}
                      >
                        {link.label}
                      </LinkForward>
                    ))
                  ) : (
                    <LinkForward
                      href={anchor("features")}
                      trackName="Mobile menu: features"
                      className="text-sm font-medium px-3 py-2 rounded-lg hover:bg-muted/50 transition-colors"
                      onClick={closeMenu}
                    >
                      {texts.navFeatures}
                    </LinkForward>
                  )}
                  <LinkForward
                    href={pricingHref}
                    prefetch={false}
                    trackName="Mobile menu: pricing"
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
      </div>

      {/* Mobile burger panel — same design language as the desktop products
          panel below: hangs off the bar's bottom edge, same tint, no top
          border, rounded only at the bottom, slides down from behind the bar.
          Content is a flat link list split by two muted group headings. */}
      {grouped ? (
        <div
          ref={mobilePanelRef}
          className={`lg:hidden absolute right-4 sm:right-6 top-full flex flex-col min-w-[220px] py-3 rounded-b-xl border-x border-b border-border ${barBg} shadow-lg transition-all duration-200 ${
            menuOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2 pointer-events-none"
          }`}
        >
          {hasFeatureLinks ? (
            <>
              {texts.menuFeaturesHeading ? (
                <p className="px-5 pt-1 pb-1.5 text-xs font-semibold text-muted-foreground">
                  {texts.menuFeaturesHeading}
                </p>
              ) : null}
              {productLinks!.map((link) => (
                <LinkForward
                  key={link.href}
                  href={link.href}
                  prefetch={false}
                  trackName={`Mobile menu: ${featureLabel(featureKeyFromHref(link.href))}`}
                  className="px-5 py-2.5 text-sm font-semibold hover:bg-muted/50 transition-colors"
                  onClick={closeMenu}
                >
                  {link.label}
                </LinkForward>
              ))}
            </>
          ) : null}

          {texts.menuInfoHeading ? (
            <p className="px-5 pt-3 pb-1.5 text-xs font-semibold text-muted-foreground">
              {texts.menuInfoHeading}
            </p>
          ) : null}
          <LinkForward
            href={pricingHref}
            prefetch={false}
            trackName="Mobile menu: pricing"
            className="px-5 py-2.5 text-sm font-semibold hover:bg-muted/50 transition-colors"
            onClick={closeMenu}
          >
            {texts.navPricing}
          </LinkForward>
          <a
            href={helpHref}
            onClick={() => {
              analytics.track("Click", "Mobile menu: guide");
              analytics.flush();
              closeMenu();
            }}
            className="px-5 py-2.5 text-sm font-semibold hover:bg-muted/50 transition-colors"
          >
            {guideLabel}
          </a>
          {aboutLabel ? (
            <LinkForward
              href={aboutHref}
              prefetch={false}
              trackName="Mobile menu: about"
              className="px-5 py-2.5 text-sm font-semibold hover:bg-muted/50 transition-colors"
              onClick={closeMenu}
            >
              {aboutLabel}
            </LinkForward>
          ) : null}
          <button
            type="button"
            onClick={() => {
              closeMenu();
              if (auth.authenticated) {
                analytics.track("Click", "Mobile menu: dashboard");
                analytics.flush();
                window.location.href = dashHref;
                return;
              }
              analytics.track("Click", "Mobile menu: sign in");
              goToSignIn();
            }}
            className="px-5 py-2.5 text-sm font-semibold text-start hover:bg-muted/50 transition-colors"
          >
            {texts.signIn}
          </button>
        </div>
      ) : null}

      {/* Products panel — an outgrowth of the bar: it starts at the bar's bottom
          edge, wears the same tint/blur/hairline, has no top border and is
          rounded only at the bottom, so the two read as one shape. Sibling of
          the skin (not a child) so its own backdrop-filter has something to
          sample; slides down from behind the bar. */}
      {grouped && hasFeatureLinks ? (
        <div
          onMouseEnter={openProducts}
          onMouseLeave={closeProductsSoon}
          style={{ left: productsLeft }}
          className={`hidden lg:flex absolute top-full flex-col min-w-[220px] py-3 rounded-b-xl border-x border-b border-border ${barBg} shadow-lg transition-all duration-200 ${
            productsOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2 pointer-events-none"
          }`}
        >
          {productLinks!.map((link) => (
            <LinkForward
              key={link.href}
              href={link.href}
              prefetch={false}
              trackName={`Header nav: ${featureLabel(featureKeyFromHref(link.href))}`}
              className={`w-full px-6 py-2.5 text-sm font-semibold whitespace-nowrap ${groupedNavClass}`}
              onClick={() => setProductsOpen(false)}
            >
              {link.label}
            </LinkForward>
          ))}
        </div>
      ) : null}
    </header>
  );
}
