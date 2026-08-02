import type { Metadata } from "next";
import { PricingTemplate } from "@/app/_landing/templates/pricing-template";
import { TEXTS as DEFAULT } from "../texts";
import { TEXTS } from "./texts";
import { SCHEMA_PRICE_MENU_EUR } from "@/lib/pricing";
import { SCHEMA_DATE_MODIFIED } from "@/lib/page-meta";

export const dynamic = "force-static";
export const revalidate = false;

const LOCALE = "sv";
const SITE = "https://iq-rest.com";

const PRICING_FAQ = {
  ...DEFAULT.faq,
  sub: "Vad restauratörer frågar om priser och betalning. Hittar du inte din fråga? Skriv till oss på WhatsApp.",
  items: [
    { q: "Hur fungerar prissättningen?", a: "Du bygger din egen plan. Den digitala QR-menyn är basen — den inkluderar AI-översättning till 35 språk och hantering från valfri enhet. Sedan lägger du bara till det du behöver: bordsbokning, köksskärmen med beställningsmottagning, eller en egen domän. Priset är per restaurang, och volymrabatter tillämpas automatiskt från den andra restaurangen." },
    { q: "Tar ni provision på beställningar?", a: "Nej. Varje beställning — från en QR-meny eller mottagen av en servitör — går direkt till restaurangen, utan procentsatser eller aggregatorprovisioner. Du har en fast månadsavgift och inga andra avdrag." },
    { q: "Vad ingår i 14-dagars provperioden?", a: "Full tillgång till alla funktioner, inget kort krävs. Efter 14 dagar pausas kontot automatiskt om ingen betalningsmetod är ansluten. Det finns inga automatiska debiteringar utan ditt samtycke." },
    { q: "Vad händer efter 14 dagar?", a: "Om ingen betalningsmetod är ansluten pausas kontot automatiskt. Administrationspanelen förblir tillgänglig i läsläge, men gästernas QR-meny och beställningsmottagning är tillfälligt inaktiverade. Vi debiterar aldrig utan ditt samtycke." },
    { q: "Vad händer med min meny, mina beställningar och min data under pausen?", a: "Allt bevaras fullständigt: meny, rättfoton, beställningshistorik, bokningar, designinställningar, statistik. Anslut betalning även en månad eller sex månader senare — allt återgår som det var, inget förloras." },
    { q: "Fungerar QR-koderna på borden efter provperioden?", a: "Om kontot är pausat visar QR-koderna gästerna ett meddelande „tillfälligt otillgänglig“. Du behöver inte trycka nya QR-koder: så snart betalning ansluts öppnar samma koder menyn igen." },
    { q: "Kan jag ändra min plan senare?", a: "Ja — lägg till eller ta bort funktioner när som helst i administrationspanelen. Skillnaden beräknas proportionellt mot de återstående dagarna av den betalda perioden. Om du tar bort en funktion stängs den av, men all dess data bevaras." },
    { q: "Hur många restauranger kan jag hantera?", a: "Så många du behöver — välj antalet restauranger när du bygger din plan, alla hanteras från en enda administrationspanel. Volymrabatter tillämpas automatiskt, upp till 50 % rabatt med 5+ restauranger. Driver du en större grupp? Skriv till oss på WhatsApp om ett anpassat abonnemang." },
    { q: "Hur stor är årsrabatten?", a: "Cirka 30 % jämfört med månadsplanen. Det exakta beloppet visas när du bygger din plan." },
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
      dateModified: SCHEMA_DATE_MODIFIED,
      brand: { "@type": "Brand", name: "IQ Rest" },
      offers: [
        { "@type": "Offer", name: "Digital meny", price: SCHEMA_PRICE_MENU_EUR, priceCurrency: "EUR", availability: "https://schema.org/InStock", url: TEXTS.meta.canonical },
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
      trackPrefix="l_sv_pricing_hero"
    />
  );
}
