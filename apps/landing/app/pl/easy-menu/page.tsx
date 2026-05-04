import type { Metadata } from "next";
import { FeaturePage } from "@/app/_landing/components/feature-page";
import { getCurrency } from "@/app/_landing/lib/get-currency";
import { buildAlternates } from "@/app/_landing/lib/metadata";
import { TEXTS as CHROME } from "../texts";
import { TEXTS } from "./texts";

const LOCALE = "pl";
const FEATURE_ID = "easy-menu";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  metadataBase: new URL("https://iq-rest.com"),
  title: TEXTS.meta.title,
  description: TEXTS.meta.description,
  robots: { index: true, follow: true },
  alternates: {
    canonical: TEXTS.meta.canonical,
    languages: buildAlternates(`/${FEATURE_ID}`),
  },
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

export default async function Page() {
  const currency = await getCurrency();
  return (
    <FeaturePage
      texts={TEXTS}
      chrome={CHROME}
      locale={LOCALE}
      featureId={FEATURE_ID}
      currency={currency}
    />
  );
}
