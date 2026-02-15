import { S3Client, CopyObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";

const FILES_PREFIX = "files";

// Singleton S3 client - created once per cold start
export const s3Client = new S3Client({
  region: process.env.S3_REGION!,
  endpoint: process.env.S3_HOST!,
  forcePathStyle: true,
  credentials: {
    accessKeyId: process.env.S3_KEY!,
    secretAccessKey: process.env.S3_TOKEN!,
  },
});

/** Build an S3 key with files/ prefix: s3Key("temp", "companyId", "file.webp") → "files/temp/companyId/file.webp" */
export function s3Key(...parts: string[]): string {
  return `${FILES_PREFIX}/${parts.join("/")}`;
}

/** Build a public URL for an S3 object key */
export function getPublicUrl(key: string): string {
  return `${process.env.S3_HOST}/${process.env.S3_NAME}/${key}`;
}

/** Extract S3 key from a public URL, or null if not matching */
export function getKeyFromUrl(url: string): string | null {
  const prefix = `${process.env.S3_HOST}/${process.env.S3_NAME}/`;
  if (url.startsWith(prefix)) {
    return url.slice(prefix.length);
  }
  return null;
}

export async function moveFromTemp(
  tempUrl: string,
  companyId: string,
  folder: string = "items"
): Promise<string | null> {
  const key = getKeyFromUrl(tempUrl);

  if (!key || !key.startsWith(`${FILES_PREFIX}/temp/${companyId}/`)) {
    return tempUrl;
  }

  try {
    const filename = key.split("/").pop();
    const permanentKey = s3Key(folder, companyId, filename!);

    await s3Client.send(
      new CopyObjectCommand({
        Bucket: process.env.S3_NAME!,
        CopySource: `${process.env.S3_NAME}/${key}`,
        Key: permanentKey,
        ACL: "public-read",
      })
    );

    await s3Client.send(
      new DeleteObjectCommand({
        Bucket: process.env.S3_NAME!,
        Key: key,
      })
    );

    return getPublicUrl(permanentKey);
  } catch (error) {
    console.error("Error moving file from temp:", error);
    return tempUrl;
  }
}
