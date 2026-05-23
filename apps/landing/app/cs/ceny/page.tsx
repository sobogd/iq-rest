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

const LOCALE = "cs";
const SITE = "https://iq-rest.com";

const PRICING_FAQ = {
  ...DEFAULT.faq,
  sub: "Co se restauratéři ptají na ceny a platby. Nenašli jste svůj dotaz? Napište nám na WhatsApp.",
  items: [
    { q: "Jaký je rozdíl mezi Basic a Pro?", a: "Basic zahrnuje digitální + QR menu, AI překlad do 35 jazyků, příjem objednávek z menu (volitelně) a správu z jakéhokoli zařízení. Pro přidává kuchyňský displej (KDS) a online rezervaci stolů 24/7, plus prioritní WhatsApp podporu. Pokud nepotřebujete kuchyňský tok a rezervace — Basic pokrývá vše." },
    { q: "Berete provizi z objednávek?", a: "Ne. Každá objednávka — z QR menu nebo přijatá číšníkem — jde přímo do restaurace, bez procent a bez provizí agregátorů. Máte pevný měsíční poplatek a žádné jiné srážky." },
    { q: "Co zahrnuje 14denní zkušební doba?", a: "Plný přístup ke všem funkcím v obou tarifech, bez karty. Po 14 dnech se účet automaticky pozastaví, pokud není připojen způsob platby. Žádné automatické strhávání bez vašeho souhlasu." },
    { q: "Co se stane po 14 dnech?", a: "Pokud není připojen způsob platby, účet se automaticky pozastaví. Administrační panel zůstává dostupný v režimu pouze pro čtení, ale QR menu pro hosty a příjem objednávek jsou dočasně vypnuty. Nikdy nestrháváme bez vašeho souhlasu." },
    { q: "Co se stane s mým menu, objednávkami a daty během pauzy?", a: "Vše zůstává v plném rozsahu: menu, fotky jídel, historie objednávek, rezervace, nastavení designu, statistiky. Připojte platbu i za měsíc nebo půl roku — vše se vrátí, jak bylo, nic se neztratí." },
    { q: "Budou QR kódy na stolech fungovat i po zkušebce?", a: "Pokud je účet pozastaven, QR kódy zobrazí hostům hlášku „dočasně nedostupné“. Nemusíte tisknout nové QR kódy: jakmile je platba připojena, stejné kódy znovu otevřou menu." },
    { q: "Můžu později přejít z Basic na Pro?", a: "Ano, upgrade je na jedno kliknutí v administračním panelu. Doplatek se počítá poměrně podle zbývajících dní zaplaceného období. Přechod z Pro na Basic je také možný — KDS a rezervace se vypnou, ale všechna data zůstanou." },
    { q: "Jaká je roční sleva?", a: "Asi 30 % oproti měsíčnímu tarifu. Přesnou částku ukážeme při platbě na stránce tarifu." },
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

      <Section dataSection="pricing_hero" noContainer accent>
        <PricingHero locale={LOCALE} ctaText={DEFAULT.ctaText} demoText={DEFAULT.demoText} microcopy={DEFAULT.microcopy} texts={DEFAULT.pricingHero!} trackPrefix="l_cs_pricing_hero" />
      </Section>

      <Section id="faq" dataSection="faq" noContainer>
        <FaqLp texts={PRICING_FAQ} />
      </Section>

      <Section as="footer" dataSection="footer" noContainer accent className="!py-6 sm:!py-8">
        <LandingFooterLp texts={DEFAULT.footer} headerTexts={DEFAULT.header} locale={LOCALE} variant="lp" />
      </Section>
    </main>
  );
}
