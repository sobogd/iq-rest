import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getUserCompanyId } from "@/lib/auth";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { prisma } from "@/lib/prisma";
import { s3Client, s3Key, getPublicUrl } from "@/lib/s3";
import { isAdminEmail } from "@/lib/admin";
import sharp from "sharp";

export const maxDuration = 60;

export async function POST(request: NextRequest) {
  try {
    const companyId = await getUserCompanyId();
    if (!companyId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Check plan and free generations (same pattern as /api/translate)
    const [company, restaurant] = await Promise.all([
      prisma.company.findUnique({
        where: { id: companyId },
        select: { plan: true, subscriptionStatus: true },
      }),
      prisma.restaurant.findFirst({
        where: { companyId },
        select: { id: true, freeImageGenerationsLeft: true },
      }),
    ]);

    if (!company || !restaurant) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    const cookieStore = await cookies();
    const userEmail = cookieStore.get("user_email")?.value;
    const isUnlimited = isAdminEmail(userEmail);

    const isPaidSubscriber =
      isUnlimited || (company.subscriptionStatus === "ACTIVE" && company.plan !== "FREE");

    if (!isPaidSubscriber && restaurant.freeImageGenerationsLeft <= 0) {
      return NextResponse.json({ error: "limit_reached" }, { status: 403 });
    }

    const body = await request.json();
    const { name, description, categoryName, accentColor, sourceImageUrl } = body as {
      name: string;
      description?: string;
      categoryName?: string;
      accentColor?: string;
      sourceImageUrl?: string;
    };

    if (!name?.trim()) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }

    const categoryLine = categoryName?.trim() ? `Category: ${categoryName.trim()}.` : "";
    const descLine = description?.trim() ? `${description.trim()}.` : "";

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 55_000);

    let b64: string | undefined;

    if (sourceImageUrl) {
      // Change background: keep food exactly as-is, replace only the background
      const imgRes = await fetch(sourceImageUrl, { cache: "no-store" });
      if (!imgRes.ok) {
        clearTimeout(timeout);
        return NextResponse.json({ error: "Failed to fetch source image" }, { status: 400 });
      }
      const imgBuffer = Buffer.from(await imgRes.arrayBuffer());
      // Convert to PNG for OpenAI edits endpoint
      const pngBuffer = await sharp(imgBuffer)
        .resize(1024, 1024, { fit: "contain", background: { r: 255, g: 255, b: 255, alpha: 0 } })
        .png()
        .toBuffer();

      const bgColorLine = accentColor
        ? `Use accent color ${accentColor} subtly in the surface or surroundings (napkin, surface tint, decorative element).`
        : "";

      const prompt = [
        "CRITICAL: Do NOT alter, redraw, or modify the food, dish, plate, or bowl in ANY way. Preserve every pixel of the food exactly as it appears.",
        "ONLY replace the background behind and around the dish:",
        "- Place on a clean, elegant minimalist surface (marble, light wood, or ceramic).",
        "- Apply soft diffused studio lighting with gentle shadows under the plate.",
        bgColorLine,
        "- Leave generous padding around the dish — nothing should touch or be cropped by the edges.",
        "- No text, no watermarks, no hands, no extra objects.",
        "- High-end restaurant menu photo style.",
      ]
        .filter(Boolean)
        .join("\n");

      const formData = new FormData();
      formData.append("model", "gpt-image-1");
      formData.append("image[]", new Blob([new Uint8Array(pngBuffer)], { type: "image/png" }), "image.png");
      formData.append("prompt", prompt);
      formData.append("size", "1024x1024");
      formData.append("quality", "high");

      const openaiRes = await fetch("https://api.openai.com/v1/images/edits", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
        body: formData,
        signal: controller.signal,
      });

      clearTimeout(timeout);

      if (!openaiRes.ok) {
        const err = await openaiRes.json().catch(() => ({}));
        console.error("OpenAI edits error:", err);
        return NextResponse.json({ error: "Image generation failed" }, { status: 502 });
      }

      const openaiData = await openaiRes.json();
      b64 = openaiData.data?.[0]?.b64_json;
    } else {
      // Generate from scratch via /v1/images/generations
      const colorLine = accentColor ? `Accent color ${accentColor} subtly in plate rim or garnish.` : "";

      const prompt = [
        `Professional food photograph of "${name.trim()}".`,
        categoryLine,
        descLine,
        "Top-down 45-degree angle on a clean minimalist surface.",
        colorLine,
        "Leave generous padding around the dish and plate — neither the food nor the plate should touch or be cropped by the edges of the image.",
        "Soft diffused studio lighting. No text, no watermarks, no hands.",
        "High-end restaurant menu style, appetizing presentation.",
      ]
        .filter(Boolean)
        .join("\n");

      const openaiRes = await fetch("https://api.openai.com/v1/images/generations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: "gpt-image-1",
          prompt,
          n: 1,
          size: "1024x1024",
          quality: "medium",
        }),
        signal: controller.signal,
      });

      clearTimeout(timeout);

      if (!openaiRes.ok) {
        const err = await openaiRes.json().catch(() => ({}));
        console.error("OpenAI error:", err);
        return NextResponse.json({ error: "Image generation failed" }, { status: 502 });
      }

      const openaiData = await openaiRes.json();
      b64 = openaiData.data?.[0]?.b64_json;
    }

    if (!b64) {
      return NextResponse.json({ error: "No image returned" }, { status: 502 });
    }

    // Process with sharp: resize + convert to WebP
    const rawBuffer = Buffer.from(b64, "base64");
    const buffer = await sharp(rawBuffer)
      .resize(1500, 1500, { fit: "inside", withoutEnlargement: true })
      .sharpen({ sigma: 0.8, m1: 0.8, m2: 0.4 })
      .webp({ quality: 90 })
      .toBuffer();

    // Upload to S3 temp/ with ai- prefix
    const timestamp = Date.now();
    const randomStr = Math.random().toString(36).substring(2, 8);
    const key = s3Key("temp", companyId, `ai-${timestamp}-${randomStr}.webp`);

    await s3Client.send(
      new PutObjectCommand({
        Bucket: process.env.S3_NAME!,
        Key: key,
        Body: buffer,
        ContentType: "image/webp",
        ACL: "public-read",
      })
    );

    // Decrement counter for free users
    if (!isPaidSubscriber) {
      await prisma.restaurant.update({
        where: { id: restaurant.id },
        data: { freeImageGenerationsLeft: { decrement: 1 } },
      });
    }

    const url = getPublicUrl(key);
    return NextResponse.json({ url });
  } catch (error) {
    console.error("Error generating image:", error);
    return NextResponse.json({ error: "Failed to generate image" }, { status: 500 });
  }
}
