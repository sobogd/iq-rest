import type { ReactNode } from "react";
import type { LandingTexts } from "../types";
import { getFeatureRows } from "../data/feature-rows";
import { FaqLp } from "./faq-lp";
import { FeatureRow } from "./feature-row";
import { FinalCtaLp } from "./final-cta-lp";
import { FounderLp } from "./founder-lp";
import { HeroLp } from "./hero-lp";
import { HowLp } from "./how-lp";
import { LandingFooterLp } from "./footer-lp";
import { LandingHeaderLp } from "./header-lp";
import { LandingPricingLp } from "./pricing-lp";
import { PageTracker } from "./page-tracker";
import { ScanSectionLp } from "./scan-section-lp";
import { Section } from "./section";

interface LandingPageBodyProps {
  texts: LandingTexts;
  locale: string;
  /** Optional SEO content block rendered above features. Used by feature
   *  pages that ship organic SEO copy; omitted on PPC LPs and home. */
  seoContent?: ReactNode;
  /** JSON-LD payload injected as raw HTML in a <script> tag. */
  jsonLdHtml?: string;
  /** Footer variant — "lp" hides keyword links + extra nav (PPC focus). */
  footerVariant?: "lp" | "default";
  /** Optional override for the hero image src/alt — defaults to the
   *  generic cafe shot when omitted. */
  heroImageSrc?: string;
  heroImageAlt?: string;
}

// Single source-of-truth body for every landing page. Sections rely on
// hero stylistics: full-bleed edge padding, no centered container.
// Founder / pricing / final-cta / footer alternate accent backgrounds.
export function LandingPageBody({
  texts,
  locale,
  seoContent,
  jsonLdHtml,
  footerVariant = "default",
  heroImageSrc,
  heroImageAlt,
}: LandingPageBodyProps) {
  const featureRows = getFeatureRows(locale);
  return (
    <main className="relative">
      <PageTracker />
      {jsonLdHtml ? (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdHtml }} />
      ) : null}
      <LandingHeaderLp texts={texts.header} locale={locale} useLocalAnchors featureLinks={texts.footer.featureLinks} />
      <HeroLp
        texts={texts.hero}
        ctaText={texts.ctaText}
        demoText={texts.demoText}
        microcopy={texts.microcopy}
        locale={locale}
        imageSrc={heroImageSrc}
        imageAlt={heroImageAlt}
      />
      <ScanSectionLp texts={texts.scan} locale={locale} />
      <div className="lg:py-12 xl:py-16">
        {featureRows.map((row, i) => (
          <FeatureRow
            key={row.eyebrow}
            id={i === 0 ? "features" : undefined}
            image={row.image}
            eyebrow={row.eyebrow}
            heading={row.heading}
            body={row.body}
            bullets={[...row.bullets]}
            reverse={i % 2 === 1}
          />
        ))}
      </div>
      {seoContent}
      <Section id="founder" dataSection="founder" accent noContainer>
        <FounderLp texts={texts.founder} />
      </Section>
      <Section id="how" dataSection="how" noContainer>
        <HowLp texts={texts.how} />
      </Section>
      <Section id="pricing" dataSection="pricing" accent noContainer>
        <LandingPricingLp
          texts={texts.pricing}
          ctaText={texts.ctaText}
          demoText={texts.demoText}
          microcopy={texts.microcopy}
          locale={locale}
        />
      </Section>
      <Section id="faq" dataSection="faq" noContainer>
        <FaqLp texts={texts.faq} />
      </Section>
      <Section dataSection="final_cta" accent noContainer>
        <FinalCtaLp
          texts={texts.finalCta}
          ctaText={texts.ctaText}
          demoText={texts.demoText}
          microcopy={texts.microcopy}
          locale={locale}
        />
      </Section>
      <Section as="footer" dataSection="footer" noContainer className="!py-6 sm:!py-8">
        <LandingFooterLp
          texts={texts.footer}
          headerTexts={texts.header}
          locale={locale}
          variant={footerVariant}
        />
      </Section>
    </main>
  );
}
