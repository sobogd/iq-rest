import type { Metadata } from "next";
import { FaqLp } from "@/app/_landing/components/faq-lp";
import { PageTracker } from "@/app/_landing/components/page-tracker";
import { FeaturesLp } from "@/app/_landing/components/features-lp";
import { FinalCtaLp } from "@/app/_landing/components/final-cta-lp";
import { FounderLp } from "@/app/_landing/components/founder-lp";
import { LandingFooterLp } from "@/app/_landing/components/footer-lp";
import { LandingHeaderLp } from "@/app/_landing/components/header-lp";
import { LandingPricingLp } from "@/app/_landing/components/pricing-lp";
import { HeroLp } from "@/app/_landing/components/hero-lp";
import { HowLp } from "@/app/_landing/components/how-lp";
import { ScanSectionLp } from "@/app/_landing/components/scan-section-lp";
import { Section, SectionGroup } from "@/app/_landing/components/section";
import { TEXTS } from "./texts";
import { JSON_LD_HTML } from "./jsonld";

const LOCALE = "zh";

export const metadata: Metadata = {
  metadataBase: new URL("https://iq-rest.com"),
  title: TEXTS.meta.title,
  description: TEXTS.meta.description,
  alternates: { canonical: TEXTS.meta.canonical },
  // Noindex: /zh carries the organic SEO; this URL is a PPC LP only.
  robots: {
    index: false,
    follow: true,
    googleBot: { index: false, follow: true },
  },
  openGraph: {
    title: TEXTS.meta.ogTitle,
    description: TEXTS.meta.ogDescription,
    url: TEXTS.meta.canonical,
    siteName: "IQ Rest",
    locale: TEXTS.meta.ogLocale,
    type: "website",
    images: [{ url: "/og/menu-digitale.png", width: 1200, height: 630, alt: "餐厅数字菜单 — IQ Rest" }],
  },
  twitter: {
    card: "summary_large_image",
    title: TEXTS.meta.ogTitle,
    description: TEXTS.meta.ogDescription,
    images: ["/og/menu-digitale.png"],
  },
};

export default function DigitalMenuLpLanding() {
  return (
    <main className="relative">
      <PageTracker />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON_LD_HTML }} />
      <LandingHeaderLp texts={TEXTS.header} locale={LOCALE} useLocalAnchors />
      <HeroLp texts={TEXTS.hero} ctaText={TEXTS.ctaText} demoText={TEXTS.demoText} microcopy={TEXTS.microcopy} locale={LOCALE} />
      <Section id="scan" dataSection="scan" accent>
        <ScanSectionLp texts={TEXTS.scan} locale={LOCALE} />
      </Section>
      <SectionGroup>
        <Section id="features" dataSection="features"><FeaturesLp texts={TEXTS.features} /></Section>
        <Section id="founder" dataSection="founder"><FounderLp texts={TEXTS.founder} /></Section>
        <Section id="how" dataSection="how"><HowLp texts={TEXTS.how} /></Section>
        <Section id="pricing" dataSection="pricing"><LandingPricingLp texts={TEXTS.pricing} ctaText={TEXTS.ctaText} microcopy={TEXTS.microcopy} locale={LOCALE} /></Section>
        <Section id="faq" dataSection="faq"><FaqLp texts={TEXTS.faq} /></Section>
        <Section dataSection="final_cta"><FinalCtaLp texts={TEXTS.finalCta} ctaText={TEXTS.ctaText} demoText={TEXTS.demoText} microcopy={TEXTS.microcopy} locale={LOCALE} /></Section>
        <Section as="footer" dataSection="footer">
          <LandingFooterLp texts={TEXTS.footer} headerTexts={TEXTS.header} locale={LOCALE} variant="lp" />
        </Section>
      </SectionGroup>
    </main>
  );
}
