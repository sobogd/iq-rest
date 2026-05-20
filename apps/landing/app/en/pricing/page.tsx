import type { Metadata } from "next";
import { LandingHeaderLp } from "@/app/_landing/components/header-lp";
import { LandingFooterLp } from "@/app/_landing/components/footer-lp";
import { FaqLp } from "@/app/_landing/components/faq-lp";
import { Section } from "@/app/_landing/components/section";
import { PageTracker } from "@/app/_landing/components/page-tracker";
import { PricingHero } from "@/app/_landing/components/pricing-hero";
import { TEXTS as DEFAULT } from "../texts";
import { TEXTS } from "./texts";

export const dynamic = "force-static";
export const revalidate = false;

const LOCALE = "en";
const SITE = "https://iq-rest.com";

const PRICING_FAQ = {
  ...DEFAULT.faq,
  sub: "What restaurateurs ask about pricing and payment. Can't find your question? Message us on WhatsApp.",
  items: [
    { q: "What is the difference between Basic and Pro?", a: "Basic includes the digital + QR menu, AI translation in 35 languages, order taking from the menu (optional) and management from any device. Pro adds the kitchen display (KDS) and 24/7 online table booking, plus priority WhatsApp support. If you don't need the kitchen workflow and bookings — Basic covers everything." },
    { q: "Do you take a commission on orders?", a: "No. Every order — from a QR menu or accepted by a waiter — goes directly to the restaurant, without percentages or aggregator commissions. You have a fixed monthly fee and no other deductions." },
    { q: "What does the 14-day trial include?", a: "Full access to every feature in both plans, no card required. After 14 days the account is automatically paused if no payment method is connected. There are no automatic charges without your consent." },
    { q: "What happens after the 14 days?", a: "If no payment method is connected, the account is automatically paused. The admin panel stays available in read-only mode, but the guest QR menu and order taking are temporarily disabled. We never charge without your consent." },
    { q: "What happens to my menu, orders and data during the pause?", a: "Everything is preserved in full: menu, dish photos, order history, bookings, design settings, statistics. Connect payment even a month or six months later — everything returns as it was, nothing is lost." },
    { q: "Will the QR codes on the tables still work after the trial?", a: "If the account is paused, the QR codes show guests a 'temporarily unavailable' placeholder. You don't need to print new QR codes: as soon as payment is connected the same codes open the menu again." },
    { q: "Can I switch from Basic to Pro later?", a: "Yes, the upgrade is one click in the admin panel. The surcharge is prorated by the remaining days of the paid period. Downgrade from Pro to Basic is also available — KDS and booking will be disabled, but all data is preserved." },
    { q: "What is the annual discount?", a: "About 30% versus the monthly plan. The exact amount is shown at checkout on the plan page." },
    { q: "Can I cancel the subscription at any time?", a: "Yes, cancellation is one click in the admin panel. After cancellation the account works until the end of the paid period, then it is paused. Data is preserved and you can come back whenever you want." },
    { q: "Which payment methods do you accept?", a: "Visa, Mastercard and American Express via Stripe. Apple Pay and Google Pay are also supported. In Europe — SEPA Direct Debit on the annual plan." },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
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
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "IQ Rest — Pricing" }],
  },
  twitter: { card: "summary_large_image", title: TEXTS.meta.ogTitle, description: TEXTS.meta.ogDescription, images: ["/og-image.png"] },
};

const JSON_LD = JSON.stringify({
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "Organization", "@id": `${SITE}/#organization`, name: "IQ Rest", url: SITE, logo: `${SITE}/logo.png` },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "IQ Rest", item: `${SITE}/${LOCALE}` },
        { "@type": "ListItem", position: 2, name: "Pricing", item: TEXTS.meta.canonical },
      ],
    },
    {
      "@type": "Product",
      name: "IQ Rest",
      description: TEXTS.meta.description,
      brand: { "@type": "Brand", name: "IQ Rest" },
      offers: [
        { "@type": "Offer", name: "Basic", price: "6.90", priceCurrency: "EUR", availability: "https://schema.org/InStock", url: TEXTS.meta.canonical },
        { "@type": "Offer", name: "Pro", price: "24.90", priceCurrency: "EUR", availability: "https://schema.org/InStock", url: TEXTS.meta.canonical },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: PRICING_FAQ.items.map((it) => ({ "@type": "Question", name: it.q, acceptedAnswer: { "@type": "Answer", text: it.a } })),
    },
  ],
}).replace(/</g, "\\u003c");

export default function PricingPage() {
  return (
    <main className="relative">
      <PageTracker />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON_LD }} />
      <LandingHeaderLp texts={DEFAULT.header} locale={LOCALE} featureLinks={DEFAULT.footer.featureLinks} />

      <Section dataSection="pricing_hero" noContainer>
        <PricingHero locale={LOCALE} ctaText={DEFAULT.ctaText} demoText={DEFAULT.demoText} microcopy={DEFAULT.microcopy} texts={DEFAULT.pricingHero!} trackPrefix="l_en_pricing_hero" />
      </Section>

      <Section id="faq" dataSection="faq" accent noContainer>
        <FaqLp texts={PRICING_FAQ} />
      </Section>

      <Section as="footer" dataSection="footer" noContainer className="!py-6 sm:!py-8">
        <LandingFooterLp texts={DEFAULT.footer} headerTexts={DEFAULT.header} locale={LOCALE} variant="lp" />
      </Section>
    </main>
  );
}
