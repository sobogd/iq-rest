import type { Metadata } from "next";
import { PricingTemplate } from "@/app/_landing/templates/pricing-template";
import { TEXTS as DEFAULT } from "../texts";
import { TEXTS } from "./texts";
import { SCHEMA_PRICE_BASIC_EUR, SCHEMA_PRICE_PRO_EUR } from "@/lib/pricing";

export const dynamic = "force-static";
export const revalidate = false;

const LOCALE = "sk";
const SITE = "https://iq-rest.com";

const PRICING_FAQ = {
  ...DEFAULT.faq,
  sub: "Čo sa reštaurátori pýtajú o cenách a platbe. Nenašli ste svoju otázku? Napíšte nám na WhatsApp.",
  items: [
    { q: "Aký je rozdiel medzi Basic a Pro?", a: "Basic obsahuje digitálne + QR menu, AI preklad do 35 jazykov, prijímanie objednávok z menu (voliteľné) a správu z akéhokoľvek zariadenia. Pro pridáva kuchynský displej (KDS) a online rezerváciu stolov 24/7, plus prioritnú WhatsApp podporu. Ak nepotrebujete kuchynský tok a rezervácie — Basic pokrýva všetko." },
    { q: "Beriete províziu z objednávok?", a: "Nie. Každá objednávka — z QR menu alebo prijatá čašníkom — ide priamo do reštaurácie, bez percent alebo agregátorových provízií. Máte pevný mesačný poplatok a žiadne iné zrážky." },
    { q: "Čo zahŕňa 14-dňové skúšobné obdobie?", a: "Plný prístup ku všetkým funkciám v oboch plánoch, bez karty. Po 14 dňoch sa účet automaticky pozastaví, ak nie je pripojený spôsob platby. Žiadne automatické platby bez vášho súhlasu." },
    { q: "Čo sa stane po 14 dňoch?", a: "Ak nie je pripojený spôsob platby, účet sa automaticky pozastaví. Administračný panel zostáva dostupný v režime iba na čítanie, ale QR menu pre hostí a prijímanie objednávok sú dočasne vypnuté. Nikdy neúčtujeme bez vášho súhlasu." },
    { q: "Čo sa stane s mojím menu, objednávkami a údajmi počas pauzy?", a: "Všetko zostáva v plnom rozsahu: menu, fotografie jedál, história objednávok, rezervácie, nastavenia dizajnu, štatistiky. Pripojte platbu aj o mesiac alebo šesť mesiacov neskôr — všetko sa vráti, ako bolo, nič sa nestratí." },
    { q: "Budú QR kódy na stoloch fungovať aj po skúšobnom období?", a: "Ak je účet pozastavený, QR kódy zobrazujú hosťom správu „dočasne nedostupné“. Nemusíte tlačiť nové QR kódy: hneď ako je platba pripojená, tie isté kódy znova otvoria menu." },
    { q: "Môžem neskôr prejsť z Basic na Pro?", a: "Áno, upgrade je jediným kliknutím v administračnom paneli. Doplatok sa počíta pomerne podľa zostávajúcich dní platenej periódy. Downgrade z Pro na Basic je tiež dostupný — KDS a rezervácia sa vypnú, ale všetky údaje zostávajú." },
    { q: "Aká je ročná zľava?", a: "Asi 30 % v porovnaní s mesačným plánom. Presná suma sa zobrazí pri platbe na stránke plánu." },
    { q: "Môžem predplatné zrušiť kedykoľvek?", a: "Áno, zrušenie je jediným kliknutím v administračnom paneli. Po zrušení účet funguje do konca platenej periódy, potom sa pozastaví. Údaje zostávajú a môžete sa vrátiť kedykoľvek." },
    { q: "Aké spôsoby platby akceptujete?", a: "Visa, Mastercard a American Express cez Stripe. Apple Pay a Google Pay sú tiež podporované. V Európe — SEPA Direct Debit v ročnom pláne." },
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
      trackPrefix="l_sk_pricing_hero"
    />
  );
}
