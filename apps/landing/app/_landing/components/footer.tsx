import { LinkForward } from "./link-forward";
import { LOCALE_SLUG_OVERRIDES, localizedHref, localizedFeatureLinks } from "@/lib/locale-slug-overrides";
import { titleFor } from "@/lib/route-titles";
import { localeHome, localePath } from "@/lib/locale-paths";
import { helpHref as guideHrefFor } from "../help/registry";
import { getCookieTexts } from "../lib/cookie-texts";
import { LANGUAGE_CODES, LANGUAGE_NAMES } from "../lib/language-names";
import { FooterCurrency } from "./footer-currency";
import { Container } from "./shell";
import type { LandingTexts } from "../types";

interface FooterProps {
  texts: LandingTexts["footer"];
  headerTexts: LandingTexts["header"];
  locale: string;
  /** Shared route key of the current page (e.g. "/", "/digital-menu",
   *  "/pricing"). Drives the language switcher so each language link points at
   *  the SAME page's localized slug (SSR, no redirect) with a title attr in the
   *  target language. Omit → language links fall back to each locale's home. */
  routeKey?: string;
}

type FooterLink = { href: string; label: string };

// Server component — one client island (FooterCurrency, which needs
// document.cookie to highlight the active pick; see that file). Language
// links go to each locale's home page rather than the current page —
// swapLocale needs the live pathname, which a server component doesn't have
// without either a middleware header or a client island of its own.
// Owns its own full-width block + `Container` — every page just drops
// `<LandingFooter>` in as the last of the three top-level blocks (header /
// `Content` / footer), no wrapper boilerplate at the call site.
// 3 rows: info + features (2 columns, each an inline flex-wrap link list,
// same shape as the language/currency lists below them) → language +
// currency (2 columns) → legal docs (left) + copyright (right). Gaps match
// the page's own between-card rhythm (gap-6, same as PAGE in shell.tsx) —
// no dividers, the spacing alone separates the rows.
export function LandingFooter({ texts, headerTexts, locale, routeKey }: FooterProps) {
  const year = new Date().getFullYear();
  const copyright = texts.copyrightTemplate.replace("{year}", String(year));
  const cookieTexts = getCookieTexts(locale);

  // Language switcher: keep the visitor on the SAME page in the target language
  // (localized slug from the mapping), not the home page. The title attr is the
  // target page's own <title> in that language so the cross-language links carry
  // real SEO signal. Falls back to locale home when the current page has no
  // shared route key (or the target locale ships no page there).
  const langHref = (code: string): string =>
    routeKey && routeKey !== "/" ? localizedHref(routeKey, code) : localeHome(code);

  const pricingSlug = LOCALE_SLUG_OVERRIDES["/pricing"]?.[locale];
  const pricingHref = pricingSlug ? localePath(locale, pricingSlug) : `${localeHome(locale)}#pricing`;
  const helpHref = guideHrefFor(locale);

  const infoLinks: FooterLink[] = [
    { href: pricingHref, label: headerTexts.navPricing },
    { href: helpHref, label: headerTexts.navGuide ?? headerTexts.navHow },
    // The about page exists for every locale that ships a translated header
    // (navAbout set) — the /o-kompanii route is scaffolded per locale.
    ...(headerTexts.navAbout
      ? [{ href: localizedHref("/about", locale), label: headerTexts.navAbout }]
      : []),
  ];

  const legalLinks: FooterLink[] = [
    { href: localePath(locale, "/privacy"), label: cookieTexts.privacyPolicyLink },
    { href: localePath(locale, "/terms"), label: cookieTexts.termsLink },
    { href: localePath(locale, "/cookies"), label: cookieTexts.cookiePolicyLink },
  ];

  return (
    <footer data-section="footer" className="w-full">
      <Container>
        {/* Same card skin as the page's feature cards, but the bottom edge is
            open — no bottom border, no bottom radius — so the card reads as
            glued to the end of the page. Tint matches the home hero's mockup
            panel. */}
        <div className="flex flex-col gap-6 rounded-t-2xl border border-b-0 border-border bg-[hsl(35_37%_94.5%)] dark:bg-[hsl(31_16%_11.5%)] px-5 pt-10 pb-10 sm:px-8 sm:pt-12 sm:pb-12">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <FooterLinkRow heading={texts.infoHeading} links={infoLinks} />
            {/* Feature-link hrefs are derived from the slug mapping (labels
                from JSON), so the column never points at a stale /ru/… slug.
                The EN auth-layout chrome passes no feature links — skip the
                empty column rather than render a bare heading. */}
            {texts.featureLinks.length > 0 && (
              <FooterLinkRow
                heading={texts.featuresHeading}
                links={localizedFeatureLinks(locale, texts.featureLinks)}
              />
            )}
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="flex flex-col gap-3">
              <p className="text-sm font-semibold text-foreground">{cookieTexts.languageSwitcher}</p>
              <nav aria-label={cookieTexts.languageSwitcher} className="flex flex-wrap gap-x-4 gap-y-2">
                {LANGUAGE_CODES.map((code) => (
                  <LinkForward
                    key={code}
                    href={langHref(code)}
                    title={titleFor(routeKey, code)}
                    prefetch={false}
                    trackName={`Footer language: ${code}`}
                    className={`text-sm transition-colors hover:text-foreground ${
                      code === locale ? "font-medium text-foreground" : "text-muted-foreground"
                    }`}
                  >
                    {LANGUAGE_NAMES[code]}
                  </LinkForward>
                ))}
              </nav>
            </div>

            <FooterCurrency heading={texts.currencyHeading} />
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4">
            <nav aria-label={texts.legalHeading} className="flex flex-wrap gap-x-4 gap-y-2">
              {legalLinks.map((l) => (
                <LinkForward
                  key={l.href}
                  href={l.href}
                  prefetch={false}
                  trackName={`Footer nav: ${l.label}`}
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {l.label}
                </LinkForward>
              ))}
            </nav>
            <p className="text-sm text-muted-foreground/50">{copyright}</p>
          </div>
        </div>
      </Container>
    </footer>
  );
}

function FooterLinkRow({ heading, links }: { heading: string; links: FooterLink[] }) {
  return (
    <div className="flex flex-col gap-3">
      <p className="text-sm font-semibold text-foreground">{heading}</p>
      <nav className="flex flex-wrap gap-x-4 gap-y-2">
        {links.map((l) => (
          <LinkForward
            key={l.href}
            href={l.href}
            prefetch={false}
            trackName={`Footer nav: ${l.label}`}
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            {l.label}
          </LinkForward>
        ))}
      </nav>
    </div>
  );
}
