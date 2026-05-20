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

const LOCALE = "sr";
const SITE = "https://iq-rest.com";

const PRICING_FAQ = {
  ...DEFAULT.faq,
  sub: "Šta restorateri pitaju o cenama i plaćanju. Ne nalazite svoje pitanje? Pišite nam na WhatsApp.",
  items: [
    { q: "Koja je razlika između Basic i Pro?", a: "Basic uključuje digitalni + QR meni, AI prevod na 35 jezika, primanje porudžbina iz menija (opciono) i upravljanje sa bilo kog uređaja. Pro dodaje kuhinjski ekran (KDS) i onlajn rezervaciju stolova 24/7, plus prioritetnu WhatsApp podršku. Ako vam nije potreban kuhinjski tok i rezervacije — Basic pokriva sve." },
    { q: "Da li uzimate proviziju od porudžbina?", a: "Ne. Svaka porudžbina — iz QR menija ili primljena od konobara — ide direktno u restoran, bez procenata ili provizija agregatora. Imate fiksnu mesečnu naknadu i nikakvih drugih odbitaka." },
    { q: "Šta uključuje 14-dnevni probni period?", a: "Pun pristup svim funkcijama u oba paketa, bez kartice. Nakon 14 dana nalog se automatski pauzira ako nije povezan način plaćanja. Bez automatskih naplata bez vaše saglasnosti." },
    { q: "Šta se dešava nakon 14 dana?", a: "Ako nije povezan način plaćanja, nalog se automatski pauzira. Administrativni panel ostaje dostupan u režimu samo za čitanje, ali QR meni za goste i primanje porudžbina su privremeno onemogućeni. Nikada ne naplaćujemo bez vaše saglasnosti." },
    { q: "Šta se dešava sa mojim menijem, porudžbinama i podacima tokom pauze?", a: "Sve je u potpunosti sačuvano: meni, fotografije jela, istorija porudžbina, rezervacije, podešavanja dizajna, statistika. Povežite plaćanje čak i mesec ili šest meseci kasnije — sve se vraća kako je bilo, ništa se ne gubi." },
    { q: "Da li će QR kodovi na stolovima i dalje raditi nakon probnog perioda?", a: "Ako je nalog pauziran, QR kodovi gostima prikazuju poruku „privremeno nedostupno“. Ne morate štampati nove QR kodove: čim se plaćanje poveže, isti kodovi ponovo otvaraju meni." },
    { q: "Mogu li kasnije preći sa Basic na Pro?", a: "Da, nadogradnja je jednim klikom u administrativnom panelu. Doplata se obračunava srazmerno preostalim danima plaćenog perioda. Smanjenje sa Pro na Basic je takođe dostupno — KDS i rezervacija će biti onemogućeni, ali svi podaci ostaju sačuvani." },
    { q: "Kolika je godišnja popust?", a: "Oko 30% u odnosu na mesečni paket. Tačan iznos prikazan je pri plaćanju na stranici paketa." },
    { q: "Mogu li otkazati pretplatu bilo kada?", a: "Da, otkazivanje je jednim klikom u administrativnom panelu. Nakon otkazivanja nalog radi do kraja plaćenog perioda, zatim se pauzira. Podaci ostaju sačuvani i možete se vratiti kada god želite." },
    { q: "Koje načine plaćanja prihvatate?", a: "Visa, Mastercard i American Express preko Stripe-a. Apple Pay i Google Pay su takođe podržani. U Evropi — SEPA Direct Debit na godišnjem paketu." },
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
        <PricingHero locale={LOCALE} ctaText={DEFAULT.ctaText} demoText={DEFAULT.demoText} microcopy={DEFAULT.microcopy} texts={DEFAULT.pricingHero!} trackPrefix="l_sr_pricing_hero" />
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
