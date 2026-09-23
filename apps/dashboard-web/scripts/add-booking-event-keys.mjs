// One-off: add the booking "event dates" strings to src/locales/*.json.
//
// The generic scripts/translate-locales.ts is idempotent per TOP-LEVEL key, and
// `dashboard` already exists in every locale — so keys added deep inside
// dashboard.settings.bookings are invisible to it. This script translates just
// those keys (same Gemini model + prompt style) and merges them in, leaving
// every existing translation untouched.
//
// Usage (run from the repo root so that .env resolves):
//   node --env-file=.env apps/dashboard-web/scripts/add-booking-event-keys.mjs

import { readFileSync, writeFileSync, readdirSync } from "node:fs";
import { resolve } from "node:path";

const DIR = resolve(import.meta.dirname, "..", "src", "locales");
const NODE = ["dashboard", "settings", "bookings"];

// English source of truth for the new keys. `eventRemoveDate` is only used as an
// aria-label fallback, but it is translated everywhere anyway so screen readers
// don't switch to English mid-page.
const NEW_KEYS = {
  eventOnlyLabel: "Only specific dates (events)",
  eventOnlyTip: "Guests can book only the dates listed below. The weekly schedule is ignored while this is on.",
  eventScheduleIgnored: "Ignored while event dates are set.",
  eventAddDate: "Add date",
  eventRemoveDate: "Remove date",
  eventEmptyError: "Add at least one date.",
  eventDuplicateError: "The same date is listed twice.",
  eventInvalidError: "Each row needs a date and an end time after the start time.",
};

const LANGUAGE_NAMES = {
  es: "Spanish",
  de: "German", fr: "French", it: "Italian", pt: "Portuguese", nl: "Dutch",
  pl: "Polish", ru: "Russian", uk: "Ukrainian", sv: "Swedish", da: "Danish",
  no: "Norwegian Bokmål", fi: "Finnish", cs: "Czech", el: "Greek", tr: "Turkish",
  ro: "Romanian", hu: "Hungarian", bg: "Bulgarian", hr: "Croatian", sk: "Slovak",
  sl: "Slovenian", et: "Estonian", lv: "Latvian", lt: "Lithuanian", sr: "Serbian (Latin)",
  ca: "Catalan", ga: "Irish", is: "Icelandic", fa: "Persian (Farsi)", ar: "Arabic",
  ja: "Japanese", ko: "Korean", zh: "Simplified Chinese",
};

const SYSTEM_PROMPT = `
You are a professional translator localising the UI of "IQ Rest" — a SaaS
dashboard that lets restaurants and cafés build a QR-code menu, take
reservations, manage orders and analytics.

Translate the provided JSON values from English to {LANG}. RULES:

1. Return STRICT JSON with EXACTLY the same keys. Translate VALUES only.
2. Preserve every placeholder verbatim — e.g. "{min}". Never rename or reorder them.
3. Keep brand name "IQ Rest" untranslated.
4. UI labels must be SHORT and idiomatic; do not add explanatory clauses.
5. NEVER add commentary, NEVER add markdown code fences. Output raw JSON.
`.trim();

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  console.error("GEMINI_API_KEY is required (run with --env-file=.env)");
  process.exit(1);
}

const readJson = (file) => JSON.parse(readFileSync(resolve(DIR, file), "utf8"));
const writeJson = (file, data) => {
  writeFileSync(resolve(DIR, file), JSON.stringify(data, null, 2) + "\n", "utf8");
};

/** Locale code → the dashboard.settings.bookings object (created if absent). */
function bookingsNode(doc) {
  let node = doc;
  for (const key of NODE) {
    if (!node[key] || typeof node[key] !== "object") node[key] = {};
    node = node[key];
  }
  return node;
}

async function translate(langName, payload) {
  const res = await fetch(
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-pro:generateContent",
    {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-goog-api-key": apiKey },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: SYSTEM_PROMPT.replace("{LANG}", langName) }] },
        contents: [
          {
            role: "user",
            parts: [
              {
                text:
                  "Translate the values of this JSON object to " +
                  langName +
                  ". Return the same keys with translated values.\n\n" +
                  JSON.stringify(payload, null, 2),
              },
            ],
          },
        ],
        generationConfig: { temperature: 0.2, responseMimeType: "application/json" },
      }),
    },
  );
  if (!res.ok) throw new Error(`Gemini ${res.status}: ${(await res.text()).slice(0, 300)}`);
  const data = await res.json();
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) throw new Error("Gemini returned an empty response");
  return JSON.parse(text.trim().replace(/^```json\n?/, "").replace(/```$/, ""));
}

async function main() {
  const files = readdirSync(DIR).filter((f) => f.endsWith(".json")).sort();

  // English first — it is the source the other locales are translated from.
  const en = readJson("en.json");
  const enNode = bookingsNode(en);
  const missingInEn = Object.keys(NEW_KEYS).filter((k) => !(k in enNode));
  if (missingInEn.length) {
    for (const k of missingInEn) enNode[k] = NEW_KEYS[k];
    writeJson("en.json", en);
    console.log(`en.json: added ${missingInEn.length} key(s)`);
  } else {
    console.log("en.json: already up to date");
  }

  for (const file of files) {
    if (file === "en.json") continue;
    const lang = file.replace(/\.json$/, "");
    const langName = LANGUAGE_NAMES[lang];
    if (!langName) {
      console.warn(`${file}: no language name mapped — skipped`);
      continue;
    }
    const doc = readJson(file);
    const node = bookingsNode(doc);
    const missing = Object.fromEntries(
      Object.entries(NEW_KEYS).filter(([k]) => !(k in node)),
    );
    if (Object.keys(missing).length === 0) {
      console.log(`${lang}: up to date`);
      continue;
    }
    try {
      const out = await translate(langName, missing);
      // A malformed reply must never half-overwrite a locale file.
      const bad = Object.keys(missing).filter((k) => typeof out[k] !== "string" || !out[k].trim());
      if (bad.length) throw new Error(`bad values for ${bad.join(", ")}`);
      for (const [k, v] of Object.entries(missing)) node[k] = out[k];
      writeJson(file, doc);
      console.log(`${lang}: translated ${Object.keys(missing).length} key(s)`);
    } catch (e) {
      console.error(`${lang}: FAILED — ${e.message}`);
    }
  }
}

await main();
