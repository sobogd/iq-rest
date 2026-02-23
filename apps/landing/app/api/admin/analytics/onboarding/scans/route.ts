import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { isAdminEmail } from "@/lib/admin";
import { s3Client, getPublicUrl } from "@/lib/s3";
import { ListObjectsV2Command } from "@aws-sdk/client-s3";

interface ScanFile {
  url: string;
  name: string;
  size: number;
  lastModified: string;
  companyId: string;
}

export async function GET() {
  try {
    const cookieStore = await cookies();
    const userEmail = cookieStore.get("user_email")?.value;

    if (!userEmail || !isAdminEmail(userEmail)) {
      return NextResponse.json({ error: "Access denied" }, { status: 403 });
    }

    const prefix = "files/scan_onboarding/";
    const result = await s3Client.send(
      new ListObjectsV2Command({
        Bucket: process.env.S3_NAME!,
        Prefix: prefix,
        MaxKeys: 500,
      })
    );

    const files: ScanFile[] = (result.Contents || [])
      .filter((obj) => obj.Key && obj.Size && obj.Size > 0)
      .map((obj) => {
        const key = obj.Key!;
        // key = files/scan_onboarding/{companyId}/{timestamp}-{index}.{ext}
        const parts = key.replace(prefix, "").split("/");
        const companyId = parts[0] || "unknown";
        const name = parts.slice(1).join("/") || key;

        return {
          url: getPublicUrl(key),
          name,
          size: obj.Size!,
          lastModified: obj.LastModified?.toISOString() || "",
          companyId,
        };
      })
      .sort((a, b) => b.lastModified.localeCompare(a.lastModified));

    return NextResponse.json({ files });
  } catch (error) {
    console.error("Failed to list scan files:", error);
    return NextResponse.json({ error: "Failed to list files" }, { status: 500 });
  }
}
