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

const LOCALE = "da";
const SITE = "https://iq-rest.com";

const PRICING_FAQ = {
  ...DEFAULT.faq,
  sub: "Hvad restauratører spørger om priser og betaling. Kan du ikke finde dit spørgsmål? Skriv til os på WhatsApp.",
  items: [
    { q: "Hvad er forskellen mellem Basic og Pro?", a: "Basic indeholder digitalt + QR-menukort, AI-oversættelse på 35 sprog, bestillingsmodtagelse fra menuen (valgfri) og administration fra enhver enhed. Pro tilføjer køkkenskærmen (KDS) og online bordreservation 24/7 plus prioriteret WhatsApp-support. Hvis du ikke har brug for køkkenflow og reservationer — dækker Basic alt." },
    { q: "Tager I kommission af bestillingerne?", a: "Nej. Hver bestilling — fra et QR-menukort eller modtaget af en tjener — går direkte til restauranten, uden procentdele eller aggregator-kommissioner. Du har et fast månedligt gebyr og ingen andre fradrag." },
    { q: "Hvad inkluderer prøveperioden på 14 dage?", a: "Fuld adgang til alle funktioner i begge abonnementer, intet kort krævet. Efter 14 dage sættes kontoen automatisk på pause, hvis der ikke er tilknyttet en betalingsmetode. Der opkræves aldrig automatisk uden dit samtykke." },
    { q: "Hvad sker der efter de 14 dage?", a: "Hvis der ikke er tilknyttet en betalingsmetode, sættes kontoen automatisk på pause. Administrationspanelet forbliver tilgængeligt i skrivebeskyttet tilstand, men QR-menuen for gæsterne og bestillingsmodtagelsen er midlertidigt deaktiveret. Vi opkræver aldrig uden dit samtykke." },
    { q: "Hvad sker der med mit menukort, bestillinger og data under pausen?", a: "Alt bevares fuldt ud: menukort, billeder af retter, bestillingshistorik, reservationer, designindstillinger, statistik. Tilknyt betaling selv en måned eller seks måneder senere — alt vender tilbage, som det var, intet går tabt." },
    { q: "Vil QR-koderne på bordene stadig virke efter prøveperioden?", a: "Hvis kontoen er på pause, viser QR-koderne gæsterne en „midlertidigt utilgængelig“-besked. Du behøver ikke trykke nye QR-koder: så snart betaling er tilknyttet, åbner de samme koder menuen igen." },
    { q: "Kan jeg skifte fra Basic til Pro senere?", a: "Ja, opgraderingen er ét klik i administrationspanelet. Tillægget beregnes proportionalt med de resterende dage af den betalte periode. Nedgradering fra Pro til Basic er også mulig — KDS og reservation deaktiveres, men alle data bevares." },
    { q: "Hvad er den årlige rabat?", a: "Omkring 30 % i forhold til månedligt abonnement. Det præcise beløb vises ved betaling på abonnementssiden." },
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
        <PricingHero locale={LOCALE} ctaText={DEFAULT.ctaText} demoText={DEFAULT.demoText} microcopy={DEFAULT.microcopy} texts={DEFAULT.pricingHero!} trackPrefix="l_da_pricing_hero" />
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
