// One-off: generate feature-allergens.webp via Gemini 2.5 Flash Image.
// Uses two reference screenshots (phone allergen filter + tablet allergen
// editor) and a cinematic-cafe prompt to compose a warm, atmospheric scene
// matching the existing /public/landing/feature-*.webp style.
//
//   node scripts/gen-feature-allergens.mjs
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
  console.error("GEMINI_API_KEY missing in env / .env");
  process.exit(1);
}

const PHONE_PATH = "/Users/sobogd/Downloads/love-eatery.iq-rest.com_(iPhone SE) (3).png";
const TABLET_PATH = "/Users/sobogd/Downloads/dashboard.iq-rest.com_es_dashboard_items_cmoyja8p50003yf5eeicucrrl_edit(iPad Mini).png";
const OUT_PNG = join(repoRoot, "public", "landing", "feature-allergens.png");
const OUT_WEBP = join(repoRoot, "public", "landing", "feature-allergens.webp");

const phoneB64 = readFileSync(PHONE_PATH).toString("base64");
const tabletB64 = readFileSync(TABLET_PATH).toString("base64");

const PROMPT = `Tight close-up, cinematic, magazine-quality photograph for a restaurant SaaS landing page.

Composition: extreme close-up framing — the smartphone and tablet fill MOST of the frame so the screens are clearly readable. Background warm cafe interior is heavily blurred bokeh, only as soft atmosphere. Camera angle: ELEVATED 3/4 perspective looking slightly DOWN at the devices (around 30–40° above the table plane), so the phone screen is clearly visible from above rather than edge-on. Both screens face the camera. Shallow depth-of-field that keeps both screens sharp.

Foreground devices on a rustic wood table, placed close together. NO hands, NO people, NO body parts in frame — just the two devices laying naturally on the wood surface:
1. A modern smartphone laying flat (face-up) on the wood table so the entire screen is visible to the elevated camera, screen fully visible and sharp, occupying ~30% of frame width, displaying the FIRST reference image exactly (a restaurant menu in Spanish: "Steak Tartar de Buey" with allergen icons Huevos / Gluten / Mostaza / Sulfitos and price €18.50, dark UI).
2. A tablet on a small brass stand next to the phone, slightly tilted, screen fully visible and sharp, occupying ~50% of frame width, displaying the SECOND reference image exactly (dark dashboard admin view: "Alérgenos" toggle section with chip selectors).

The screen contents on BOTH devices must match the reference images exactly — same Spanish text, same allergen chips, same dark UI. Screens must be perfectly legible.

Atmosphere: warm golden-hour light from off-frame side window. Wood textures, brass accents, very soft bokeh. No people's faces. Light, airy, warm, cinematic — same aesthetic as a high-end restaurant SaaS brand photo.

Output: a single landscape photograph, ratio 4:3, high resolution. Devices dominant in frame, screens clearly readable.`;

const body = {
  contents: [
    {
      parts: [
        { text: PROMPT },
        { inline_data: { mime_type: "image/png", data: phoneB64 } },
        { inline_data: { mime_type: "image/png", data: tabletB64 } },
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
  const t = await res.text();
  console.error("API error", res.status, t);
  process.exit(1);
}

const json = await res.json();
const parts = json?.candidates?.[0]?.content?.parts ?? [];
const imagePart = parts.find((p) => p.inlineData || p.inline_data);
if (!imagePart) {
  console.error("no image in response:");
  console.error(JSON.stringify(json, null, 2));
  process.exit(1);
}

const inline = imagePart.inlineData || imagePart.inline_data;
const png = Buffer.from(inline.data, "base64");
writeFileSync(OUT_PNG, png);
console.log("png saved →", OUT_PNG, png.length, "bytes");

await sharp(png)
  .resize(1600, 1200, { fit: "cover" })
  .webp({ quality: 80 })
  .toFile(OUT_WEBP);
console.log("webp saved →", OUT_WEBP);
