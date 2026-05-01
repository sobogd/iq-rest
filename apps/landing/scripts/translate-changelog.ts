// Translate app/en/changelog/texts.ts → app/<locale>/changelog/texts.ts for every
// locale we ship. Source-of-truth = English. Target = TypeScript file matching the
// shape declared in app/_landing/changelog/types.ts.
//
// Usage:  npx tsx scripts/translate-changelog.ts             — translate all locales
//         npx tsx scripts/translate-changelog.ts es de fr    — only those locales
//
// Resilient to interruption: each locale writes its file independently, so partial
// runs are fine — re-run with the missing locales to fill gaps.

import * as fs from "fs";
import * as path from "path";
import { config } from "dotenv";

config({ path: path.join(process.cwd(), ".env") });

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
if (!GEMINI_API_KEY) {
  console.error("GEMINI_API_KEY missing from .env — aborting");
  process.exit(1);
}

const LANGUAGES: Record<string, { name: string; native: string }> = {
  ar: { name: "Arabic", native: "العربية" },
  bg: { name: "Bulgarian", native: "Български" },
  ca: { name: "Catalan", native: "Català" },
  cs: { name: "Czech", native: "Čeština" },
  da: { name: "Danish", native: "Dansk" },
  de: { name: "German", native: "Deutsch" },
  el: { name: "Greek", native: "Ελληνικά" },
  es: { name: "Spanish", native: "Español" },
  et: { name: "Estonian", native: "Eesti" },
  fa: { name: "Persian (Farsi)", native: "فارسی" },
  fi: { name: "Finnish", native: "Suomi" },
  fr: { name: "French", native: "Français" },
  ga: { name: "Irish", native: "Gaeilge" },
  hr: { name: "Croatian", native: "Hrvatski" },
  hu: { name: "Hungarian", native: "Magyar" },
  is: { name: "Icelandic", native: "Íslenska" },
  it: { name: "Italian", native: "Italiano" },
  ja: { name: "Japanese", native: "日本語" },
  ko: { name: "Korean", native: "한국어" },
  lt: { name: "Lithuanian", native: "Lietuvių" },
  lv: { name: "Latvian", native: "Latviešu" },
  nl: { name: "Dutch", native: "Nederlands" },
  no: { name: "Norwegian", native: "Norsk" },
  pl: { name: "Polish", native: "Polski" },
  pt: { name: "Portuguese", native: "Português" },
  ro: { name: "Romanian", native: "Română" },
  ru: { name: "Russian", native: "Русский" },
  sk: { name: "Slovak", native: "Slovenčina" },
  sl: { name: "Slovenian", native: "Slovenščina" },
  sr: { name: "Serbian", native: "Српски" },
  sv: { name: "Swedish", native: "Svenska" },
  tr: { name: "Turkish", native: "Türkçe" },
  uk: { name: "Ukrainian", native: "Українська" },
  zh: { name: "Chinese (Simplified)", native: "中文" },
};

