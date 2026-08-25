// IndexNow ping for blog pages — tells Bing/Yandex/Seznam about new or updated
// URLs right after a deploy (the old sitemap-ping endpoints were retired in
// 2023; Google needs no ping — it reads the sitemap's <lastmod>).
//
// Usage (AFTER the landing deploy is live — engines fetch the URLs at once):
//   node scripts/blog-indexnow.mjs <article-id>     one article, all locales
//   node scripts/blog-indexnow.mjs --all            every article + the index
//
// The key file is public/<key>.txt (served from the site root), which is how
// IndexNow verifies ownership.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.dirname(fileURLToPath(import.meta.url));
const SITE = "https://iq-rest.com";
// The pre-existing site IndexNow key (public/<key>.txt).
const KEY = "d0492f26a56dbfa63b6c2ccdc731a888";

const LOCALES = [
  "en", "es", "de", "fr", "it", "pt", "nl", "pl", "ru", "uk",
  "sv", "da", "no", "fi", "cs", "el", "tr", "ro", "hu", "bg",
  "hr", "sk", "sl", "et", "lv", "lt", "sr", "ca", "ga", "is",
  "fa", "ar", "ja", "ko", "zh",
];

const localeUrl = (locale, p) => (locale === "en" ? `${SITE}${p}` : `${SITE}/${locale}${p}`);

const manifest = JSON.parse(
  fs.readFileSync(path.join(ROOT, "..", "content", "blog", "manifest.json"), "utf8"),
);

const arg = process.argv[2];
if (!arg) {
  console.error("Usage: node scripts/blog-indexnow.mjs <article-id> | --all");
  process.exit(1);
}

const ids = arg === "--all" ? manifest.map((e) => e.id) : [arg];
for (const id of ids) {
  if (!manifest.some((e) => e.id === id)) {
    console.error(`Unknown article id "${id}" (not in content/blog/manifest.json)`);
    process.exit(1);
  }
}

const urlList = [
  ...LOCALES.map((l) => localeUrl(l, "/blog")),
  ...ids.flatMap((id) => LOCALES.map((l) => localeUrl(l, `/blog/${id}`))),
];

const res = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({
    host: "iq-rest.com",
    key: KEY,
    keyLocation: `${SITE}/${KEY}.txt`,
    urlList,
  }),
});

// 200/202 = accepted. 403 = key file not reachable yet (deploy first).
console.log(`IndexNow: HTTP ${res.status} — submitted ${urlList.length} URLs (${ids.length} article(s) + index)`);
if (!res.ok && res.status !== 202) process.exit(1);
