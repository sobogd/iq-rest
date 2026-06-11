// One-off: generate feature-photos-optional.webp via Gemini 3 Pro Image.
// Two phone screenshots — menu with photo + menu without photos.
//
//   node scripts/gen-feature-photos-optional.mjs
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

const WITH_PHOTO_PATH = "/Users/sobogd/Downloads/love-eatery.iq-rest.com_(iPhone SE) (13).png";
const NO_PHOTO_PATH = "/Users/sobogd/Downloads/love-eatery.iq-rest.com_menu(iPhone SE).png";
const OUT_PNG = join(repoRoot, "public", "landing", "feature-photos-optional.png");
const OUT_WEBP = join(repoRoot, "public", "landing", "feature-photos-optional.webp");

const aB64 = readFileSync(WITH_PHOTO_PATH).toString("base64");
const bB64 = readFileSync(NO_PHOTO_PATH).toString("base64");

const PROMPT = `Tight close-up, cinematic, magazine-quality photograph for a restaurant SaaS landing page.

Composition: TOP-DOWN FLAT-LAY shot — camera directly overhead (90° / bird's-eye view), shooting straight down at the table. TWO smartphones fill MOST of the frame, both screens facing the camera perfectly parallel to the lens. NO perspective distortion — screens appear as clean rectangles. The wood table grain runs across the entire frame as the only background, with subtle warm light glow from one edge to hint at the cafe atmosphere. No cafe bokeh visible — just the table surface and the two phones.

Foreground: TWO modern smartphones laying flat (face-up) on a rustic wood cafe table, placed side by side close together at a slight angle. NO hands, NO people, NO body parts visible.

1. LEFT phone — screen displays the FIRST reference image exactly: a dark UI menu page titled "Online Menu" with tabs (Starters / Main Courses / Signature Cocktails), showing a large food photo of "Black Cod with Miso" in a bowl with chopsticks, allergen icons (Fish, Soybeans, Sesame, Gluten, Sulphites), description, "€32.00" and a black "+Add" button.
2. RIGHT phone — screen displays the SECOND reference image exactly: a light/white UI menu page titled "Menú Online" with tabs (Principales / Cócteles de Autor / Vinos), showing a TEXT-ONLY list of cocktails NO PHOTOS — items like "Old Fashioned Ahumado €13.00", "Negroni Negro €12.00", "Espresso Martini Noir €12.50", "Ember & Romero Sour €13.00", each with a short description and allergen icon. Premium typography, clean light layout, no images of cocktails.

The screen contents on BOTH phones must match the reference images exactly — same text, same colors, same UI. Screens must be perfectly legible.

Atmosphere: warm golden-hour light from off-frame side window. Wood textures, brass accents, very soft bokeh of a restaurant interior. Light, airy, warm, cinematic. No people's faces.

Output: a single landscape photograph, ratio 4:3, high resolution. Two phones dominant in frame, both screens clearly readable.`;

const body = {
  contents: [
    {
      parts: [
        { text: PROMPT },
        { inline_data: { mime_type: "image/png", data: aB64 } },
        { inline_data: { mime_type: "image/png", data: bB64 } },
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
