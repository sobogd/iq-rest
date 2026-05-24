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

const LOCALE = "ca";
const SITE = "https://iq-rest.com";

const PRICING_FAQ = {
  ...DEFAULT.faq,
  sub: "El que els restauradors pregunten sobre preus i pagament. No trobes la teva pregunta? Escriu-nos per WhatsApp.",
  items: [
    { q: "Quina diferència hi ha entre Basic i Pro?", a: "Basic inclou la carta digital + QR, traducció IA en 35 idiomes, recepció de comandes des de la carta (opcional) i gestió des de qualsevol dispositiu. Pro afegeix la pantalla de cuina (KDS) i la reserva de taules en línia 24/7, més suport prioritari per WhatsApp. Si no necessites el flux de cuina ni les reserves — Basic ho cobreix tot." },
    { q: "Cobreu comissió sobre les comandes?", a: "No. Cada comanda — des d'una carta QR o atesa per un cambrer — va directament al restaurant, sense percentatges ni comissions d'agregadors. Tens una tarifa mensual fixa i cap altra deducció." },
    { q: "Què inclou la prova de 14 dies?", a: "Accés complet a totes les funcionalitats en els dos plans, sense targeta. Passats 14 dies el compte es pausa automàticament si no s'ha connectat cap mètode de pagament. No hi ha cobraments automàtics sense el teu consentiment." },
    { q: "Què passa després dels 14 dies?", a: "Si no hi ha cap mètode de pagament connectat, el compte es pausa automàticament. El panell d'administració continua disponible en mode només lectura, però la carta QR per als clients i la recepció de comandes queden desactivades temporalment. Mai no cobrem sense el teu consentiment." },
    { q: "Què passa amb la meva carta, les comandes i les dades durant la pausa?", a: "Tot es manté íntegrament: carta, fotos de plats, historial de comandes, reserves, configuració de disseny, estadístiques. Connecta el pagament fins i tot un mes o sis mesos més tard — tot torna com era, no es perd res." },
    { q: "Els codis QR de les taules continuaran funcionant després de la prova?", a: "Si el compte està pausat, els codis QR mostren als clients un missatge «temporalment no disponible». No cal que imprimeixis nous codis QR: així que el pagament es connecta, els mateixos codis tornen a obrir la carta." },
    { q: "Puc passar de Basic a Pro més tard?", a: "Sí, la millora es fa amb un sol clic al panell d'administració. El sobrecost es prorrateja pels dies restants del període pagat. La baixa de Pro a Basic també està disponible — KDS i reserves es desactivaran, però totes les dades es mantenen." },
    { q: "Quin és el descompte anual?", a: "Al voltant del 30 % respecte al pla mensual. L'import exacte es mostra al pagament a la pàgina del pla." },
    { q: "Puc cancel·lar la subscripció quan vulgui?", a: "Sí, la cancel·lació es fa amb un sol clic al panell d'administració. Després de la cancel·lació, el compte funciona fins al final del període pagat i després es pausa. Les dades es mantenen i pots tornar quan vulguis." },
    { q: "Quins mètodes de pagament accepteu?", a: "Visa, Mastercard i American Express via Stripe. Apple Pay i Google Pay també són compatibles. A Europa — domiciliació SEPA al pla anual." },
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
        <PricingHero locale={LOCALE} ctaText={DEFAULT.ctaText} demoText={DEFAULT.demoText} microcopy={DEFAULT.microcopy} texts={DEFAULT.pricingHero!} trackPrefix="l_ca_pricing_hero" />
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
