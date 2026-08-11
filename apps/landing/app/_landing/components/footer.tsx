import { LinkForward } from "./link-forward";
import { FooterToolbar } from "./footer-toolbar";
import { LOCALE_SLUG_OVERRIDES } from "@/lib/locale-slug-overrides";
import { localeHome, localePath } from "@/lib/locale-paths";
import type { LandingTexts } from "../types";

interface FooterProps {
  texts: LandingTexts["footer"];
  headerTexts: LandingTexts["header"];
  locale: string;
  /** Help guide URL for this locale, when the locale has one. */
  helpHref?: string;
  /** About page URL for this locale, when the locale has one. */
  aboutHref?: string;
}

// One footer for every page. Two rows inside the page's own column: the site
// links on top, then copyright + legal/language under a hairline. No columns,
// no headings — the site is small enough that a single row reads faster, and
// every string here already exists in the header/footer copy, so no locale
// needs new translations.
export function LandingFooter({
  texts,
  headerTexts,
  locale,
  helpHref,
  aboutHref,
}: FooterProps) {
  const year = new Date().getFullYear();
  const copyright = texts.copyrightTemplate.replace("{year}", String(year));

  const pricingSlug = LOCALE_SLUG_OVERRIDES["/pricing"]?.[locale];
  const links: { href: string; label: string }[] = [
    ...texts.featureLinks,
    {
      href: pricingSlug ? localePath(locale, pricingSlug) : `${localeHome(locale)}#pricing`,
      label: headerTexts.navPricing,
    },
    ...(helpHref ? [{ href: helpHref, label: headerTexts.navGuide ?? headerTexts.navHow }] : []),
    ...(aboutHref && headerTexts.navAbout
      ? [{ href: aboutHref, label: headerTexts.navAbout }]
      : []),
  ];

  return (
    <div className="w-full flex flex-col gap-6">
      <nav className="flex flex-wrap items-center justify-center sm:justify-start gap-x-5 gap-y-2 text-sm text-muted-foreground">
        {links.map((l) => (
          <LinkForward
            key={l.href}
            href={l.href}
            prefetch={false}
            trackName={`Footer nav: ${l.label}`}
            className="hover:text-foreground transition-colors"
          >
            {l.label}
          </LinkForward>
        ))}
      </nav>

      <div className="flex flex-col items-center gap-4 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between sm:gap-3">
        <FooterToolbar locale={locale} navClassName="justify-center sm:justify-start gap-x-5" />
        <p className="text-sm text-muted-foreground/50 text-center sm:text-end">{copyright}</p>
      </div>
    </div>
  );
}
