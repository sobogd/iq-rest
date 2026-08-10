import type { Metadata } from "next";
import { PricingTemplate } from "@/app/_landing/templates/pricing-template";
import { TEXTS as DEFAULT } from "../texts";
import { TEXTS } from "./texts";
import { SCHEMA_PRICE_MENU_EUR } from "@/lib/pricing";
import { SCHEMA_DATE_MODIFIED } from "@/lib/page-meta";

export const dynamic = "force-static";
export const revalidate = false;

const LOCALE = "en";
const SITE = "https://iq-rest.com";

const PRICING_FAQ = {
  ...DEFAULT.faq,
  sub: "What restaurateurs ask about pricing and payment. Can't find your question? Message us on WhatsApp.",
  items: [
    { q: "How does the pricing work?", a: "You build your own plan. The digital QR menu is the base — it includes AI translation in 35 languages and management from any device. Then you add only what you need: table reservations, the kitchen display with order taking, or a custom domain. The price is per restaurant, and volume discounts apply automatically from the second restaurant." },
    { q: "Do you take a commission on orders?", a: "No. Every order — from a QR menu or accepted by a waiter — goes directly to the restaurant, without percentages or aggregator commissions. You have a fixed monthly fee and no other deductions." },
    { q: "What does the 14-day trial include?", a: "Full access to every feature, no card required. After 14 days the account is automatically paused if no payment method is connected. There are no automatic charges without your consent." },
    { q: "What happens after the 14 days?", a: "If no payment method is connected, the account is automatically paused. The admin panel stays available in read-only mode, but the guest QR menu and order taking are temporarily disabled. We never charge without your consent." },
    { q: "What happens to my menu, orders and data during the pause?", a: "Everything is preserved in full: menu, dish photos, order history, bookings, design settings, statistics. Connect payment even a month or six months later — everything returns as it was, nothing is lost." },
    { q: "Will the QR codes on the tables still work after the trial?", a: "If the account is paused, the QR codes show guests a 'temporarily unavailable' placeholder. You don't need to print new QR codes: as soon as payment is connected the same codes open the menu again." },
    { q: "Can I change my plan later?", a: "Yes — add or remove features any time in the admin panel. The difference is prorated by the remaining days of the paid period. If you remove a feature, it is switched off but all of its data is preserved." },
    { q: "How many restaurants can I manage?", a: "As many as you need — choose the number of restaurants while building your plan, all managed from a single dashboard. Volume discounts apply automatically, up to 50% off with 5+ restaurants. Running a larger group? Message us on WhatsApp about a custom plan." },
    { q: "What is the annual discount?", a: "About 30% versus monthly billing. The exact amount is shown while you build your plan." },
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
        { "@type": "ListItem", position: 1, name: "IQ Rest", item: `${SITE}/` },
        { "@type": "ListItem", position: 2, name: "Pricing", item: TEXTS.meta.canonical },
      ],
    },
    {
      "@type": "Product",
      name: "IQ Rest",
      description: TEXTS.meta.description,
      dateModified: SCHEMA_DATE_MODIFIED,
      brand: { "@type": "Brand", name: "IQ Rest" },
      offers: [
        { "@type": "Offer", name: "Digital menu", price: SCHEMA_PRICE_MENU_EUR, priceCurrency: "EUR", availability: "https://schema.org/InStock", url: TEXTS.meta.canonical },
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
    <PricingTemplate
      locale={LOCALE}
      texts={DEFAULT}
      faq={PRICING_FAQ}
      jsonLd={JSON_LD}
    />
  );
}
