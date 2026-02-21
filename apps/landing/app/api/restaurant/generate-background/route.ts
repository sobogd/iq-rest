import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getUserCompanyId } from "@/lib/auth";
import { s3Client, s3Key, getPublicUrl } from "@/lib/s3";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { cookies } from "next/headers";
import { isAdminEmail } from "@/lib/admin";
import sharp from "sharp";

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

export async function POST() {
  try {
    const companyId = await getUserCompanyId();
    if (!companyId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Check plan: must be BASIC/PRO or admin
    const cookieStore = await cookies();
    const userEmail = cookieStore.get("user_email")?.value;
    const admin = isAdminEmail(userEmail);

    const [company, restaurant] = await Promise.all([
      prisma.company.findUnique({
        where: { id: companyId },
        select: { plan: true, subscriptionStatus: true },
      }),
      prisma.restaurant.findFirst({
        where: { companyId },
        select: { id: true, imageGenerationsUsed: true, imageStylizationsUsed: true },
      }),
    ]);

    if (!company || !restaurant) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    const isActive = company.subscriptionStatus === "ACTIVE";
    const isPro = admin || (isActive && company.plan === "PRO");
    const isBasic = isActive && company.plan === "BASIC";

    if (!isPro && !isBasic) {
      return NextResponse.json({ error: "Subscription required" }, { status: 403 });
    }

    const BASIC_MONTHLY_LIMIT = 35;
    if (isBasic) {
      const totalUsed = restaurant.imageGenerationsUsed + restaurant.imageStylizationsUsed;
      if (totalUsed >= BASIC_MONTHLY_LIMIT) {
        return NextResponse.json({ error: "limit_reached" }, { status: 403 });
      }
    }

    if (!OPENAI_API_KEY) {
      return NextResponse.json({ error: "OpenAI API key not configured" }, { status: 500 });
    }

    // Get menu items for the prompt
    const items = await prisma.item.findMany({
      where: { companyId, isActive: true },
      select: { name: true },
      take: 6,
    });

    if (items.length === 0) {
      return NextResponse.json({ error: "No menu items to generate background from" }, { status: 400 });
    }

    const sampleItems = items.map((i) => i.name).join(", ");

    const prompt = [
      "Top-down flat lay photograph on an elegant dark dining table.",
      `ONLY these items are on the table, nothing else: ${sampleItems}.`,
      "Style: restaurant cuisine. Each item in its own plate/glass/bowl, beautifully arranged.",
      "Bird's eye view, looking straight down at the table.",
      "Spread across the table with space between them. Elegant plating.",
      "Soft, warm, slightly dim lighting. Rich but muted tones.",
      "Dark moody atmosphere — the table surface should be dark so white text is readable on top.",
      "Do NOT add any items that are not in the list above. No extra food, no desserts, no drinks unless listed.",
      "No people, no hands, no text, no words, no letters, no numbers, no logos, no watermarks, no labels, no signs.",
      "Professional food photography. Vertical portrait (9:16).",
    ].join("\n");

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 50_000);

    const openaiRes = await fetch("https://api.openai.com/v1/images/generations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-image-1",
        prompt,
        n: 1,
        size: "1024x1536",
        quality: "low",
      }),
      signal: controller.signal,
    });

    clearTimeout(timeout);

    if (!openaiRes.ok) {
      console.error("OpenAI background error:", await openaiRes.text());
      return NextResponse.json({ error: "Failed to generate background" }, { status: 500 });
    }

    const openaiData = await openaiRes.json();
    const b64 = openaiData.data?.[0]?.b64_json;
    if (!b64) {
      return NextResponse.json({ error: "No image data returned" }, { status: 500 });
    }

    // Process with sharp: resize to mobile wallpaper + convert to WebP
    const rawBuffer = Buffer.from(b64, "base64");
    const buffer = await sharp(rawBuffer)
      .resize(1080, 1920, { fit: "cover" })
      .webp({ quality: 85 })
      .toBuffer();

    // Upload to S3
    const timestamp = Date.now();
    const randomStr = Math.random().toString(36).substring(2, 8);
    const key = s3Key("restaurants", companyId, `bg-${timestamp}-${randomStr}.webp`);

    await s3Client.send(
      new PutObjectCommand({
        Bucket: process.env.S3_NAME!,
        Key: key,
        Body: buffer,
        ContentType: "image/webp",
        ACL: "public-read",
      })
    );

    const url = getPublicUrl(key);

    // Track usage for BASIC subscribers
    if (isBasic) {
      await prisma.restaurant.update({
        where: { id: restaurant.id },
        data: { imageGenerationsUsed: { increment: 1 } },
      });
    }

    return NextResponse.json({ url });
  } catch (error) {
    console.error("Generate background error:", error);
    return NextResponse.json({ error: "Failed to generate background" }, { status: 500 });
  }
}
