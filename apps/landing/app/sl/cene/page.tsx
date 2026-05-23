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

const LOCALE = "sl";
const SITE = "https://iq-rest.com";

const PRICING_FAQ = {
  ...DEFAULT.faq,
  sub: "Kaj gostinci vprašajo o cenah in plačilu. Ne najdete svojega vprašanja? Pišite nam na WhatsApp.",
  items: [
    { q: "Kakšna je razlika med Basic in Pro?", a: "Basic vključuje digitalni + QR jedilnik, AI prevod v 35 jezikov, sprejemanje naročil iz jedilnika (izbirno) in upravljanje s katere koli naprave. Pro doda kuhinjski zaslon (KDS) in spletno rezervacijo miz 24/7 ter prednostno WhatsApp podporo. Če ne potrebujete kuhinjskega toka in rezervacij — Basic pokriva vse." },
    { q: "Ali pobirate provizijo od naročil?", a: "Ne. Vsako naročilo — iz QR jedilnika ali sprejeto s strani natakarja — gre neposredno v restavracijo, brez odstotkov ali provizij agregatorjev. Imate fiksno mesečno naročnino in nobenih drugih odtegljajev." },
    { q: "Kaj vključuje 14-dnevno preizkusno obdobje?", a: "Polni dostop do vseh funkcij v obeh paketih, brez kartice. Po 14 dneh se račun samodejno zaustavi, če ni povezanega načina plačila. Brez samodejnih bremenitev brez vašega soglasja." },
    { q: "Kaj se zgodi po 14 dneh?", a: "Če ni povezanega načina plačila, se račun samodejno zaustavi. Skrbniška plošča ostane na voljo v načinu samo za branje, vendar so QR jedilnik za goste in sprejemanje naročil začasno onemogočeni. Nikoli ne zaračunamo brez vašega soglasja." },
    { q: "Kaj se zgodi z mojim jedilnikom, naročili in podatki med premorom?", a: "Vse je v celoti ohranjeno: jedilnik, fotografije jedi, zgodovina naročil, rezervacije, nastavitve oblikovanja, statistika. Povežite plačilo tudi mesec ali šest mesecev pozneje — vse se vrne, kot je bilo, nič se ne izgubi." },
    { q: "Ali bodo QR kode na mizah delovale tudi po preizkusnem obdobju?", a: "Če je račun zaustavljen, QR kode gostom prikazujejo sporočilo „začasno ni na voljo“. Ni vam treba tiskati novih QR kod: takoj ko je plačilo povezano, iste kode znova odprejo jedilnik." },
    { q: "Ali lahko pozneje preidem z Basic na Pro?", a: "Da, nadgradnja je en klik v skrbniški plošči. Doplačilo se obračuna sorazmerno glede na preostale dni plačanega obdobja. Znižanje s Pro na Basic je prav tako na voljo — KDS in rezervacija bosta onemogočena, vsi podatki pa ostanejo ohranjeni." },
    { q: "Kakšen je letni popust?", a: "Približno 30 % v primerjavi z mesečnim paketom. Točen znesek je prikazan pri plačilu na strani paketa." },
    { q: "Ali lahko prekličem naročnino kadar koli?", a: "Da, preklic je en klik v skrbniški plošči. Po preklicu račun deluje do konca plačanega obdobja, nato se zaustavi. Podatki ostanejo ohranjeni in se lahko vrnete, kadar želite." },
    { q: "Kakšne načine plačila sprejemate?", a: "Visa, Mastercard in American Express prek Stripe. Apple Pay in Google Pay sta prav tako podprta. V Evropi — SEPA Direct Debit pri letnem paketu." },
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

      <Section dataSection="pricing_hero" noContainer accent>
        <PricingHero locale={LOCALE} ctaText={DEFAULT.ctaText} demoText={DEFAULT.demoText} microcopy={DEFAULT.microcopy} texts={DEFAULT.pricingHero!} trackPrefix="l_sl_pricing_hero" />
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
