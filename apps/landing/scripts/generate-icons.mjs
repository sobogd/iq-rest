import sharp from 'sharp';
import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDir = join(__dirname, '..', 'public');

const svgBuffer = readFileSync(join(publicDir, 'logo.svg'));

async function generateIcons() {
  console.log('Generating icons from logo.svg...');

  // Generate apple-icon.png (180x180)
  await sharp(svgBuffer)
    .resize(180, 180)
    .png()
    .toFile(join(publicDir, 'apple-icon.png'));
  console.log('Created: apple-icon.png (180x180)');

  // Generate favicon sizes
  const faviconSizes = [16, 32, 48];
  const faviconBuffers = await Promise.all(
    faviconSizes.map(size =>
      sharp(svgBuffer)
        .resize(size, size)
        .png()
        .toBuffer()
    )
  );

  // For favicon.ico, we'll create a 32x32 PNG and rename it
  // (browsers accept PNG as favicon)
  await sharp(svgBuffer)
    .resize(32, 32)
    .png()
    .toFile(join(publicDir, 'favicon.png'));
  console.log('Created: favicon.png (32x32)');

  // Also create icon-192.png and icon-512.png for PWA
  await sharp(svgBuffer)
    .resize(192, 192)
    .png()
    .toFile(join(publicDir, 'icon-192.png'));
  console.log('Created: icon-192.png (192x192)');

  await sharp(svgBuffer)
    .resize(512, 512)
    .png()
    .toFile(join(publicDir, 'icon-512.png'));
  console.log('Created: icon-512.png (512x512)');

  console.log('\nDone! Note: For favicon.ico, rename favicon.png to favicon.ico');
  console.log('Or use an online converter for proper ICO format with multiple sizes.');
}

generateIcons().catch(console.error);
