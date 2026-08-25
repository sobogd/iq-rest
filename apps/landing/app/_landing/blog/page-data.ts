import { BLOG_ARTICLES, loadBlogArticle } from "./registry";
import type { BlogCardData } from "./blog-index-view";
import type { BlogManifestEntry } from "./types";

async function toCard(entry: BlogManifestEntry, locale: string): Promise<BlogCardData | null> {
  const content = await loadBlogArticle(entry.id, locale);
  if (!content) return null;
  return { entry, title: content.card.title, excerpt: content.card.excerpt };
}

/** Every article's card copy for a locale, newest first (blog index). */
export async function blogIndexCards(locale: string): Promise<BlogCardData[]> {
  const cards = await Promise.all(BLOG_ARTICLES.map((e) => toCard(e, locale)));
  return cards.filter((c): c is BlogCardData => c !== null);
}

/** The N newest other articles (the "related" band on an article page). */
export async function blogRelated(
  locale: string,
  excludeId: string,
  n = 2,
): Promise<BlogCardData[]> {
  const others = BLOG_ARTICLES.filter((e) => e.id !== excludeId).slice(0, n);
  const cards = await Promise.all(others.map((e) => toCard(e, locale)));
  return cards.filter((c): c is BlogCardData => c !== null);
}
