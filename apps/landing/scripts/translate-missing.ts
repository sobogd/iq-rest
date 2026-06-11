import * as fs from "fs";
import * as path from "path";
import { config } from "dotenv";

config({ path: path.join(process.cwd(), ".env") });

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

const LANGUAGES: Record<string, string> = {
  ar: "Arabic", bg: "Bulgarian", ca: "Catalan", cs: "Czech", da: "Danish",
  de: "German", el: "Greek", es: "Spanish", et: "Estonian", fa: "Farsi",
  fi: "Finnish", fr: "French", ga: "Irish", hr: "Croatian", hu: "Hungarian",
  is: "Icelandic", it: "Italian", ja: "Japanese", ko: "Korean", lt: "Lithuanian",
  lv: "Latvian", nl: "Dutch", no: "Norwegian", pl: "Polish", pt: "Portuguese",
  ro: "Romanian", ru: "Russian", sk: "Slovak", sl: "Slovenian", sr: "Serbian",
  sv: "Swedish", tr: "Turkish", uk: "Ukrainian", zh: "Chinese",
};

type JsonObj = Record<string, unknown>;

/** Recursively find keys in `source` missing from `target`, return the missing subtree */
function findMissing(source: JsonObj, target: JsonObj): JsonObj | null {
  const missing: JsonObj = {};
  let hasMissing = false;

  for (const key of Object.keys(source)) {
    if (!(key in target)) {
      missing[key] = source[key];
      hasMissing = true;
    } else if (
      typeof source[key] === "object" && source[key] !== null && !Array.isArray(source[key]) &&
      typeof target[key] === "object" && target[key] !== null && !Array.isArray(target[key])
    ) {
      const sub = findMissing(source[key] as JsonObj, target[key] as JsonObj);
      if (sub) {
        missing[key] = sub;
        hasMissing = true;
      }
    }
  }

  return hasMissing ? missing : null;
}

/** Deep merge: put translated values into target at matching paths */
function deepSet(target: JsonObj, translated: JsonObj): void {
  for (const key of Object.keys(translated)) {
    if (
      typeof translated[key] === "object" && translated[key] !== null && !Array.isArray(translated[key]) &&
      typeof target[key] === "object" && target[key] !== null && !Array.isArray(target[key])
    ) {
      deepSet(target[key] as JsonObj, translated[key] as JsonObj);
    } else {
      target[key] = translated[key];
    }
  }
}

async function translateChunk(chunk: JsonObj, langName: string): Promise<JsonObj> {
  const prompt = `You are a professional translator for a restaurant QR menu SaaS platform called IQ Rest.

Translate the following JSON content from English to ${langName}.

IMPORTANT RULES:
1. Keep ALL JSON keys exactly as they are (do not translate keys)
2. Only translate the string values
3. Maintain proper ${langName} grammar and natural phrasing
4. Use appropriate restaurant/culinary terminology
5. Keep brand name "IQ Rest" unchanged
6. Keep technical terms like "QR", "URL", "API", "WhatsApp" unchanged
7. Preserve all placeholders like {count}, {email}, {slug}, etc.
8. Return ONLY valid JSON, no explanations or markdown

JSON to translate:
${JSON.stringify(chunk, null, 2)}`;

  const response = await fetch(
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": GEMINI_API_KEY!,
      },
      body: JSON.stringify({
        contents: [{ role: "user", parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.3,
          maxOutputTokens: 16000,
          responseMimeType: "application/json",
        },
      }),
    }
  );

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Gemini API error: ${error}`);
  }

  const data = await response.json();
  const content = data.candidates?.[0]?.content?.parts?.[0]?.text || "{}";

  return JSON.parse(content);
}

async function main() {
  if (!GEMINI_API_KEY) {
    console.error("GEMINI_API_KEY is not set");
    process.exit(1);
  }

  const messagesDir = path.join(process.cwd(), "messages");
  const enPath = path.join(messagesDir, "en.json");
  const en = JSON.parse(fs.readFileSync(enPath, "utf-8"));

  const targetLangs = Object.keys(LANGUAGES);
  let totalMissing = 0;

  for (const lang of targetLangs) {
    const filePath = path.join(messagesDir, `${lang}.json`);
    if (!fs.existsSync(filePath)) {
      console.log(`  ${lang}.json not found, skipping`);
      continue;
    }

    const target = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    const missing = findMissing(en, target);

    if (!missing) {
      console.log(`  ${lang}: up to date`);
      continue;
    }

    const missingCount = JSON.stringify(missing).split('":"').length - 1;
    totalMissing += missingCount;
    console.log(`  ${lang}: ${missingCount} missing keys, translating...`);

    try {
      const translated = await translateChunk(missing, LANGUAGES[lang]);
      deepSet(target, translated);
      fs.writeFileSync(filePath, JSON.stringify(target, null, 2) + "\n", "utf-8");
      console.log(`  ${lang}: done`);
    } catch (error) {
      console.error(`  ${lang}: ERROR`, error);
      // Fallback: merge English values
      deepSet(target, missing);
      fs.writeFileSync(filePath, JSON.stringify(target, null, 2) + "\n", "utf-8");
      console.log(`  ${lang}: fallback to English`);
    }

    // Rate limit
    await new Promise((r) => setTimeout(r, 1000));
  }

  console.log(`\nDone! Translated ${totalMissing} missing keys across ${targetLangs.length} languages.`);

  // Process feature subdirectories
  const featureDirs = fs.readdirSync(messagesDir, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name);

  let totalFeatureMissing = 0;

  for (const featureDir of featureDirs) {
    const featureEnPath = path.join(messagesDir, featureDir, "en.json");
    if (!fs.existsSync(featureEnPath)) continue;

    console.log(`\nProcessing feature: ${featureDir}`);
    const featureEn = JSON.parse(fs.readFileSync(featureEnPath, "utf-8"));

    for (const lang of targetLangs) {
      const filePath = path.join(messagesDir, featureDir, `${lang}.json`);
      if (!fs.existsSync(filePath)) {
        console.log(`  ${lang}.json not found, skipping`);
        continue;
      }

      const target = JSON.parse(fs.readFileSync(filePath, "utf-8"));
      const missing = findMissing(featureEn, target);

      if (!missing) {
        console.log(`  ${lang}: up to date`);
        continue;
      }

      const missingCount = JSON.stringify(missing).split('":"').length - 1;
      totalFeatureMissing += missingCount;
      console.log(`  ${lang}: ${missingCount} missing keys, translating...`);

      try {
        const translated = await translateChunk(missing, LANGUAGES[lang]);
        deepSet(target, translated);
        fs.writeFileSync(filePath, JSON.stringify(target, null, 2) + "\n", "utf-8");
        console.log(`  ${lang}: done`);
      } catch (error) {
        console.error(`  ${lang}: ERROR`, error);
        deepSet(target, missing);
        fs.writeFileSync(filePath, JSON.stringify(target, null, 2) + "\n", "utf-8");
        console.log(`  ${lang}: fallback to English`);
      }

      await new Promise((r) => setTimeout(r, 1000));
    }
  }

  console.log(`\nFeature translations: ${totalFeatureMissing} missing keys across ${featureDirs.length} features.`);
}

main().catch(console.error);
