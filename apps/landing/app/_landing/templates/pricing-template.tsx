import { LandingHeader } from "../components/header";
import { LandingFooter } from "../components/footer";
import { Faq } from "../components/faq";
import { PageTracker } from "../components/page-tracker";
import { PricingQuiz, EN_PRICING_QUIZ } from "../components/pricing-quiz";
import { FinalCta } from "../components/final-cta";
import { NARROW, PAGE, Band } from "../components/shell";
import { getHelpBanner } from "../help/registry";
import { HelpBannerCta } from "../help/help-banner-cta";
import type { LandingTexts } from "../types";

// Shared markup for every per-locale pricing page, in the same shell as the
// v2 home: grouped compact header, one 1000px column, plain Bands. Per-locale
// data (the pricing FAQ, JSON-LD) stays in each `page.tsx` and is passed in.
export function PricingTemplate({
  locale,
  texts,
  faq,
  jsonLd,
}: {
  locale: string;
  texts: LandingTexts;
  faq: LandingTexts["faq"];
  jsonLd: string;
}) {
  const helpBanner = getHelpBanner(locale);
  const quiz = texts.pricingQuiz ?? EN_PRICING_QUIZ;
  return (
    <main className={PAGE}>
      <PageTracker page="pricing" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <LandingHeader
        texts={texts.header}
        locale={locale}
        featureLinks={texts.footer.featureLinks}
        helpHref={helpBanner?.href}
        containerClass={NARROW}
        compact
        navLayout="grouped"
      />

      {/* The à-la-carte quiz is the pricing hero. */}
      <Band section="pricing_quiz">
        <PricingQuiz ctaText={texts.ctaText} texts={quiz} />
      </Band>

      {/* Enterprise / custom-plan line */}
      <Band section="pricing_enterprise">
        <p className="mx-auto max-w-xl text-center text-base text-muted-foreground">
          {quiz.enterprisePre}{" "}
          <a
            href={`https://wa.me/998948663743?text=${encodeURIComponent(quiz.enterpriseWa)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-primary underline-offset-2 hover:underline"
          >
            {quiz.enterpriseCta}
          </a>{" "}
          {quiz.enterprisePost}
        </p>
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
        />
      </Band>

      {helpBanner ? (
        <Band section="help_banner" id="help-banner">
          <HelpBannerCta banner={helpBanner} source="pricing" />
        </Band>
      ) : null}

      <footer data-section="footer" className="w-full">
        <div className={NARROW}>
          <LandingFooter
            texts={texts.footer}
            headerTexts={texts.header}
            locale={locale}
            helpHref={helpBanner?.href}
          />
        </div>
      </footer>
    </main>
  );
}
