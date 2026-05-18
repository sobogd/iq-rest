import type { Metadata } from "next";
import { LandingPageBody } from "@/app/_landing/components/landing-page-body";
import { TEXTS } from "./texts";
import { JSON_LD_HTML } from "./jsonld";

const LOCALE = "nl";

export const metadata: Metadata = {
  metadataBase: new URL("https://iq-rest.com"),
  title: TEXTS.meta.title,
  description: TEXTS.meta.description,
  alternates: { canonical: TEXTS.meta.canonical },
  // Noindex: /nl carries the organic SEO; this URL is a PPC LP only.
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
    images: [{ url: "/og/menu-digitale.png", width: 1200, height: 630, alt: "Digitaal menu voor restaurants — IQ Rest" }],
  },
  twitter: {
    card: "summary_large_image",
    title: TEXTS.meta.ogTitle,
    description: TEXTS.meta.ogDescription,
    images: ["/og/menu-digitale.png"],
  },
};

export default function DigitalMenuLpLanding() {
  return (
    <LandingPageBody
      texts={TEXTS}
      locale={LOCALE}
      jsonLdHtml={JSON_LD_HTML}
      footerVariant="lp"
    />
  );
}
