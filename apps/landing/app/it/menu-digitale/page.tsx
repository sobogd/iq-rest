import type { Metadata } from "next";
import { Faq } from "@/app/_landing/components/faq";
import { Features } from "@/app/_landing/components/features";
import { FinalCta } from "@/app/_landing/components/final-cta";
import { Founder } from "@/app/_landing/components/founder";
import { LandingFooter } from "@/app/_landing/components/footer";
import { LandingHeader } from "@/app/_landing/components/header";
import { LandingPricing } from "@/app/_landing/components/pricing";
import { Hero } from "@/app/_landing/components/hero";
import { ScanSection } from "@/app/_landing/components/scan-section";
import { MobileAnchorNav } from "@/app/_landing/components/mobile-anchor-nav";
import { How } from "@/app/_landing/components/how";
import { getCurrency } from "@/app/_landing/lib/get-currency";
import { TEXTS } from "./texts";
import { SeoContent } from "./seo-content";
import { JSON_LD_HTML } from "./jsonld";

const LOCALE = "it";
export const metadata: Metadata = {
  metadataBase: new URL("https://iq-rest.com"),
  title: TEXTS.meta.title,
  description: TEXTS.meta.description,
  alternates: { canonical: TEXTS.meta.canonical },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
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

export default async function MenuDigitaleLanding() {
  const currency = await getCurrency();

  return (
    <main className="relative">
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
        <MobileAnchorNav texts={TEXTS.header} />
        <section id="scan" data-section="scan" className="scroll-mt-16">
          <ScanSection texts={TEXTS.scan} locale={LOCALE} />
        </section>
        <SeoContent />
        <section id="features" data-section="features" className="scroll-mt-16">
          <Features texts={TEXTS.features} />
        </section>
        <section id="founder" data-section="founder" className="scroll-mt-16">
          <Founder texts={TEXTS.founder} />
        </section>
        <section id="how" data-section="how" className="scroll-mt-16">
          <How texts={TEXTS.how} />
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
            currency={currency}
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
