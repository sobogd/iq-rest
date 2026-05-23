import Image from "next/image";
import { Check } from "lucide-react";
import { LandingHeaderLp } from "../components/header-lp";
import { LandingFooterLp } from "../components/footer-lp";
import { HeroLp } from "../components/hero-lp";
import { Section } from "../components/section";
import { PageTracker } from "../components/page-tracker";
import { ScanSectionLp } from "../components/scan-section-lp";
import { FounderLp } from "../components/founder-lp";
import { FinalCtaLp } from "../components/final-cta-lp";
import { FaqLp } from "../components/faq-lp";
import { PricingHero } from "../components/pricing-hero";
import { FeatureJsonLd } from "./feature-json-ld";
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
// finalCta → footer. Accent rhythm starts from `scan` (accent), so the
// first subFeature is plain, the next is accent, and so on; pricing, faq,
// founder, finalCta continue the alternation parity-correctly.
export function FeatureLandingTemplate({
  content,
  chrome,
}: FeatureLandingTemplateProps) {
  const { locale, subFeatures, hero, scan, faq, trackPrefix } = content;
  const subCount = subFeatures.length;

  return (
    <main className="relative">
      <PageTracker />
      <FeatureJsonLd content={content} />
      <LandingHeaderLp
        texts={chrome.header}
        locale={locale}
        featureLinks={chrome.footer.featureLinks}
      />

      <HeroLp
        texts={{ ...chrome.hero, headline: hero.headline, sub: hero.sub }}
        ctaText={chrome.ctaText}
        demoText={chrome.demoText}
        microcopy={chrome.microcopy}
        locale={locale}
        imageSrc={hero.imageSrc}
        imageAlt={hero.imageAlt}
      />

      <ScanSectionLp texts={scan} locale={locale} />

      {subFeatures.map((row, i) => {
        const reverse = i % 2 === 0;
        const Icon = row.icon;
        return (
          <Section
            key={row.heading}
            dataSection={`subfeature_${i}`}
            noContainer
            accent={i % 2 === 1}
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
                          className="inline-block h-4 w-4 sm:h-[18px] sm:w-[18px] text-primary mr-1.5 align-[-3px]"
                          strokeWidth={2.5}
                        />
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="w-full">
                  <div className="relative w-full aspect-[4/3] overflow-hidden rounded-2xl lg:rounded-3xl shadow-2xl ring-1 ring-black/5 dark:ring-white/5">
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

      <Section
        id="pricing"
        dataSection="pricing_hero"
        noContainer
        accent={subCount % 2 === 1}
      >
        <PricingHero
          locale={locale}
          ctaText={chrome.ctaText}
          demoText={chrome.demoText}
          microcopy={chrome.microcopy}
          texts={chrome.pricingHero!}
          trackPrefix={`${trackPrefix ?? "l_feature"}_pricing`}
        />
      </Section>

      <Section id="faq" dataSection="faq" noContainer accent={subCount % 2 === 0}>
        <FaqLp
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
        accent={subCount % 2 === 1}
      >
        <FounderLp texts={chrome.founder} />
      </Section>

      <Section dataSection="final_cta" noContainer accent={subCount % 2 === 0}>
        <FinalCtaLp
          texts={chrome.finalCta}
          ctaText={chrome.ctaText}
          demoText={chrome.demoText}
          microcopy={chrome.microcopy}
          locale={locale}
        />
      </Section>

      <Section
        as="footer"
        dataSection="footer"
        noContainer
        className="!py-6 sm:!py-8"
      >
        <LandingFooterLp
          texts={chrome.footer}
          headerTexts={chrome.header}
          locale={locale}
          variant="lp"
        />
      </Section>
    </main>
  );
}
