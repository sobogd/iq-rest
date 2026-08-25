import type { Metadata } from "next";
import { locales } from "@/lib/locales";
import { localePath } from "@/lib/locale-paths";
import { ogAlternateLocales, OG_LOCALES } from "@/lib/og-locales";
import type { BlogTexts } from "../types";
import type { BlogArticleContent, BlogManifestEntry } from "./types";

const SITE = "https://iq-rest.com";

function ogLocaleFor(locale: string): string {
  return OG_LOCALES.find((l) => l.startsWith(`${locale}_`)) ?? "en_US";
}

// Blog slugs are shared across every locale (English slug everywhere), so the
// alternates map is a pure locale-prefix fan-out — no per-locale slug lookup.
export function blogAlternates(slug?: string): Record<string, string> {
  const path = slug ? `/blog/${slug}` : "/blog";
  const languages: Record<string, string> = {};
  locales.forEach((locale) => {
    languages[locale] = `${SITE}${localePath(locale, path)}`;
  });
  languages["x-default"] = `${SITE}${localePath("en", path)}`;
  return languages;
}

function build(
  locale: string,
  path: string,
  title: string,
  description: string,
  languages: Record<string, string>,
  ogType: "website" | "article",
): Metadata {
  const canonical = `${SITE}${localePath(locale, path)}`;
  const ogLocale = ogLocaleFor(locale);
  return {
    metadataBase: new URL(SITE),
    title,
    description,
    alternates: { canonical, languages },
    robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: "IQ Rest",
      locale: ogLocale,
      alternateLocale: ogAlternateLocales(ogLocale),
      type: ogType,
      images: [{ url: "/og-image.png", width: 1200, height: 630, alt: title }],
    },
    twitter: { card: "summary_large_image", title, description, images: ["/og-image.png"] },
  };
}

export function buildBlogIndexMetadata(locale: string, texts: BlogTexts): Metadata {
  return build(
    locale,
    "/blog",
    texts.metaTitle,
    texts.metaDescription,
    blogAlternates(),
    "website",
  );
}

export function buildBlogArticleMetadata(
  locale: string,
  entry: BlogManifestEntry,
  content: BlogArticleContent,
): Metadata {
  return build(
    locale,
    `/blog/${entry.id}`,
    content.meta.title,
    content.meta.description,
    blogAlternates(entry.id),
    "article",
  );
}
