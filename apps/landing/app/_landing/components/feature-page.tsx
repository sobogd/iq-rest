import { loginUrl } from "@/lib/dashboard-url";
import { FaqLp } from "@/app/_landing/components/faq-lp";
import { FeatureHero } from "@/app/_landing/components/feature-hero";
import { FeatureSeoBlock } from "@/app/_landing/components/feature-seo-block";
import { FinalCtaLp } from "@/app/_landing/components/final-cta-lp";
import { LandingFooterLp } from "@/app/_landing/components/footer-lp";
import { LandingHeaderLp } from "@/app/_landing/components/header-lp";
import { LandingPricingLp } from "@/app/_landing/components/pricing-lp";
import { PageTracker } from "@/app/_landing/components/page-tracker";
import { Section, SectionGroup } from "@/app/_landing/components/section";
import { JsonLd, createBreadcrumbSchema } from "@/app/_landing/lib/schemas";
import type { FeatureTexts, LandingTexts } from "@/app/_landing/types";

interface FeaturePageProps {
  texts: FeatureTexts;
  chrome: LandingTexts;
  locale: string;
  featureId: string;
}

export function FeaturePage({ texts, chrome, locale, featureId }: FeaturePageProps) {
  const signinHref = `${loginUrl(locale)}?from=landing`;

  const breadcrumbSchema = createBreadcrumbSchema(locale, [
    { name: "Home" },
    { name: texts.meta.title, path: `/${featureId}` },
  ]);

  const softwareAppSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: texts.meta.title,
    description: texts.meta.description,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web Browser",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  };

  const pricingTexts: LandingTexts["pricing"] = {
    ...chrome.pricing,
    heading: texts.pricing.heading,
    headingAccent: texts.pricing.headingAccent,
    sub: texts.pricing.sub,
  };

  const faqTexts: LandingTexts["faq"] = {
    ...chrome.faq,
    sub: texts.faq.sub,
    items: texts.faq.items,
  };

  return (
    <main className="relative">
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={softwareAppSchema} />

      <PageTracker eventPrefix="land_feature_section_show_" />

      <LandingHeaderLp texts={chrome.header} locale={locale} />

      <FeatureHero
        title={texts.hero.title}
        subtitle={texts.hero.subtitle}
        ctaText={chrome.ctaText}
        demoText={chrome.demoText}
        microcopy={chrome.microcopy}
        locale={locale}
        trustLine={texts.hero.trustLine}
        signinHref={signinHref}
        signinLabel={chrome.header.signIn}
      />

      <SectionGroup>
        <Section dataSection="feature-seo">
          <FeatureSeoBlock
            description={texts.seo.description}
            fullDescription={texts.seo.fullDescription}
            benefits={texts.seo.benefits}
            benefitsHeading={texts.seo.benefitsHeading}
          />
        </Section>
        <Section id="pricing" dataSection="pricing">
          <LandingPricingLp
            texts={pricingTexts}
            ctaText={chrome.ctaText}
            microcopy={chrome.microcopy}
            locale={locale}
          />
        </Section>
        <Section id="faq" dataSection="faq">
          <FaqLp texts={faqTexts} />
        </Section>
        <Section dataSection="final_cta">
          <FinalCtaLp
            texts={texts.finalCta}
            ctaText={chrome.ctaText}
            demoText={chrome.demoText}
            microcopy={chrome.microcopy}
            locale={locale}
          />
        </Section>
        <Section as="footer" dataSection="footer">
          <LandingFooterLp
            texts={chrome.footer}
            headerTexts={chrome.header}
            locale={locale}
            excludeFeatureHref={`/${locale}/${featureId}`}
          />
        </Section>
      </SectionGroup>
    </main>
  );
}
