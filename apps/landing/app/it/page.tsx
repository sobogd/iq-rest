import type { Metadata } from "next";
import { HomeTemplate } from "@/app/_landing/templates/home-template";
import { TEXTS } from "./texts";
import { homeAlternates } from "@/lib/hreflang";
import { SCHEMA_PRICE_BASIC_EUR } from "@/lib/pricing";

export const dynamic = "force-static";
export const revalidate = false;

const LOCALE = "it";
const SITE = "https://iq-rest.com";

const HOME_HERO = {
  title: "Tutto quello che serve al tuo ristorante.",
  titleAccent: "In un'unica piattaforma.",
  sub: "Menu, ordini, prenotazioni, display di cucina e traduzione con IA — un'unica piattaforma al posto di cinque servizi separati. Scegli una funzionalità qui sotto per saperne di più.",
  imageAlt: "Un cliente filtra il menù QR per allergeni sullo smartphone mentre il titolare modifica l'elenco dal tablet",
};

const FEATURE_IMAGES: Record<string, string> = {
  "Menu digitale": "/landing/hero-cafe.webp",
  "Ordini": "/landing/feature-orders.webp",
  "Prenotazioni": "/landing/feature-reservation.webp",
  "KDS": "/landing/feature-kitchen.webp",
};

const JSON_LD = JSON.stringify({
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "Organization", "@id": `${SITE}/#organization`, name: "IQ Rest", url: SITE, logo: `${SITE}/logo.png` },
    { "@type": "WebSite", url: `${SITE}/${LOCALE}`, name: "IQ Rest", inLanguage: LOCALE, publisher: { "@id": `${SITE}/#organization` } },
    {
      "@type": "SoftwareApplication",
      name: "IQ Rest — Piattaforma di gestione per ristoranti",
      description: "Piattaforma di gestione per ristoranti: menu digitale, ordini QR, prenotazioni e display di cucina. Online in 5 minuti.",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web, iOS, Android",
      url: `${SITE}/${LOCALE}`,
      inLanguage: LOCALE,
      publisher: { "@id": `${SITE}/#organization` },
      offers: { "@type": "Offer", price: SCHEMA_PRICE_BASIC_EUR, priceCurrency: "EUR", availability: "https://schema.org/InStock" },
    },
  ],
}).replace(/</g, "\\u003c");

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: TEXTS.meta.title,
  description: TEXTS.meta.description,
  alternates: { canonical: TEXTS.meta.canonical, languages: homeAlternates() },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
  openGraph: {
    title: TEXTS.meta.ogTitle,
    description: TEXTS.meta.ogDescription,
    url: TEXTS.meta.canonical,
    siteName: "IQ Rest",
    locale: TEXTS.meta.ogLocale,
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "IQ Rest" }],
  },
  twitter: { card: "summary_large_image", title: TEXTS.meta.ogTitle, description: TEXTS.meta.ogDescription, images: ["/og-image.png"] },
};

export default function HomePage() {
  return (
    <HomeTemplate
      locale={LOCALE}
      texts={TEXTS}
      hero={HOME_HERO}
      featureImages={FEATURE_IMAGES}
      jsonLd={JSON_LD}
      learnMoreText="Scopri di più"
    />
  );
}
