import type { Metadata } from "next";
import { PricingTemplate } from "@/app/_landing/templates/pricing-template";
import { TEXTS as DEFAULT } from "../texts";
import { TEXTS } from "./texts";
import { SCHEMA_PRICE_MENU_EUR } from "@/lib/pricing";
import { SCHEMA_DATE_MODIFIED } from "@/lib/page-meta";

export const dynamic = "force-static";
export const revalidate = false;

const LOCALE = "lv";
const SITE = "https://iq-rest.com";

const PRICING_FAQ = {
  ...DEFAULT.faq,
  sub: "Ko restorātori jautā par cenām un maksāšanu. Nevarat atrast savu jautājumu? Rakstiet mums WhatsApp.",
  items: [
    { q: "Kā veidojas cena?", a: "Jūs pats veidojat savu plānu. Digitālā QR ēdienkarte ir pamats — tā ietver AI tulkojumu 35 valodās un pārvaldību no jebkuras ierīces. Pēc tam pievienojat tikai to, kas jums vajadzīgs: galdu rezervēšanu, virtuves ekrānu ar pasūtījumu pieņemšanu vai pielāgotu domēnu. Cena ir par vienu restorānu, un apjoma atlaides tiek piemērotas automātiski, sākot no otrā restorāna." },
    { q: "Vai jūs iekasējat komisiju no pasūtījumiem?", a: "Nē. Katrs pasūtījums — no QR ēdienkartes vai pieņemts ar viesmīli — tiek nosūtīts tieši restorānam, bez procentiem vai agregatoru komisijas. Jums ir fiksēta ikmēneša maksa un nekādu citu atskaitījumu." },
    { q: "Ko ietver 14 dienu izmēģinājums?", a: "Pilna piekļuve visām funkcijām, bez kartes. Pēc 14 dienām konts tiek automātiski apturēts, ja nav pievienota maksāšanas metode. Bez automātiskām maksām bez jūsu piekrišanas." },
    { q: "Kas notiek pēc 14 dienām?", a: "Ja nav pievienota maksāšanas metode, konts tiek automātiski apturēts. Administrēšanas panelis paliek pieejams tikai lasīšanas režīmā, bet QR ēdienkarte viesiem un pasūtījumu pieņemšana ir uz laiku atspējoti. Mēs nekad neiekasējam bez jūsu piekrišanas." },
    { q: "Kas notiek ar manu ēdienkarti, pasūtījumiem un datiem pauzes laikā?", a: "Viss tiek pilnībā saglabāts: ēdienkarte, ēdienu fotoattēli, pasūtījumu vēsture, rezervācijas, dizaina iestatījumi, statistika. Pievienojiet maksājumu pat pēc mēneša vai sešiem mēnešiem — viss atgriežas tāds, kāds bija, nekas netiek zaudēts." },
    { q: "Vai QR kodi uz galdiem joprojām darbosies pēc izmēģinājuma?", a: "Ja konts ir apturēts, QR kodi rāda viesiem ziņojumu „uz laiku nav pieejams“. Jums nav jādrukā jauni QR kodi: tiklīdz maksājums ir pievienots, tie paši kodi atkal atver ēdienkarti." },
    { q: "Vai vēlāk varu mainīt savu plānu?", a: "Jā — pievienojiet vai noņemiet funkcijas jebkurā laikā administrēšanas panelī. Starpība tiek aprēķināta proporcionāli atlikušajām samaksātā perioda dienām. Ja noņemat funkciju, tā tiek atslēgta, bet visi tās dati tiek saglabāti." },
    { q: "Cik restorānus varu pārvaldīt?", a: "Tik, cik jums vajadzīgs — izvēlieties restorānu skaitu, veidojot plānu, visi pārvaldāmi no viena paneļa. Apjoma atlaides tiek piemērotas automātiski, līdz pat 50 % ar 5+ restorāniem. Vadāt lielāku grupu? Rakstiet mums WhatsApp par individuālu plānu." },
    { q: "Kāda ir gada atlaide?", a: "Aptuveni 30 % salīdzinājumā ar ikmēneša plānu. Precīza summa tiek parādīta, veidojot plānu." },
    { q: "Vai varu atcelt abonementu jebkurā laikā?", a: "Jā, atcelšana tiek veikta ar vienu klikšķi administrēšanas panelī. Pēc atcelšanas konts darbojas līdz samaksātā perioda beigām, pēc tam tiek apturēts. Dati tiek saglabāti un jūs varat atgriezties, kad vēlaties." },
    { q: "Kādas maksāšanas metodes pieņemat?", a: "Visa, Mastercard un American Express caur Stripe. Apple Pay un Google Pay arī tiek atbalstīti. Eiropā — SEPA Direct Debit gada plānā." },
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
      trackPrefix="l_lv_pricing_hero"
    />
  );
}
