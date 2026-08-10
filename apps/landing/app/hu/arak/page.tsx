import type { Metadata } from "next";
import { PricingTemplate } from "@/app/_landing/templates/pricing-template";
import { TEXTS as DEFAULT } from "../texts";
import { TEXTS } from "./texts";
import { SCHEMA_PRICE_MENU_EUR } from "@/lib/pricing";
import { SCHEMA_DATE_MODIFIED } from "@/lib/page-meta";

export const dynamic = "force-static";
export const revalidate = false;

const LOCALE = "hu";
const SITE = "https://iq-rest.com";

const PRICING_FAQ = {
  ...DEFAULT.faq,
  sub: "Amit a vendéglátósok az árakról és fizetésről kérdeznek. Nem találja a kérdését? Írjon nekünk WhatsAppon.",
  items: [
    { q: "Hogyan működik az árazás?", a: "Ön állítja össze a saját csomagját. Az alap a digitális QR étlap — ez tartalmazza az AI fordítást 35 nyelvre és a kezelést bármely eszközről. Ehhez csak azt adja hozzá, amire szüksége van: asztalfoglalást, konyhai kijelzőt rendelésfelvétellel vagy egyedi domaint. Az ár éttermenként értendő, és a második étteremtől automatikusan mennyiségi kedvezmény jár." },
    { q: "Felszámítanak jutalékot a rendelésekre?", a: "Nem. Minden rendelés — QR étlapról vagy pincér által átvett — közvetlenül az étterembe érkezik, százalék vagy aggregátor jutalék nélkül. Fix havi díja van és nincs más levonás." },
    { q: "Mit tartalmaz a 14 napos próbaidőszak?", a: "Teljes hozzáférés minden funkcióhoz, kártya nélkül. 14 nap után a fiók automatikusan szünetel, ha nincs csatlakoztatott fizetési mód. Nincs automatikus terhelés az Ön hozzájárulása nélkül." },
    { q: "Mi történik 14 nap után?", a: "Ha nincs csatlakoztatott fizetési mód, a fiók automatikusan szünetel. Az adminisztrációs panel csak olvasási módban elérhető marad, de a vendég QR étlap és a rendelésfelvétel ideiglenesen le van tiltva. Soha nem terhelünk az Ön hozzájárulása nélkül." },
    { q: "Mi történik az étlapommal, rendeléseimmel és adataimmal a szünet alatt?", a: "Minden teljesen megőrződik: étlap, ételfotók, rendelési előzmények, foglalások, dizájn beállítások, statisztikák. Csatlakoztassa a fizetést akár egy hónap vagy hat hónap múlva — minden visszatér úgy, ahogy volt, semmi sem vész el." },
    { q: "Működnek-e még a QR kódok az asztalokon a próbaidőszak után?", a: "Ha a fiók szünetel, a QR kódok „ideiglenesen nem elérhető“ üzenetet mutatnak a vendégeknek. Nem kell új QR kódokat nyomtatnia: amint a fizetés csatlakozik, ugyanazok a kódok újra megnyitják az étlapot." },
    { q: "Módosíthatom később a csomagomat?", a: "Igen — bármikor hozzáadhat vagy eltávolíthat funkciókat az adminisztrációs panelben. A különbözet arányosan kerül kiszámításra a fizetett időszak hátralévő napjai alapján. Ha eltávolít egy funkciót, az kikapcsol, de minden adata megőrződik." },
    { q: "Hány éttermet kezelhetek?", a: "Amennyire szüksége van — a csomag összeállításakor válassza ki az éttermek számát, mindet egyetlen vezérlőpultról kezelve. A mennyiségi kedvezmény automatikusan érvényesül, 5 vagy több étteremnél akár 50% is lehet. Nagyobb csoportot üzemeltet? Írjon nekünk WhatsAppon egy egyedi csomagról." },
    { q: "Mekkora az éves kedvezmény?", a: "Körülbelül 30% a havi fizetéshez képest. A pontos összeg a csomag összeállításakor jelenik meg." },
    { q: "Lemondhatom az előfizetést bármikor?", a: "Igen, a lemondás egy kattintással történik az adminisztrációs panelben. A lemondás után a fiók a fizetett időszak végéig működik, majd szünetel. Az adatok megőrződnek és bármikor visszatérhet." },
    { q: "Milyen fizetési módokat fogadnak el?", a: "Visa, Mastercard és American Express Stripe-on keresztül. Apple Pay és Google Pay is támogatott. Európában — SEPA Direct Debit éves csomagon." },
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
