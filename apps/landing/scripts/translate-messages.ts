import * as fs from "fs";
import * as path from "path";
import { config } from "dotenv";

// Load .env file
config({ path: path.join(process.cwd(), ".env") });

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

const LANGUAGES: Record<string, { name: string; native: string }> = {
  de: { name: "German", native: "Deutsch" },
  fr: { name: "French", native: "Français" },
  it: { name: "Italian", native: "Italiano" },
  pt: { name: "Portuguese", native: "Português" },
  nl: { name: "Dutch", native: "Nederlands" },
  pl: { name: "Polish", native: "Polski" },
  ru: { name: "Russian", native: "Русский" },
  uk: { name: "Ukrainian", native: "Українська" },
  sv: { name: "Swedish", native: "Svenska" },
  da: { name: "Danish", native: "Dansk" },
  no: { name: "Norwegian", native: "Norsk" },
  fi: { name: "Finnish", native: "Suomi" },
  cs: { name: "Czech", native: "Čeština" },
  el: { name: "Greek", native: "Ελληνικά" },
  tr: { name: "Turkish", native: "Türkçe" },
  ro: { name: "Romanian", native: "Română" },
  hu: { name: "Hungarian", native: "Magyar" },
  bg: { name: "Bulgarian", native: "Български" },
  hr: { name: "Croatian", native: "Hrvatski" },
  sk: { name: "Slovak", native: "Slovenčina" },
  sl: { name: "Slovenian", native: "Slovenščina" },
  et: { name: "Estonian", native: "Eesti" },
  lv: { name: "Latvian", native: "Latviešu" },
  lt: { name: "Lithuanian", native: "Lietuvių" },
  sr: { name: "Serbian", native: "Српски" },
  ca: { name: "Catalan", native: "Català" },
  ga: { name: "Irish", native: "Gaeilge" },
  is: { name: "Icelandic", native: "Íslenska" },
};

async function translateChunk(
  chunk: Record<string, unknown>,
  targetLang: string,
  langName: string
): Promise<Record<string, unknown>> {
  const prompt = `You are a professional translator for a restaurant QR menu SaaS platform called IQ Rest.

Translate the following JSON content from English to ${langName}.

IMPORTANT RULES:
1. Keep ALL JSON keys exactly as they are (do not translate keys)
2. Only translate the string values
3. Maintain proper ${langName} grammar and natural phrasing
4. Use appropriate restaurant/culinary terminology
5. Keep brand name "IQ Rest" unchanged
6. Keep technical terms like "QR", "URL", "API" unchanged
7. Preserve all placeholders like {count}, {email}, {slug}, etc.
8. Return ONLY valid JSON, no explanations or markdown

JSON to translate:
${JSON.stringify(chunk, null, 2)}`;

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.3,
      max_tokens: 16000,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`OpenAI API error: ${error}`);
  }

  const data = await response.json();
  const content = data.choices[0]?.message?.content || "{}";

  // Extract JSON from response (remove markdown if present)
  let jsonStr = content.trim();
  if (jsonStr.startsWith("```json")) {
    jsonStr = jsonStr.slice(7);
  }
  if (jsonStr.startsWith("```")) {
    jsonStr = jsonStr.slice(3);
  }
  if (jsonStr.endsWith("```")) {
    jsonStr = jsonStr.slice(0, -3);
  }

  const jsonMatch = jsonStr.match(/\{[\s\S]*\}/);
  if (!jsonMatch) {
    throw new Error("No valid JSON in response");
  }

  return JSON.parse(jsonMatch[0]);
}

function splitObject(
  obj: Record<string, unknown>,
  maxKeys: number = 5
): Record<string, unknown>[] {
  const keys = Object.keys(obj);
  const chunks: Record<string, unknown>[] = [];

  for (let i = 0; i < keys.length; i += maxKeys) {
    const chunkKeys = keys.slice(i, i + maxKeys);
    const chunk: Record<string, unknown> = {};
    for (const key of chunkKeys) {
      chunk[key] = obj[key];
    }
    chunks.push(chunk);
  }

  return chunks;
}

