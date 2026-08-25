import MANIFEST_JSON from "@/content/blog/manifest.json";
import type { BlogArticleContent, BlogManifestEntry } from "./types";

// Newest first — the index page and "related articles" both read this order.
export const BLOG_ARTICLES: BlogManifestEntry[] = (
  MANIFEST_JSON as BlogManifestEntry[]
)
  .slice()
  .sort((a, b) => (a.date < b.date ? 1 : -1));

export function blogEntry(id: string): BlogManifestEntry | undefined {
  return BLOG_ARTICLES.find((a) => a.id === id);
}

/** Article content for a locale. The webpack context created by the template
 *  literal bundles every content/blog JSON; unknown combinations reject, so a
 *  locale that is missing a translation falls back to English (the pages are
 *  generated only for manifest ids, so `null` means a broken manifest). */
export async function loadBlogArticle(
  id: string,
  locale: string,
): Promise<BlogArticleContent | null> {
  try {
    return (await import(`@/content/blog/${id}/${locale}.json`))
      .default as BlogArticleContent;
  } catch {
    if (locale === "en") return null;
    return loadBlogArticle(id, "en");
  }
}
