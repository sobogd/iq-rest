import sharp from "sharp";
import { readdirSync, mkdirSync, existsSync } from "fs";
import { join, dirname, parse } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const inputDir = join(__dirname, "..", "not_optimized");
const outputDir = join(__dirname, "..", "optimized");

const BORDER_RADIUS = 32;
const QUALITY = 80;

if (!existsSync(outputDir)) mkdirSync(outputDir, { recursive: true });

function roundedCornersSvg(w, h, r) {
  return Buffer.from(
    `<svg width="${w}" height="${h}"><rect x="0" y="0" width="${w}" height="${h}" rx="${r}" ry="${r}" fill="white"/></svg>`
  );
}

const files = readdirSync(inputDir).filter((f) =>
  /\.(png|jpe?g|webp|tiff?|avif|gif|bmp)$/i.test(f)
);

if (!files.length) {
  console.log("No images found in not_optimized/");
  process.exit(0);
}

console.log(`Processing ${files.length} image(s)...\n`);

for (const file of files) {
  const inputPath = join(inputDir, file);
  const { name } = parse(file);
  const outputPath = join(outputDir, `${name}.webp`);

  try {
    const meta = await sharp(inputPath).metadata();
    const w = meta.width;
    const h = meta.height;
    const r = Math.min(BORDER_RADIUS, Math.floor(Math.min(w, h) / 2));

    await sharp(inputPath)
      .composite([{ input: roundedCornersSvg(w, h, r), blend: "dest-in" }])
      .webp({ quality: QUALITY })
      .toFile(outputPath);

    const inputSize = (await sharp(inputPath).toBuffer()).length;
    const outputSize = (await sharp(outputPath).toBuffer()).length;
    const saved = ((1 - outputSize / inputSize) * 100).toFixed(0);

    console.log(`${file} → ${name}.webp  (${saved}% smaller)`);
  } catch (err) {
    console.error(`Error: ${file} — ${err.message}`);
  }
}

console.log("\nDone!");
