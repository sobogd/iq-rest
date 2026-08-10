import type { Metadata } from "next";
import { PricingTemplate } from "@/app/_landing/templates/pricing-template";
import { TEXTS as DEFAULT } from "../texts";
import { TEXTS } from "./texts";
import { SCHEMA_PRICE_MENU_EUR } from "@/lib/pricing";
import { SCHEMA_DATE_MODIFIED } from "@/lib/page-meta";

export const dynamic = "force-static";
export const revalidate = false;

const LOCALE = "nl";
const SITE = "https://iq-rest.com";

const PRICING_FAQ = {
  ...DEFAULT.faq,
  sub: "Wat restauranthouders vragen over prijzen en betaling. Vind je je vraag niet? Stuur ons een bericht op WhatsApp.",
  items: [
    { q: "Hoe werken de prijzen?", a: "Je stelt je eigen abonnement samen. Het digitale QR menu is de basis — inclusief AI vertaling in 35 talen en beheer vanaf elk apparaat. Daarna voeg je alleen toe wat je nodig hebt: tafelreserveringen, het keukenscherm met bestellingen aannemen, of een eigen domein. De prijs geldt per restaurant, en vanaf het tweede restaurant worden volumekortingen automatisch toegepast." },
    { q: "Nemen jullie commissie op bestellingen?", a: "Nee. Elke bestelling — vanuit een QR menu of aangenomen door een kelner — gaat direct naar het restaurant, zonder percentages of aggregatorcommissies. Je hebt een vaste maandelijkse vergoeding en geen andere inhoudingen." },
    { q: "Wat omvat de proefperiode van 14 dagen?", a: "Volledige toegang tot alle functies, geen kaart nodig. Na 14 dagen wordt het account automatisch gepauzeerd als er geen betaalmethode is gekoppeld. Er zijn geen automatische afschrijvingen zonder je toestemming." },
    { q: "Wat gebeurt er na de 14 dagen?", a: "Als er geen betaalmethode is gekoppeld, wordt het account automatisch gepauzeerd. Het beheerpaneel blijft beschikbaar in alleen-lezen modus, maar het gast-QR menu en het aannemen van bestellingen zijn tijdelijk uitgeschakeld. We rekenen nooit zonder je toestemming." },
    { q: "Wat gebeurt er met mijn menu, bestellingen en gegevens tijdens de pauze?", a: "Alles blijft volledig behouden: menu, gerechtfoto's, bestelgeschiedenis, reserveringen, ontwerpinstellingen, statistieken. Koppel betaling zelfs een maand of zes maanden later — alles komt terug zoals het was, niets gaat verloren." },
    { q: "Werken de QR codes op de tafels nog na de proefperiode?", a: "Als het account is gepauzeerd, tonen de QR codes gasten een bericht „tijdelijk niet beschikbaar“. Je hoeft geen nieuwe QR codes te printen: zodra de betaling is gekoppeld, openen dezelfde codes het menu weer." },
    { q: "Kan ik mijn abonnement later aanpassen?", a: "Ja — voeg op elk moment functies toe of verwijder ze in het beheerpaneel. Het verschil wordt naar rato berekend op basis van de resterende dagen van de betaalde periode. Als je een functie verwijdert, wordt die uitgeschakeld, maar alle bijbehorende gegevens blijven behouden." },
    { q: "Hoeveel restaurants kan ik beheren?", a: "Zoveel als je nodig hebt — kies het aantal restaurants terwijl je je abonnement samenstelt, allemaal beheerd vanuit één beheerpaneel. Volumekortingen worden automatisch toegepast, tot 50% korting bij 5 of meer restaurants. Beheer je een grotere groep? Stuur ons een bericht op WhatsApp over een abonnement op maat." },
    { q: "Wat is de jaarlijkse korting?", a: "Ongeveer 30% ten opzichte van het maandabonnement. Het exacte bedrag wordt getoond terwijl je je abonnement samenstelt." },
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
