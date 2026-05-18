import { FooterToolbar } from "./footer-toolbar";
import { LinkForward } from "./link-forward";
import type { LandingTexts } from "../types";

interface FooterProps {
  texts: LandingTexts["footer"];
  headerTexts: LandingTexts["header"];
  locale: string;
  excludeFeatureHref?: string;
  /** When "lp": single-row layout with copyright on the left and the
   *  legal/lang buttons on the right. Hides feature/keyword nav rows.
   *  Used on PPC landing pages to remove conversion leak. */
  variant?: "default" | "lp";
}

function slugify(href: string): string {
  return href
    .replace(/^#/, "anchor_")
    .replace(/^\//, "")
    .replace(/[^a-z0-9]+/gi, "_")
    .replace(/^_+|_+$/g, "")
    .toLowerCase();
}

export function LandingFooterLp({
  texts,
  headerTexts: _headerTexts,
  locale,
  excludeFeatureHref,
  variant = "default",
}: FooterProps) {
  const year = new Date().getFullYear();
  const copyright = texts.copyrightTemplate.replace("{year}", String(year));
  const featureLinks = excludeFeatureHref
    ? texts.featureLinks.filter((link) => link.href !== excludeFeatureHref)
    : texts.featureLinks;

  if (variant === "lp") {
    return (
      <div className="w-full flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-3">
        <p className="text-sm text-muted-foreground/80 text-center sm:text-start">
          {copyright}
        </p>
        <FooterToolbar
          locale={locale}
          navClassName="justify-center sm:justify-end gap-x-4"
        />
      </div>
    );
  }

  return (
    <div className="w-full">
        {texts.keywordLinks && texts.keywordLinks.length > 0 ? (
          <div className="mb-8 sm:mb-10">
            {texts.keywordLinksHeading ? (
              <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground mb-3 text-start">
                {texts.keywordLinksHeading}
              </p>
            ) : null}
            <nav className="flex flex-wrap items-center justify-start gap-x-5 gap-y-2 text-sm">
              {texts.keywordLinks.map((link) => (
                <LinkForward
                  key={link.href}
                  href={link.href}
                  prefetch={false}
                  trackEvent={`land_footer_keyword_${slugify(link.href)}_click`}
                  className="text-foreground hover:text-primary transition-colors font-medium"
                >
                  {link.label}
                </LinkForward>
              ))}
            </nav>
          </div>
        ) : null}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-10 md:gap-6">
          <nav className="flex flex-wrap items-center justify-start gap-x-5 gap-y-2 text-sm md:max-w-[50%]">
            {featureLinks.map((link) => (
              <LinkForward
                key={link.href}
                href={link.href}
                prefetch={false}
                trackEvent={`land_footer_feature_${slugify(link.href)}_click`}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.label}
              </LinkForward>
            ))}
          </nav>

          <div className="flex flex-col items-start md:items-end gap-6 md:gap-2 text-start md:text-end">
            <FooterToolbar locale={locale} navClassName="justify-start md:justify-end" />
            <p className="text-sm text-muted-foreground/80 pt-2 md:mt-1">
              {copyright}
            </p>
          </div>
        </div>
    </div>
  );
}
