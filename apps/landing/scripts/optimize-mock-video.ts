/**
 * Downloads the phone-mockup preview video from the external object
 * storage and transcodes it to small `webm` (vp9) + `mp4` (h264)
 * fallback that sit under `public/landing/`. The mockup displays at
 * ~150–220px wide on the landing trio, so 540p output is already 2× the
 * pixel budget; we trade resolution for filesize aggressively. Both
 * outputs land around 330 KB versus the 2.4 MB master.
 *
 * Run when the source loop changes:
 *   npx tsx scripts/optimize-mock-video.ts
 */
import { execFile } from "node:child_process";
import { promises as fs } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { promisify } from "node:util";
import ffmpegPath from "ffmpeg-static";

const execFileAsync = promisify(execFile);

const SRC_URL =
  "https://nbg1.your-objectstorage.com/sobogd/files/restaurants/cmi5yzq5v0000vx0hbjmbks82/1771406329199-k748qy.mp4";
const OUT_DIR = path.resolve(process.cwd(), "public/landing");
const OUT_WEBM = path.join(OUT_DIR, "mock-bg.webm");
const OUT_MP4 = path.join(OUT_DIR, "mock-bg.mp4");

async function download(url: string, dest: string): Promise<void> {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Download failed: ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  await fs.writeFile(dest, buf);
}

async function main(): Promise<void> {
  if (!ffmpegPath) throw new Error("ffmpeg-static did not provide a binary path");
  const ffmpeg = ffmpegPath;

  await fs.mkdir(OUT_DIR, { recursive: true });
  const src = path.join(tmpdir(), `mock-src-${Date.now()}.mp4`);
  console.log(`Downloading source → ${src}`);
  await download(SRC_URL, src);

  console.log("Encoding webm (vp9, 540p, ~220 kbps, no audio)");
  await execFileAsync(ffmpeg, [
    "-y", "-i", src,
    "-an",
    "-c:v", "libvpx-vp9",
    "-b:v", "220k",
    "-crf", "36",
    "-row-mt", "1",
    "-vf", "scale=540:-2",
    OUT_WEBM,
  ]);

  console.log("Encoding mp4 fallback (h264 main, 540p, crf 30, no audio)");
  await execFileAsync(ffmpeg, [
    "-y", "-i", src,
    "-an",
    "-c:v", "libx264",
    "-preset", "slow",
    "-crf", "30",
    "-profile:v", "main",
    "-movflags", "+faststart",
    "-vf", "scale=540:-2",
    OUT_MP4,
  ]);

  const [webmStat, mp4Stat] = await Promise.all([fs.stat(OUT_WEBM), fs.stat(OUT_MP4)]);
  console.log(`Done. webm=${(webmStat.size / 1024).toFixed(0)} KB, mp4=${(mp4Stat.size / 1024).toFixed(0)} KB`);
  await fs.unlink(src).catch(() => {});
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
