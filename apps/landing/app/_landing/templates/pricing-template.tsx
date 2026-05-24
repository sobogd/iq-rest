import { LandingHeaderLp } from "../components/header-lp";
import { LandingFooterLp } from "../components/footer-lp";
import { FaqLp } from "../components/faq-lp";
import { Section } from "../components/section";
import { PageTracker } from "../components/page-tracker";
import { PricingHero } from "../components/pricing-hero";
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
  return (
    <main className="relative">
      <PageTracker />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <LandingHeaderLp texts={texts.header} locale={locale} featureLinks={texts.footer.featureLinks} />

      <Section dataSection="pricing_hero" noContainer accent>
        <PricingHero locale={locale} ctaText={texts.ctaText} demoText={texts.demoText} microcopy={texts.microcopy} texts={texts.pricingHero!} trackPrefix={trackPrefix} />
      </Section>

      <Section id="faq" dataSection="faq" noContainer>
        <FaqLp texts={faq} />
      </Section>

      <Section as="footer" dataSection="footer" noContainer accent className="!py-6 sm:!py-8">
        <LandingFooterLp texts={texts.footer} headerTexts={texts.header} locale={locale} variant="lp" />
      </Section>
    </main>
  );
}
