import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { CopyObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { prisma } from "@/lib/prisma";
import { s3Client, s3Key, getPublicUrl, getKeyFromUrl } from "@/lib/s3";

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
    const key = getKeyFromUrl(tempUrl);
    if (!key) {
      return NextResponse.json({ error: "Invalid S3 URL" }, { status: 400 });
    }

    const tempPrefix = s3Key("temp", companyId);
    if (!key.startsWith(tempPrefix + "/")) {
      return NextResponse.json({ error: "Unauthorized access to file" }, { status: 403 });
    }

    // Generate new permanent key
    const filename = key.split("/").pop();
    const permanentKey = s3Key("items", companyId, filename!);

    // Copy to new location
    await s3Client.send(
      new CopyObjectCommand({
        Bucket: process.env.S3_NAME!,
        CopySource: `${process.env.S3_NAME}/${key}`,
        Key: permanentKey,
        ACL: "public-read",
      })
    );

    // Delete from temp
    await s3Client.send(
      new DeleteObjectCommand({
        Bucket: process.env.S3_NAME!,
        Key: key,
      })
    );

    const permanentUrl = getPublicUrl(permanentKey);

    return NextResponse.json({ url: permanentUrl }, { status: 200 });
  } catch (error) {
    console.error("Error moving file:", error);
    return NextResponse.json(
      { error: "Failed to move file" },
      { status: 500 }
    );
  }
}
