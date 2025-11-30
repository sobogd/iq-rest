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
    const imageTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];
    const videoTypes = ["video/mp4", "video/webm", "video/quicktime"];
    const allowedTypes = [...imageTypes, ...videoTypes];

    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: "Invalid file type. Allowed: JPEG, PNG, WebP, GIF, MP4, WebM, MOV" },
        { status: 400 }
      );
    }

    const isVideo = videoTypes.includes(file.type);

    // Convert file to buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Generate unique filename in temp folder
    const timestamp = Date.now();
    const randomStr = Math.random().toString(36).substring(2, 8);

    let finalBuffer: Buffer;
    let contentType: string;
    let extension: string;

    if (isVideo) {
      // For videos, upload as-is
      finalBuffer = buffer;
      contentType = file.type;
      extension = file.type === "video/quicktime" ? "mov" : file.type.split("/")[1];
    } else {
      // For images, resize and convert to webp
      finalBuffer = await sharp(buffer)
        .resize(450, 450, {
          fit: "cover",
          position: "center",
        })
        .webp({ quality: 98 })
        .toBuffer();
      contentType = "image/webp";
      extension = "webp";
    }

    const filename = `temp/${companyId}/${timestamp}-${randomStr}.${extension}`;

    // Upload to S3
    await s3Client.send(
      new PutObjectCommand({
        Bucket: process.env.S3_NAME!,
        Key: filename,
        Body: finalBuffer,
        ContentType: contentType,
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
