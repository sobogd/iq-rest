// Translates the 9 co-located JSON content files (texts/cro/5×content/pricing/
// about) from the EN master into every locale that only has scaffolded page.tsx
// today. One Gemini request per locale carries the full 9-file bundle so
// terminology stays consistent across a locale's pages, and the source text
// never passes through the calling agent's own context — this script writes
// straight to disk.
//
// Usage: node scripts/i18n-translate.mjs [locale...]   (default: all missing)
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.dirname(fileURLToPath(import.meta.url));
const APP = path.join(ROOT, "..", "app");
const SLUGS = JSON.parse(fs.readFileSync(path.join(ROOT, "i18n-slugs.json"), "utf8"));

const GEMINI_API_KEY = process.env.GEMINI_API_KEY || readEnvVar("GEMINI_API_KEY");
const MODEL = process.env.GEMINI_MODEL || "gemini-pro-latest";

function readEnvVar(name) {
  try {
    const envPath = path.join(ROOT, "..", "..", "..", ".env");
    const line = fs.readFileSync(envPath, "utf8").split("\n").find((l) => l.startsWith(`${name}=`));
    return line ? line.slice(name.length + 1).replace(/^"|"$/g, "") : undefined;
  } catch {
    return undefined;
  }
}

const LANGUAGES = {
  de: "German", nl: "Dutch", pl: "Polish", uk: "Ukrainian", sv: "Swedish",
  da: "Danish", no: "Norwegian (Bokmål)", fi: "Finnish", cs: "Czech", el: "Greek",
  tr: "Turkish", ro: "Romanian", hu: "Hungarian", bg: "Bulgarian", hr: "Croatian",
  sk: "Slovak", sl: "Slovenian", et: "Estonian", lv: "Latvian", lt: "Lithuanian",
  sr: "Serbian", ca: "Catalan", ga: "Irish", is: "Icelandic", fa: "Persian/Farsi",
  ar: "Arabic (Modern Standard)", ja: "Japanese", ko: "Korean", zh: "Simplified Chinese",
};

const ALL_TARGETS = Object.keys(LANGUAGES);
const requested = process.argv.slice(2);
const TARGETS = requested.length > 0 ? requested : ALL_TARGETS;

const BUNDLE_FILES = [
  { key: "texts", enPath: () => path.join(APP, "(en)", "texts.json"), targetPath: (l) => path.join(APP, l, "texts.json") },
  { key: "cro", enPath: () => path.join(APP, "(en)", "cro.json"), targetPath: (l) => path.join(APP, l, "cro.json") },
  { key: "digitalMenu", enPath: () => path.join(APP, "(en)", SLUGS["digital-menu"].en, "content.json"), targetPath: (l) => path.join(APP, l, SLUGS["digital-menu"][l], "content.json") },
  { key: "orderTaking", enPath: () => path.join(APP, "(en)", SLUGS["order-taking"].en, "content.json"), targetPath: (l) => path.join(APP, l, SLUGS["order-taking"][l], "content.json") },
  { key: "bookings", enPath: () => path.join(APP, "(en)", SLUGS["bookings"].en, "content.json"), targetPath: (l) => path.join(APP, l, SLUGS["bookings"][l], "content.json") },
  { key: "kitchenDisplay", enPath: () => path.join(APP, "(en)", SLUGS["kitchen-display"].en, "content.json"), targetPath: (l) => path.join(APP, l, SLUGS["kitchen-display"][l], "content.json") },
  { key: "menuQrCode", enPath: () => path.join(APP, "(en)", SLUGS["menu-qr-code"].en, "content.json"), targetPath: (l) => path.join(APP, l, SLUGS["menu-qr-code"][l], "content.json") },
  { key: "pricing", enPath: () => path.join(APP, "(en)", SLUGS["pricing"].en, "pricing.json"), targetPath: (l) => path.join(APP, l, SLUGS["pricing"][l], "pricing.json") },
  { key: "about", enPath: () => path.join(APP, "(en)", SLUGS["about"].en, "about.json"), targetPath: (l) => path.join(APP, l, SLUGS["about"][l] ?? "about", "about.json") },
];

function buildEnBundle() {
  const bundle = {};
  for (const f of BUNDLE_FILES) {
    bundle[f.key] = JSON.parse(fs.readFileSync(f.enPath(), "utf8"));
  }
  return bundle;
}

