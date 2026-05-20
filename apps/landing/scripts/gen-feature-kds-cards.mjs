// One-off: generate feature-kds-cards.webp via Gemini 3 Pro Image.
// One tablet on brass stand at restaurant bar counter.
//
//   node scripts/gen-feature-kds-cards.mjs
import { readFileSync, writeFileSync, existsSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import sharp from "sharp";

const __dirname = dirname(fileURLToPath(import.meta.url));
const repoRoot = join(__dirname, "..");
const envFile = join(repoRoot, ".env");

function readEnv(key) {
  if (process.env[key]) return process.env[key];
  if (!existsSync(envFile)) return undefined;
  const txt = readFileSync(envFile, "utf8");
  for (const line of txt.split(/\r?\n/)) {
    const m = line.match(/^([A-Z_][A-Z0-9_]*)=(.*)$/);
    if (m && m[1] === key) {
      let v = m[2].trim();
      if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) {
        v = v.slice(1, -1);
      }
      return v;
    }
  }
  return undefined;
}

const API_KEY = readEnv("GEMINI_API_KEY");
if (!API_KEY) {
  console.error("GEMINI_API_KEY missing");
  process.exit(1);
}

const SCREEN_PATH = "/Users/sobogd/Downloads/localhost_8129_en_dashboard_kitchen(iPad Mini) (1).png";
const OUT_PNG = join(repoRoot, "public", "landing", "feature-kds-cards.png");
const OUT_WEBP = join(repoRoot, "public", "landing", "feature-kds-cards.webp");

const screenB64 = readFileSync(SCREEN_PATH).toString("base64");

const PROMPT = `Cinematic, atmospheric, magazine-quality photograph for a restaurant SaaS landing page.

Scene: A premium restaurant bar — dark wood and brass bar counter, rows of bottles softly out of focus in the background lit by warm Edison bulbs, a single empty cocktail glass set aside, a small bowl of garnish. Warm golden-hour ambient light, moody cocktail-bar atmosphere.

Foreground: a modern tablet (iPad-like) standing on a small brass tablet stand on the bar counter, screen facing the camera and clearly visible. The tablet is the hero — large in frame, screen sharp and perfectly readable. Camera angle: 3/4 view at eye level with the tablet, the bar surface visible underneath.

The tablet's screen displays the reference image exactly: a dark KDS dashboard (Noir & Ember header, Menu / Bookings / Orders / Kitchen / Analytics / Settings nav, "Kitchen" selected, "Filters: Status / Category" row), with a Kanban-style board of order cards organized by table columns (Table 3 "Patio near by Bar", Table 5 "Near by Reception", Table 2 "A big table near the bar", Table 1). Order cards show status badges, dish names (Noir Burger, Tiramisú Noir, Croquetas de Jamón Ibérico, etc.), notes ("Notes: Sin pepinillos", "Notes: Doble bola de vainilla"), and elapsed time. Dark UI.

CRITICAL: order card status badge colors MUST be exactly:
- PENDING = SLATE GREY (muted grey dot/text)
- COOKING = AMBER / ORANGE (warm orange dot/text)
- READY = BLUE (sky/cobalt blue dot/text, NOT green)
- SERVED = EMERALD GREEN (NOT grey)
Do not invent other colors. Match these badge colors precisely on every visible card.

The screen content must match the reference image exactly — same English/Spanish text on cards, same dark dashboard UI. The tablet screen must be perfectly legible — order cards readable.

Atmosphere: warm cinematic light, brass accents, dark wood bar, soft bottle bokeh. NO people, NO hands, NO faces. Premium cocktail bar mood, after-hours feel.

Output: a single landscape photograph, ratio 4:3, high resolution. Tablet dominant in frame, screen clearly readable.`;

const body = {
  contents: [
    {
      parts: [
        { text: PROMPT },
        { inline_data: { mime_type: "image/png", data: screenB64 } },
      ],
    },
  ],
};

const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-pro-image-preview:generateContent?key=${API_KEY}`;

console.log("calling Gemini …");
const res = await fetch(url, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
});

if (!res.ok) {
  console.error("API error", res.status, await res.text());
  process.exit(1);
}

const json = await res.json();
const parts = json?.candidates?.[0]?.content?.parts ?? [];
const imagePart = parts.find((p) => p.inlineData || p.inline_data);
if (!imagePart) {
  console.error("no image", JSON.stringify(json, null, 2));
  process.exit(1);
}

const inline = imagePart.inlineData || imagePart.inline_data;
const png = Buffer.from(inline.data, "base64");
writeFileSync(OUT_PNG, png);
console.log("png saved →", OUT_PNG, png.length, "bytes");

await sharp(png).resize(1600, 1200, { fit: "cover" }).webp({ quality: 80 }).toFile(OUT_WEBP);
console.log("webp saved →", OUT_WEBP);
