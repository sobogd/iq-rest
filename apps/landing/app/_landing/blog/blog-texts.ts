import EN_TEXTS_JSON from "@/app/(en)/texts.json";
import type { BlogTexts } from "../types";
import type { LandingChrome } from "../lib/landing-chrome";

const EN_BLOG = (EN_TEXTS_JSON as { blog: BlogTexts }).blog;

/** Blog UI strings with the EN master as fallback (a locale whose texts.json
 *  hasn't gained the `blog` namespace yet still renders, in English). */
export function resolveBlogTexts(texts: Pick<LandingChrome, "blog">): BlogTexts {
  return texts.blog ?? EN_BLOG;
}

/** Localized long-form date for cards and the article header. */
export function formatBlogDate(iso: string, locale: string): string {
  return new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(`${iso}T00:00:00Z`));
}
