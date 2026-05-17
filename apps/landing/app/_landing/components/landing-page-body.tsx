import type { ReactNode } from "react";
import type { LandingTexts } from "../types";
import { FaqLp } from "./faq-lp";
import { FeaturesLp } from "./features-lp";
import { FinalCtaLp } from "./final-cta-lp";
import { FounderLp } from "./founder-lp";
import { HeroLp } from "./hero-lp";
import { HowLp } from "./how-lp";
import { LandingFooterLp } from "./footer-lp";
import { LandingHeaderLp } from "./header-lp";
import { LandingPricingLp } from "./pricing-lp";
import { PageTracker } from "./page-tracker";
import { ScanSectionLp } from "./scan-section-lp";
import { Section, SectionGroup } from "./section";

interface LandingPageBodyProps {
  texts: LandingTexts;
  locale: string;
  /** Optional SEO content block rendered above features in the alternating
   *  section group. Provided per-locale by pages that ship organic SEO
   *  copy; omitted on PPC LPs. */
  seoContent?: ReactNode;
  /** JSON-LD payload injected as raw HTML in a <script> tag. */
  jsonLdHtml?: string;
}

// Single source-of-truth body for every organic locale landing page. All
// sections use the centered, single-column LP design. Pages stay thin —
// only metadata, locale + texts, and optional SEO/JSON-LD slots live in
// the page file.
export function LandingPageBody({ texts, locale, seoContent, jsonLdHtml }: LandingPageBodyProps) {
  return (
    <main className="relative">
      <PageTracker />
      {jsonLdHtml ? (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdHtml }} />
      ) : null}
      <LandingHeaderLp texts={texts.header} locale={locale} useLocalAnchors />
      <HeroLp
        texts={texts.hero}
        ctaText={texts.ctaText}
        demoText={texts.demoText}
        microcopy={texts.microcopy}
        locale={locale}
      />
      <Section id="scan" dataSection="scan" accent>
        <ScanSectionLp texts={texts.scan} locale={locale} />
      </Section>
      <SectionGroup>
        {seoContent}
        <Section id="features" dataSection="features">
          <FeaturesLp texts={texts.features} />
        </Section>
        <Section id="founder" dataSection="founder">
          <FounderLp texts={texts.founder} />
        </Section>
        <Section id="how" dataSection="how">
          <HowLp texts={texts.how} />
        </Section>
        <Section id="pricing" dataSection="pricing">
          <LandingPricingLp
            texts={texts.pricing}
            ctaText={texts.ctaText}
            microcopy={texts.microcopy}
            locale={locale}
          />
        </Section>
        <Section id="faq" dataSection="faq">
          <FaqLp texts={texts.faq} />
        </Section>
        <Section dataSection="final_cta">
          <FinalCtaLp
            texts={texts.finalCta}
            ctaText={texts.ctaText}
            demoText={texts.demoText}
            microcopy={texts.microcopy}
            locale={locale}
          />
        </Section>
        <Section as="footer" dataSection="footer">
          <LandingFooterLp texts={texts.footer} headerTexts={texts.header} locale={locale} />
        </Section>
      </SectionGroup>
    </main>
  );
}
