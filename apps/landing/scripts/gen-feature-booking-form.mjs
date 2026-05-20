// One-off: generate feature-booking-form.webp via Gemini 3 Pro Image.
// Two phone screenshots — reservation form steps — on cafe table top-down.
//
//   node scripts/gen-feature-booking-form.mjs
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

const A_PATH = "/Users/sobogd/Downloads/love-eatery.iq-rest.com_(iPhone SE) (14).png";
const B_PATH = "/Users/sobogd/Downloads/love-eatery.iq-rest.com_(iPhone SE) (15).png";
const OUT_PNG = join(repoRoot, "public", "landing", "feature-booking-form.png");
const OUT_WEBP = join(repoRoot, "public", "landing", "feature-booking-form.webp");

const aB64 = readFileSync(A_PATH).toString("base64");
const bB64 = readFileSync(B_PATH).toString("base64");

const PROMPT = `Tight close-up, cinematic, magazine-quality photograph for a restaurant SaaS landing page.

Composition: TOP-DOWN angled shot (camera roughly 70° from the table plane, almost overhead but with a slight 3/4 perspective). TWO smartphones fill MOST of the frame, both screens facing the camera with screens fully visible and readable. The wood table surface fills the background with subtle warm cafe atmosphere around the edges (soft bokeh from golden-hour side window).

Foreground: TWO modern smartphones laying flat (face-up) on a rustic wood cafe table, placed close together with a small natural gap. NO hands, NO people, NO body parts visible.

1. LEFT phone — screen displays the FIRST reference image exactly: a Spanish reservation form titled "Reservar Mesa" with "Número de Comensales:" (1–12 buttons grid, "2" selected/black), then "Seleccionar Fecha:" with May 2026 calendar list (Mon 18, Tue 19, Wed 20 May selected/black, Thu 21). Light UI.
2. RIGHT phone — screen displays the SECOND reference image exactly: the next step of the SAME reservation form (still titled "Reservar Mesa"), with time slot grid (10:00–21:30, "18:00" selected/black), then "Seleccionar Mesa:" with two table cards "Una mesa junto a la ventana / 4 comensales" and "A big table near the bar / 10 comensales" (second selected/black), and a "Nombre:" input field. Light UI.

The screen contents on BOTH phones must match the reference images exactly — same Spanish text, same selections, same light UI. Screens must be perfectly legible.

Atmosphere: warm golden-hour light from off-frame side window. Wood texture clearly visible around devices, brass accents at the edges. Light, airy, warm, cinematic — same aesthetic as a high-end restaurant SaaS brand photo. No people's faces.

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
