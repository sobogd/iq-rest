import type { Metadata } from "next";
import { PricingTemplate } from "@/app/_landing/templates/pricing-template";
import { TEXTS as DEFAULT } from "../texts";
import { TEXTS } from "./texts";
import { SCHEMA_PRICE_MENU_EUR } from "@/lib/pricing";
import { SCHEMA_DATE_MODIFIED } from "@/lib/page-meta";

export const dynamic = "force-static";
export const revalidate = false;

const LOCALE = "da";
const SITE = "https://iq-rest.com";

const PRICING_FAQ = {
  ...DEFAULT.faq,
  sub: "Hvad restauratører spørger om priser og betaling. Kan du ikke finde dit spørgsmål? Skriv til os på WhatsApp.",
  items: [
    { q: "Hvordan fungerer priserne?", a: "Du sammensætter selv din plan. Det digitale QR-menukort er grundlaget — det inkluderer AI-oversættelse på 35 sprog og administration fra enhver enhed. Derefter tilføjer du kun det, du har brug for: bordreservation, køkkenskærmen med bestillingsmodtagelse eller et eget domæne. Prisen er pr. restaurant, og mængderabatter gælder automatisk fra den anden restaurant." },
    { q: "Tager I kommission af bestillingerne?", a: "Nej. Hver bestilling — fra et QR-menukort eller modtaget af en tjener — går direkte til restauranten, uden procentdele eller aggregator-kommissioner. Du har et fast månedligt gebyr og ingen andre fradrag." },
    { q: "Hvad inkluderer prøveperioden på 14 dage?", a: "Fuld adgang til alle funktioner, intet kort krævet. Efter 14 dage sættes kontoen automatisk på pause, hvis der ikke er tilknyttet en betalingsmetode. Der opkræves aldrig automatisk uden dit samtykke." },
    { q: "Hvad sker der efter de 14 dage?", a: "Hvis der ikke er tilknyttet en betalingsmetode, sættes kontoen automatisk på pause. Administrationspanelet forbliver tilgængeligt i skrivebeskyttet tilstand, men QR-menuen for gæsterne og bestillingsmodtagelsen er midlertidigt deaktiveret. Vi opkræver aldrig uden dit samtykke." },
    { q: "Hvad sker der med mit menukort, bestillinger og data under pausen?", a: "Alt bevares fuldt ud: menukort, billeder af retter, bestillingshistorik, reservationer, designindstillinger, statistik. Tilknyt betaling selv en måned eller seks måneder senere — alt vender tilbage, som det var, intet går tabt." },
    { q: "Vil QR-koderne på bordene stadig virke efter prøveperioden?", a: "Hvis kontoen er på pause, viser QR-koderne gæsterne en „midlertidigt utilgængelig“-besked. Du behøver ikke trykke nye QR-koder: så snart betaling er tilknyttet, åbner de samme koder menuen igen." },
    { q: "Kan jeg ændre min plan senere?", a: "Ja — tilføj eller fjern funktioner når som helst i administrationspanelet. Forskellen beregnes proportionalt efter de resterende dage af den betalte periode. Hvis du fjerner en funktion, slås den fra, men alle dens data bevares." },
    { q: "Hvor mange restauranter kan jeg administrere?", a: "Så mange, du har brug for — vælg antallet af restauranter, når du sammensætter din plan, alle administreret fra ét dashboard. Mængderabatter gælder automatisk, op til 50 % rabat med 5+ restauranter. Driver du en større gruppe? Skriv til os på WhatsApp om en skræddersyet plan." },
    { q: "Hvad er den årlige rabat?", a: "Omkring 30 % i forhold til månedligt abonnement. Det præcise beløb vises, når du sammensætter din plan." },
    { q: "Kan jeg opsige abonnementet når som helst?", a: "Ja, opsigelse er ét klik i administrationspanelet. Efter opsigelsen kører kontoen til udløbet af den betalte periode og sættes derefter på pause. Data bevares, og du kan komme tilbage, når du vil." },
    { q: "Hvilke betalingsmetoder accepterer I?", a: "Visa, Mastercard og American Express via Stripe. Apple Pay og Google Pay understøttes også. I Europa — SEPA Direct Debit på det årlige abonnement." },
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
        { "@type": "Offer", name: "Digitalt menukort", price: SCHEMA_PRICE_MENU_EUR, priceCurrency: "EUR", availability: "https://schema.org/InStock", url: TEXTS.meta.canonical },
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
      trackPrefix="l_da_pricing_hero"
    />
  );
}
