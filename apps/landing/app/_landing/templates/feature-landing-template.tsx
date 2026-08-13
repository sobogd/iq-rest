import { LandingHeader } from "../components/header";
import { LandingFooter } from "../components/footer";
import { FeatureHeroCard } from "../components/feature-hero-card";
import { FeatureCard } from "../components/feature-card";
import { FeatureSpotlights } from "../components/feature-spotlights";
import { PageTracker } from "../components/page-tracker";
import { ScanSection } from "../components/scan-section";
import { FinalCta } from "../components/final-cta";
import { Faq } from "../components/faq";
import { PAGE, Band, Content } from "../components/shell";
import { FeatureJsonLd } from "./feature-json-ld";
import { getIcon } from "../lib/icons";
import { stablePrefix, featureKey } from "@/lib/track-keys";
import { routeKeyFromSlug } from "@/lib/locale-slug-overrides";
import type { LandingTexts } from "../types";
import type { FeatureContent } from "./types";

interface FeatureLandingTemplateProps {
  /** Per-feature, per-locale content — everything that differs between pages. */
  content: FeatureContent;
  /** Locale chrome — header, footer, founder, pricing, finalCta, microcopy. */
  chrome: LandingTexts;
  /** Live restaurant count, for `{count}` in `content.heroCards`. Only needed
   *  when the page sets `heroCards`. */
  count?: number;
}

// Single render for the standard feature landing page, in the same shell as
// the v2 home: grouped compact header, one 1000px column, plain Bands with a
// single gap between them. Order: hero card → subFeatures → scan → faq →
// finalCta → footer.
export function FeatureLandingTemplate({ content, chrome, count }: FeatureLandingTemplateProps) {
  const {
    locale,
    subFeatures,
    hero,
    scan,
    faq,
    trackPrefix,
    hideFeatureHeading,
    featureHeading,
    heroCards,
    heroVerticals,
  } = content;
  const featureIntro = featureHeading ?? chrome.featureHighlights;
  const countLabel = (count ?? 0).toLocaleString(locale);
  const withCount = (s: string) => s.replace("{count}", countLabel);
  // Locale-stable prefix/page so every language version fires the same events.
  const prefix = stablePrefix(trackPrefix);
  const page = featureKey(trackPrefix);
  // Board feature pages open the dashboard board demo (landscape tablet)
  // instead of the phone menu preview, so the demo matches the feature.
  const demoVariant = prefix.includes("kds")
    ? "tablet"
    : prefix.includes("orders")
      ? "orders"
      : prefix.includes("bookings")
        ? "reservations"
        : "phone";
  return (
    <main className={PAGE}>
      <PageTracker page={page} />
      <FeatureJsonLd content={content} />
      <LandingHeader
        texts={chrome.header}
        locale={locale}
        featureLinks={chrome.footer.featureLinks}
        useLocalAnchors
        compact
        navLayout="grouped"
      />

      <Content>
        <Band section="hero">
          <FeatureHeroCard
            locale={locale}
            verticals={chrome.hero.verticals}
            verticalIcons={heroVerticals ? [...heroVerticals] : undefined}
            title={hero.headline}
            titleAccent={hero.headlineAccent}
            sub={hero.sub}
            primaryLabel={hero.cta}
            demoText={hero.demoLabel ?? chrome.demoText}
            demoVariant={demoVariant}
            image={hero.imageSrc ? { src: hero.imageSrc, alt: hero.imageAlt ?? "" } : undefined}
            phones={hero.phones}
            tablet={hero.tablet}
          />
        </Band>

        {heroCards && heroCards.length > 0 ? (
          <Band section="hero_cards">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {heroCards.map((c) => {
                const Icon = getIcon(c.icon);
                return (
                  <div
                    key={c.title}
                    className="flex flex-col gap-1.5 rounded-2xl border border-border p-5 sm:p-6"
                  >
                    <Icon className={`h-7 w-7 mb-1 ${c.iconClass ?? "text-primary"}`} strokeWidth={1.75} />
                    <p className="font-semibold text-base">{withCount(c.title)}</p>
                    <p className="text-sm text-muted-foreground/80 leading-relaxed">{withCount(c.sub)}</p>
                  </div>
                );
              })}
            </div>
          </Band>
        ) : null}

        <Band section="subfeatures" id="features">
          {featureIntro && !hideFeatureHeading ? (
            <div className="max-w-3xl mb-6 sm:mb-8">
              <h2 className="text-[2rem] sm:text-[2.5rem] font-medium tracking-tight leading-[1.05] mb-3">
                {featureIntro.heading}
              </h2>
              <p className="text-sm sm:text-base text-muted-foreground/80 leading-relaxed">
                {featureIntro.sub}
              </p>
            </div>
          ) : null}
          {content.spotlights && content.spotlights.length > 0 ? (
            <FeatureSpotlights items={content.spotlights} />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {subFeatures.map((row) => (
                <FeatureCard key={row.heading} row={row} />
              ))}
            </div>
          )}
        </Band>

        <Band section="scan">
          <ScanSection texts={scan} locale={locale} />
        </Band>

        <Band section="faq" id="faq">
          <Faq
            texts={{
              ...chrome.faq,
              sub: faq.sub,
              items: [...faq.items],
            }}
          />
        </Band>

        <Band section="final_cta">
          <FinalCta
            texts={content.finalCta ?? chrome.finalCta}
            ctaText={hero.cta}
            demoText={chrome.demoText}
            microcopy={chrome.microcopy}
            locale={locale}
            demoVariant={demoVariant}
            count={count}
          />
        </Band>
      </Content>

      <LandingFooter texts={chrome.footer} headerTexts={chrome.header} locale={locale} routeKey={routeKeyFromSlug(content.slug)} />
    </main>
  );
}
