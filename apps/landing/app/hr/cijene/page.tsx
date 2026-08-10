import type { Metadata } from "next";
import { PricingTemplate } from "@/app/_landing/templates/pricing-template";
import { TEXTS as DEFAULT } from "../texts";
import { TEXTS } from "./texts";
import { SCHEMA_PRICE_MENU_EUR } from "@/lib/pricing";
import { SCHEMA_DATE_MODIFIED } from "@/lib/page-meta";

export const dynamic = "force-static";
export const revalidate = false;

const LOCALE = "hr";
const SITE = "https://iq-rest.com";

const PRICING_FAQ = {
  ...DEFAULT.faq,
  sub: "Što restoratori pitaju o cijenama i plaćanju. Ne nalazite svoje pitanje? Pišite nam na WhatsApp.",
  items: [
    { q: "Kako funkcioniraju cijene?", a: "Sami slažete svoj plan. Digitalni QR jelovnik je osnova — uključuje AI prijevod na 35 jezika i upravljanje s bilo kojeg uređaja. Zatim dodajete samo ono što vam treba: rezervaciju stolova, kuhinjski ekran s primanjem narudžbi ili vlastitu domenu. Cijena je po restoranu, a količinski popusti primjenjuju se automatski od drugog restorana." },
    { q: "Uzimate li proviziju na narudžbe?", a: "Ne. Svaka narudžba — iz QR jelovnika ili koju je primio konobar — ide izravno u restoran, bez postotaka ili provizija agregatora. Imate fiksnu mjesečnu naknadu i nikakve druge odbitke." },
    { q: "Što uključuje 14-dnevno probno razdoblje?", a: "Potpuni pristup svim mogućnostima, bez kartice. Nakon 14 dana račun se automatski pauzira ako nije povezan način plaćanja. Nema automatskih naplata bez vaše suglasnosti." },
    { q: "Što se događa nakon 14 dana?", a: "Ako nije povezan način plaćanja, račun se automatski pauzira. Admin panel ostaje dostupan u načinu samo za čitanje, ali QR jelovnik za goste i primanje narudžbi privremeno su onemogućeni. Nikada ne naplaćujemo bez vaše suglasnosti." },
    { q: "Što se događa s mojim jelovnikom, narudžbama i podacima tijekom pauze?", a: "Sve je u potpunosti sačuvano: jelovnik, fotografije jela, povijest narudžbi, rezervacije, postavke dizajna, statistike. Povežite plaćanje čak i mjesec ili šest mjeseci kasnije — sve se vraća kakvo je bilo, ništa se ne gubi." },
    { q: "Hoće li QR kodovi na stolovima i dalje raditi nakon probnog razdoblja?", a: "Ako je račun pauziran, QR kodovi gostima prikazuju poruku „privremeno nedostupno“. Ne morate ispisivati nove QR kodove: čim se plaćanje poveže, isti kodovi ponovno otvaraju jelovnik." },
    { q: "Mogu li kasnije promijeniti svoj plan?", a: "Da — dodajte ili uklonite mogućnosti bilo kada u admin panelu. Razlika se obračunava razmjerno preostalim danima plaćenog razdoblja. Ako uklonite neku mogućnost, ona se isključuje, ali svi njezini podaci ostaju sačuvani." },
    { q: "Koliko restorana mogu upravljati?", a: "Koliko god trebate — odaberite broj restorana dok slažete svoj plan, svima upravljate iz jedne nadzorne ploče. Količinski popusti primjenjuju se automatski, do 50 % popusta uz 5+ restorana. Vodite veću grupu? Pišite nam na WhatsApp o prilagođenom planu." },
    { q: "Koliki je godišnji popust?", a: "Oko 30 % u odnosu na mjesečno plaćanje. Točan iznos prikazan je dok slažete svoj plan." },
    { q: "Mogu li otkazati pretplatu bilo kada?", a: "Da, otkazivanje je jednim klikom u admin panelu. Nakon otkazivanja račun radi do kraja plaćenog razdoblja, zatim se pauzira. Podaci ostaju sačuvani i možete se vratiti kada god želite." },
    { q: "Koje načine plaćanja prihvaćate?", a: "Visa, Mastercard i American Express putem Stripea. Apple Pay i Google Pay također su podržani. U Europi — SEPA Direct Debit na godišnjem planu." },
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
    />
  );
}
