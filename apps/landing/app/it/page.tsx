import type { Metadata } from "next";
import Link from "next/link";
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
import { getCurrency } from "@/app/_landing/lib/get-currency";
import { TEXTS } from "./texts";
const LOCALE = "it";
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
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "IQ Rest QR menu" }],
  },
  twitter: {
    card: "summary_large_image",
    title: TEXTS.meta.ogTitle,
    description: TEXTS.meta.ogDescription,
    images: ["/og-image.png"],
  },
};

export default async function LandingPage() {
  const currency = await getCurrency();

  return (
    <main className="relative">
      <PageTracker />
      <LandingHeader texts={TEXTS.header} locale={LOCALE} />
      <div className="space-y-10 sm:space-y-0">
      <Hero
        texts={TEXTS.hero}
        ctaText={TEXTS.ctaText}
        demoText={TEXTS.demoText}
        microcopy={TEXTS.microcopy}
        locale={LOCALE}
      />
      <ScanSection texts={TEXTS.scan} locale={LOCALE} />
      <section id="features" data-section="features" className="scroll-mt-16">
        <Features texts={TEXTS.features} />
      </section>
      <section id="founder" data-section="founder" className="scroll-mt-16">
        <Founder texts={TEXTS.founder} />
      </section>
      <section id="how" data-section="how" className="scroll-mt-16">
        <How texts={TEXTS.how} />
      </section>
      <section id="pricing" data-section="pricing" className="scroll-mt-16 py-8 sm:py-16">
        <LandingPricing
          texts={TEXTS.pricing}
          ctaText={TEXTS.ctaText}
          microcopy={TEXTS.microcopy}
          locale={LOCALE}
          currency={currency}
        />
      </section>
      <section id="faq" data-section="faq" className="scroll-mt-16 py-16 bg-muted/20">
        <Faq texts={TEXTS.faq} />
      </section>
      <section data-section="kw-links" className="bg-muted/20 pb-16 -mt-10">
        <div className="container mx-auto px-4">
          <p className="text-xs font-medium uppercase tracking-widest text-primary mb-3 text-center lg:text-start">
            Soluzioni per ristoranti
          </p>
          <div className="flex flex-wrap gap-2 sm:gap-3 justify-center lg:justify-start">
            <Link
              href="/it/menu-digitale"
              className="inline-flex items-center px-4 py-2 rounded-full border border-border bg-background hover:border-primary hover:text-primary transition-colors text-sm font-medium"
            >
              Menu digitale per ristoranti →
            </Link>
            <Link
              href="/it/menu-qr-code"
              className="inline-flex items-center px-4 py-2 rounded-full border border-border bg-background hover:border-primary hover:text-primary transition-colors text-sm font-medium"
            >
              Menu QR Code per ristoranti →
            </Link>
            <Link
              href="/it/creare-menu-digitale"
              className="inline-flex items-center px-4 py-2 rounded-full border border-border bg-background hover:border-primary hover:text-primary transition-colors text-sm font-medium"
            >
              Creare menu digitale →
            </Link>
          </div>
        </div>
      </section>
      <FinalCta
        texts={TEXTS.finalCta}
        ctaText={TEXTS.ctaText}
        demoText={TEXTS.demoText}
        microcopy={TEXTS.microcopy}
        locale={LOCALE}
      />
      </div>
      <LandingFooter texts={TEXTS.footer} headerTexts={TEXTS.header} locale="it" />
    </main>
  );
}
