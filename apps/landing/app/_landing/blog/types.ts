// Blog content model. Every article is a per-locale JSON file at
// content/blog/<id>/<locale>.json (same block structure in every locale — only
// strings differ), listed in content/blog/manifest.json. The block union keeps
// layout decisions in code and text in JSON, so a translation can never break
// the markup. Inline strings support a markdown-lite syntax handled by
// inline.tsx: [label](route:/digital-menu) internal feature link,
// [label](blog:some-slug) cross-article link, [label](https://…) external
// link, **bold**.

export type BlogBlock =
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "p"; text: string }
  | { type: "list"; items: string[] }
  | { type: "steps"; items: string[] }
  | { type: "table"; headers: string[]; rows: string[][] }
  | { type: "tip"; text: string }
  | { type: "note"; text: string }
  | {
      type: "cta";
      heading: string;
      text: string;
      buttonLabel: string;
      /** Shared route key from locale-slug-overrides (e.g. "/digital-menu") —
       *  the button links to the feature page localized for the visitor. */
      routeKey: string;
    }
  | { type: "faq"; heading: string; items: { q: string; a: string }[] };

export type BlogArticleContent = {
  meta: {
    /** <title>, ≤60 chars, keyword first. */
    title: string;
    /** Meta description, ≤155 chars. */
    description: string;
  };
  /** Copy for the card on the blog index page. */
  card: {
    title: string;
    excerpt: string;
  };
  h1: string;
  intro: string;
  blocks: BlogBlock[];
};

export type BlogManifestEntry = {
  /** URL slug (English, shared across every locale) = content/blog/<id>/. */
  id: string;
  /** Publication date, YYYY-MM-DD. Drives ordering + datePublished. */
  date: string;
  /** Set ONLY on a real content revision (fake freshness hurts rankings). */
  dateModified?: string;
};