const BANNED_PHRASES = [
  "seamless", "seamlessly", "revolutionize", "elevate", "unlock", "unleash",
  "empower", "cutting-edge", "game-changer", "game changer", "effortless",
  "effortlessly", "next-level", "supercharge", "in today's fast-paced world",
  "whether you're", "at the end of the day", "dive into", "harness the power",
  "take it to the next level", "robust solution", "streamline your",
  "leverage our", "boost your", "skyrocket", "unparalleled", "trusted by",
  "delve into", "in the world of", "look no further", "when it comes to",
];

function buildPrompt(langName, bundle) {
  return `You are a senior native-speaking copywriter and localization expert for IQ Rest, a restaurant SaaS: digital QR menu + kitchen display system (KDS) + table booking + order taking, sold to restaurant owners.

Translate every string VALUE in the JSON object below from English into ${langName}, for the real local market (not a generic pan-regional translation) — use the phrasing, idiom and register a native ${langName}-speaking restaurateur would find natural, not a literal word-for-word rendering of the English sentence structure.

Hard rules:
1. Keep every JSON key exactly as-is (English key names), only translate string values.
2. Keep arrays/objects structure and item count identical to the source.
3. Preserve placeholders exactly as they appear: {count} {email} {amount} {percent} {price} {total} {year} etc.
4. Never translate: the brand name "IQ Rest", the acronyms "QR", "KDS", "API", "URL", "SEO", "SaaS", "WhatsApp", "SMS".
5. Write like an experienced human copywriter, not an AI assistant. NO AI-marketing-slop phrasing. Never use (or their ${langName} equivalents of): ${BANNED_PHRASES.join(", ")}.
6. No filler, no hype, no overly formal/corporate tone, no exclamation-mark stacking. Confident, concrete, benefit-first — matches how a real local restaurant-tech company writes.
7. Where ${langName} has a natural, commonly-used local term for a concept (e.g. how restaurants locally refer to "table booking" or "digital menu"), prefer that over a stiff calque of the English.
8. Numbers, currency symbols and HTML entities stay unchanged. Fields named "canonical", "slug" or "trackPrefix" are placeholders you can leave as-is — they are overwritten by code after translation, not read from your output.
9. Output ONLY a single valid JSON object with the exact same top-level keys as the input, no markdown fences, no commentary.

JSON to translate:
${JSON.stringify(bundle)}`;
}

async function callGemini(prompt) {
  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-goog-api-key": GEMINI_API_KEY },
      body: JSON.stringify({
        contents: [{ role: "user", parts: [{ text: prompt }] }],
        generationConfig: { temperature: 0.4, responseMimeType: "application/json" },
      }),
    },
  );
  if (!res.ok) throw new Error(`Gemini HTTP ${res.status}: ${(await res.text()).slice(0, 500)}`);
  const data = await res.json();
  const finishReason = data.candidates?.[0]?.finishReason;
  const text = data.candidates?.[0]?.content?.parts?.map((p) => p.text ?? "").join("") ?? "";
  if (!text) throw new Error(`Gemini empty response (finishReason=${finishReason}): ${JSON.stringify(data).slice(0, 500)}`);
  return JSON.parse(text);
}

// Recursive key-parity check: every key path in `source` must exist in `target`
// with the same type shape (object/array/primitive).
function diffKeys(source, target, pathPrefix = "") {
  const problems = [];
  if (Array.isArray(source)) {
    if (!Array.isArray(target)) { problems.push(`${pathPrefix}: expected array`); return problems; }
    if (source.length !== target.length) problems.push(`${pathPrefix}: array length ${source.length} → ${target.length}`);
    const n = Math.min(source.length, target.length);
    for (let i = 0; i < n; i++) problems.push(...diffKeys(source[i], target[i], `${pathPrefix}[${i}]`));
    return problems;
  }
  if (source !== null && typeof source === "object") {
    if (target === null || typeof target !== "object" || Array.isArray(target)) {
      problems.push(`${pathPrefix}: expected object`);
      return problems;
    }
    for (const k of Object.keys(source)) {
      if (!(k in target)) { problems.push(`${pathPrefix}.${k}: MISSING`); continue; }
      problems.push(...diffKeys(source[k], target[k], `${pathPrefix}.${k}`));
    }
    return problems;
  }
  // primitive: type must match (string source -> string target); placeholder check
  if (typeof source === "string") {
    if (typeof target !== "string") { problems.push(`${pathPrefix}: expected string`); return problems; }
    const srcPh = (source.match(/\{[a-zA-Z]+\}/g) || []).sort().join(",");
    const tgtPh = (target.match(/\{[a-zA-Z]+\}/g) || []).sort().join(",");
    if (srcPh !== tgtPh) problems.push(`${pathPrefix}: placeholder mismatch [${srcPh}] → [${tgtPh}]`);
  }
  return problems;
}

