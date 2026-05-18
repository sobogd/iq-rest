import type { Metadata } from "next";
import { LandingPageBody } from "@/app/_landing/components/landing-page-body";
import { TEXTS } from "./texts";
import { JSON_LD_HTML } from "./jsonld";

const LOCALE = "en";

export const metadata: Metadata = {
  metadataBase: new URL("https://iq-rest.com"),
  title: TEXTS.meta.title,
  description: TEXTS.meta.description,
  alternates: { canonical: TEXTS.meta.canonical },
  // Noindex: /en carries the organic SEO; this URL exists purely as a
  // dedicated, conversion-optimised PPC landing for Google Ads.
  robots: {
    index: false,
    follow: true,
    googleBot: { index: false, follow: true },
  },
  openGraph: {
    title: TEXTS.meta.ogTitle,
    description: TEXTS.meta.ogDescription,
    url: TEXTS.meta.canonical,
    siteName: "IQ Rest",
    locale: TEXTS.meta.ogLocale,
    type: "website",
    images: [
      {
        url: "/og/menu-digitale.png",
        width: 1200,
        height: 630,
        alt: "Digital Menu for Restaurants — IQ Rest",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TEXTS.meta.ogTitle,
    description: TEXTS.meta.ogDescription,
    images: ["/og/menu-digitale.png"],
  },
};

export default function DigitalMenuForRestaurantsLpLanding() {
  return (
    <LandingPageBody
      texts={TEXTS}
      locale={LOCALE}
      jsonLdHtml={JSON_LD_HTML}
      footerVariant="lp"
    />
  );
}
