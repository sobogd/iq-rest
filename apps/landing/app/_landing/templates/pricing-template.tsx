import { LandingHeader } from "../components/header";
import { LandingFooter } from "../components/footer";
import { Faq } from "../components/faq";
import { Section } from "../components/section";
import { PageTracker } from "../components/page-tracker";
import { PricingHero } from "../components/pricing-hero";
import { FinalCta } from "../components/final-cta";
import { getHelpBanner } from "../help/registry";
import { HelpBannerSection } from "../help/help-banner-section";
import { stablePrefix } from "@/lib/track-keys";
import type { LandingTexts } from "../types";

// Shared markup for every per-locale pricing page. Per-locale data (the
// pricing FAQ, JSON-LD, the analytics track prefix) stays in each `page.tsx`
// and is passed in. `texts` is the locale's home TEXTS (header/footer/hero).
export function PricingTemplate({
  locale,
  texts,
  faq,
  jsonLd,
  trackPrefix,
}: {
  locale: string;
  texts: LandingTexts;
  faq: LandingTexts["faq"];
  jsonLd: string;
  trackPrefix: string;
}) {
  const helpBanner = getHelpBanner(locale);
  // Locale-stable: every pricing page collapses to l_pricing_*.
  const prefix = stablePrefix(trackPrefix);
  return (
    <main className="relative">
      <PageTracker page="pricing" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <LandingHeader texts={texts.header} locale={locale} featureLinks={texts.footer.featureLinks} helpHref={helpBanner?.href} />

      <Section dataSection="pricing_hero" noContainer>
        <PricingHero locale={locale} ctaText={texts.ctaText} demoText={texts.demoText} microcopy={texts.microcopy} texts={texts.pricingHero!} trackPrefix={prefix} />
      </Section>

      <Section id="faq" dataSection="faq" noContainer accent>
        <Faq texts={faq} />
      </Section>

      <Section dataSection="final_cta" noContainer className="!py-16">
        <FinalCta
          texts={texts.finalCta}
          ctaText={texts.ctaText}
          demoText={texts.demoText}
          microcopy={texts.microcopy}
          locale={locale}
        />
      </Section>

      {helpBanner ? <HelpBannerSection banner={helpBanner} source="pricing" /> : null}

      <Section as="footer" dataSection="footer" noContainer className="!py-6 sm:!py-8">
        <LandingFooter texts={texts.footer} headerTexts={texts.header} locale={locale} />
      </Section>
    </main>
  );
}