async function translateSection(
  section: Record<string, unknown>,
  targetLang: string,
  langName: string,
  sectionName: string
): Promise<Record<string, unknown>> {
  const sectionStr = JSON.stringify(section);

  // For small sections, translate directly
  if (sectionStr.length < 8000) {
    return await translateChunk(section, targetLang, langName);
  }

  // For large sections, split and translate
  console.log(`    Section ${sectionName} is large, splitting...`);
  const chunks = splitObject(section, 3);
  const translatedChunks: Record<string, unknown>[] = [];

  for (let i = 0; i < chunks.length; i++) {
    console.log(`    Chunk ${i + 1}/${chunks.length}...`);

    try {
      const translated = await translateChunk(chunks[i], targetLang, langName);
      translatedChunks.push(translated);
    } catch (error) {
      console.error(`    Error in chunk ${i + 1}:`, error);
      translatedChunks.push(chunks[i]); // Fallback to English
    }

    // Rate limiting
    await new Promise(resolve => setTimeout(resolve, 1000));
  }

  return Object.assign({}, ...translatedChunks);
}

async function translateFile(sourcePath: string, targetLang: string): Promise<void> {
  const langInfo = LANGUAGES[targetLang];
  if (!langInfo) {
    console.error(`Unknown language: ${targetLang}`);
    return;
  }

  console.log(`\n${"=".repeat(50)}`);
  console.log(`Translating to ${langInfo.name} (${targetLang})...`);
  console.log(`${"=".repeat(50)}`);

  const sourceContent = JSON.parse(fs.readFileSync(sourcePath, "utf-8"));
  const targetPath = path.join(path.dirname(sourcePath), `${targetLang}.json`);

  // Check if file already exists
  if (fs.existsSync(targetPath)) {
    console.log(`  ${targetLang}.json already exists, skipping...`);
    return;
  }

  const result: Record<string, unknown> = {};
  const topLevelKeys = Object.keys(sourceContent);

  for (let i = 0; i < topLevelKeys.length; i++) {
    const key = topLevelKeys[i];
    console.log(`  [${i + 1}/${topLevelKeys.length}] Translating: ${key}...`);

    try {
      const section = sourceContent[key];

      if (typeof section === "object" && section !== null) {
        result[key] = await translateSection(
          section as Record<string, unknown>,
          targetLang,
          langInfo.name,
          key
        );
      } else {
        result[key] = section;
      }

      // Save progress after each section
      fs.writeFileSync(targetPath + ".tmp", JSON.stringify(result, null, 2), "utf-8");

      // Rate limiting between sections
      await new Promise(resolve => setTimeout(resolve, 500));
    } catch (error) {
      console.error(`  Error translating ${key}:`, error);
      result[key] = sourceContent[key]; // Fallback to English
    }
  }

  // Write the final translated file
  fs.writeFileSync(targetPath, JSON.stringify(result, null, 2), "utf-8");

  // Remove temp file
  if (fs.existsSync(targetPath + ".tmp")) {
    fs.unlinkSync(targetPath + ".tmp");
  }

  console.log(`  Saved: ${targetPath}`);
}

async function main() {
  if (!OPENAI_API_KEY) {
    console.error("OPENAI_API_KEY environment variable is not set");
    process.exit(1);
  }

  const args = process.argv.slice(2);
  const messagesDir = path.join(process.cwd(), "messages");
  const sourcePath = path.join(messagesDir, "en.json");

  if (!fs.existsSync(sourcePath)) {
    console.error(`Source file not found: ${sourcePath}`);
    process.exit(1);
  }

  if (args.length === 0) {
    // Translate to all languages
    console.log("Translating to all European languages...");
    console.log(`Languages: ${Object.keys(LANGUAGES).join(", ")}`);

    for (const lang of Object.keys(LANGUAGES)) {
      await translateFile(sourcePath, lang);
    }
  } else {
    // Translate to specific languages
    for (const lang of args) {
      if (!LANGUAGES[lang]) {
        console.error(`Unknown language: ${lang}`);
        continue;
      }
      await translateFile(sourcePath, lang);
    }
  }

  console.log("\n" + "=".repeat(50));
  console.log("Translation complete!");
  console.log("=".repeat(50));
}

main().catch(console.error);
