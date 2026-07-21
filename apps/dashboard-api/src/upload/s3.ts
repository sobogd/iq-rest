import { S3Client, CopyObjectCommand } from "@aws-sdk/client-s3";

const host = process.env.S3_HOST!;
const region = process.env.S3_REGION!;
const accessKeyId = process.env.S3_KEY!;
const secretAccessKey = process.env.S3_TOKEN!;
const bucket = process.env.S3_NAME!;

export const s3Client = new S3Client({
  endpoint: host,
  region,
  credentials: { accessKeyId, secretAccessKey },
  forcePathStyle: true,
});

export const s3Bucket = bucket;

export function s3Key(...parts: string[]): string {
  return parts.filter(Boolean).join("/");
}

export function getPublicUrl(key: string): string {
  return `${host}/${bucket}/${key}`;
}

// Public URL prefix for objects we own. Used both to recognise our own images
// (so we only ever CopyObject inside our bucket — never fetch a stranger's URL)
// and to strip it back to a bare object key.
const publicPrefix = `${host}/${bucket}/`;

// Duplicate a menu image into a fresh key under the given restaurant's temp
// prefix and return the new public URL. Used when cloning a category / item so
// the copy owns its own S3 object instead of sharing the source's URL (deleting
// the original would otherwise blank the copy's image).
//
// - Only images already living in our own bucket are copied (server-side
//   CopyObject, no download). A URL that isn't ours (external/imported) is
//   returned untouched — we keep the reference rather than fail the clone.
// - On any S3 error we fall back to the original URL so the clone still shows
//   the image; a dangling copy is better than a broken clone.
export async function copyMenuImage(
  sourceUrl: string | null | undefined,
  restaurantId: string,
): Promise<string | null> {
  if (!sourceUrl) return null;
  if (!sourceUrl.startsWith(publicPrefix)) return sourceUrl;
  const sourceKey = sourceUrl.slice(publicPrefix.length);
  if (!sourceKey) return sourceUrl;
  const dot = sourceKey.lastIndexOf(".");
  const extension = dot >= 0 ? sourceKey.slice(dot + 1) : "webp";
  const timestamp = Date.now();
  const randomStr = Math.random().toString(36).substring(2, 8);
  const newKey = s3Key("temp", restaurantId, `${timestamp}-${randomStr}.${extension}`);
  try {
    await s3Client.send(
      new CopyObjectCommand({
        Bucket: bucket,
        // CopySource is `<bucket>/<key>`; encode so keys with odd chars survive.
        CopySource: encodeURI(`${bucket}/${sourceKey}`),
        Key: newKey,
        ACL: "public-read",
        MetadataDirective: "COPY",
        CacheControl: "public, max-age=31536000, immutable",
      }),
    );
    return getPublicUrl(newKey);
  } catch (err) {
    console.error("copyMenuImage failed, keeping source URL", err);
    return sourceUrl;
  }
}
