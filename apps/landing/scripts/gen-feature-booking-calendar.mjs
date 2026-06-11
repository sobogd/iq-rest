// One-off: generate feature-booking-calendar.webp via Gemini 3 Pro Image.
// Two tablet screenshots — admin reservation calendar (day + month views)
// composed on a warm cafe table from above.
//
//   node scripts/gen-feature-booking-calendar.mjs
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

const A_PATH = "/Users/sobogd/Downloads/localhost_8129_es_dashboard_reservations(iPad Mini) (1).png";
const B_PATH = "/Users/sobogd/Downloads/localhost_8129_es_dashboard_reservations(iPad Mini).png";
const OUT_PNG = join(repoRoot, "public", "landing", "feature-booking-calendar.png");
const OUT_WEBP = join(repoRoot, "public", "landing", "feature-booking-calendar.webp");

const aB64 = readFileSync(A_PATH).toString("base64");
const bB64 = readFileSync(B_PATH).toString("base64");

const PROMPT = `Tight close-up, cinematic, magazine-quality photograph for a restaurant SaaS landing page.

Composition: TOP-DOWN angled shot (camera roughly 70° from the table plane, almost overhead but with a slight 3/4 perspective). TWO tablets fill MOST of the frame, both screens facing the camera with screens fully visible and readable. The wood table surface fills the background with subtle warm cafe atmosphere around the edges (soft bokeh from golden-hour side window).

Foreground: TWO modern tablets (iPad-like) laying flat (face-up) on a rustic wood cafe table, placed close together side by side with a small natural gap. NO hands, NO people, NO body parts visible.

1. LEFT tablet — screen displays the FIRST reference image exactly: a dark admin dashboard titled "Reservas" with "Día" tab selected, daily Gantt timeline view showing "Saturday, 30 May 2026" / "Tienes 5 reservas próximas." with table rows (Mesa 1–5) and colored reservation blocks across hourly slots (10:00–22:00). Block colors: green, orange, dark hatching for closed slots. Dark UI.
2. RIGHT tablet — screen displays the SECOND reference image exactly: a dark admin dashboard titled "Reservas" with "Mes" tab selected, monthly calendar view "May 2026" / "Tienes 94 reservas próximas.", showing a left column "Pendientes de Confirmación (13)" list of bookings (Pedro Oliveira, Fatima Ali, Ana Costa, Hiroshi Tanaka, etc.) and a full month grid with colored reservation chips on every day. Dark UI.

The screen contents on BOTH tablets must match the reference images exactly — same Spanish text, same reservation blocks, same colors, same dark dashboard UI. Screens must be perfectly legible.

Atmosphere: warm golden-hour light from off-frame side window. Wood texture clearly visible around devices, brass accents at the edges. Light, airy, warm, cinematic — same aesthetic as a high-end restaurant SaaS brand photo. No people's faces.

Output: a single landscape photograph, ratio 4:3, high resolution. Two tablets dominant in frame, both screens clearly readable.`;

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
