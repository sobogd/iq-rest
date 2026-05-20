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

const LOCALE = "ro";
const SITE = "https://iq-rest.com";

const PRICING_FAQ = {
  ...DEFAULT.faq,
  sub: "Ce întreabă restauratorii despre prețuri și plată. Nu găsiți întrebarea dumneavoastră? Scrieți-ne pe WhatsApp.",
  items: [
    { q: "Care este diferența dintre Basic și Pro?", a: "Basic include meniul digital + QR, traducere AI în 35 de limbi, preluare comenzi din meniu (opțional) și gestionare de pe orice dispozitiv. Pro adaugă display-ul de bucătărie (KDS) și rezervarea mesei online 24/7, plus suport WhatsApp prioritar. Dacă nu aveți nevoie de fluxul bucătăriei și rezervări — Basic acoperă totul." },
    { q: "Percepeți comision la comenzi?", a: "Nu. Fiecare comandă — din meniu QR sau preluată de ospătar — ajunge direct la restaurant, fără procente sau comisioane de agregatori. Aveți o taxă lunară fixă și fără alte deduceri." },
    { q: "Ce include perioada de probă de 14 zile?", a: "Acces complet la toate funcționalitățile în ambele planuri, fără card. După 14 zile contul este suspendat automat dacă nu este conectată o metodă de plată. Fără perceperi automate fără consimțământul dumneavoastră." },
    { q: "Ce se întâmplă după cele 14 zile?", a: "Dacă nu este conectată o metodă de plată, contul este suspendat automat. Panoul de administrare rămâne disponibil în mod numai pentru citire, dar meniul QR pentru oaspeți și preluarea comenzilor sunt dezactivate temporar. Nu percepem niciodată fără consimțământul dumneavoastră." },
    { q: "Ce se întâmplă cu meniul, comenzile și datele mele în timpul pauzei?", a: "Totul este păstrat în întregime: meniu, fotografii preparate, istoric comenzi, rezervări, setări de design, statistici. Conectați plata chiar și după o lună sau șase luni — totul revine cum era, nimic nu se pierde." },
    { q: "Vor funcționa codurile QR de pe mese după perioada de probă?", a: "Dacă contul este suspendat, codurile QR afișează oaspeților mesajul „temporar indisponibil“. Nu trebuie să tipăriți coduri QR noi: imediat ce plata este conectată, aceleași coduri deschid din nou meniul." },
    { q: "Pot trece mai târziu de la Basic la Pro?", a: "Da, upgrade-ul se face cu un singur click în panoul de administrare. Suprataxa este calculată proporțional cu zilele rămase din perioada plătită. Downgrade-ul de la Pro la Basic este de asemenea disponibil — KDS și rezervarea vor fi dezactivate, dar toate datele sunt păstrate." },
    { q: "Care este reducerea anuală?", a: "Aproximativ 30% comparativ cu planul lunar. Suma exactă este afișată la plată pe pagina planului." },
    { q: "Pot anula abonamentul oricând?", a: "Da, anularea se face cu un singur click în panoul de administrare. După anulare contul funcționează până la sfârșitul perioadei plătite, apoi este suspendat. Datele sunt păstrate și puteți reveni oricând doriți." },
    { q: "Ce metode de plată acceptați?", a: "Visa, Mastercard și American Express prin Stripe. Apple Pay și Google Pay sunt de asemenea suportate. În Europa — Debit Direct SEPA pentru planul anual." },
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

      <Section dataSection="pricing_hero" noContainer>
        <PricingHero locale={LOCALE} ctaText={DEFAULT.ctaText} demoText={DEFAULT.demoText} microcopy={DEFAULT.microcopy} texts={DEFAULT.pricingHero!} trackPrefix="l_ro_pricing_hero" />
      </Section>

      <Section id="faq" dataSection="faq" accent noContainer>
        <FaqLp texts={PRICING_FAQ} />
      </Section>

      <Section as="footer" dataSection="footer" noContainer className="!py-6 sm:!py-8">
        <LandingFooterLp texts={DEFAULT.footer} headerTexts={DEFAULT.header} locale={LOCALE} variant="lp" />
      </Section>
    </main>
  );
}
