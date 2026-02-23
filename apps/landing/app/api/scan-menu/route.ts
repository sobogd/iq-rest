import { NextRequest, NextResponse } from "next/server";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { prisma } from "@/lib/prisma";
import { getUserCompanyId } from "@/lib/auth";
import { s3Client, s3Key } from "@/lib/s3";
import sharp from "sharp";

export const maxDuration = 60;

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

async function compressForVision(base64Data: string): Promise<string> {
  const inputBuffer = Buffer.from(base64Data, "base64");
  const compressed = await sharp(inputBuffer)
    .resize(1500, 1500, { fit: "inside", withoutEnlargement: true })
    .jpeg({ quality: 80 })
    .toBuffer();
  return `data:image/jpeg;base64,${compressed.toString("base64")}`;
}

async function pdfToImages(base64Data: string): Promise<string[]> {
  const { pdf } = await import("pdf-to-img");
  const buffer = Buffer.from(base64Data, "base64");
  const images: string[] = [];
  const document = await pdf(buffer, { scale: 2 });
  for await (const page of document) {
    const compressed = await sharp(page)
      .resize(1500, 1500, { fit: "inside", withoutEnlargement: true })
      .jpeg({ quality: 80 })
      .toBuffer();
    images.push(`data:image/jpeg;base64,${compressed.toString("base64")}`);
  }
  return images;
}

interface ScannedItem {
  name: string;
  price: number;
  description?: string;
}

interface ScannedCategory {
  name: string;
  items: ScannedItem[];
}

interface ScanResult {
  categories: ScannedCategory[];
  error?: string;
}

