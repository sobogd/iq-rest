import Image from "next/image";
import { Check } from "lucide-react";
import { LandingHeader } from "../components/header";
import { LandingFooter } from "../components/footer";
import { LandingHero } from "../components/landing-hero";
import { Section } from "../components/section";
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
  const { locale, subFeatures, hero, scan, faq, trackPrefix } = content;
  // Locale-stable prefix/page so every language version fires the same events.
  const prefix = stablePrefix(trackPrefix);
  const page = featureKey(trackPrefix);
  const subCount = subFeatures.length;
  const helpBanner = getHelpBanner(locale);
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
        secondaryLabel={chrome.header.viewFeatures}
        secondaryHref="#features"
        secondaryTrack={`${prefix}_hero_features`}
        secondaryHideMobile
        secondaryPinRight
        microcopy={chrome.microcopy}
        imageSrc={hero.imageSrc}
        imageAlt={hero.imageAlt}
      />

      <div id="features">
      <ScanSection texts={scan} locale={locale} />

      {subFeatures.map((row, i) => {
        const reverse = i % 2 === 0;
        const Icon = row.icon;
        return (
          <Section
            key={row.heading}
            dataSection={`subfeature_${i}`}
            noContainer
            accent={i % 2 === 0}
          >
            <div className="w-full lg:min-h-[70dvh] flex items-center py-6 sm:py-16 lg:py-0">
              <div
                className={`grid grid-cols-1 gap-10 lg:gap-14 xl:gap-20 lg:grid-cols-2 lg:items-center w-full ${
                  reverse ? "lg:[&>*:first-child]:order-2" : ""
                }`}
              >
                <div className="flex flex-col items-center text-center lg:items-start lg:text-start">
                  <div className="inline-flex items-center gap-2 text-primary mb-5">
                    <Icon className="h-5 w-5" strokeWidth={2} />
                    <span className="text-[11px] uppercase tracking-widest font-medium">
                      {row.eyebrow}
                    </span>
                  </div>
                  <h2 className="text-[2rem] sm:text-[2.5rem] lg:text-[3rem] xl:text-[3.25rem] font-medium tracking-tight leading-[1.05] mb-5">
                    {row.heading}
                  </h2>
                  <p className="text-base sm:text-lg lg:text-xl text-muted-foreground/70 max-w-xl leading-snug mb-6">
                    {row.body}
                  </p>
                  <ul className="w-full max-w-xl grid grid-cols-1 gap-2.5">
                    {row.bullets.map((b) => (
                      <li
                        key={b}
                        className="text-sm sm:text-base text-foreground/90 leading-snug text-center lg:text-start"
                      >
                        <Check
                          className="inline align-[-0.15em] mr-1.5 h-4 w-4 sm:h-[18px] sm:w-[18px] text-primary"
                          strokeWidth={2.5}
                        />
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="w-full">
                  <div className="relative w-full aspect-[4/3] overflow-hidden rounded-lg shadow-2xl ring-1 ring-black/5 dark:ring-white/5">
                    <Image
                      src={row.image.src}
                      alt={row.image.alt}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </Section>
        );
      })}
      </div>

      <Section
        id="pricing"
        dataSection="pricing_hero"
        noContainer
        accent={subCount % 2 === 0}
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

      <Section id="faq" dataSection="faq" noContainer accent={subCount % 2 === 1} className="!py-16">
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
        accent={subCount % 2 === 0}
        className="!py-16"
      >
        <Founder texts={chrome.founder} />
      </Section>

      <Section dataSection="final_cta" noContainer className="!py-16">
        <FinalCta
          texts={chrome.finalCta}
          ctaText={hero.cta}
          demoText={chrome.demoText}
          microcopy={chrome.microcopy}
          locale={locale}
          demoVariant={demoVariant}
        />
      </Section>

      {helpBanner ? <HelpBannerSection banner={helpBanner} source="feature" /> : null}

      <Section
        as="footer"
        dataSection="footer"
        noContainer
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
