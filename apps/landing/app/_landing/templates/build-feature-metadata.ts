import type { Metadata } from "next";
import type { FeatureContent } from "./types";

const SITE = "https://iq-rest.com";

// Single builder so every feature page emits identical metadata structure.
// Avoids 80+ lines of boilerplate per page.tsx.
export function buildFeatureMetadata(content: FeatureContent): Metadata {
  const ogImage = content.meta.ogImage ?? "/og-image.png";
  const alt = content.meta.brandLine ?? content.meta.ogTitle;

  return {
    metadataBase: new URL(SITE),
    title: content.meta.title,
    description: content.meta.description,
    alternates: { canonical: content.meta.canonical },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true },
    },
    openGraph: {
      title: content.meta.ogTitle,
      description: content.meta.ogDescription,
      url: content.meta.canonical,
      siteName: "IQ Rest",
      locale: content.meta.ogLocale,
      type: "website",
      images: [{ url: ogImage, width: 1200, height: 630, alt }],
    },
    twitter: {
      card: "summary_large_image",
      title: content.meta.ogTitle,
      description: content.meta.ogDescription,
      images: [ogImage],
    },
  };
}
