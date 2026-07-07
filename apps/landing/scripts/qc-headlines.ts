import * as fs from "fs";
import * as path from "path";
import { config } from "dotenv";

config({ path: path.join(process.cwd(), ".env") });

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const HARD_MAX = 42;

const LANGUAGES: Record<string, string> = {
  "(en)": "English",
  ar: "Arabic", bg: "Bulgarian", ca: "Catalan", cs: "Czech", da: "Danish",
  de: "German", el: "Greek", es: "Spanish", et: "Estonian", fa: "Farsi",
  fi: "Finnish", fr: "French", ga: "Irish", hr: "Croatian", hu: "Hungarian",
  is: "Icelandic", it: "Italian", ja: "Japanese", ko: "Korean", lt: "Lithuanian",
  lv: "Latvian", nl: "Dutch", no: "Norwegian", pl: "Polish", pt: "Portuguese",
  ro: "Romanian", ru: "Russian", sk: "Slovak", sl: "Slovenian", sr: "Serbian",
  sv: "Swedish", tr: "Turkish", uk: "Ukrainian", zh: "Chinese",
};

function esc(s: string) { return s.replace(/\\/g, "\\\\").replace(/"/g, '\\"'); }

const PRODUCT = `IQ Rest is a platform that makes a physical restaurant fully DIGITAL: QR digital menu (35 languages), kitchen display (KDS), 24/7 table booking, and at-table order taking. It is NOT a food-delivery service and NOT an "online/virtual restaurant".`;

async function judge(langName: string, context: string, current: string, note: string) {
  const prompt = `You are a native ${langName} senior copywriter reviewing the H1 hero headline of a landing page.

PRODUCT CONTEXT: ${PRODUCT}
THIS PAGE (its SEO title + description give the exact topic): ${context}

Current H1 (in ${langName}): "${current}"

Judge the current H1 on: (a) correct, natural ${langName}; (b) it clearly conveys THIS page's topic and the product's real meaning to a restaurant owner; (c) it does NOT read as an "online/virtual restaurant" or delivery; (d) it is not vague or nonsensical after shortening.

If it is GOOD, return {"ok": true}.
If it has ANY problem, return {"ok": false, "issue": "<short reason>", "headline": "<a better H1 in ${langName}, MAX ${HARD_MAX} characters, preserving the meaning and clearly conveying the page topic + that it makes the restaurant digital>"}.
${note}
Return ONLY JSON.`;

  const r = await fetch(
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent",
    { method: "POST", headers: { "Content-Type": "application/json", "x-goog-api-key": GEMINI_API_KEY! },
      body: JSON.stringify({ contents: [{ role: "user", parts: [{ text: prompt }] }],
        generationConfig: { temperature: 0.3, maxOutputTokens: 500, responseMimeType: "application/json", thinkingConfig: { thinkingBudget: 0 } } }) });
  if (!r.ok) throw new Error(await r.text());
  const d = await r.json();
  return JSON.parse(d.candidates?.[0]?.content?.parts?.[0]?.text || "{}");
}

function walk(d: string): string[] {
  let r: string[] = [];
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name);
    if (e.isDirectory()) r = r.concat(walk(p));
    else if (e.name === "content.ts") r.push(p);
  }
  return r;
}

async function fixHeadline(langName: string, context: string, current: string): Promise<string | null> {
  let note = "";
  for (let i = 0; i < 3; i++) {
    const v = await judge(langName, context, current, note);
    if (v.ok === true) return null; // good, no change
    const h = typeof v.headline === "string" ? v.headline.trim() : "";
    if (h && h.length <= HARD_MAX) return h;
    note = `Your suggestion "${h}" was ${h.length} chars — MUST be <=${HARD_MAX}.`;
    await new Promise((r) => setTimeout(r, 300));
  }
  return null;
}

async function main() {
  if (!GEMINI_API_KEY) { console.error("No GEMINI_API_KEY"); process.exit(1); }
  const appDir = "app";

  // ── Feature headlines (content.ts: hero.headline) ──
  console.log("=== FEATURES ===");
  for (const rel of walk(appDir).map((f) => path.relative(appDir, f))) {
    const full = path.join(appDir, rel);
    const src = fs.readFileSync(full, "utf8");
    const hi = src.indexOf("hero:"); if (hi < 0) continue;
    const hero = src.slice(hi);
    const hm = hero.match(/headline:\s*"((?:[^"\\]|\\.)*)"/); if (!hm) continue;
    const current = hm[1];
    const loc = rel.split(path.sep)[0];
    const langName = LANGUAGES[loc]; if (!langName) continue;
    const metaTitle = (src.match(/title:\s*"((?:[^"\\]|\\.)*)"/) || [])[1] || "";
    const metaDesc = (src.match(/description:\s*"((?:[^"\\]|\\.)*)"/) || [])[1] || "";
    const context = `SEO title: "${metaTitle}". Description: "${metaDesc.slice(0, 200)}"`;
    try {
      const fixed = await fixHeadline(langName, context, current);
      if (fixed) {
        fs.writeFileSync(full, src.slice(0, hi) + hero.replace(/headline:\s*"(?:[^"\\]|\\.)*"/, `headline: "${esc(fixed)}"`), "utf8");
        console.log(`  FIX ${rel}: "${current}" -> "${fixed}"`);
      }
    } catch (e) { console.error(`  ERR ${rel}`, (e as Error).message); }
    await new Promise((r) => setTimeout(r, 350));
  }
  console.log("\nDone.");
}

main().catch(console.error);
