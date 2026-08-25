import type { BlogArticleContent, BlogManifestEntry } from "./types";
import { localePath } from "@/lib/locale-paths";

const SITE = "https://iq-rest.com";

// JSON-LD wants plain text — drop the markdown-lite link/bold syntax.
function plain(text: string): string {
  return text.replace(/\[([^\]]+)\]\([^)\s]+\)/g, "$1").replace(/\*\*([^*]+)\*\*/g, "$1");
}

const ORG = {
  "@type": "Organization",
  name: "IQ Rest",
  url: SITE,
  logo: { "@type": "ImageObject", url: `${SITE}/icon.png` },
};

export function blogPostingJsonLd(
  locale: string,
  entry: BlogManifestEntry,
  content: BlogArticleContent,
): string {
  const url = `${SITE}${localePath(locale, `/blog/${entry.id}`)}`;
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: plain(content.h1),
    description: plain(content.meta.description),
    inLanguage: locale,
    datePublished: entry.date,
    dateModified: entry.dateModified ?? entry.date,
    author: ORG,
    publisher: ORG,
    image: `${SITE}/og-image.png`,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
  }).replace(/</g, "\\u003c");
}

export function blogBreadcrumbJsonLd(
  locale: string,
  blogLabel: string,
  entry?: BlogManifestEntry,
  articleTitle?: string,
): string {
  const items = [
    { name: "IQ Rest", item: locale === "en" ? SITE : `${SITE}/${locale}` },
    { name: blogLabel, item: `${SITE}${localePath(locale, "/blog")}` },
    ...(entry && articleTitle
      ? [{ name: plain(articleTitle), item: `${SITE}${localePath(locale, `/blog/${entry.id}`)}` }]
      : []),
  ];
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: it.item,
    })),
  }).replace(/</g, "\\u003c");
}

/** FAQPage JSON-LD from the article's `faq` block, if it has one. */
export function blogFaqJsonLd(content: BlogArticleContent): string | null {
  const faq = content.blocks.find((b) => b.type === "faq");
  if (!faq || faq.type !== "faq" || faq.items.length === 0) return null;
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.items.map((it) => ({
      "@type": "Question",
      name: plain(it.q),
      acceptedAnswer: { "@type": "Answer", text: plain(it.a) },
    })),
  }).replace(/</g, "\\u003c");
}
