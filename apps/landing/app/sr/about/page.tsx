import type { Metadata } from "next";
import { AboutTemplate, type AboutCopy } from "@/app/_landing/templates/about-template";
import type { LandingTexts } from "@/app/_landing/types";
import TEXTS_JSON from "../texts.json";
import ABOUT_JSON from "./about.json";
import { restaurantCount } from "@/lib/restaurant-count";
import { SCHEMA_DATE_MODIFIED } from "@/lib/page-meta";
import { featureAlternates } from "@/lib/hreflang";
import { WHATSAPP_E164 } from "@/lib/contact";
import { ogAlternateLocales } from "@/lib/og-locales";

export const dynamic = "force-static";
export const revalidate = false;

const SITE = "https://iq-rest.com";

const TEXTS = TEXTS_JSON as unknown as LandingTexts;
const ABOUT = ABOUT_JSON as unknown as AboutCopy;
const PAGE_URL = ABOUT.meta.canonical;

const COPY: AboutCopy = {
  ...ABOUT,
  story: {
    ...ABOUT.story,
    photo: ABOUT.story.photo ? { ...ABOUT.story.photo, alt: TEXTS.founder.photoAlt } : undefined,
    paragraphs: [`${TEXTS.founder.quoteStart} ${TEXTS.founder.quoteAccent}`, ...ABOUT.story.paragraphs],
  },
};

const JSON_LD = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "AboutPage",
  url: PAGE_URL,
  inLanguage: TEXTS.htmlLang,
  dateModified: SCHEMA_DATE_MODIFIED,
  mainEntity: {
    "@type": "Organization",
    "@id": `${SITE}/#organization`,
    name: "IQ Rest",
    url: SITE,
    logo: `${SITE}/logo.png`,
    founder: { "@type": "Person", name: "Bogdan Sokolov" },
    address: {
      "@type": "PostalAddress",
      streetAddress: "Calle Boca del Río 2",
      addressLocality: "Oviedo",
      postalCode: "33010",
      addressRegion: "Asturias",
      addressCountry: "ES",
    },
    vatID: "ESZ1894474S",
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "customer support",
        email: "support@iq-rest.com",
        telephone: WHATSAPP_E164,
        availableLanguage: ["ru", "en", "es"],
      },
    ],
  },
}).replace(/</g, "\\u003c");

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: ABOUT.meta.title,
  description: ABOUT.meta.description,
  alternates: { canonical: PAGE_URL, languages: featureAlternates("/about") },
  robots: { index: true, follow: true },
  openGraph: {
    title: ABOUT.meta.ogTitle,
    description: ABOUT.meta.ogDescription,
    url: PAGE_URL,
    siteName: "IQ Rest",
    locale: ABOUT.meta.ogLocale,
    alternateLocale: ogAlternateLocales(ABOUT.meta.ogLocale),
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "IQ Rest" }],
  },
};

export default function AboutPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON_LD }} />
      <AboutTemplate
        locale={TEXTS.htmlLang}
        texts={TEXTS}
        copy={COPY}
        count={restaurantCount()}
      />
    </>
  );
}
