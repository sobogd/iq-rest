import * as fs from "fs";
import * as path from "path";
import { config } from "dotenv";

config({ path: path.join(process.cwd(), ".env") });

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const HARD_MAX = 42; // combined title + " " + titleAccent

// Locales whose title wrongly read as "online restaurant" (delivery/virtual) —
// reprocess regardless of length with the corrected framing below.
const FORCE = ["bg", "ca", "cs", "da", "fr", "hr", "it", "pl", "pt", "ru", "sk", "sr", "uk", "is"];

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

async function rewrite(langName: string, title: string, accent: string, note: string) {
  const prompt = `You are an SEO copywriter for IQ Rest, a SaaS platform for restaurants (digital menu, kitchen display, table booking, ordering).

Rewrite the homepage hero H1 in ${langName}. The H1 renders as two parts joined by a space: "title" + " " + "titleAccent" (the accent is the styled tail of the same sentence).

Current title: "${title}"
Current titleAccent: "${accent}"
Current full H1: "${(title + " " + accent).trim()}"

STRICT REQUIREMENTS:
1. Language: ${langName}. Core promise: take an EXISTING restaurant and make it fully DIGITAL (digital menu, kitchen display, bookings) in ~5 minutes.
2. DO NOT phrase it as an "online restaurant" / "restaurant online" / "virtual restaurant" — that wrongly implies a delivery-only or non-physical restaurant. Use the local word for "digital" (not "online"). Think "your restaurant, fully digital".
3. The FULL H1 (title + " " + titleAccent) must be AT MOST ${HARD_MAX} characters including spaces. Shorter is better.
4. Split into two parts: put the "in 5 minutes" time phrase in "titleAccent" (it renders on a SECOND line); the "restaurant + digital" idea in "title". Both parts non-empty.
5. Punchy marketing tone for a restaurant owner.
${note}
Return ONLY JSON: {"title": "...", "titleAccent": "..."}`;

  const r = await fetch(
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent",
    {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-goog-api-key": GEMINI_API_KEY! },
      body: JSON.stringify({
        contents: [{ role: "user", parts: [{ text: prompt }] }],
        generationConfig: { temperature: 0.4, maxOutputTokens: 400, responseMimeType: "application/json", thinkingConfig: { thinkingBudget: 0 } },
      }),
    }
  );
  if (!r.ok) throw new Error(await r.text());
  const d = await r.json();
  const j = JSON.parse(d.candidates?.[0]?.content?.parts?.[0]?.text || "{}");
  if (typeof j.title === "string" && typeof j.titleAccent === "string") {
    return { title: j.title.trim(), titleAccent: j.titleAccent.trim() };
  }
  return null;
}

async function main() {
  if (!GEMINI_API_KEY) { console.error("No GEMINI_API_KEY"); process.exit(1); }
  const appDir = "app";
  const dirs = fs.readdirSync(appDir).filter((d) => fs.existsSync(path.join(appDir, d, "cro.ts")));

  let done = 0, skipped = 0, failed = 0;
  for (const loc of dirs) {
    const full = path.join(appDir, loc, "cro.ts");
    const src = fs.readFileSync(full, "utf8");
    const hi = src.indexOf("hero:");
    const hero = src.slice(hi);
    const title = (hero.match(/title:\s*"((?:[^"\\]|\\.)*)"/) || [])[1] ?? "";
    const accent = (hero.match(/titleAccent:\s*"((?:[^"\\]|\\.)*)"/) || [])[1] ?? "";
    const fullLen = (title + " " + accent).trim().length;
    if (fullLen <= HARD_MAX && !FORCE.includes(loc)) { skipped++; continue; }

    const langName = LANGUAGES[loc];
    if (!langName) { console.error(`  ${loc}: unknown locale`); failed++; continue; }

    try {
      let out: { title: string; titleAccent: string } | null = null;
      let note = "";
      for (let i = 0; i < 3; i++) {
        const c = await rewrite(langName, title, accent, note);
        const len = c ? (c.title + " " + c.titleAccent).trim().length : 999;
        if (c && len <= HARD_MAX) { out = c; break; }
        note = `Your previous attempt "${c?.title} ${c?.titleAccent}" was ${len} chars — TOO LONG. The full H1 MUST be ${HARD_MAX} chars or fewer.`;
        await new Promise((r) => setTimeout(r, 400));
      }
      if (!out) { console.error(`  ${loc}: could not get <=${HARD_MAX} (kept ${fullLen})`); failed++; continue; }

      const before = src.slice(0, hi);
      let newHero = hero.replace(/title:\s*"(?:[^"\\]|\\.)*"/, `title: "${esc(out.title)}"`);
      newHero = newHero.replace(/titleAccent:\s*"(?:[^"\\]|\\.)*"/, `titleAccent: "${esc(out.titleAccent)}"`);
      fs.writeFileSync(full, before + newHero, "utf8");
      const nl = (out.title + " " + out.titleAccent).trim().length;
      console.log(`  ${loc}: ${fullLen}→${nl}  "${out.title} ${out.titleAccent}"`);
      done++;
    } catch (e) {
      console.error(`  ${loc}: ERROR`, (e as Error).message);
      failed++;
    }
    await new Promise((r) => setTimeout(r, 500));
  }
  console.log(`\nDone. rewritten=${done} skipped(<=${HARD_MAX})=${skipped} failed=${failed}`);
}

main().catch(console.error);
