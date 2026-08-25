---
name: blog-article
description: Write a new IQ Rest landing blog article (EN master + all 34 translations), register it and validate. Use when the user asks for a new blog post/article ("сделай статью в блоге", "напиши статью про..."), typically a comparison, listicle, how-to or alternatives piece about digital menus, QR ordering, KDS, reservations or restaurant operations.
---

# IQ Rest blog article pipeline

The landing blog lives at `/{lang}/blog` (EN un-prefixed at `/blog`). Content =
per-locale JSON with a fixed block structure; layout is code, text is JSON, so
translations can never break markup. Everything below is relative to
`apps/landing/`.

## Architecture facts

- Article content: `content/blog/<id>/<locale>.json` — 35 files per article.
- Registry: `content/blog/manifest.json` — `{ id, date, dateModified? }`.
  Order in the file doesn't matter (code sorts by date desc). `dateModified`
  is set ONLY on a real later revision — never stamp it on creation.
- `id` = URL slug: **English, kebab-case, keyword-rich** (e.g.
  `digital-menu-vs-paper-menu`). Same slug for every locale — do NOT localize.
- Types / renderer: `app/_landing/blog/types.ts` (`BlogBlock` union),
  `blog-article-view.tsx`. If a new block type is truly needed, extend both +
  this skill; prefer existing blocks.
- Routes, sitemap, hreflang, JSON-LD (BlogPosting/Breadcrumb/FAQPage), footer
  link — all automatic once the manifest entry exists. No route files to touch.
- Locales (35): en, es, de, fr, it, pt, nl, pl, ru, uk, sv, da, no, fi, cs,
  el, tr, ro, hu, bg, hr, sk, sl, et, lv, lt, sr, ca, ga, is, fa, ar, ja, ko, zh.

## Article JSON shape

```json
{
  "meta": { "title": "≤60 chars, keyword first | IQ Rest", "description": "≤155 chars" },
  "card": { "title": "index-card heading", "excerpt": "1–2 sentences" },
  "h1": "on-page H1 (may differ slightly from meta.title)",
  "intro": "lead paragraph",
  "blocks": [ ... ]
}
```

Blocks: `h2`, `h3`, `p`, `list`, `steps` (items[]), `table` (headers[],
rows[][]), `tip`, `note`, `cta` (heading, text, buttonLabel, routeKey),
`faq` (heading, items[{q,a}] — becomes FAQPage JSON-LD).

Inline markdown-lite inside any string: `**bold**`,
`[label](route:/digital-menu)` feature link (route keys:
`/digital-menu`, `/order-taking`, `/bookings`, `/kitchen-display`,
`/menu-qr-code`, `/pricing`, `/help`), `[label](blog:other-slug)` cross-article
link, `[label](https://…)` external.

## Writing rules (EN master)

- Types that work: comparison (X vs Y, with a `table`), listicle ("7 ways…"),
  how-to (`steps`), alternatives ("X alternatives for restaurants").
- 700–1200 words. Practical, specific, numbers where possible. No hype; admit
  where the "competitor" option wins (honesty ranks and converts better).
- SEO checklist: keyword in meta.title (front), h1, intro and ≥1 h2;
  **≥2 internal links** to feature pages via `route:`; link older related
  articles via `blog:`; end with a `cta` block and a `faq` block (3–5 questions
  real people ask).
- Facts about IQ Rest you may use: from €9.90/month, 14-day free trial, no
  card required, scan-a-paper-menu import (~5 min setup), automatic menu
  translation, QR ordering + pay at table, KDS, 24/7 table reservations,
  no app install for guests.
- Never invent competitor pricing/features you aren't sure of — write around
  unknown specifics instead.

## Pipeline

1. **EN master**: write `content/blog/<id>/en.json`. Add
   `{ "id": "<id>", "date": "<today YYYY-MM-DD>" }` to
   `content/blog/manifest.json`.
2. **Translate to the other 34 locales** — in-session, NOT via any external
   MT script. Spawn ~6 parallel subagents, each owning 5–6 locales. Each agent
   reads `en.json` and writes `<locale>.json`: identical keys/structure/block
   order; translate ONLY string values; keep inline link TARGETS
   (`route:`/`blog:`/URLs) byte-identical (labels translate); keep `type`,
   `routeKey`, numbers, "IQ Rest", "QR", "KDS" as-is. meta.title/description
   are marketing copy — adapt, don't translate word-for-word, keep length
   limits. fa/ar are RTL — plain text, no direction marks needed.
3. **Validate**: `node scripts/blog-validate.mjs` (from `apps/landing/`) —
   key parity, block types, link targets, manifest sanity. Fix until clean.
4. **Typecheck**: `npm run typecheck` (repo root or apps/landing).
5. **Docs**: per repo rule, if anything structural changed under
   `apps/landing/`, update `apps/landing/docs/`. A content-only article needs
   no doc changes.
6. **Hand off** — do NOT push (owner pushes; every push deploys prod). Tell
   the owner: after the landing deploy is live, run
   `node scripts/blog-indexnow.mjs <id>` to ping Bing/Yandex via IndexNow
   (Google picks it up from the sitemap automatically).
