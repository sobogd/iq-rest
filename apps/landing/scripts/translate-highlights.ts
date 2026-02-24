import * as fs from "fs";
import * as path from "path";
import { config } from "dotenv";

config({ path: path.join(process.cwd(), ".env") });

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

const LANGUAGES: Record<string, string> = {
  ar: "Arabic", bg: "Bulgarian", ca: "Catalan", cs: "Czech", da: "Danish",
  de: "German", el: "Greek", es: "Spanish", et: "Estonian", fa: "Farsi",
  fi: "Finnish", fr: "French", ga: "Irish", hr: "Croatian", hu: "Hungarian",
  is: "Icelandic", it: "Italian", ja: "Japanese", ko: "Korean", lt: "Lithuanian",
  lv: "Latvian", nl: "Dutch", no: "Norwegian", pl: "Polish", pt: "Portuguese",
  ro: "Romanian", ru: "Russian", sk: "Slovak", sl: "Slovenian", sr: "Serbian",
  sv: "Swedish", tr: "Turkish", uk: "Ukrainian", zh: "Chinese",
};

async function translate(text: Record<string, unknown>, langName: string): Promise<Record<string, unknown>> {
  const prompt = `You are a professional translator for a restaurant QR menu SaaS platform called IQ Rest.

Translate the following JSON from English to ${langName}.

RULES:
1. Keep ALL JSON keys exactly as they are
2. Only translate string values
3. Keep "IQ Rest", "QR", "WhatsApp" unchanged
4. Preserve numbers like "30", "320"
5. Return ONLY valid JSON

JSON:
${JSON.stringify(text, null, 2)}`;

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.3,
      max_tokens: 4000,
    }),
  });

  if (!response.ok) throw new Error(`API error: ${await response.text()}`);
  const data = await response.json();
  let jsonStr = data.choices[0]?.message?.content?.trim() || "{}";
  if (jsonStr.startsWith("```json")) jsonStr = jsonStr.slice(7);
  if (jsonStr.startsWith("```")) jsonStr = jsonStr.slice(3);
  if (jsonStr.endsWith("```")) jsonStr = jsonStr.slice(0, -3);
  const match = jsonStr.match(/\{[\s\S]*\}/);
  if (!match) throw new Error("No JSON found");
  return JSON.parse(match[0]);
}

async function main() {
  if (!OPENAI_API_KEY) { console.error("No API key"); process.exit(1); }

  const messagesDir = path.join(process.cwd(), "messages");
  const en = JSON.parse(fs.readFileSync(path.join(messagesDir, "en.json"), "utf-8"));
  const enHighlights = {
    free: en.pricing.plans.free.highlights,
    basic: en.pricing.plans.basic.highlights,
    pro: en.pricing.plans.pro.highlights,
  };

  for (const lang of Object.keys(LANGUAGES)) {
    const filePath = path.join(messagesDir, `${lang}.json`);
    if (!fs.existsSync(filePath)) continue;

    const target = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    const currentFreeLen = target.pricing?.plans?.free?.highlights?.length || 0;
    const expectedFreeLen = enHighlights.free.length;

    if (currentFreeLen === expectedFreeLen) {
      console.log(`  ${lang}: highlights already up to date`);
      continue;
    }

    console.log(`  ${lang}: translating highlights (${currentFreeLen} -> ${expectedFreeLen})...`);

    try {
      const translated = await translate(enHighlights, LANGUAGES[lang]);
      target.pricing.plans.free.highlights = translated.free;
      target.pricing.plans.basic.highlights = translated.basic;
      target.pricing.plans.pro.highlights = translated.pro;
      fs.writeFileSync(filePath, JSON.stringify(target, null, 2) + "\n", "utf-8");
      console.log(`  ${lang}: done`);
    } catch (e) {
      console.error(`  ${lang}: ERROR`, e);
    }

    await new Promise((r) => setTimeout(r, 1000));
  }

  console.log("\nDone!");
}

main().catch(console.error);
