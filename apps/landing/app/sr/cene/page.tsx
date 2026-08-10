import type { Metadata } from "next";
import { PricingTemplate } from "@/app/_landing/templates/pricing-template";
import { TEXTS as DEFAULT } from "../texts";
import { TEXTS } from "./texts";
import { SCHEMA_PRICE_MENU_EUR } from "@/lib/pricing";
import { SCHEMA_DATE_MODIFIED } from "@/lib/page-meta";

export const dynamic = "force-static";
export const revalidate = false;

const LOCALE = "sr";
const SITE = "https://iq-rest.com";

const PRICING_FAQ = {
  ...DEFAULT.faq,
  sub: "Šta restorateri pitaju o cenama i plaćanju. Ne nalazite svoje pitanje? Pišite nam na WhatsApp.",
  items: [
    { q: "Kako funkcioniše formiranje cene?", a: "Sami sastavljate svoj plan. Osnovu čini digitalni QR meni — uključuje AI prevod na 35 jezika i upravljanje sa bilo kog uređaja. Zatim dodajete samo ono što vam treba: rezervaciju stolova, kuhinjski ekran sa primanjem porudžbina ili prilagođeni domen. Cena je po restoranu, a popusti na količinu se primenjuju automatski počev od drugog restorana." },
    { q: "Da li uzimate proviziju od porudžbina?", a: "Ne. Svaka porudžbina — iz QR menija ili primljena od konobara — ide direktno u restoran, bez procenata ili provizija agregatora. Imate fiksnu mesečnu naknadu i nikakvih drugih odbitaka." },
    { q: "Šta uključuje 14-dnevni probni period?", a: "Pun pristup svim funkcijama, bez kartice. Nakon 14 dana nalog se automatski pauzira ako nije povezan način plaćanja. Nema automatskih naplata bez vaše saglasnosti." },
    { q: "Šta se dešava nakon 14 dana?", a: "Ako nije povezan način plaćanja, nalog se automatski pauzira. Administrativni panel ostaje dostupan u režimu samo za čitanje, ali QR meni za goste i primanje porudžbina su privremeno onemogućeni. Nikada ne naplaćujemo bez vaše saglasnosti." },
    { q: "Šta se dešava sa mojim menijem, porudžbinama i podacima tokom pauze?", a: "Sve je u potpunosti sačuvano: meni, fotografije jela, istorija porudžbina, rezervacije, podešavanja dizajna, statistika. Povežite plaćanje čak i mesec ili šest meseci kasnije — sve se vraća kako je bilo, ništa se ne gubi." },
    { q: "Da li će QR kodovi na stolovima i dalje raditi nakon probnog perioda?", a: "Ako je nalog pauziran, QR kodovi gostima prikazuju poruku „privremeno nedostupno“. Ne morate štampati nove QR kodove: čim se plaćanje poveže, isti kodovi ponovo otvaraju meni." },
    { q: "Mogu li kasnije da promenim svoj plan?", a: "Da — funkcije možete dodati ili ukloniti u bilo kom trenutku u administrativnom panelu. Razlika se obračunava srazmerno preostalim danima plaćenog perioda. Ako uklonite funkciju, ona se isključuje, ali svi njeni podaci ostaju sačuvani." },
    { q: "Sa koliko restorana mogu da upravljam?", a: "Sa koliko god vam treba — broj restorana birate dok sastavljate svoj plan, a svima upravljate iz jednog administrativnog panela. Popusti na količinu se primenjuju automatski, do 50% sa 5 i više restorana. Vodite veću grupu? Pišite nam na WhatsApp o prilagođenom planu." },
    { q: "Kolika je godišnja popust?", a: "Oko 30% u odnosu na mesečno plaćanje. Tačan iznos prikazan je dok sastavljate svoj plan." },
    { q: "Mogu li otkazati pretplatu bilo kada?", a: "Da, otkazivanje je jednim klikom u administrativnom panelu. Nakon otkazivanja nalog radi do kraja plaćenog perioda, zatim se pauzira. Podaci ostaju sačuvani i možete se vratiti kada god želite." },
    { q: "Koje načine plaćanja prihvatate?", a: "Visa, Mastercard i American Express preko Stripe-a. Apple Pay i Google Pay su takođe podržani. U Evropi — SEPA Direct Debit na godišnjem planu." },
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
