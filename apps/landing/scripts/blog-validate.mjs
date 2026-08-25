// Blog QA gate (mirror of i18n-validate.mjs for content/blog). Read-only, no
// LLM. For every manifest article, diffs each locale's JSON against the EN
// master: key parity, array lengths, block `type` equality, empty strings, and
// markdown-lite link-target equality ([label](route:/x) must keep the same
// target in every locale — labels translate, hrefs don't). Also validates the
// manifest itself. Run: node scripts/blog-validate.mjs
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.dirname(fileURLToPath(import.meta.url));
const BLOG = path.join(ROOT, "..", "content", "blog");

const LOCALES = [
  "en", "es", "de", "fr", "it", "pt", "nl", "pl", "ru", "uk",
  "sv", "da", "no", "fi", "cs", "el", "tr", "ro", "hu", "bg",
  "hr", "sk", "sl", "et", "lv", "lt", "sr", "ca", "ga", "is",
  "fa", "ar", "ja", "ko", "zh",
];

const linkTargets = (s) =>
  [...s.matchAll(/\[[^\]]+\]\(([^)\s]+)\)/g)].map((m) => m[1]).sort().join(",");

function diff(source, target, prefix = "") {
  const problems = [];
  if (Array.isArray(source)) {
    if (!Array.isArray(target)) return [`${prefix}: expected array`];
    if (source.length !== target.length)
      problems.push(`${prefix}: array length ${source.length} -> ${target.length}`);
    const n = Math.min(source.length, target.length);
    for (let i = 0; i < n; i++) problems.push(...diff(source[i], target[i], `${prefix}[${i}]`));
    return problems;
  }
  if (source !== null && typeof source === "object") {
    if (target === null || typeof target !== "object" || Array.isArray(target))
      return [`${prefix}: expected object`];
    for (const k of Object.keys(source)) {
      if (!(k in target)) { problems.push(`${prefix}.${k}: MISSING`); continue; }
      // Block `type` and cta `routeKey` are structural — must be IDENTICAL.
      if ((k === "type" || k === "routeKey") && source[k] !== target[k]) {
        problems.push(`${prefix}.${k}: "${source[k]}" -> "${target[k]}" (must not be translated)`);
        continue;
      }
      problems.push(...diff(source[k], target[k], `${prefix}.${k}`));
    }
    return problems;
  }
  if (typeof source === "string") {
    if (typeof target !== "string") return [`${prefix}: expected string`];
    // An intentionally empty EN string (e.g. a blank first table header) is
    // allowed to stay empty in translations.
    if (target.trim() === "" && source.trim() !== "") problems.push(`${prefix}: EMPTY`);
    if (linkTargets(source) !== linkTargets(target))
      problems.push(`${prefix}: link targets [${linkTargets(source)}] -> [${linkTargets(target)}]`);
  }
  return problems;
}

const manifest = JSON.parse(fs.readFileSync(path.join(BLOG, "manifest.json"), "utf8"));
let total = 0;

const fail = (msg) => { console.error(`✗ ${msg}`); total += 1; };

const seen = new Set();
for (const entry of manifest) {
  if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(entry.id ?? ""))
    fail(`manifest: bad id "${entry.id}" (kebab-case English slug expected)`);
  if (seen.has(entry.id)) fail(`manifest: duplicate id "${entry.id}"`);
  seen.add(entry.id);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(entry.date ?? "")) fail(`manifest[${entry.id}]: bad date "${entry.date}"`);
  if (entry.dateModified && !/^\d{4}-\d{2}-\d{2}$/.test(entry.dateModified))
    fail(`manifest[${entry.id}]: bad dateModified "${entry.dateModified}"`);

  const dir = path.join(BLOG, entry.id);
  const enPath = path.join(dir, "en.json");
  if (!fs.existsSync(enPath)) { fail(`${entry.id}: en.json missing`); continue; }
  const en = JSON.parse(fs.readFileSync(enPath, "utf8"));
  if (en.meta.title.length > 65) fail(`${entry.id}/en: meta.title ${en.meta.title.length} chars (>65)`);
  if (en.meta.description.length > 170) fail(`${entry.id}/en: meta.description ${en.meta.description.length} chars (>170)`);

  for (const locale of LOCALES) {
    if (locale === "en") continue;
    const p = path.join(dir, `${locale}.json`);
    if (!fs.existsSync(p)) { fail(`${entry.id}/${locale}.json: MISSING (falls back to EN in prod)`); continue; }
    let parsed;
    try { parsed = JSON.parse(fs.readFileSync(p, "utf8")); }
    catch (e) { fail(`${entry.id}/${locale}.json: invalid JSON (${e.message})`); continue; }
    for (const problem of diff(en, parsed, `${entry.id}/${locale}`)) fail(problem);
  }
}

// Orphan dirs (content on disk not listed in the manifest never builds).
for (const name of fs.readdirSync(BLOG)) {
  const full = path.join(BLOG, name);
  if (fs.statSync(full).isDirectory() && !seen.has(name))
    fail(`content/blog/${name}: directory not in manifest.json`);
}

if (total === 0) {
  console.log(`✓ blog OK — ${manifest.length} article(s) × ${LOCALES.length} locales`);
} else {
  console.error(`\n${total} problem(s).`);
  process.exit(1);
}
