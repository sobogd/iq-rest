import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import sharp from "sharp";
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

    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // Validate file type
    const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: "Invalid file type. Allowed: JPEG, PNG, WebP, GIF" },
        { status: 400 }
      );
    }

    // Convert file to buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Resize image to 500x500 with high quality
    const resizedBuffer = await sharp(buffer)
      .resize(500, 500, {
        fit: "cover",
        position: "center",
      })
      .webp({ quality: 90 })
      .toBuffer();

    // Generate unique filename in temp folder
    const timestamp = Date.now();
    const randomStr = Math.random().toString(36).substring(2, 8);
    const filename = `temp/${companyId}/${timestamp}-${randomStr}.webp`;

    // Upload to S3
    await s3Client.send(
      new PutObjectCommand({
        Bucket: process.env.S3_NAME!,
        Key: filename,
        Body: resizedBuffer,
        ContentType: "image/webp",
        ACL: "public-read",
      })
    );

    // Construct the URL
    const imageUrl = `${process.env.S3_HOST}${filename}`;

    return NextResponse.json({ url: imageUrl }, { status: 200 });
  } catch (error) {
    console.error("Error uploading file:", error);
    return NextResponse.json(
      { error: "Failed to upload file" },
      { status: 500 }
    );
  }
}
