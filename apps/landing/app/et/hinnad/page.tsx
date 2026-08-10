import type { Metadata } from "next";
import { PricingTemplate } from "@/app/_landing/templates/pricing-template";
import { TEXTS as DEFAULT } from "../texts";
import { TEXTS } from "./texts";
import { SCHEMA_PRICE_MENU_EUR } from "@/lib/pricing";
import { SCHEMA_DATE_MODIFIED } from "@/lib/page-meta";

export const dynamic = "force-static";
export const revalidate = false;

const LOCALE = "et";
const SITE = "https://iq-rest.com";

const PRICING_FAQ = {
  ...DEFAULT.faq,
  sub: "Mida restoranipidajad küsivad hindade ja maksete kohta. Ei leia oma küsimust? Kirjuta meile WhatsAppi.",
  items: [
    { q: "Kuidas hinnastamine toimib?", a: "Sa koostad oma plaani ise. Digitaalne QR-menüü on alus — see sisaldab AI-tõlget 35 keelde ja haldust igast seadmest. Seejärel lisad ainult selle, mida vajad: laudade broneerimise, tellimuste vastuvõtmisega köögiekraani või oma domeeni. Hind on restorani kohta ning mahusoodustused rakenduvad automaatselt alates teisest restoranist." },
    { q: "Kas võtate tellimustelt komisjoni?", a: "Ei. Iga tellimus — QR-menüüst või kelneri vastu võetud — läheb otse restorani, ilma protsendita ja ilma agregaatorite komisjonita. Sul on kindel kuutasu ja muid mahaarvamisi pole." },
    { q: "Mida sisaldab 14-päevane prooviperiood?", a: "Täielik juurdepääs kõigile funktsioonidele, ilma kaardita. Pärast 14 päeva pannakse konto automaatselt pausile, kui makseviisi pole ühendatud. Ilma sinu nõusolekuta ei toimu automaatseid mahaarvamisi." },
    { q: "Mis juhtub pärast 14 päeva?", a: "Kui makseviisi pole ühendatud, pannakse konto automaatselt pausile. Halduspaneel jääb saadavaks ainult lugemise režiimis, kuid külalise QR-menüü ja tellimuste vastuvõtmine on ajutiselt välja lülitatud. Me ei nõua kunagi tasu ilma sinu nõusolekuta." },
    { q: "Mis juhtub minu menüü, tellimuste ja andmetega pausi ajal?", a: "Kõik säilib täielikult: menüü, roogade fotod, tellimuste ajalugu, broneeringud, disainisätted, statistika. Ühenda makse kasvõi kuu või poole aasta pärast — kõik naaseb sellisena, nagu oli, miski ei lähe kaotsi." },
    { q: "Kas laudadel olevad QR-koodid töötavad pärast prooviperioodi?", a: "Kui konto on pausil, näitavad QR-koodid külalistele teadet „ajutiselt pole saadaval“. Uusi QR-koode pole vaja trükkida: niipea kui makse on ühendatud, avavad samad koodid menüü uuesti." },
    { q: "Kas saan oma plaani hiljem muuta?", a: "Jah — lisa või eemalda funktsioone halduspaneelis igal ajal. Vahe arvutatakse proportsionaalselt makstud perioodi järelejäänud päevade järgi. Kui eemaldad mõne funktsiooni, lülitatakse see välja, kuid kõik selle andmed säilivad." },
    { q: "Mitut restorani saan hallata?", a: "Nii palju, kui vajad — vali plaani koostamisel restoranide arv ja halda kõiki ühest juhtpaneelist. Mahusoodustused rakenduvad automaatselt, kuni 50% soodustust 5+ restorani puhul. Juhid suuremat gruppi? Kirjuta meile WhatsAppis kohandatud plaani kohta." },
    { q: "Milline on aastane allahindlus?", a: "Umbes 30% võrreldes kuise arveldusega. Täpne summa kuvatakse plaani koostamisel." },
    { q: "Kas saan tellimuse igal ajal tühistada?", a: "Jah, tühistamine toimub ühe klikiga halduspaneelis. Pärast tühistamist toimib konto kuni makstud perioodi lõpuni, siis pannakse pausile. Andmed säilivad ja võid tagasi tulla, millal soovid." },
    { q: "Milliseid makseviise aktsepteerite?", a: "Visa, Mastercard ja American Express Stripe'i kaudu. Apple Pay ja Google Pay on samuti toetatud. Euroopas — SEPA Direct Debit aastaplaanil." },
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
