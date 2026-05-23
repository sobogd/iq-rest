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

const LOCALE = "hu";
const SITE = "https://iq-rest.com";

const PRICING_FAQ = {
  ...DEFAULT.faq,
  sub: "Amit a vendéglátósok az árakról és fizetésről kérdeznek. Nem találja a kérdését? Írjon nekünk WhatsAppon.",
  items: [
    { q: "Mi a különbség a Basic és a Pro között?", a: "A Basic tartalmazza a digitális + QR étlapot, AI fordítást 35 nyelvre, rendelésfelvételt az étlapról (opcionális) és kezelést bármely eszközről. A Pro hozzáadja a konyhai kijelzőt (KDS) és az online asztalfoglalást 24/7, plusz prioritásos WhatsApp támogatást. Ha nincs szüksége konyhai munkafolyamatra és foglalásokra — a Basic mindent lefed." },
    { q: "Felszámítanak jutalékot a rendelésekre?", a: "Nem. Minden rendelés — QR étlapról vagy pincér által átvett — közvetlenül az étterembe érkezik, százalék vagy aggregátor jutalék nélkül. Fix havi díja van és nincs más levonás." },
    { q: "Mit tartalmaz a 14 napos próbaidőszak?", a: "Teljes hozzáférés minden funkcióhoz mindkét csomagban, kártya nélkül. 14 nap után a fiók automatikusan szünetel, ha nincs csatlakoztatott fizetési mód. Nincs automatikus terhelés az Ön hozzájárulása nélkül." },
    { q: "Mi történik 14 nap után?", a: "Ha nincs csatlakoztatott fizetési mód, a fiók automatikusan szünetel. Az adminisztrációs panel csak olvasási módban elérhető marad, de a vendég QR étlap és a rendelésfelvétel ideiglenesen le van tiltva. Soha nem terhelünk az Ön hozzájárulása nélkül." },
    { q: "Mi történik az étlapommal, rendeléseimmel és adataimmal a szünet alatt?", a: "Minden teljesen megőrződik: étlap, ételfotók, rendelési előzmények, foglalások, dizájn beállítások, statisztikák. Csatlakoztassa a fizetést akár egy hónap vagy hat hónap múlva — minden visszatér úgy, ahogy volt, semmi sem vész el." },
    { q: "Működnek-e még a QR kódok az asztalokon a próbaidőszak után?", a: "Ha a fiók szünetel, a QR kódok „ideiglenesen nem elérhető“ üzenetet mutatnak a vendégeknek. Nem kell új QR kódokat nyomtatnia: amint a fizetés csatlakozik, ugyanazok a kódok újra megnyitják az étlapot." },
    { q: "Tudok később Basic-ról Pro-ra váltani?", a: "Igen, a frissítés egy kattintással történik az adminisztrációs panelben. A többletköltség arányosan kerül kiszámításra a fizetett időszak hátralévő napjai alapján. A Pro-ról Basic-re való csökkentés is elérhető — KDS és foglalás letiltásra kerül, de minden adat megőrződik." },
    { q: "Mekkora az éves kedvezmény?", a: "Körülbelül 30% a havi csomaghoz képest. A pontos összeg a fizetésnél jelenik meg a csomag oldalon." },
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
        <PricingHero locale={LOCALE} ctaText={DEFAULT.ctaText} demoText={DEFAULT.demoText} microcopy={DEFAULT.microcopy} texts={DEFAULT.pricingHero!} trackPrefix="l_hu_pricing_hero" />
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
