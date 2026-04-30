import type { Metadata } from "next";
import { Faq } from "./_components/faq";
import { Features } from "./_components/features";
import { FinalCta } from "./_components/final-cta";
import { Founder } from "./_components/founder";
import { LandingFooter } from "./_components/landing-footer";
import { LandingHeader } from "./_components/header";
import { LandingPricing } from "./_components/landing-pricing";
import { Hero } from "./_components/hero";
import { How } from "./_components/how";
import { getCurrency } from "./_lib/get-currency";
import { pickRandomVariant } from "./_lib/variants";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  metadataBase: new URL("https://iq-rest.com"),
  title: "QR Menu for Restaurants — Direct Orders, Zero Commission | IQ Rest",
  description:
    "Replace paper menus and delivery-app commissions. QR menu, direct orders, reservations & multilingual website. 14-day free trial, no credit card.",
  alternates: { canonical: "https://iq-rest.com/en" },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
  openGraph: {
    title: "QR Menu for Restaurants — Direct Orders, Zero Commission",
    description:
      "QR menu, direct orders, reservations & AI translation. Live in 2 minutes. 14-day free trial — no credit card.",
    url: "https://iq-rest.com/en",
    siteName: "IQ Rest",
    locale: "en_US",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "IQ Rest QR menu" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "QR Menu for Restaurants — Direct Orders, Zero Commission",
    description: "Live in 2 minutes. 14-day free trial — no credit card.",
    images: ["/og-image.png"],
  },
};

export default async function LandingPage() {
  const [variant, currency] = await Promise.all([
    Promise.resolve(pickRandomVariant()),
    getCurrency(),
  ]);

  return (
    <main className="relative">
      <LandingHeader />
      <Hero variant={variant} />
      <Features />
      <Founder />
      <How />
      <section id="pricing" className="scroll-mt-16 border-t border-border py-16">
        <LandingPricing currency={currency} />
      </section>
      <section id="faq" className="scroll-mt-16 border-t border-border py-16">
        <Faq />
      </section>
      <FinalCta />
      <LandingFooter />
    </main>
  );
}
