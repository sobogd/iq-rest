import type { Metadata } from "next";
import { LandingHeaderLp } from "@/app/_landing/components/header-lp";
import { LandingFooterLp } from "@/app/_landing/components/footer-lp";
import { FaqLp } from "@/app/_landing/components/faq-lp";
import { Section } from "@/app/_landing/components/section";
import { PageTracker } from "@/app/_landing/components/page-tracker";
import { PricingHero } from "@/app/_landing/components/pricing-hero";
import { TEXTS as DEFAULT } from "../texts";
import { TEXTS } from "./texts";
import { SCHEMA_PRICE_BASIC_EUR, SCHEMA_PRICE_PRO_EUR } from "@/lib/pricing";

export const dynamic = "force-static";
export const revalidate = false;

const LOCALE = "sv";
const SITE = "https://iq-rest.com";

const PRICING_FAQ = {
  ...DEFAULT.faq,
  sub: "Vad restauratörer frågar om priser och betalning. Hittar du inte din fråga? Skriv till oss på WhatsApp.",
  items: [
    { q: "Vad är skillnaden mellan Basic och Pro?", a: "Basic innehåller digital meny + QR, AI-översättning till 35 språk, beställningar från menyn (valfritt) och hantering från valfri enhet. Pro lägger till köksskärm (KDS) och onlinebordsbokning 24/7, plus prioriterad WhatsApp-support. Om du inte behöver köksflödet och bokningar — Basic täcker allt." },
    { q: "Tar ni provision på beställningar?", a: "Nej. Varje beställning — från QR-menyn eller mottagen av en servitör — går direkt till restaurangen, utan procentsatser eller aggregatorprovisioner. Du har en fast månadsavgift och inga andra avdrag." },
    { q: "Vad ingår i 14-dagars provperioden?", a: "Full tillgång till alla funktioner i båda planerna, inget kort krävs. Efter 14 dagar pausas kontot automatiskt om ingen betalningsmetod är ansluten. Det finns inga automatiska debiteringar utan ditt samtycke." },
    { q: "Vad händer efter 14 dagar?", a: "Om ingen betalningsmetod är ansluten pausas kontot automatiskt. Administrationspanelen förblir tillgänglig i läsläge, men gästernas QR-meny och beställningsmottagning är tillfälligt inaktiverade. Vi debiterar aldrig utan ditt samtycke." },
    { q: "Vad händer med min meny, mina beställningar och min data under pausen?", a: "Allt bevaras fullständigt: meny, rättfoton, beställningshistorik, bokningar, designinställningar, statistik. Anslut betalning även en månad eller sex månader senare — allt återgår som det var, inget förloras." },
    { q: "Fungerar QR-koderna på borden efter provperioden?", a: "Om kontot är pausat visar QR-koderna gästerna ett meddelande „tillfälligt otillgänglig“. Du behöver inte trycka nya QR-koder: så snart betalning ansluts öppnar samma koder menyn igen." },
    { q: "Kan jag uppgradera från Basic till Pro senare?", a: "Ja, uppgraderingen är ett klick i administrationspanelen. Tilläggsavgiften beräknas proportionellt mot återstående dagar av den betalda perioden. Nedgradering från Pro till Basic är också möjlig — KDS och bokning inaktiveras, men all data bevaras." },
    { q: "Hur stor är årsrabatten?", a: "Cirka 30 % jämfört med månadsplanen. Det exakta beloppet visas vid betalning på planens sida." },
    { q: "Kan jag avsluta prenumerationen när som helst?", a: "Ja, avslutningen är ett klick i administrationspanelen. Efter avslut fungerar kontot till slutet av den betalda perioden, sedan pausas det. Data bevaras och du kan komma tillbaka när du vill." },
    { q: "Vilka betalningsmetoder accepterar ni?", a: "Visa, Mastercard och American Express via Stripe. Apple Pay och Google Pay stöds också. I Europa — SEPA Direct Debit på årsplanen." },
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
    <main className="relative">
      <PageTracker />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON_LD }} />
      <LandingHeaderLp texts={DEFAULT.header} locale={LOCALE} featureLinks={DEFAULT.footer.featureLinks} />

      <Section dataSection="pricing_hero" noContainer accent>
        <PricingHero locale={LOCALE} ctaText={DEFAULT.ctaText} demoText={DEFAULT.demoText} microcopy={DEFAULT.microcopy} texts={DEFAULT.pricingHero!} trackPrefix="l_sv_pricing_hero" />
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
