import { S3Client, CopyObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";

// Singleton S3 client - created once per cold start
export const s3Client = new S3Client({
  region: process.env.S3_REGION!,
  credentials: {
    accessKeyId: process.env.S3_KEY!,
    secretAccessKey: process.env.S3_TOKEN!,
  },
});

export async function moveFromTemp(
  tempUrl: string,
  companyId: string,
  folder: string = "items"
): Promise<string | null> {
  const s3Host = process.env.S3_HOST!;

  // If not a temp URL, return as is
  if (!tempUrl || !tempUrl.startsWith(s3Host)) {
    return tempUrl;
  }

  const tempKey = tempUrl.replace(s3Host, "");

  // If not from temp folder, return as is
  if (!tempKey.startsWith(`temp/${companyId}/`)) {
    return tempUrl;
  }

  try {
    const filename = tempKey.split("/").pop();
    const permanentKey = `${folder}/${companyId}/${filename}`;

    await s3Client.send(
      new CopyObjectCommand({
        Bucket: process.env.S3_NAME!,
        CopySource: `${process.env.S3_NAME}/${tempKey}`,
        Key: permanentKey,
        ACL: "public-read",
      })
    );

    await s3Client.send(
      new DeleteObjectCommand({
        Bucket: process.env.S3_NAME!,
        Key: tempKey,
      })
    );

    return `${s3Host}${permanentKey}`;
  } catch (error) {
    console.error("Error moving file from temp:", error);
    return tempUrl;
  }
}
