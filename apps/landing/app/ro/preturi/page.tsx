import type { Metadata } from "next";
import { PricingTemplate } from "@/app/_landing/templates/pricing-template";
import { TEXTS as DEFAULT } from "../texts";
import { TEXTS } from "./texts";
import { SCHEMA_PRICE_MENU_EUR } from "@/lib/pricing";
import { SCHEMA_DATE_MODIFIED } from "@/lib/page-meta";

export const dynamic = "force-static";
export const revalidate = false;

const LOCALE = "ro";
const SITE = "https://iq-rest.com";

const PRICING_FAQ = {
  ...DEFAULT.faq,
  sub: "Ce întreabă restauratorii despre prețuri și plată. Nu găsiți întrebarea dumneavoastră? Scrieți-ne pe WhatsApp.",
  items: [
    { q: "Cum funcționează prețurile?", a: "Vă construiți propriul plan. Meniul digital QR este baza — include traducere AI în 35 de limbi și gestionare de pe orice dispozitiv. Apoi adăugați doar ce aveți nevoie: rezervarea meselor, display-ul de bucătărie cu preluare comenzi sau un domeniu personalizat. Prețul este per restaurant, iar reducerile de volum se aplică automat de la al doilea restaurant." },
    { q: "Percepeți comision la comenzi?", a: "Nu. Fiecare comandă — din meniu QR sau preluată de ospătar — ajunge direct la restaurant, fără procente sau comisioane de agregatori. Aveți o taxă lunară fixă și fără alte deduceri." },
    { q: "Ce include perioada de probă de 14 zile?", a: "Acces complet la toate funcționalitățile, fără card. După 14 zile contul este suspendat automat dacă nu este conectată o metodă de plată. Fără perceperi automate fără consimțământul dumneavoastră." },
    { q: "Ce se întâmplă după cele 14 zile?", a: "Dacă nu este conectată o metodă de plată, contul este suspendat automat. Panoul de administrare rămâne disponibil în mod numai pentru citire, dar meniul QR pentru oaspeți și preluarea comenzilor sunt dezactivate temporar. Nu percepem niciodată fără consimțământul dumneavoastră." },
    { q: "Ce se întâmplă cu meniul, comenzile și datele mele în timpul pauzei?", a: "Totul este păstrat în întregime: meniu, fotografii preparate, istoric comenzi, rezervări, setări de design, statistici. Conectați plata chiar și după o lună sau șase luni — totul revine cum era, nimic nu se pierde." },
    { q: "Vor funcționa codurile QR de pe mese după perioada de probă?", a: "Dacă contul este suspendat, codurile QR afișează oaspeților mesajul „temporar indisponibil“. Nu trebuie să tipăriți coduri QR noi: imediat ce plata este conectată, aceleași coduri deschid din nou meniul." },
    { q: "Pot schimba planul mai târziu?", a: "Da — adăugați sau eliminați funcționalități oricând în panoul de administrare. Diferența se calculează proporțional cu zilele rămase din perioada plătită. Dacă eliminați o funcționalitate, aceasta este dezactivată, dar toate datele ei sunt păstrate." },
    { q: "Câte restaurante pot gestiona?", a: "Câte aveți nevoie — alegeți numărul de restaurante în timp ce vă construiți planul, toate gestionate dintr-un singur panou. Reducerile de volum se aplică automat, până la 50% pentru 5 sau mai multe restaurante. Aveți un grup mai mare? Scrieți-ne pe WhatsApp despre un plan personalizat." },
    { q: "Care este reducerea anuală?", a: "Aproximativ 30% comparativ cu planul lunar. Suma exactă este afișată în timp ce vă construiți planul." },
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
      dateModified: SCHEMA_DATE_MODIFIED,
      brand: { "@type": "Brand", name: "IQ Rest" },
      offers: [
        { "@type": "Offer", name: "Meniu digital", price: SCHEMA_PRICE_MENU_EUR, priceCurrency: "EUR", availability: "https://schema.org/InStock", url: TEXTS.meta.canonical },
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
