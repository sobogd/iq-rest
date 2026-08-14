import { LandingHeader } from "../components/header";
import { LandingFooter } from "../components/footer";
import { Faq } from "../components/faq";
import { PageTracker } from "../components/page-tracker";
import { PricingQuiz, EN_PRICING_QUIZ } from "../components/pricing-quiz";
import { FinalCta } from "../components/final-cta";
import { PAGE, Band, Content } from "../components/shell";
import type { LandingTexts } from "../types";

// Shared markup for every per-locale pricing page, in the same shell as the
// v2 home: grouped compact header, one 1000px column, plain Bands. Per-locale
// data (the pricing FAQ, JSON-LD) stays in each `page.tsx` and is passed in.
export function PricingTemplate({
  locale,
  texts,
  faq,
  jsonLd,
  count,
}: {
  locale: string;
  texts: LandingTexts;
  faq: LandingTexts["faq"];
  jsonLd: string;
  /** Restaurant-count label ("500+"), for "{count}" in the final CTA's sub line. */
  count?: string;
}) {
  const quiz = texts.pricingQuiz ?? EN_PRICING_QUIZ;
  return (
    <main className={PAGE}>
      <PageTracker page="pricing" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <LandingHeader
        texts={texts.header}
        locale={locale}
        featureLinks={texts.footer.featureLinks}
        compact
        navLayout="grouped"
      />

      <Content>
        {/* The à-la-carte quiz is the pricing hero. */}
        <Band section="pricing_quiz">
          <PricingQuiz ctaText={texts.ctaText} texts={quiz} />
        </Band>

        <Band section="faq" id="faq">
          <Faq texts={faq} />
        </Band>

        <Band section="final_cta">
          <FinalCta
            texts={texts.finalCta}
            ctaText={texts.ctaText}
            demoText={texts.demoText}
            microcopy={texts.microcopy}
            locale={locale}
            count={count}
          />
        </Band>
      </Content>

      <LandingFooter texts={texts.footer} headerTexts={texts.header} locale={locale} routeKey="/pricing" />
    </main>
  );
}