// Fields that LOOK like URLs/ids/slugs get silently left as the English literal
// by the model (an observed Gemini behavior, not a translation task) — these are
// deterministic from the known slug map anyway, so compute them here instead of
// trusting the LLM. Fixes: meta.canonical (SEO), content.slug (route-key lookup),
// content.trackPrefix (per-locale analytics attribution).
const SITE = "https://iq-rest.com";
const localePath = (locale, slug) => (locale === "en" ? `/${slug}` : `/${locale}/${slug}`);
const homeUrl = (locale) => (locale === "en" ? SITE : `${SITE}/${locale}`);

const CONTENT_ROUTE_OF_KEY = {
  digitalMenu: "digital-menu",
  orderTaking: "order-taking",
  bookings: "bookings",
  kitchenDisplay: "kitchen-display",
  menuQrCode: "menu-qr-code",
};

function fixDeterministicFields(bundle, enBundle, locale) {
  if (bundle.texts?.meta) bundle.texts.meta.canonical = homeUrl(locale);

  for (const [key, route] of Object.entries(CONTENT_ROUTE_OF_KEY)) {
    const slug = SLUGS[route][locale];
    const obj = bundle[key];
    if (!obj || !slug) continue;
    obj.slug = slug;
    obj.locale = locale;
    if (obj.meta) obj.meta.canonical = `${SITE}${localePath(locale, slug)}`;
    // Only the QR page's trackPrefix is locale-scoped (l_<locale>_qr); the other
    // four features use a fixed locale-independent prefix — keep the EN value.
    obj.trackPrefix = key === "menuQrCode" ? `l_${locale}_qr` : enBundle[key].trackPrefix;
  }

  const pricingSlug = SLUGS.pricing[locale];
  if (bundle.pricing?.meta && pricingSlug) bundle.pricing.meta.canonical = `${SITE}${localePath(locale, pricingSlug)}`;

  const aboutSlug = SLUGS.about[locale] ?? "about";
  if (bundle.about?.meta) bundle.about.meta.canonical = `${SITE}${localePath(locale, aboutSlug)}`;
}

async function translateLocale(locale, enBundle) {
  const langName = LANGUAGES[locale];
  console.log(`\n${locale} (${langName}): requesting…`);
  let translated;
  try {
    translated = await callGemini(buildPrompt(langName, enBundle));
  } catch (err) {
    console.error(`${locale}: Gemini call failed — ${err.message}`);
    return { locale, ok: false, error: String(err.message) };
  }

  const problems = diffKeys(enBundle, translated);
  if (problems.length > 0) {
    console.error(`${locale}: ${problems.length} structural problem(s):`);
    for (const p of problems.slice(0, 20)) console.error(`  ${p}`);
    return { locale, ok: false, error: "structure mismatch", problems };
  }

  fixDeterministicFields(translated, enBundle, locale);

  for (const f of BUNDLE_FILES) {
    const targetPath = f.targetPath(locale);
    fs.mkdirSync(path.dirname(targetPath), { recursive: true });
    fs.writeFileSync(targetPath, JSON.stringify(translated[f.key], null, 2) + "\n", "utf8");
  }
  console.log(`${locale}: OK — 9 files written.`);
  return { locale, ok: true };
}

async function main() {
  if (!GEMINI_API_KEY) {
    console.error("GEMINI_API_KEY not set (env or root .env).");
    process.exit(1);
  }
  const bad = TARGETS.filter((l) => !LANGUAGES[l]);
  if (bad.length) {
    console.error(`Unknown locale(s): ${bad.join(", ")}`);
    process.exit(1);
  }

  const enBundle = buildEnBundle();
  console.log(`Model: ${MODEL}`);
  console.log(`Targets: ${TARGETS.join(", ")}`);

  const CONCURRENCY = 4;
  const results = [];
  const queue = [...TARGETS];
  async function worker() {
    while (queue.length) {
      const locale = queue.shift();
      results.push(await translateLocale(locale, enBundle));
    }
  }
  await Promise.all(Array.from({ length: CONCURRENCY }, worker));

  const failed = results.filter((r) => !r.ok);
  console.log(`\nDone. ${results.length - failed.length}/${results.length} locales OK.`);
  if (failed.length) {
    console.log(`Failed: ${failed.map((r) => r.locale).join(", ")}`);
    process.exitCode = 1;
  }
}

main();
