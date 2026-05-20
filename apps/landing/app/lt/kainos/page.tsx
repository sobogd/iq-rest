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

const LOCALE = "lt";
const SITE = "https://iq-rest.com";

const PRICING_FAQ = {
  ...DEFAULT.faq,
  sub: "Ką restoratoriai klausia apie kainas ir mokėjimą. Nerandate savo klausimo? Parašykite mums į WhatsApp.",
  items: [
    { q: "Koks skirtumas tarp Basic ir Pro?", a: "Basic apima skaitmeninį + QR meniu, AI vertimą į 35 kalbas, užsakymų priėmimą iš meniu (pasirinktinai) ir valdymą iš bet kurio įrenginio. Pro prideda virtuvės ekraną (KDS) ir internetinę staliukų rezervaciją 24/7, plius prioritetinį WhatsApp palaikymą. Jei nereikia virtuvės srauto ir rezervacijų — Basic apima viską." },
    { q: "Ar imate komisinį už užsakymus?", a: "Ne. Kiekvienas užsakymas — iš QR meniu arba padavėjo priimtas — patenka tiesiai į restoraną, be procentų ar agregatorių komisinių. Turite fiksuotą mėnesio mokestį ir jokių kitų išskaitymų." },
    { q: "Ką apima 14 dienų bandomasis laikotarpis?", a: "Pilna prieiga prie visų funkcijų abiejuose planuose, be kortelės. Po 14 dienų sąskaita automatiškai pristabdoma, jei nepriskirta mokėjimo priemonė. Be automatinių mokesčių be jūsų sutikimo." },
    { q: "Kas vyksta po 14 dienų?", a: "Jei nepriskirta mokėjimo priemonė, sąskaita automatiškai pristabdoma. Administravimo skydelis išlieka prieinamas tik skaitymo režimu, bet svečių QR meniu ir užsakymų priėmimas laikinai išjungti. Niekada neapmokestiname be jūsų sutikimo." },
    { q: "Kas atsitinka su mano meniu, užsakymais ir duomenimis pauzės metu?", a: "Viskas išsaugoma pilnai: meniu, patiekalų nuotraukos, užsakymų istorija, rezervacijos, dizaino nustatymai, statistika. Priskirkite mokėjimą net po mėnesio ar šešių mėnesių — viskas grįžta tokia, kokia buvo, niekas neprarandama." },
    { q: "Ar QR kodai ant staliukų vis dar veiks po bandomojo laikotarpio?", a: "Jei sąskaita pristabdyta, QR kodai svečiams rodo pranešimą „laikinai neprieinama“. Nereikia spausdinti naujų QR kodų: kai mokėjimas priskirtas, tie patys kodai vėl atveria meniu." },
    { q: "Ar galiu vėliau pereiti iš Basic į Pro?", a: "Taip, atnaujinimas yra vienu spustelėjimu administravimo skydelyje. Priemoka skaičiuojama proporcingai pagal likusias mokamo laikotarpio dienas. Sumažinimas iš Pro į Basic taip pat prieinamas — KDS ir rezervacija bus išjungti, bet visi duomenys išsaugomi." },
    { q: "Kokia metinė nuolaida?", a: "Apie 30 % palyginti su mėnesio planu. Tiksli suma rodoma atsiskaitant plano puslapyje." },
    { q: "Ar galiu atšaukti prenumeratą bet kada?", a: "Taip, atšaukimas yra vienu spustelėjimu administravimo skydelyje. Po atšaukimo sąskaita veikia iki mokamo laikotarpio pabaigos, tada pristabdoma. Duomenys išsaugomi ir galite sugrįžti kada norite." },
    { q: "Kokius mokėjimo būdus priimate?", a: "Visa, Mastercard ir American Express per Stripe. Apple Pay ir Google Pay taip pat palaikomi. Europoje — SEPA tiesioginis nuskaitymas metiniame plane." },
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
        <PricingHero locale={LOCALE} ctaText={DEFAULT.ctaText} demoText={DEFAULT.demoText} microcopy={DEFAULT.microcopy} texts={DEFAULT.pricingHero!} trackPrefix="l_lt_pricing_hero" />
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
