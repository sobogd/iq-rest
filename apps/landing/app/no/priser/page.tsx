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

const LOCALE = "no";
const SITE = "https://iq-rest.com";

const PRICING_FAQ = {
  ...DEFAULT.faq,
  sub: "Hva restauratører spør om priser og betaling. Finner du ikke spørsmålet ditt? Send oss en melding på WhatsApp.",
  items: [
    { q: "Hva er forskjellen mellom Basic og Pro?", a: "Basic inkluderer digital + QR-meny, AI-oversettelse til 35 språk, bestillingsmottak fra menyen (valgfritt) og administrasjon fra alle enheter. Pro legger til kjøkkenskjermen (KDS) og online bordreservasjon 24/7, pluss prioritert WhatsApp-støtte. Hvis du ikke trenger kjøkkenflyt og reservasjoner — dekker Basic alt." },
    { q: "Tar dere provisjon på bestillinger?", a: "Nei. Hver bestilling — fra en QR-meny eller tatt av en kelner — går direkte til restauranten, uten prosenter eller aggregatorprovisjoner. Du har et fast månedlig gebyr og ingen andre fradrag." },
    { q: "Hva inkluderer den 14-dagers prøveperioden?", a: "Full tilgang til alle funksjoner i begge abonnementer, ingen kort kreves. Etter 14 dager settes kontoen automatisk på pause hvis ingen betalingsmetode er tilknyttet. Ingen automatiske belastninger uten ditt samtykke." },
    { q: "Hva skjer etter 14 dager?", a: "Hvis ingen betalingsmetode er tilknyttet, settes kontoen automatisk på pause. Administrasjonspanelet forblir tilgjengelig i skrivebeskyttet modus, men gjeste-QR-menyen og bestillingsmottak er midlertidig deaktivert. Vi belaster aldri uten ditt samtykke." },
    { q: "Hva skjer med menyen, bestillingene og dataene mine under pausen?", a: "Alt bevares fullstendig: meny, retterbilder, bestillingshistorikk, reservasjoner, designinnstillinger, statistikk. Tilknytt betaling selv en måned eller seks måneder senere — alt kommer tilbake som det var, ingenting går tapt." },
    { q: "Vil QR-kodene på bordene fortsatt fungere etter prøveperioden?", a: "Hvis kontoen er på pause, viser QR-kodene gjestene meldingen „midlertidig utilgjengelig“. Du trenger ikke skrive ut nye QR-koder: så snart betalingen er tilknyttet, åpner de samme kodene menyen igjen." },
    { q: "Kan jeg bytte fra Basic til Pro senere?", a: "Ja, oppgraderingen er ett klikk i administrasjonspanelet. Tilleggsgebyret beregnes forholdsmessig etter gjenværende dager av den betalte perioden. Nedgradering fra Pro til Basic er også tilgjengelig — KDS og reservasjon vil bli deaktivert, men alle data bevares." },
    { q: "Hva er årsrabatten?", a: "Omtrent 30 % sammenlignet med månedsabonnementet. Det nøyaktige beløpet vises ved betaling på abonnementssiden." },
    { q: "Kan jeg avslutte abonnementet når som helst?", a: "Ja, avslutning er ett klikk i administrasjonspanelet. Etter avslutning fungerer kontoen frem til slutten av den betalte perioden, deretter settes den på pause. Data bevares og du kan komme tilbake når du vil." },
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
        <PricingHero locale={LOCALE} ctaText={DEFAULT.ctaText} demoText={DEFAULT.demoText} microcopy={DEFAULT.microcopy} texts={DEFAULT.pricingHero!} trackPrefix="l_no_pricing_hero" />
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
