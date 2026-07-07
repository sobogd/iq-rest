import { LandingHeader } from "../components/header";
import { LandingFooter } from "../components/footer";
import { LandingHero } from "../components/landing-hero";
import { Section } from "../components/section";
import { FeatureCard } from "../components/feature-card";
import { HeroStats } from "../components/hero-stats";
import { PageTracker } from "../components/page-tracker";
import { ScanSection } from "../components/scan-section";
import { Founder } from "../components/founder";
import { FinalCta } from "../components/final-cta";
import { Faq } from "../components/faq";
import { PricingHero } from "../components/pricing-hero";
import { FeatureJsonLd } from "./feature-json-ld";
import { getHelpBanner } from "../help/registry";
import { HelpBannerSection } from "../help/help-banner-section";
import { stablePrefix, featureKey } from "@/lib/track-keys";
import { restaurantCount } from "@/lib/restaurant-count";
import type { LandingTexts } from "../types";
import type { FeatureContent } from "./types";

interface FeatureLandingTemplateProps {
  /** Per-feature, per-locale content — everything that differs between pages. */
  content: FeatureContent;
  /** Locale chrome — header, footer, founder, pricing, finalCta, microcopy. */
  chrome: LandingTexts;
}

// Single render for the standard feature landing page. Used by every
// feature page in every locale. Order: header → hero → scan → subFeatures
// (alternating accent, alternating image side) → pricing → faq → founder →
// finalCta → footer. Accent rhythm starts from `hero` (accent); `scan` is
// plain, the first subFeature is accent, and so on; pricing, faq, founder,
// finalCta and footer continue the alternation parity-correctly.
export function FeatureLandingTemplate({
  content,
  chrome,
}: FeatureLandingTemplateProps) {
  const { locale, subFeatures, hero, scan, faq, trackPrefix, hideFeatureHeading, featureHeading } = content;
  const featureIntro = featureHeading ?? chrome.featureHighlights;
  // Locale-stable prefix/page so every language version fires the same events.
  const prefix = stablePrefix(trackPrefix);
  const page = featureKey(trackPrefix);
  const helpBanner = getHelpBanner(locale);
  // Live restaurant counter for the trust strip (build-time, like the home page).
  const count = restaurantCount();
  const countLabel = count.toLocaleString(locale);
  // Board feature pages embed the real dashboard board (landscape tablet
  // frame) instead of the phone menu preview, so the demo matches the
  // feature. `trackPrefix` carries a locale-stable token on every locale's
  // content (e.g. l_kds / l_en_kds, l_orders, l_bookings) — no per-locale
  // edit needed. Menu/QR pages keep the phone preview.
  const demoVariant = prefix.includes("kds")
    ? "tablet"
    : prefix.includes("orders")
      ? "orders"
      : prefix.includes("bookings")
        ? "reservations"
        : "phone";

  return (
    <main className="relative">
      <PageTracker page={page} />
      <FeatureJsonLd content={content} />
      <LandingHeader
        texts={chrome.header}
        locale={locale}
        featureLinks={chrome.footer.featureLinks}
        useLocalAnchors
        revealOnScroll
      />

      <LandingHero
        locale={locale}
        headerTexts={chrome.header}
        featureLinks={chrome.footer.featureLinks}
        helpHref={helpBanner?.href}
        verticals={chrome.hero.verticals}
        title={hero.headline}
        sub={hero.sub}
        primaryLabel={hero.cta}
        primaryTrack={`${prefix}_hero_cta`}
        demoText={chrome.demoText}
        demoVariant={demoVariant}
        microcopy={chrome.microcopy}
        imageSrc={hero.imageSrc}
        imageAlt={hero.imageAlt}
        heightClass=""
        overlayClass="bg-black/25"
        centered
      />

      {/* Trust strip — shared HeroStats, same four product numbers as the homepage. */}
      <HeroStats trust={chrome.trust ?? []} countLabel={countLabel} dataSection="feature_trust" />

      <div id="features">
      <Section dataSection="subfeatures" noContainer className="!py-16">
        {featureIntro && !hideFeatureHeading ? (
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
            <h2 className="text-[2rem] sm:text-[2.5rem] lg:text-[3rem] font-medium tracking-tight leading-[1.05] mb-4">
              {featureIntro.heading}
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-muted-foreground/70 leading-snug">
              {featureIntro.sub}
            </p>
          </div>
        ) : null}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
          {subFeatures.map((row) => (
            <FeatureCard key={row.heading} row={row} />
          ))}
        </div>
      </Section>

      <ScanSection texts={scan} locale={locale} accent />
      </div>

      <Section
        id="pricing"
        dataSection="pricing_hero"
        noContainer
        className="!py-16"
      >
        <PricingHero
          locale={locale}
          ctaText={chrome.ctaText}
          demoText={chrome.demoText}
          microcopy={chrome.microcopy}
          texts={chrome.pricingHero!}
          trackPrefix={`${prefix}_pricing`}
        />
      </Section>

      <Section id="faq" dataSection="faq" noContainer accent className="!py-16">
        <Faq
          texts={{
            ...chrome.faq,
            sub: faq.sub,
            items: [...faq.items],
          }}
        />
      </Section>

      <Section
        id="founder"
        dataSection="founder"
        noContainer
        className="!py-16"
      >
        <Founder texts={chrome.founder} />
      </Section>

      <Section dataSection="final_cta" noContainer accent className="!py-16">
        <FinalCta
          texts={chrome.finalCta}
          ctaText={hero.cta}
          demoText={chrome.demoText}
          microcopy={chrome.microcopy}
          locale={locale}
          demoVariant={demoVariant}
        />
      </Section>

      {helpBanner ? <HelpBannerSection banner={helpBanner} source="feature" accent={false} /> : null}

      <Section
        as="footer"
        dataSection="footer"
        noContainer
        accent
        className="!py-6 sm:!py-8"
      >
        <LandingFooter
          texts={chrome.footer}
          headerTexts={chrome.header}
          locale={locale}
         
        />
      </Section>
    </main>
  );
}