async function translateJson<T extends Record<string, unknown>>(
  source: T,
  langName: string,
): Promise<T> {
  const prompt = `You are a professional translator for a restaurant QR menu SaaS platform called IQ Rest.

Translate the following JSON content from English to ${langName}.

CRITICAL RULES:
1. Keep ALL JSON keys exactly as they are. Do not translate keys.
2. Only translate string values.
3. Maintain natural ${langName} grammar and restaurant/hospitality terminology.
4. Keep brand name "IQ Rest" unchanged.
5. Keep technical terms like "QR", "URL", "API", "Stripe", "Google", "iOS", "WebP" unchanged.
6. Preserve HTML/Markdown if present, and all placeholders like {count}, {email}.
7. Preserve the structure exactly — same number of array items, same nesting.
8. Return ONLY valid JSON. No explanations, no markdown fences.

JSON to translate:
${JSON.stringify(source, null, 2)}`;

  const response = await fetch(
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent",
    {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-goog-api-key": GEMINI_API_KEY! },
      body: JSON.stringify({
        contents: [{ role: "user", parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.3,
          maxOutputTokens: 32000,
          responseMimeType: "application/json",
        },
      }),
    },
  );

  if (!response.ok) throw new Error(`Gemini error: ${await response.text()}`);
  const data = await response.json();
  const content = data.candidates?.[0]?.content?.parts?.[0]?.text || "{}";
  return JSON.parse(content);
}

// Translate one entry at a time — keeps each Gemini call inside the token budget
// and lets us recover from partial failures (one bad entry doesn't kill the locale).
async function translateChangelogTexts(source: any, langName: string): Promise<any> {
  const result = JSON.parse(JSON.stringify(source));

  // Top-level chrome (meta + page labels) — small, one shot
  const chrome = {
    meta: source.meta,
    pageTitle: source.pageTitle,
    pageSubtitle: source.pageSubtitle,
    readMore: source.readMore,
    backToList: source.backToList,
    publishedOn: source.publishedOn,
  };
  const translatedChrome = await translateJson(chrome, langName);
  Object.assign(result, translatedChrome);

  // Each entry — separate call
  result.entries = {};
  const entryIds = Object.keys(source.entries);
  for (let i = 0; i < entryIds.length; i++) {
    const id = entryIds[i];
    process.stdout.write(`    [${i + 1}/${entryIds.length}] ${id}... `);
    try {
      const entry = source.entries[id];
      // Skip empty stubs
      if (!entry.intro || entry.intro === entry.title) {
        result.entries[id] = entry;
        console.log("skip (stub)");
        continue;
      }
      result.entries[id] = await translateJson(entry, langName);
      console.log("ok");
    } catch (e: any) {
      console.log(`fail (${e.message?.slice(0, 60)})`);
      result.entries[id] = source.entries[id]; // fallback to EN
    }
    await new Promise((r) => setTimeout(r, 800)); // rate limit
  }

  return result;
}

function readSourceTexts(): any {
  // Read app/en/changelog/texts.ts and eval the CHANGELOG_TEXTS export.
  // Path-resolve via require — works because the file is plain TS/ESM.
  // For simplicity we strip imports + types and JSON.parse the remaining literal.
  const filePath = path.join(process.cwd(), "app/en/changelog/texts.ts");
  const raw = fs.readFileSync(filePath, "utf-8");

  // Naive but works for our shape: capture the object literal between
  // "CHANGELOG_TEXTS: ChangelogTexts = " and the closing "};\n"
  const match = raw.match(/CHANGELOG_TEXTS:\s*ChangelogTexts\s*=\s*({[\s\S]*?\n});\n/);
  if (!match) throw new Error("could not extract CHANGELOG_TEXTS literal from app/en/changelog/texts.ts");

  // Replace stub() calls with their inlined object so the literal is pure JSON-ish
  let literal = match[1].replace(/stub\(("([^"]+)")\)/g, (_m, _q, title) => {
    return JSON.stringify({
      meta: { title: `${title} | IQ Rest`, description: title },
      title,
      subtitle: title,
      intro: title,
      sections: [],
      benefitsTitle: "Benefits",
      benefits: [],
      conclusionTitle: title,
      conclusionBody: title,
      ctaText: "Try IQ Rest",
      ctaButton: "Start free trial",
    });
  });

  // Convert TS/JS object literal to JSON: unquote not needed because keys are quoted
  // and string values are quoted. Drop trailing commas.
  literal = literal.replace(/,(\s*[}\]])/g, "$1");

  // Use Function constructor — the literal is well-formed JS
  // eslint-disable-next-line @typescript-eslint/no-implied-eval
  return new Function(`return (${literal});`)();
}

function writeLocaleTexts(locale: string, translated: any): void {
  const dir = path.join(process.cwd(), "app", locale, "changelog");
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  const filePath = path.join(dir, "texts.ts");
  const content = `import type { ChangelogTexts } from "@/app/_landing/changelog/types";

export const CHANGELOG_TEXTS: ChangelogTexts = ${JSON.stringify(translated, null, 2)};
`;
  fs.writeFileSync(filePath, content, "utf-8");
  console.log(`  wrote ${filePath}`);
}

async function main() {
  const requested = process.argv.slice(2);
  const targets = requested.length ? requested : Object.keys(LANGUAGES);

  console.log(`Reading source from app/en/changelog/texts.ts...`);
  const source = readSourceTexts();
  console.log(`  ${Object.keys(source.entries).length} entries detected\n`);

  for (const locale of targets) {
    if (!LANGUAGES[locale]) {
      console.warn(`Skipping unknown locale ${locale}`);
      continue;
    }
    console.log(`\n${"═".repeat(60)}`);
    console.log(`  ${LANGUAGES[locale].name} (${locale}) ${LANGUAGES[locale].native}`);
    console.log(`${"═".repeat(60)}`);
    try {
      const translated = await translateChangelogTexts(source, LANGUAGES[locale].name);
      writeLocaleTexts(locale, translated);
    } catch (e: any) {
      console.error(`  FAILED: ${e.message}`);
    }
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
