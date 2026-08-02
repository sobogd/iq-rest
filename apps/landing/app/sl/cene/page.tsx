import type { Metadata } from "next";
import { PricingTemplate } from "@/app/_landing/templates/pricing-template";
import { TEXTS as DEFAULT } from "../texts";
import { TEXTS } from "./texts";
import { SCHEMA_PRICE_MENU_EUR } from "@/lib/pricing";
import { SCHEMA_DATE_MODIFIED } from "@/lib/page-meta";

export const dynamic = "force-static";
export const revalidate = false;

const LOCALE = "sl";
const SITE = "https://iq-rest.com";

const PRICING_FAQ = {
  ...DEFAULT.faq,
  sub: "Kaj gostinci vprašajo o cenah in plačilu. Ne najdete svojega vprašanja? Pišite nam na WhatsApp.",
  items: [
    { q: "Kako deluje oblikovanje cene?", a: "Svoj paket sestavite sami. Osnova je digitalni QR jedilnik — vključuje AI prevod v 35 jezikov in upravljanje s katere koli naprave. Nato dodate le tisto, kar potrebujete: rezervacijo miz, kuhinjski zaslon s sprejemanjem naročil ali lastno domeno. Cena je na restavracijo, količinski popusti pa se samodejno upoštevajo od druge restavracije naprej." },
    { q: "Ali pobirate provizijo od naročil?", a: "Ne. Vsako naročilo — iz QR jedilnika ali sprejeto s strani natakarja — gre neposredno v restavracijo, brez odstotkov ali provizij agregatorjev. Imate fiksno mesečno naročnino in nobenih drugih odtegljajev." },
    { q: "Kaj vključuje 14-dnevno preizkusno obdobje?", a: "Poln dostop do vseh funkcij, brez kartice. Po 14 dneh se račun samodejno zaustavi, če ni povezanega načina plačila. Brez samodejnih bremenitev brez vašega soglasja." },
    { q: "Kaj se zgodi po 14 dneh?", a: "Če ni povezanega načina plačila, se račun samodejno zaustavi. Skrbniška plošča ostane na voljo v načinu samo za branje, vendar sta QR jedilnik za goste in sprejemanje naročil začasno onemogočena. Nikoli ne zaračunamo brez vašega soglasja." },
    { q: "Kaj se zgodi z mojim jedilnikom, naročili in podatki med premorom?", a: "Vse je v celoti ohranjeno: jedilnik, fotografije jedi, zgodovina naročil, rezervacije, nastavitve oblikovanja, statistika. Povežite plačilo tudi mesec ali šest mesecev pozneje — vse se vrne, kot je bilo, nič se ne izgubi." },
    { q: "Ali bodo QR kode na mizah delovale tudi po preizkusnem obdobju?", a: "Če je račun zaustavljen, QR kode gostom prikazujejo sporočilo „začasno ni na voljo“. Ni vam treba tiskati novih QR kod: takoj ko je plačilo povezano, iste kode znova odprejo jedilnik." },
    { q: "Ali lahko pozneje spremenim svoj paket?", a: "Da — funkcije lahko kadar koli dodate ali odstranite v skrbniški plošči. Razlika se obračuna sorazmerno glede na preostale dni plačanega obdobja. Če funkcijo odstranite, se izklopi, vsi njeni podatki pa ostanejo ohranjeni." },
    { q: "Koliko restavracij lahko upravljam?", a: "Kolikor jih potrebujete — število restavracij izberete pri sestavljanju paketa, vse pa upravljate iz ene same nadzorne plošče. Količinski popusti se upoštevajo samodejno, do 50 % pri 5 ali več restavracijah. Vodite večjo skupino? Pišite nam na WhatsApp o paketu po meri." },
    { q: "Kakšen je letni popust?", a: "Približno 30 % v primerjavi z mesečnim plačevanjem. Točen znesek je prikazan med sestavljanjem paketa." },
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
      trackPrefix="l_sl_pricing_hero"
    />
  );
}
