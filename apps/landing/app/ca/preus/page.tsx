import type { Metadata } from "next";
import { PricingTemplate } from "@/app/_landing/templates/pricing-template";
import { TEXTS as DEFAULT } from "../texts";
import { TEXTS } from "./texts";
import { SCHEMA_PRICE_MENU_EUR } from "@/lib/pricing";
import { SCHEMA_DATE_MODIFIED } from "@/lib/page-meta";

export const dynamic = "force-static";
export const revalidate = false;

const LOCALE = "ca";
const SITE = "https://iq-rest.com";

const PRICING_FAQ = {
  ...DEFAULT.faq,
  sub: "El que els restauradors pregunten sobre preus i pagament. No trobes la teva pregunta? Escriu-nos per WhatsApp.",
  items: [
    { q: "Com funciona el preu?", a: "Tu mateix construeixes el teu pla. La carta digital QR és la base — inclou traducció amb IA en 35 idiomes i gestió des de qualsevol dispositiu. Després només hi afegeixes el que necessites: reserva de taules, la pantalla de cuina amb recepció de comandes o un domini propi. El preu és per restaurant, i els descomptes per volum s'apliquen automàticament a partir del segon restaurant." },
    { q: "Cobreu comissió sobre les comandes?", a: "No. Cada comanda — des d'una carta QR o atesa per un cambrer — va directament al restaurant, sense percentatges ni comissions d'agregadors. Tens una tarifa mensual fixa i cap altra deducció." },
    { q: "Què inclou la prova de 14 dies?", a: "Accés complet a totes les funcionalitats, sense targeta. Passats 14 dies el compte es pausa automàticament si no s'ha connectat cap mètode de pagament. No hi ha cobraments automàtics sense el teu consentiment." },
    { q: "Què passa després dels 14 dies?", a: "Si no hi ha cap mètode de pagament connectat, el compte es pausa automàticament. El panell d'administració continua disponible en mode només lectura, però la carta QR per als clients i la recepció de comandes queden desactivades temporalment. Mai no cobrem sense el teu consentiment." },
    { q: "Què passa amb la meva carta, les comandes i les dades durant la pausa?", a: "Tot es manté íntegrament: carta, fotos de plats, historial de comandes, reserves, configuració de disseny, estadístiques. Connecta el pagament fins i tot un mes o sis mesos més tard — tot torna com era, no es perd res." },
    { q: "Els codis QR de les taules continuaran funcionant després de la prova?", a: "Si el compte està pausat, els codis QR mostren als clients un missatge «temporalment no disponible». No cal que imprimeixis nous codis QR: així que el pagament es connecta, els mateixos codis tornen a obrir la carta." },
    { q: "Puc canviar el meu pla més endavant?", a: "Sí — afegeix o treu funcionalitats quan vulguis des del panell d'administració. La diferència es prorrateja pels dies restants del període pagat. Si treus una funcionalitat, es desactiva però totes les seves dades es mantenen." },
    { q: "Quants restaurants puc gestionar?", a: "Tants com necessitis — tria el nombre de restaurants mentre construeixes el teu pla, tots gestionats des d'un únic panell. Els descomptes per volum s'apliquen automàticament, fins a un 50 % de descompte amb 5 restaurants o més. Gestiones un grup més gran? Escriu-nos per WhatsApp sobre un pla a mida." },
    { q: "Quin és el descompte anual?", a: "Al voltant del 30 % respecte a la facturació mensual. L'import exacte es mostra mentre construeixes el teu pla." },
    { q: "Puc cancel·lar la subscripció quan vulgui?", a: "Sí, la cancel·lació es fa amb un sol clic al panell d'administració. Després de la cancel·lació, el compte funciona fins al final del període pagat i després es pausa. Les dades es mantenen i pots tornar quan vulguis." },
    { q: "Quins mètodes de pagament accepteu?", a: "Visa, Mastercard i American Express via Stripe. Apple Pay i Google Pay també són compatibles. A Europa — SEPA Direct Debit al pla anual." },
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
        { "@type": "Offer", name: "Carta digital", price: SCHEMA_PRICE_MENU_EUR, priceCurrency: "EUR", availability: "https://schema.org/InStock", url: TEXTS.meta.canonical },
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
