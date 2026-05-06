import { Faq } from "@/app/_landing/components/faq";
import { FeatureHero } from "@/app/_landing/components/feature-hero";
import { FeatureSeoBlock } from "@/app/_landing/components/feature-seo-block";
import { FinalCta } from "@/app/_landing/components/final-cta";
import { LandingFooter } from "@/app/_landing/components/footer";
import { LandingHeader } from "@/app/_landing/components/header";
import { LandingPricing } from "@/app/_landing/components/pricing";
import { JsonLd, createBreadcrumbSchema } from "@/app/_landing/lib/schemas";
import type { SupportedCurrency } from "@/lib/country-currency-map";
import type { FeatureTexts, LandingTexts } from "@/app/_landing/types";

interface FeaturePageProps {
  texts: FeatureTexts;
  chrome: LandingTexts;
  locale: string;
  featureId: string;
  currency: SupportedCurrency;
}

export function FeaturePage({ texts, chrome, locale, featureId, currency }: FeaturePageProps) {
  const currentHref = `/${locale}/${featureId}`;

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

      <LandingHeader texts={chrome.header} locale={locale} />

      <FeatureHero
        title={texts.hero.title}
        subtitle={texts.hero.subtitle}
        ctaText={chrome.ctaText}
        demoText={chrome.demoText}
        microcopy={chrome.microcopy}
        locale={locale}
        trustLine={texts.hero.trustLine}
      />

      <FeatureSeoBlock
        description={texts.seo.description}
        fullDescription={texts.seo.fullDescription}
        benefits={texts.seo.benefits}
        benefitsHeading={texts.seo.benefitsHeading}
      />

      <section
        id="pricing"
        data-section="pricing"
        className="scroll-mt-16 py-8 sm:py-16"
      >
        <LandingPricing
          texts={pricingTexts}
          ctaText={chrome.ctaText}
          microcopy={chrome.microcopy}
          locale={locale}
          currency={currency}
        />
      </section>

      <section
        id="faq"
        data-section="faq"
        className="scroll-mt-16 py-8 sm:py-16"
      >
        <Faq texts={faqTexts} />
      </section>

      <FinalCta
        texts={texts.finalCta}
        ctaText={chrome.ctaText}
        demoText={chrome.demoText}
        microcopy={chrome.microcopy}
        locale={locale}
      />

      <LandingFooter
        texts={chrome.footer}
        headerTexts={chrome.header}
        locale={locale}
        excludeFeatureHref={currentHref}
      />
    </main>
  );
}
