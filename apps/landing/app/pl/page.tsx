import type { Metadata } from "next";
import { Faq } from "@/app/_landing/components/faq";
import { Features } from "@/app/_landing/components/features";
import { FinalCta } from "@/app/_landing/components/final-cta";
import { Founder } from "@/app/_landing/components/founder";
import { LandingFooter } from "@/app/_landing/components/footer";
import { LandingHeader } from "@/app/_landing/components/header";
import { LandingPricing } from "@/app/_landing/components/pricing";
import { Hero } from "@/app/_landing/components/hero";
import { How } from "@/app/_landing/components/how";
import { getCurrency } from "@/app/_landing/lib/get-currency";
import { pickRandomVariant } from "@/app/_landing/lib/pick-variant";
import { PageTracker } from "@/app/_landing/components/page-tracker";
import { TEXTS } from "./texts";
import { trackGclidArrival } from "@/app/_landing/lib/track-gclid-arrival";

const LOCALE = "pl";

export const dynamic = "force-dynamic";

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

export default async function LandingPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const sp = await searchParams;
  await trackGclidArrival(sp, LOCALE);
  const { variant, index: variantIndex } = pickRandomVariant(TEXTS.hero.variants);
  const currency = await getCurrency();

  return (
    <main className="relative">
      <PageTracker variantIndex={variantIndex} />
      <LandingHeader texts={TEXTS.header} locale={LOCALE} />
      <Hero
        texts={TEXTS.hero}
        variant={variant}
        ctaText={TEXTS.ctaText}
        demoText={TEXTS.demoText}
        microcopy={TEXTS.microcopy}
        locale={LOCALE}
      />
      <Features texts={TEXTS.features} />
      <Founder texts={TEXTS.founder} />
      <How texts={TEXTS.how} />
      <section id="pricing" data-section="pricing" className="scroll-mt-16 border-t border-border py-16">
        <LandingPricing
          texts={TEXTS.pricing}
          ctaText={TEXTS.ctaText}
          microcopy={TEXTS.microcopy}
          locale={LOCALE}
          currency={currency}
        />
      </section>
      <section id="faq" data-section="faq" className="scroll-mt-16 border-t border-border py-16">
        <Faq texts={TEXTS.faq} />
      </section>
      <FinalCta
        texts={TEXTS.finalCta}
        ctaText={TEXTS.ctaText}
        demoText={TEXTS.demoText}
        microcopy={TEXTS.microcopy}
        locale={LOCALE}
      />
      <LandingFooter texts={TEXTS.footer} headerTexts={TEXTS.header} locale="pl" />
    </main>
  );
}
