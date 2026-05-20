// One-off: generate feature-design.webp via Gemini 3 Pro Image.
// Two phone screenshots (home with video bg + contacts page) on cafe table.
//
//   node scripts/gen-feature-design.mjs
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

const HOME_PATH = "/Users/sobogd/Downloads/love-eatery.iq-rest.com_(iPhone SE) (12).png";
const CONTACTS_PATH = "/Users/sobogd/Downloads/love-eatery.iq-rest.com_(iPhone SE) (11).png";
const OUT_PNG = join(repoRoot, "public", "landing", "feature-design.png");
const OUT_WEBP = join(repoRoot, "public", "landing", "feature-design.webp");

const homeB64 = readFileSync(HOME_PATH).toString("base64");
const contactsB64 = readFileSync(CONTACTS_PATH).toString("base64");

const PROMPT = `Tight close-up, cinematic, magazine-quality photograph for a restaurant SaaS landing page.

Composition: extreme close-up framing — TWO smartphones fill MOST of the frame so screens are clearly readable. Background warm cafe interior is heavily blurred bokeh. Camera angle: HIGH ELEVATED 3/4 perspective looking DOWN at the devices from above the table (around 50–60° above the table plane, almost top-down but not flat), both screens face the camera fully visible. Shallow depth-of-field that keeps both screens sharp.

Foreground: TWO modern smartphones laying flat (face-up) on a rustic wood cafe table, placed in a DIFFERENT arrangement than the typical side-by-side: one phone slightly angled / rotated, the other offset diagonally, with a small gap between them so the wood table grain shows in between. NO hands, NO people, NO body parts.

1. ONE phone — screen displays the FIRST reference image exactly: a brand splash screen with the title "Noir & Ember" / subtitle "Cocktail bar & cocina" over a moody cocktail-pouring video-still background, with menu buttons "Book a Table", "Contacts", "Language", and a black "ONLINE MENU" CTA at the bottom. Dark UI with image hero.
2. THE OTHER phone — screen displays the SECOND reference image exactly: a "Contacts" page with a Google Maps fragment showing a marker pin, plus circular social icons at the bottom (WhatsApp green, Instagram gradient, Google Maps, phone). Light/white UI.

The screen contents on BOTH phones must match the reference images exactly — same text, same colors, same UI. Screens must be perfectly legible.

Atmosphere: warm golden-hour light from off-frame side window. Wood textures, brass accents, very soft bokeh of a restaurant interior. Light, airy, warm, cinematic. No people's faces.

Output: a single landscape photograph, ratio 4:3, high resolution. Two phones dominant in frame in an interesting/non-parallel arrangement, screens clearly readable.`;

const body = {
  contents: [
    {
      parts: [
        { text: PROMPT },
        { inline_data: { mime_type: "image/png", data: homeB64 } },
        { inline_data: { mime_type: "image/png", data: contactsB64 } },
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
