import type { Metadata } from "next";
import { LandingPageBody } from "@/app/_landing/components/landing-page-body";
import { TEXTS } from "./texts";
import { JSON_LD_HTML } from "./jsonld";

const LOCALE = "bg";

export const metadata: Metadata = {
  metadataBase: new URL("https://iq-rest.com"),
  title: TEXTS.meta.title,
  description: TEXTS.meta.description,
  alternates: { canonical: TEXTS.meta.canonical },
  robots: { index: false, follow: false },
  openGraph: {
    title: TEXTS.meta.ogTitle,
    description: TEXTS.meta.ogDescription,
    url: TEXTS.meta.canonical,
    siteName: "IQ Rest",
    locale: TEXTS.meta.ogLocale,
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "IQ Rest — QR Menu for Restaurants" }],
  },
  twitter: {
    card: "summary_large_image",
    title: TEXTS.meta.ogTitle,
    description: TEXTS.meta.ogDescription,
    images: ["/og-image.png"],
  },
};

export default function Page() {
  return <LandingPageBody locale={LOCALE} texts={TEXTS} jsonLdHtml={JSON_LD_HTML} />;
}
