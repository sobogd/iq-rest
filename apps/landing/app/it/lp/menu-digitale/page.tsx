import type { Metadata } from "next";
import { Faq } from "@/app/_landing/components/faq";
import { PageTracker } from "@/app/_landing/components/page-tracker";
import { Features } from "@/app/_landing/components/features";
import { FinalCta } from "@/app/_landing/components/final-cta";
import { LandingFooter } from "@/app/_landing/components/footer";
import { LandingHeader } from "@/app/_landing/components/header";
import { LandingPricing } from "@/app/_landing/components/pricing";
import { Hero } from "@/app/_landing/components/hero";
import { TEXTS } from "./texts";
import { JSON_LD_HTML } from "./jsonld";

const LOCALE = "it";
const CURRENCY = "EUR" as const;

export const metadata: Metadata = {
  metadataBase: new URL("https://iq-rest.com"),
  title: TEXTS.meta.title,
  description: TEXTS.meta.description,
  alternates: { canonical: TEXTS.meta.canonical },
  // Noindex: /it carries the organic SEO; this URL exists purely as a
  // dedicated, conversion-optimized PPC landing for Google Ads.
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
    images: [
      {
        url: "/og/menu-digitale.png",
        width: 1200,
        height: 630,
        alt: "Menu Digitale per Ristoranti — IQ Rest",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TEXTS.meta.ogTitle,
    description: TEXTS.meta.ogDescription,
    images: ["/og/menu-digitale.png"],
  },
};

export default function MenuDigitaleLpLanding() {
  return (
    <main className="relative">
      <PageTracker />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON_LD_HTML }}
      />
      <LandingHeader texts={TEXTS.header} locale={LOCALE} useLocalAnchors />
      <div className="space-y-10 sm:space-y-0">
        <Hero
          texts={TEXTS.hero}
          ctaText={TEXTS.ctaText}
          demoText={TEXTS.demoText}
          microcopy={TEXTS.microcopy}
          locale={LOCALE}
        />
        <section id="features" data-section="features" className="scroll-mt-16">
          <Features texts={TEXTS.features} />
        </section>
        <section
          id="pricing"
          data-section="pricing"
          className="scroll-mt-16 py-8 sm:py-16"
        >
          <LandingPricing
            texts={TEXTS.pricing}
            ctaText={TEXTS.ctaText}
            microcopy={TEXTS.microcopy}
            locale={LOCALE}
            currency={CURRENCY}
          />
        </section>
        <section
          id="faq"
          data-section="faq"
          className="scroll-mt-16 py-16 bg-muted/20"
        >
          <Faq texts={TEXTS.faq} />
        </section>
        <FinalCta
          texts={TEXTS.finalCta}
          ctaText={TEXTS.ctaText}
          demoText={TEXTS.demoText}
          microcopy={TEXTS.microcopy}
          locale={LOCALE}
        />
      </div>
      <LandingFooter
        texts={TEXTS.footer}
        headerTexts={TEXTS.header}
        locale={LOCALE}
      />
    </main>
  );
}
