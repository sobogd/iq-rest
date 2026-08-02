import type { Metadata } from "next";
import { PricingTemplate } from "@/app/_landing/templates/pricing-template";
import { TEXTS as DEFAULT } from "../texts";
import { TEXTS } from "./texts";
import { SCHEMA_PRICE_MENU_EUR } from "@/lib/pricing";
import { SCHEMA_DATE_MODIFIED } from "@/lib/page-meta";

export const dynamic = "force-static";
export const revalidate = false;

const LOCALE = "lt";
const SITE = "https://iq-rest.com";

const PRICING_FAQ = {
  ...DEFAULT.faq,
  sub: "Ką restoratoriai klausia apie kainas ir mokėjimą. Nerandate savo klausimo? Parašykite mums į WhatsApp.",
  items: [
    { q: "Kaip veikia kainodara?", a: "Planą susikuriate patys. Skaitmeninis QR meniu yra pagrindas — jis apima AI vertimą į 35 kalbas ir valdymą iš bet kurio įrenginio. Toliau pridedate tik tai, ko reikia: staliukų rezervaciją, virtuvės ekraną su užsakymų priėmimu arba individualų domeną. Kaina skaičiuojama už vieną restoraną, o nuo antrojo restorano automatiškai taikomos kiekio nuolaidos." },
    { q: "Ar imate komisinį už užsakymus?", a: "Ne. Kiekvienas užsakymas — iš QR meniu arba padavėjo priimtas — patenka tiesiai į restoraną, be procentų ar agregatorių komisinių. Turite fiksuotą mėnesio mokestį ir jokių kitų išskaitymų." },
    { q: "Ką apima 14 dienų bandomasis laikotarpis?", a: "Pilną prieigą prie visų funkcijų, be kortelės. Po 14 dienų sąskaita automatiškai pristabdoma, jei nepriskirta mokėjimo priemonė. Jokių automatinių mokesčių be jūsų sutikimo." },
    { q: "Kas vyksta po 14 dienų?", a: "Jei nepriskirta mokėjimo priemonė, sąskaita automatiškai pristabdoma. Administravimo skydelis išlieka prieinamas tik skaitymo režimu, bet svečių QR meniu ir užsakymų priėmimas laikinai išjungti. Niekada neapmokestiname be jūsų sutikimo." },
    { q: "Kas atsitinka su mano meniu, užsakymais ir duomenimis pauzės metu?", a: "Viskas išsaugoma pilnai: meniu, patiekalų nuotraukos, užsakymų istorija, rezervacijos, dizaino nustatymai, statistika. Priskirkite mokėjimą net po mėnesio ar šešių mėnesių — viskas grįžta tokia, kokia buvo, niekas neprarandama." },
    { q: "Ar QR kodai ant staliukų vis dar veiks po bandomojo laikotarpio?", a: "Jei sąskaita pristabdyta, QR kodai svečiams rodo pranešimą „laikinai neprieinama“. Nereikia spausdinti naujų QR kodų: kai tik mokėjimas priskirtas, tie patys kodai vėl atveria meniu." },
    { q: "Ar galiu vėliau pakeisti savo planą?", a: "Taip — bet kada administravimo skydelyje pridėkite ar pašalinkite funkcijas. Skirtumas skaičiuojamas proporcingai pagal likusias mokamo laikotarpio dienas. Pašalinus funkciją ji išjungiama, bet visi jos duomenys išsaugomi." },
    { q: "Kiek restoranų galiu valdyti?", a: "Tiek, kiek reikia — kurdami planą pasirinkite restoranų skaičių, visi valdomi iš vieno skydelio. Kiekio nuolaidos taikomos automatiškai, iki 50 % nuolaidos su 5+ restoranais. Valdote didesnę grupę? Parašykite mums per WhatsApp dėl individualaus plano." },
    { q: "Kokia metinė nuolaida?", a: "Apie 30 % palyginti su mėnesio planu. Tiksli suma rodoma kuriant planą." },
    { q: "Ar galiu atšaukti prenumeratą bet kada?", a: "Taip, atšaukimas yra vienu spustelėjimu administravimo skydelyje. Po atšaukimo sąskaita veikia iki mokamo laikotarpio pabaigos, tada pristabdoma. Duomenys išsaugomi ir galite sugrįžti kada norite." },
    { q: "Kokius mokėjimo būdus priimate?", a: "Visa, Mastercard ir American Express per Stripe. Apple Pay ir Google Pay taip pat palaikomi. Europoje — SEPA Direct Debit metiniame plane." },
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
      trackPrefix="l_lt_pricing_hero"
    />
  );
}
