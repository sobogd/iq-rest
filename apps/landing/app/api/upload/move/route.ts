import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { S3Client, CopyObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { prisma } from "@/lib/prisma";

const s3Client = new S3Client({
  region: process.env.S3_REGION!,
  credentials: {
    accessKeyId: process.env.S3_KEY!,
    secretAccessKey: process.env.S3_TOKEN!,
  },
});

async function getUserCompanyId(): Promise<string | null> {
  const cookieStore = await cookies();
  const userEmail = cookieStore.get("user_email");

  if (!userEmail?.value) return null;

  const user = await prisma.user.findUnique({
    where: { email: userEmail.value },
    include: {
      companies: {
        include: { company: true },
        take: 1,
      },
    },
  });

  return user?.companies[0]?.company.id ?? null;
}

export async function POST(request: NextRequest) {
  try {
    const companyId = await getUserCompanyId();

    if (!companyId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { tempUrl } = await request.json();

    if (!tempUrl || typeof tempUrl !== "string") {
      return NextResponse.json({ error: "Invalid URL" }, { status: 400 });
    }

    // Extract the key from the URL
    const s3Host = process.env.S3_HOST!;
    if (!tempUrl.startsWith(s3Host)) {
      return NextResponse.json({ error: "Invalid S3 URL" }, { status: 400 });
    }

    const tempKey = tempUrl.replace(s3Host, "");

    // Verify it's a temp file for this company
    if (!tempKey.startsWith(`temp/${companyId}/`)) {
      return NextResponse.json({ error: "Unauthorized access to file" }, { status: 403 });
    }

    // Generate new permanent key
    const filename = tempKey.split("/").pop();
    const permanentKey = `items/${companyId}/${filename}`;

    // Copy to new location
    await s3Client.send(
      new CopyObjectCommand({
        Bucket: process.env.S3_NAME!,
        CopySource: `${process.env.S3_NAME}/${tempKey}`,
        Key: permanentKey,
        ACL: "public-read",
      })
    );

    // Delete from temp
    await s3Client.send(
      new DeleteObjectCommand({
        Bucket: process.env.S3_NAME!,
        Key: tempKey,
      })
    );

    const permanentUrl = `${s3Host}${permanentKey}`;

    return NextResponse.json({ url: permanentUrl }, { status: 200 });
  } catch (error) {
    console.error("Error moving file:", error);
    return NextResponse.json(
      { error: "Failed to move file" },
      { status: 500 }
    );
  }
}
