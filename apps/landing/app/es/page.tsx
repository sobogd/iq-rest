import type { Metadata } from "next";
import { Faq } from "@/app/_landing/components/faq";
import { PageTracker } from "@/app/_landing/components/page-tracker";
import { Features } from "@/app/_landing/components/features";
import { FinalCta } from "@/app/_landing/components/final-cta";
import { Founder } from "@/app/_landing/components/founder";
import { LandingFooter } from "@/app/_landing/components/footer";
import { LandingHeader } from "@/app/_landing/components/header";
import { LandingPricing } from "@/app/_landing/components/pricing";
import { Hero } from "@/app/_landing/components/hero";
import { ScanSection } from "@/app/_landing/components/scan-section";
import { How } from "@/app/_landing/components/how";
import { Section, SectionGroup } from "@/app/_landing/components/section";
import { TEXTS } from "./texts";
import { SeoContent } from "./seo-content";
import { JSON_LD_HTML } from "./jsonld";

const LOCALE = "es";

// Spain is always EUR — hardcoded so the page stays statically rendered.
// The previous /es/carta-digital page was folded in here (SEO weight
// consolidated on /es), with a 301 in next.config keeping the old URL alive.
// The PPC variant lives at /es/lp/carta-digital-para-restaurante and is
// noindex from day one. The old /es/lp/carta-digital slug 301s to it.

export const metadata: Metadata = {
  metadataBase: new URL("https://iq-rest.com"),
  title: TEXTS.meta.title,
  description: TEXTS.meta.description,
  alternates: { canonical: TEXTS.meta.canonical },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
  openGraph: {
    title: TEXTS.meta.ogTitle,
    description: TEXTS.meta.ogDescription,
    url: TEXTS.meta.canonical,
    siteName: "IQ Rest",
    locale: TEXTS.meta.ogLocale,
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "IQ Rest — Carta Digital para Restaurantes" }],
  },
  twitter: {
    card: "summary_large_image",
    title: TEXTS.meta.ogTitle,
    description: TEXTS.meta.ogDescription,
    images: ["/og-image.png"],
  },
};

export default function LandingPage() {
  return (
    <main className="relative">
      <PageTracker />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON_LD_HTML }}
      />
      <LandingHeader texts={TEXTS.header} locale={LOCALE} useLocalAnchors />
      <Hero
        texts={TEXTS.hero}
        ctaText={TEXTS.ctaText}
        demoText={TEXTS.demoText}
        microcopy={TEXTS.microcopy}
        locale={LOCALE}
      />
      <Section id="scan" dataSection="scan" accent>
        <ScanSection texts={TEXTS.scan} locale={LOCALE} />
      </Section>
      <SectionGroup>
        <Section dataSection="seo-content">
          <SeoContent />
        </Section>
        <Section id="features" dataSection="features">
          <Features texts={TEXTS.features} />
        </Section>
        <Section id="founder" dataSection="founder">
          <Founder texts={TEXTS.founder} />
        </Section>
        <Section id="how" dataSection="how">
          <How texts={TEXTS.how} />
        </Section>
        <Section id="pricing" dataSection="pricing">
          <LandingPricing
            texts={TEXTS.pricing}
            ctaText={TEXTS.ctaText}
            microcopy={TEXTS.microcopy}
            locale={LOCALE}
          />
        </Section>
        <Section id="faq" dataSection="faq">
          <Faq texts={TEXTS.faq} />
        </Section>
        <Section dataSection="final_cta">
          <FinalCta
            texts={TEXTS.finalCta}
            ctaText={TEXTS.ctaText}
            demoText={TEXTS.demoText}
            microcopy={TEXTS.microcopy}
            locale={LOCALE}
          />
        </Section>
      </SectionGroup>
      <LandingFooter texts={TEXTS.footer} headerTexts={TEXTS.header} locale={LOCALE} />
    </main>
  );
}
