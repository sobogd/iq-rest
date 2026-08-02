import type { Metadata } from "next";
import { PricingTemplate } from "@/app/_landing/templates/pricing-template";
import { TEXTS as DEFAULT } from "../texts";
import { TEXTS } from "./texts";
import { SCHEMA_PRICE_MENU_EUR } from "@/lib/pricing";
import { SCHEMA_DATE_MODIFIED } from "@/lib/page-meta";

export const dynamic = "force-static";
export const revalidate = false;

const LOCALE = "cs";
const SITE = "https://iq-rest.com";

const PRICING_FAQ = {
  ...DEFAULT.faq,
  sub: "Co se restauratéři ptají na ceny a platby. Nenašli jste svůj dotaz? Napište nám na WhatsApp.",
  items: [
    { q: "Jak funguje cena?", a: "Plán si sestavíte sami. Základem je digitální QR menu — zahrnuje AI překlad do 35 jazyků a správu z jakéhokoli zařízení. Pak přidáte jen to, co potřebujete: rezervaci stolů, kuchyňský displej s příjmem objednávek nebo vlastní doménu. Cena je za jednu restauraci a od druhé restaurace se automaticky uplatní množstevní slevy." },
    { q: "Berete provizi z objednávek?", a: "Ne. Každá objednávka — z QR menu nebo přijatá číšníkem — jde přímo do restaurace, bez procent a bez provizí agregátorů. Máte pevný měsíční poplatek a žádné jiné srážky." },
    { q: "Co zahrnuje 14denní zkušební doba?", a: "Plný přístup ke všem funkcím, bez karty. Po 14 dnech se účet automaticky pozastaví, pokud není připojen způsob platby. Žádné automatické strhávání bez vašeho souhlasu." },
    { q: "Co se stane po 14 dnech?", a: "Pokud není připojen způsob platby, účet se automaticky pozastaví. Administrační panel zůstává dostupný v režimu pouze pro čtení, ale QR menu pro hosty a příjem objednávek jsou dočasně vypnuty. Nikdy nestrháváme bez vašeho souhlasu." },
    { q: "Co se stane s mým menu, objednávkami a daty během pauzy?", a: "Vše zůstává v plném rozsahu: menu, fotky jídel, historie objednávek, rezervace, nastavení designu, statistiky. Připojte platbu i za měsíc nebo půl roku — vše se vrátí, jak bylo, nic se neztratí." },
    { q: "Budou QR kódy na stolech fungovat i po zkušebce?", a: "Pokud je účet pozastaven, QR kódy zobrazí hostům hlášku „dočasně nedostupné“. Nemusíte tisknout nové QR kódy: jakmile je platba připojena, stejné kódy znovu otevřou menu." },
    { q: "Můžu plán později změnit?", a: "Ano — funkce můžete kdykoli přidat nebo odebrat v administračním panelu. Rozdíl se počítá poměrně podle zbývajících dní zaplaceného období. Když funkci odeberete, vypne se, ale všechna její data zůstanou zachována." },
    { q: "Kolik restaurací mohu spravovat?", a: "Kolik potřebujete — počet restaurací zvolíte při sestavování plánu a všechny spravujete z jednoho panelu. Množstevní slevy se uplatní automaticky, až 50 % při 5 a více restauracích. Provozujete větší skupinu? Napište nám na WhatsApp ohledně individuálního plánu." },
    { q: "Jaká je roční sleva?", a: "Asi 30 % oproti měsíčnímu tarifu. Přesnou částku uvidíte při sestavování plánu." },
    { q: "Můžu předplatné zrušit kdykoli?", a: "Ano, zrušení je na jedno kliknutí v administračním panelu. Po zrušení účet funguje do konce zaplaceného období, poté se pozastaví. Data zůstávají a můžete se kdykoli vrátit." },
    { q: "Jaké platební metody přijímáte?", a: "Visa, Mastercard a American Express přes Stripe. Apple Pay a Google Pay jsou také podporovány. V Evropě — SEPA Direct Debit u ročního tarifu." },
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
        { "@type": "Offer", name: "Digitální menu", price: SCHEMA_PRICE_MENU_EUR, priceCurrency: "EUR", availability: "https://schema.org/InStock", url: TEXTS.meta.canonical },
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
      trackPrefix="l_cs_pricing_hero"
    />
  );
}
