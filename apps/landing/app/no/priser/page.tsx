import type { Metadata } from "next";
import { PricingTemplate } from "@/app/_landing/templates/pricing-template";
import { TEXTS as DEFAULT } from "../texts";
import { TEXTS } from "./texts";
import { SCHEMA_PRICE_MENU_EUR } from "@/lib/pricing";
import { SCHEMA_DATE_MODIFIED } from "@/lib/page-meta";

export const dynamic = "force-static";
export const revalidate = false;

const LOCALE = "no";
const SITE = "https://iq-rest.com";

const PRICING_FAQ = {
  ...DEFAULT.faq,
  sub: "Det restauratører lurer på om priser og betaling. Finner du ikke spørsmålet ditt? Send oss en melding på WhatsApp.",
  items: [
    { q: "Hvordan fungerer prisene?", a: "Du setter sammen din egen plan. Den digitale QR-menyen er grunnlaget — den inkluderer AI-oversettelse til 35 språk og administrasjon fra alle enheter. Deretter legger du bare til det du trenger: bordreservasjon, kjøkkenskjermen med bestillingsmottak eller et eget domene. Prisen er per restaurant, og volumrabatter gjelder automatisk fra og med den andre restauranten." },
    { q: "Tar dere provisjon på bestillinger?", a: "Nei. Hver bestilling — fra en QR-meny eller tatt imot av en kelner — går direkte til restauranten, uten prosenter eller aggregatorprovisjoner. Du har et fast månedlig gebyr og ingen andre fradrag." },
    { q: "Hva inkluderer den 14-dagers prøveperioden?", a: "Full tilgang til alle funksjoner, uten at kort kreves. Etter 14 dager settes kontoen automatisk på pause hvis ingen betalingsmetode er tilknyttet. Det skjer ingen automatiske belastninger uten ditt samtykke." },
    { q: "Hva skjer etter 14 dager?", a: "Hvis ingen betalingsmetode er tilknyttet, settes kontoen automatisk på pause. Administrasjonspanelet forblir tilgjengelig i skrivebeskyttet modus, men gjeste-QR-menyen og bestillingsmottak er midlertidig deaktivert. Vi belaster deg aldri uten ditt samtykke." },
    { q: "Hva skjer med menyen, bestillingene og dataene mine under pausen?", a: "Alt bevares fullstendig: meny, retterbilder, bestillingshistorikk, reservasjoner, designinnstillinger og statistikk. Tilknytt betaling selv en måned eller et halvt år senere — alt kommer tilbake som det var, ingenting går tapt." },
    { q: "Vil QR-kodene på bordene fortsatt fungere etter prøveperioden?", a: "Hvis kontoen er på pause, viser QR-kodene gjestene meldingen „midlertidig utilgjengelig“. Du trenger ikke skrive ut nye QR-koder: så snart betalingen er tilknyttet, åpner de samme kodene menyen igjen." },
    { q: "Kan jeg endre planen min senere?", a: "Ja — legg til eller fjern funksjoner når som helst i administrasjonspanelet. Differansen beregnes forholdsmessig etter gjenværende dager av den betalte perioden. Fjerner du en funksjon, blir den slått av, men alle dataene bevares." },
    { q: "Hvor mange restauranter kan jeg administrere?", a: "Så mange du trenger — velg antall restauranter mens du setter sammen planen, alle administrert fra ett enkelt dashbord. Volumrabatter gjelder automatisk, opptil 50 % rabatt med 5 eller flere restauranter. Driver du en større kjede? Send oss en melding på WhatsApp om en skreddersydd plan." },
    { q: "Hva er årsrabatten?", a: "Omtrent 30 % sammenlignet med månedlig betaling. Det nøyaktige beløpet vises mens du setter sammen planen." },
    { q: "Kan jeg avslutte abonnementet når som helst?", a: "Ja, avslutning er ett klikk i administrasjonspanelet. Etter avslutning fungerer kontoen frem til slutten av den betalte perioden, deretter settes den på pause. Dataene bevares, og du kan komme tilbake når du vil." },
    { q: "Hvilke betalingsmetoder aksepterer dere?", a: "Visa, Mastercard og American Express via Stripe. Apple Pay og Google Pay støttes også. I Europa — SEPA Direct Debit på årsabonnementet." },
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
      trackPrefix="l_no_pricing_hero"
    />
  );
}
