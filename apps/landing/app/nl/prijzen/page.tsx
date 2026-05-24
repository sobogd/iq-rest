import type { Metadata } from "next";
import { PricingTemplate } from "@/app/_landing/templates/pricing-template";
import { TEXTS as DEFAULT } from "../texts";
import { TEXTS } from "./texts";
import { SCHEMA_PRICE_BASIC_EUR, SCHEMA_PRICE_PRO_EUR } from "@/lib/pricing";

export const dynamic = "force-static";
export const revalidate = false;

const LOCALE = "nl";
const SITE = "https://iq-rest.com";

const PRICING_FAQ = {
  ...DEFAULT.faq,
  sub: "Wat restauranthouders vragen over prijzen en betaling. Vind je je vraag niet? Stuur ons een bericht op WhatsApp.",
  items: [
    { q: "Wat is het verschil tussen Basic en Pro?", a: "Basic omvat het digitale + QR menu, AI vertaling in 35 talen, bestellingen aannemen vanuit het menu (optioneel) en beheer vanaf elk apparaat. Pro voegt het keukenscherm (KDS) en de online tafelreservering 24/7 toe, plus prioriteit WhatsApp ondersteuning. Als je geen keukenworkflow en reserveringen nodig hebt — Basic dekt alles." },
    { q: "Nemen jullie commissie op bestellingen?", a: "Nee. Elke bestelling — vanuit een QR menu of aangenomen door een kelner — gaat direct naar het restaurant, zonder percentages of aggregatorcommissies. Je hebt een vaste maandelijkse vergoeding en geen andere inhoudingen." },
    { q: "Wat omvat de 14-daagse proef?", a: "Volledige toegang tot alle functies in beide abonnementen, geen kaart nodig. Na 14 dagen wordt het account automatisch gepauzeerd als er geen betaalmethode is gekoppeld. Geen automatische afschrijvingen zonder je toestemming." },
    { q: "Wat gebeurt er na de 14 dagen?", a: "Als er geen betaalmethode is gekoppeld, wordt het account automatisch gepauzeerd. Het beheerpaneel blijft beschikbaar in alleen-lezen modus, maar het gast-QR menu en het aannemen van bestellingen zijn tijdelijk uitgeschakeld. We rekenen nooit zonder je toestemming." },
    { q: "Wat gebeurt er met mijn menu, bestellingen en gegevens tijdens de pauze?", a: "Alles blijft volledig behouden: menu, gerechtfoto's, bestelgeschiedenis, reserveringen, ontwerpinstellingen, statistieken. Koppel betaling zelfs een maand of zes maanden later — alles komt terug zoals het was, niets gaat verloren." },
    { q: "Werken de QR codes op de tafels nog na de proef?", a: "Als het account is gepauzeerd, tonen de QR codes gasten een bericht „tijdelijk niet beschikbaar“. Je hoeft geen nieuwe QR codes te printen: zodra de betaling is gekoppeld, openen dezelfde codes het menu weer." },
    { q: "Kan ik later overstappen van Basic naar Pro?", a: "Ja, de upgrade is één klik in het beheerpaneel. De meerprijs wordt naar rato berekend op basis van de resterende dagen van de betaalde periode. Downgrade van Pro naar Basic is ook beschikbaar — KDS en reservering worden uitgeschakeld, maar alle gegevens blijven behouden." },
    { q: "Wat is de jaarlijkse korting?", a: "Ongeveer 30% ten opzichte van het maandabonnement. Het exacte bedrag wordt getoond bij de betaling op de abonnementspagina." },
    { q: "Kan ik het abonnement op elk moment opzeggen?", a: "Ja, opzegging is één klik in het beheerpaneel. Na opzegging werkt het account tot het einde van de betaalde periode, daarna wordt het gepauzeerd. Gegevens blijven behouden en je kunt terugkomen wanneer je wilt." },
    { q: "Welke betaalmethoden accepteren jullie?", a: "Visa, Mastercard en American Express via Stripe. Apple Pay en Google Pay worden ook ondersteund. In Europa — SEPA Direct Debit bij het jaarabonnement." },
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
        { "@type": "Offer", name: "Basic", price: SCHEMA_PRICE_BASIC_EUR, priceCurrency: "EUR", availability: "https://schema.org/InStock", url: TEXTS.meta.canonical },
        { "@type": "Offer", name: "Pro", price: SCHEMA_PRICE_PRO_EUR, priceCurrency: "EUR", availability: "https://schema.org/InStock", url: TEXTS.meta.canonical },
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
      trackPrefix="l_nl_pricing_hero"
    />
  );
}
