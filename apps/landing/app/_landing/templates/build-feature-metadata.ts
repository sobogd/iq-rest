import type { Metadata } from "next";
import type { FeatureContent } from "./types";
import { featureAlternates, routeKeyFromCanonical } from "@/lib/hreflang";

const SITE = "https://iq-rest.com";

// Single builder so every feature page emits identical metadata structure.
// Avoids 80+ lines of boilerplate per page.tsx.
export function buildFeatureMetadata(content: FeatureContent): Metadata {
  const ogImage = content.meta.ogImage ?? "/og-image.png";
  const alt = content.meta.brandLine ?? content.meta.ogTitle;

  // Head-level hreflang derived from the shared route key (reverse-looked-up
  // from this page's canonical). Falls back to canonical-only if unknown.
  const routeKey = routeKeyFromCanonical(content.meta.canonical);
  const languages = routeKey ? featureAlternates(routeKey) : undefined;

  return {
    metadataBase: new URL(SITE),
    title: content.meta.title,
    description: content.meta.description,
    alternates: { canonical: content.meta.canonical, ...(languages ? { languages } : {}) },
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