export async function POST(request: NextRequest) {
  try {
    const companyId = await getUserCompanyId();
    if (!companyId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!OPENAI_API_KEY) {
      return NextResponse.json(
        { error: "OpenAI API key not configured" },
        { status: 500 }
      );
    }

    // Guard against double-scan: only allow if menu is empty
    const existingCount = await prisma.category.count({
      where: { companyId },
    });
    if (existingCount > 0) {
      return NextResponse.json(
        { error: "Menu already has categories" },
        { status: 409 }
      );
    }

    const body = await request.json();

    const rawFiles: string[] = Array.isArray(body.images)
      ? body.images
      : body.image
        ? [body.image]
        : [];

    if (rawFiles.length === 0) {
      return NextResponse.json(
        { error: "At least one file is required" },
        { status: 400 }
      );
    }

    if (rawFiles.length > 5) {
      return NextResponse.json(
        { error: "too_many_images" },
        { status: 400 }
      );
    }

    // Save originals to S3 (fire-and-forget, don't block scan)
    const timestamp = Date.now();
    Promise.all(
      rawFiles.map(async (file, i) => {
        try {
          const mimeMatch = file.match(/^data:([^;]+);base64,/);
          if (!mimeMatch) return;
          const mime = mimeMatch[1];
          const base64Data = file.split(",")[1];
          const buffer = Buffer.from(base64Data, "base64");
          const ext = mime === "application/pdf" ? "pdf" : mime.split("/")[1] || "bin";
          const key = s3Key("scan_onboarding", companyId, `${timestamp}-${i}.${ext}`);
          await s3Client.send(
            new PutObjectCommand({
              Bucket: process.env.S3_NAME!,
              Key: key,
              Body: buffer,
              ContentType: mime,
            })
          );
        } catch (err) {
          console.error("Failed to save scan file to S3:", err);
        }
      })
    ).catch(() => {});

    // Process all files: images get compressed, PDFs get converted to images
    const optimizedImages: string[] = [];

    for (const file of rawFiles) {
      if (typeof file !== "string") {
        return NextResponse.json(
          { error: "Invalid file data" },
          { status: 400 }
        );
      }

      const isPdf = file.startsWith("data:application/pdf;base64,");

      if (isPdf) {
        const base64Data = file.split(",")[1];
        const sizeInBytes = (base64Data.length * 3) / 4;
        if (sizeInBytes > 20 * 1024 * 1024) {
          return NextResponse.json({ error: "too_large" }, { status: 400 });
        }
        const pages = await pdfToImages(base64Data);
        optimizedImages.push(...pages);
      } else {
        const mimeMatch = file.match(/^data:image\/[a-z+]+;base64,/);
        if (!mimeMatch) {
          return NextResponse.json(
            { error: "Invalid file format" },
            { status: 400 }
          );
        }

        const base64Data = file.split(",")[1];
        const sizeInBytes = (base64Data.length * 3) / 4;
        if (sizeInBytes > 20 * 1024 * 1024) {
          return NextResponse.json({ error: "too_large" }, { status: 400 });
        }

        optimizedImages.push(await compressForVision(base64Data));
      }
    }

    // Cap total images sent to Vision (PDF pages can expand count)
    const imagesToSend = optimizedImages.slice(0, 10);

    // Build Vision API content
    const imageContent = imagesToSend.map((url) => ({
      type: "image_url" as const,
      image_url: { url, detail: "high" as const },
    }));

    const multiImageNote = imagesToSend.length > 1
      ? `\nYou are receiving ${imagesToSend.length} images — these are different pages of the SAME menu. Combine all items from all pages into a single unified result. Do not duplicate categories — merge items into the same category if they belong together.`
      : "";

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: `You are a menu scanner. Analyze the image(s) of a restaurant menu and extract all items with their prices.${multiImageNote}

Return ONLY valid JSON in this exact format:
{
  "categories": [
    {
      "name": "Category Name",
      "items": [
        { "name": "Item Name", "price": 14.50, "description": "Optional description" }
      ]
    }
  ]
}

Rules:
- Group items into logical categories (e.g. "Starters", "Main Course", "Desserts", "Drinks")
- Extract prices as numbers (no currency symbols). If no price is visible, use 0
- If the image is NOT a restaurant menu, return: { "error": "not_a_menu" }
- Always return valid JSON, nothing else`,
          },
          {
            role: "user",
            content: imageContent,
          },
        ],
        temperature: 0.1,
        max_tokens: 4000,
      }),
    });

    if (!response.ok) {
      console.error("OpenAI API error:", await response.text());
      return NextResponse.json(
        { error: "Failed to analyze menu" },
        { status: 500 }
      );
    }

    const data = await response.json();
    const content = data.choices[0]?.message?.content?.trim();

    if (!content) {
      return NextResponse.json(
        { error: "No response from AI" },
        { status: 500 }
      );
    }

    let scanResult: ScanResult;
    try {
      const jsonStr = content.replace(/^```json?\n?|\n?```$/g, "").trim();
      scanResult = JSON.parse(jsonStr);
    } catch {
      console.error("Failed to parse AI response:", content);
      return NextResponse.json(
        { error: "Failed to parse menu data" },
        { status: 500 }
      );
    }

    if (scanResult.error === "not_a_menu") {
      return NextResponse.json(
        { error: "not_a_menu" },
        { status: 422 }
      );
    }

    if (!scanResult.categories || scanResult.categories.length === 0) {
      return NextResponse.json(
        { error: "not_a_menu" },
        { status: 422 }
      );
    }

    // Create categories and items
    let categoriesCount = 0;
    let itemsCount = 0;

    for (let i = 0; i < scanResult.categories.length; i++) {
      const cat = scanResult.categories[i];
      if (!cat.name || !cat.items || cat.items.length === 0) continue;

      const category = await prisma.category.create({
        data: {
          name: cat.name,
          sortOrder: i,
          isActive: true,
          companyId,
        },
      });
      categoriesCount++;

      const itemsData = cat.items
        .filter((item) => item.name)
        .map((item, j) => ({
          name: item.name,
          description: item.description || null,
          price: Math.max(0, Number(item.price) || 0),
          sortOrder: j,
          isActive: true,
          categoryId: category.id,
          companyId,
        }));

      if (itemsData.length > 0) {
        await prisma.item.createMany({ data: itemsData });
        itemsCount += itemsData.length;
      }
    }

    // Mark checklist as done
    await prisma.restaurant.updateMany({
      where: { companyId },
      data: { checklistMenuEdited: true },
    });

    return NextResponse.json({ categoriesCount, itemsCount });
  } catch (error) {
    console.error("Scan menu error:", error);
    return NextResponse.json(
      { error: "Failed to scan menu" },
      { status: 500 }
    );
  }
}
