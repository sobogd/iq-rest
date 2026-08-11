import { LandingHeader } from "../components/header";
import { LandingFooter } from "../components/footer";
import { FeatureHeroCard } from "../components/feature-hero-card";
import { FeatureCard } from "../components/feature-card";
import { PageTracker } from "../components/page-tracker";
import { ScanSection } from "../components/scan-section";
import { Founder } from "../components/founder";
import { FinalCta } from "../components/final-cta";
import { Faq } from "../components/faq";
import { PricingCta } from "../components/pricing-cta";
import type { PricingAddon } from "../components/from-price";
import { NARROW, PAGE, Band } from "../components/shell";
import { FeatureJsonLd } from "./feature-json-ld";
import { getHelpBanner } from "../help/registry";
import { HelpBannerCta } from "../help/help-banner-cta";
import { stablePrefix, featureKey } from "@/lib/track-keys";
import type { LandingTexts } from "../types";
import type { FeatureContent } from "./types";

interface FeatureLandingTemplateProps {
  /** Per-feature, per-locale content — everything that differs between pages. */
  content: FeatureContent;
  /** Locale chrome — header, footer, founder, pricing, finalCta, microcopy. */
  chrome: LandingTexts;
}

// Single render for the standard feature landing page, in the same shell as
// the v2 home: grouped compact header, one 1000px column, plain Bands with a
// single gap between them. Order: hero card → subFeatures → scan → pricing →
// faq → founder → finalCta → help banner → footer.
export function FeatureLandingTemplate({ content, chrome }: FeatureLandingTemplateProps) {
  const { locale, subFeatures, hero, scan, faq, trackPrefix, hideFeatureHeading, featureHeading } =
    content;
  const featureIntro = featureHeading ?? chrome.featureHighlights;
  // Locale-stable prefix/page so every language version fires the same events.
  const prefix = stablePrefix(trackPrefix);
  const page = featureKey(trackPrefix);
  const helpBanner = getHelpBanner(locale);
  // Board feature pages open the dashboard board demo (landscape tablet)
  // instead of the phone menu preview, so the demo matches the feature.
  const demoVariant = prefix.includes("kds")
    ? "tablet"
    : prefix.includes("orders")
      ? "orders"
      : prefix.includes("bookings")
        ? "reservations"
        : "phone";
  // Which paid add-on this feature page sells — drives the "from {price}" line
  // in the pricing CTA (menu base + add-on).
  const pricingAddon: PricingAddon =
    prefix.includes("kds") || prefix.includes("orders")
      ? "ordersKds"
      : prefix.includes("bookings")
        ? "reservations"
        : prefix.includes("domain")
          ? "domain"
          : null;

  return (
    <main className={PAGE}>
      <PageTracker page={page} />
      <FeatureJsonLd content={content} />
      <LandingHeader
        texts={chrome.header}
        locale={locale}
        featureLinks={chrome.footer.featureLinks}
        helpHref={helpBanner?.href}
        useLocalAnchors
        containerClass={NARROW}
        compact
        navLayout="grouped"
      />

      <Band section="hero">
        <FeatureHeroCard
          locale={locale}
          verticals={chrome.hero.verticals}
          title={hero.headline}
          sub={hero.sub}
          primaryLabel={hero.cta}
          demoText={chrome.demoText}
          demoVariant={demoVariant}
          image={hero.imageSrc ? { src: hero.imageSrc, alt: hero.imageAlt ?? "" } : undefined}
        />
      </Band>

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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {subFeatures.map((row) => (
            <FeatureCard key={row.heading} row={row} />
          ))}
        </div>
      </Band>

      <Band section="scan">
        <ScanSection texts={scan} locale={locale} />
      </Band>

      <Band section="pricing_cta" id="pricing">
        <PricingCta locale={locale} texts={chrome.pricingCta} addon={pricingAddon} />
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

      <Band section="founder" id="founder">
        <Founder texts={chrome.founder} />
      </Band>

      <Band section="final_cta">
        <FinalCta
          texts={chrome.finalCta}
          ctaText={hero.cta}
          demoText={chrome.demoText}
          microcopy={chrome.microcopy}
          locale={locale}
          demoVariant={demoVariant}
        />
      </Band>

      {helpBanner ? (
        <Band section="help_banner" id="help-banner">
          <HelpBannerCta banner={helpBanner} source="feature" />
        </Band>
      ) : null}

      <footer data-section="footer" className="w-full">
        <div className={NARROW}>
          <LandingFooter
            texts={chrome.footer}
            headerTexts={chrome.header}
            locale={locale}
            helpHref={helpBanner?.href}
          />
        </div>
      </footer>
    </main>
  );
}
