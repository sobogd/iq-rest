import { LandingHeader } from "../components/header";
import { LandingFooter } from "../components/footer";
import { Faq } from "../components/faq";
import { Section } from "../components/section";
import { PageTracker } from "../components/page-tracker";
import { PricingQuiz } from "../components/pricing-quiz";
import { FinalCta } from "../components/final-cta";
import { getHelpBanner } from "../help/registry";
import { HelpBannerSection } from "../help/help-banner-section";
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
  return (
    <main className="relative">
      <PageTracker page="pricing" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <LandingHeader texts={texts.header} locale={locale} featureLinks={texts.footer.featureLinks} helpHref={helpBanner?.href} />

      {/* billing-features-constructor: the à-la-carte quiz replaces the fixed
          Basic/Pro plan cards as the pricing hero. */}
      <Section dataSection="pricing_quiz" noContainer>
        <PricingQuiz ctaText={texts.ctaText} />
      </Section>

      {/* Enterprise / custom-plan line */}
      <Section dataSection="pricing_enterprise" noContainer>
        <p className="mx-auto max-w-xl text-center text-base text-muted-foreground">
          Need a custom plan or more restaurants?{" "}
          <a
            href="https://wa.me/998948663743?text=Hi!%20I'd%20like%20a%20custom%20plan%20for%20my%20restaurants."
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-primary underline-offset-2 hover:underline"
          >
            Talk to us
          </a>{" "}
          and we'll tailor one for you.
        </p>
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
