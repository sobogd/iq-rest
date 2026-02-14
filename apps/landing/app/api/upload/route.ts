import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { prisma } from "@/lib/prisma";
import sharp from "sharp";

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
    const isImage = imageTypes.includes(file.type);
    const isGif = file.type === "image/gif";

    // Convert file to buffer
    const arrayBuffer = await file.arrayBuffer();
    let buffer: Buffer = Buffer.from(arrayBuffer);

    // Generate unique filename
    const timestamp = Date.now();
    const randomStr = Math.random().toString(36).substring(2, 8);

    let extension: string;
    let contentType: string;

    // Convert images (except GIF) to WebP, resize to max 1500x1500, sharpen
    if (isImage && !isGif) {
      buffer = await sharp(buffer)
        .rotate() // Auto-rotate based on EXIF orientation
        .resize(1500, 1500, { fit: "inside", withoutEnlargement: true })
        .sharpen({ sigma: 0.8, m1: 0.8, m2: 0.4 })
        .webp({ quality: 90 })
        .toBuffer() as Buffer;
      extension = "webp";
      contentType = "image/webp";
    } else if (isVideo) {
      extension = file.type === "video/quicktime" ? "mov" : file.type.split("/")[1];
      contentType = file.type;
    } else {
      extension = file.name.split(".").pop()?.toLowerCase() || file.type.split("/")[1];
      contentType = file.type;
    }

    const filename = `temp/${companyId}/${timestamp}-${randomStr}.${extension}`;

    await s3Client.send(
      new PutObjectCommand({
        Bucket: process.env.S3_NAME!,
        Key: filename,
        Body: buffer,
        ContentType: contentType,
        ACL: "public-read",
      })
    );

    const fileUrl = `${process.env.S3_HOST}${filename}`;
    return NextResponse.json({ url: fileUrl }, { status: 200 });
  } catch (error) {
    console.error("Error uploading file:", error);
    return NextResponse.json(
      { error: "Failed to upload file" },
      { status: 500 }
    );
  }
}
