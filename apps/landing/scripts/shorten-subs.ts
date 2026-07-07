import * as fs from "fs";
import * as path from "path";
import { config } from "dotenv";

config({ path: path.join(process.cwd(), ".env") });

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

const HARD_MAX = 170;   // never exceed
const TARGET = 160;     // aim for this or below
const PROCESS_ABOVE = 170; // rewrite any sub longer than this

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

function esc(s: string): string {
  return s.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
}

async function rewrite(langName: string, feature: string, metaTitle: string, current: string, note: string): Promise<string | null> {
  const prompt = `You are an SEO copywriter for IQ Rest, a SaaS platform for restaurants (digital menu, kitchen display, table booking, order taking).

Rewrite the hero SUBHEADLINE (the supporting paragraph under the H1) of the "${feature}" feature landing page, written in ${langName}.

Current subheadline: "${current}"
Page SEO title (the ranking keyword lives here — keep that keyword phrase): "${metaTitle}"

STRICT REQUIREMENTS:
1. Language: ${langName}. Keep the same meaning and the key benefits/facts from the original — trim wording, do not drop the core value.
2. Length: at most ${HARD_MAX} characters, ideally ${TARGET} or fewer. Count every character including spaces.
3. SEO: keep the main keyword phrase from the SEO title present so ranking is not hurt.
4. Natural, benefit-driven tone for a restaurant owner. Keep "IQ Rest", "QR", "WhatsApp" unchanged if present.
${note}
Return ONLY JSON: {"sub": "..."}`;

  const response = await fetch(
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent",
    {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-goog-api-key": GEMINI_API_KEY! },
      body: JSON.stringify({
        contents: [{ role: "user", parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.4,
          maxOutputTokens: 800,
          responseMimeType: "application/json",
          thinkingConfig: { thinkingBudget: 0 },
        },
      }),
    }
  );
  if (!response.ok) throw new Error(`Gemini: ${await response.text()}`);
  const data = await response.json();
  const txt = data.candidates?.[0]?.content?.parts?.[0]?.text || "{}";
  const h = JSON.parse(txt).sub;
  return typeof h === "string" ? h.trim() : null;
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

async function main() {
  if (!GEMINI_API_KEY) { console.error("No GEMINI_API_KEY"); process.exit(1); }
  const appDir = "app";
  const files = walk(appDir).map((f) => path.relative(appDir, f));

  let done = 0, skipped = 0, failed = 0;
  for (const rel of files) {
    const full = path.join(appDir, rel);
    const src = fs.readFileSync(full, "utf8");
    const hi = src.indexOf("hero:");
    if (hi < 0) continue;
    const heroPart = src.slice(hi);
    const m = heroPart.match(/sub:\s*"((?:[^"\\]|\\.)*)"/);
    if (!m) continue;
    const current = m[1];
    if (current.length <= PROCESS_ABOVE) { skipped++; continue; }

    const loc = rel.split(path.sep)[0];
    const langName = LANGUAGES[loc];
    if (!langName) { console.error(`  ${rel}: unknown locale ${loc}`); failed++; continue; }
    const metaTitle = (src.match(/title:\s*"((?:[^"\\]|\\.)*)"/) || [])[1] || "";
    const feature = rel.split(path.sep)[1] || "feature";

    try {
      let out: string | null = null;
      let note = "";
      for (let attempt = 0; attempt < 3; attempt++) {
        const cand = await rewrite(langName, feature, metaTitle, current, note);
        if (cand && cand.length <= HARD_MAX) { out = cand; break; }
        note = `Your previous attempt was ${cand?.length} chars — TOO LONG. It MUST be ${TARGET} characters or fewer.`;
        await new Promise((r) => setTimeout(r, 400));
      }
      if (!out) { console.error(`  ${rel}: could not get <=${HARD_MAX} (kept ${current.length})`); failed++; continue; }

      const before = src.slice(0, hi);
      const after = heroPart.replace(/sub:\s*"(?:[^"\\]|\\.)*"/, `sub: "${esc(out)}"`);
      fs.writeFileSync(full, before + after, "utf8");
      console.log(`  ${rel}: ${current.length}→${out.length}`);
      done++;
    } catch (e) {
      console.error(`  ${rel}: ERROR`, (e as Error).message);
      failed++;
    }
    await new Promise((r) => setTimeout(r, 450));
  }
  console.log(`\nDone. rewritten=${done} skipped(<=${PROCESS_ABOVE})=${skipped} failed=${failed}`);
}

main().catch(console.error);
