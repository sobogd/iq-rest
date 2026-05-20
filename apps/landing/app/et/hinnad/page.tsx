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

const LOCALE = "et";
const SITE = "https://iq-rest.com";

const PRICING_FAQ = {
  ...DEFAULT.faq,
  sub: "Mida restoranipidajad küsivad hindade ja maksete kohta. Ei leia oma küsimust? Kirjuta meile WhatsAppi.",
  items: [
    { q: "Mis vahe on Basicul ja Prol?", a: "Basic sisaldab digitaalset + QR-menüüd, AI-tõlget 35 keelde, tellimuste vastuvõtmist menüüst (valikuline) ja haldust igast seadmest. Pro lisab köögiekraani (KDS) ja veebipõhise laudade broneerimise 24/7 ning eelistatud WhatsAppi toe. Kui sa ei vaja kööki ja broneerimist — Basic katab kõik." },
    { q: "Kas võtate tellimustelt komisjoni?", a: "Ei. Iga tellimus — QR-menüüst või kelneri vastu võetud — läheb otse restorani, ilma protsendita ja ilma agregaatorite komisjonita. Sul on kindel kuutasu ja muud mahaarvamisi pole." },
    { q: "Mida sisaldab 14-päevane prooviperiood?", a: "Täielik juurdepääs kõigile funktsioonidele mõlemas plaanis, ilma kaardita. Pärast 14 päeva pannakse konto automaatselt pausile, kui makseviisi pole ühendatud. Ilma sinu nõusolekuta ei toimu automaatseid mahaarvamisi." },
    { q: "Mis juhtub pärast 14 päeva?", a: "Kui makseviisi pole ühendatud, pannakse konto automaatselt pausile. Halduspaneel jääb saadavaks ainult lugemise režiimis, kuid külalise QR-menüü ja tellimuste vastuvõtmine on ajutiselt välja lülitatud. Me ei nõua kunagi ilma sinu nõusolekuta." },
    { q: "Mis juhtub menüü, tellimuste ja andmetega pausi ajal?", a: "Kõik säilib täielikult: menüü, roogade fotod, tellimuste ajalugu, broneeringud, disainisätted, statistika. Ühenda makse kasvõi kuu või poole aasta pärast — kõik naaseb sellisena, nagu oli, miski ei lähe kaotsi." },
    { q: "Kas laudadel olevad QR-koodid töötavad pärast prooviperioodi?", a: "Kui konto on pausil, näitavad QR-koodid külalistele teadet „ajutiselt pole saadaval“. Uusi QR-koode pole vaja trükkida: niipea kui makse on ühendatud, avavad samad koodid menüü uuesti." },
    { q: "Kas saan hiljem Basicult Prole üle minna?", a: "Jah, uuendamine toimub ühe klikiga halduspaneelis. Lisatasu arvutatakse proportsionaalselt makstud perioodi järelejäänud päevade järgi. Pro-st Basicusse alandamine on samuti võimalik — KDS ja broneerimine lülitatakse välja, kuid kõik andmed säilivad." },
    { q: "Milline on aastane allahindlus?", a: "Umbes 30 % võrreldes kuiseplaaniga. Täpne summa kuvatakse maksmisel plaani lehel." },
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
        <PricingHero locale={LOCALE} ctaText={DEFAULT.ctaText} demoText={DEFAULT.demoText} microcopy={DEFAULT.microcopy} texts={DEFAULT.pricingHero!} trackPrefix="l_et_pricing_hero" />
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
