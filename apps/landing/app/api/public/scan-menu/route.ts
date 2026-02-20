import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { prisma } from "@/lib/prisma";
import { s3Client, s3Key, getPublicUrl } from "@/lib/s3";
import sharp from "sharp";

export const maxDuration = 60;
export const config = { api: { bodyParser: { sizeLimit: "30mb" } } };

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

// Rate limiter: 3 requests per minute per IP
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 3;
const RATE_WINDOW_MS = 60_000;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
    // Cleanup expired entries periodically
    if (rateLimitMap.size > 1000) {
      for (const [key, val] of rateLimitMap) {
        if (now > val.resetAt) rateLimitMap.delete(key);
      }
    }
    return false;
  }
  entry.count++;
  return entry.count > RATE_LIMIT;
}

// Transliteration map for Cyrillic to Latin
const translitMap: Record<string, string> = {
  а: "a", б: "b", в: "v", г: "g", д: "d", е: "e", ё: "yo", ж: "zh",
  з: "z", и: "i", й: "y", к: "k", л: "l", м: "m", н: "n", о: "o",
  п: "p", р: "r", с: "s", т: "t", у: "u", ф: "f", х: "kh", ц: "ts",
  ч: "ch", ш: "sh", щ: "shch", ъ: "", ы: "y", ь: "", э: "e", ю: "yu", я: "ya",
  і: "i", ї: "yi", є: "ye", ґ: "g",
};

function generateSlugFromTitle(title: string): string {
  return title
    .toLowerCase()
    .split("")
    .map((char) => translitMap[char] || char)
    .join("")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .substring(0, 50);
}

function generateHash(): string {
  return Math.random().toString(36).substring(2, 8);
}

async function generateUniqueSlug(title: string): Promise<string> {
  const baseSlug = generateSlugFromTitle(title);

  if (!baseSlug) {
    return generateHash();
  }

  const existing = await prisma.restaurant.findFirst({
    where: { slug: baseSlug },
  });

  if (!existing) {
    return baseSlug;
  }

  return `${baseSlug}-${generateHash()}`;
}

/**
 * Resize and compress the uploaded image before sending to Vision API.
 * A 10MB photo becomes ~200-400KB — faster upload, faster processing.
 */
async function compressForVision(base64Data: string): Promise<string> {
  const inputBuffer = Buffer.from(base64Data, "base64");
  const compressed = await sharp(inputBuffer)
    .resize(1500, 1500, { fit: "inside", withoutEnlargement: true })
    .jpeg({ quality: 80 })
    .toBuffer();
  return `data:image/jpeg;base64,${compressed.toString("base64")}`;
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
  cuisineType: string;
  language: string;
  restaurantName: string;
  categories: ScannedCategory[];
  error?: string;
}

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      "unknown";
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "rate_limit" },
        { status: 429 }
      );
    }

    if (!OPENAI_API_KEY) {
      return NextResponse.json(
        { error: "OpenAI API key not configured" },
        { status: 500 }
      );
    }

    const body = await request.json();

    // Support both single image and array of images
    const rawImages: string[] = Array.isArray(body.images)
      ? body.images
      : body.image
        ? [body.image]
        : [];

    if (rawImages.length === 0) {
      return NextResponse.json(
        { error: "At least one image is required" },
        { status: 400 }
      );
    }

    if (rawImages.length > 5) {
      return NextResponse.json(
        { error: "Maximum 5 images allowed" },
        { status: 400 }
      );
    }

    // Validate and compress all images
    const optimizedImages: string[] = [];
    for (const image of rawImages) {
      if (typeof image !== "string") {
        return NextResponse.json(
          { error: "Invalid image data" },
          { status: 400 }
        );
      }

      const mimeMatch = image.match(/^data:image\/[a-z+]+;base64,/);
      if (!mimeMatch) {
        return NextResponse.json(
          { error: "Invalid image format" },
          { status: 400 }
        );
      }

      const base64Data = image.split(",")[1];
      const sizeInBytes = (base64Data.length * 3) / 4;
      if (sizeInBytes > 20 * 1024 * 1024) {
        return NextResponse.json(
          { error: "Each image must be under 20MB" },
          { status: 400 }
        );
      }

      optimizedImages.push(await compressForVision(base64Data));
    }

    // Build Vision API content — all images in one message
    const imageContent = optimizedImages.map((url) => ({
      type: "image_url" as const,
      image_url: { url, detail: "high" as const },
    }));

    const multiImageNote = rawImages.length > 1
      ? `\nYou are receiving ${rawImages.length} images — these are different pages of the SAME menu. Combine all items from all pages into a single unified result. Do not duplicate categories — merge items into the same category if they belong together.`
      : "";

    // Call OpenAI Vision
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
  "cuisineType": "Italian",
  "language": "en",
  "restaurantName": "Restaurant Name",
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
- "cuisineType": detected cuisine type (e.g. "Italian", "Japanese", "American", "Mixed")
- "language": ISO 639-1 code of the menu language (e.g. "en", "es", "fr", "de", "it")
- "restaurantName": if visible on the menu use it, otherwise generate a fitting name based on cuisine type (e.g. "La Bella Cucina" for Italian)
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

    // Parse JSON response (handle markdown code blocks)
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

    // Check if AI detected it's not a menu
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

    // Detect venue type from category names and items
    const venueType = detectVenueType(scanResult.categories);

    // Generate slug first (no side effects)
    const slug = await generateUniqueSlug(
      scanResult.restaurantName || `${scanResult.cuisineType}-restaurant`
    );

    // Create Company
    const company = await prisma.company.create({
      data: {
        name: scanResult.restaurantName || `${scanResult.cuisineType} Restaurant`,
        onboardingStep: 2,
      },
    });

    const detectedLanguage = scanResult.language || "en";

    // Save original uploads to S3 (fire-and-forget)
    saveOriginalImages(rawImages, company.id).catch((err) =>
      console.error("Failed to save scan originals:", err)
    );

    try {
      // Run background generation AND DB creation in parallel
      const [backgroundUrl, totalItems] = await Promise.all([
        generateBackground(venueType, scanResult.cuisineType, scanResult.categories, company.id),
        createMenuRecords(company.id, scanResult, slug, detectedLanguage),
      ]);

      // Update restaurant background if AI generated one
      if (backgroundUrl) {
        await prisma.restaurant.updateMany({
          where: { companyId: company.id },
          data: { source: backgroundUrl },
        });
      }

      // Set pending_company_id cookie (24h TTL)
      const cookieStore = await cookies();
      cookieStore.set("pending_company_id", company.id, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24, // 24 hours
        path: "/",
      });

      return NextResponse.json({
        slug,
        companyId: company.id,
        cuisineType: scanResult.cuisineType,
        restaurantName: scanResult.restaurantName,
        totalItems,
      });
    } catch (error) {
      // Cleanup orphan company on failure
      console.error("Scan menu error (cleaning up company):", error);
      await prisma.item.deleteMany({ where: { companyId: company.id } }).catch(() => {});
      await prisma.category.deleteMany({ where: { companyId: company.id } }).catch(() => {});
      await prisma.restaurant.deleteMany({ where: { companyId: company.id } }).catch(() => {});
      await prisma.company.delete({ where: { id: company.id } }).catch(() => {});
      return NextResponse.json(
        { error: "Failed to scan menu" },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Scan menu error:", error);
    return NextResponse.json(
      { error: "Failed to scan menu" },
      { status: 500 }
    );
  }
}

/**
 * Save original uploaded images to S3 for reference.
 */
async function saveOriginalImages(images: string[], companyId: string): Promise<void> {
  const timestamp = Date.now();
  await Promise.all(
    images.map(async (image, i) => {
      const base64Data = image.split(",")[1];
      if (!base64Data) return;
      const buffer = Buffer.from(base64Data, "base64");
      const key = s3Key("scans", companyId, `${timestamp}-${i}.jpg`);
      await s3Client.send(
        new PutObjectCommand({
          Bucket: process.env.S3_NAME!,
          Key: key,
          Body: buffer,
          ContentType: "image/jpeg",
          ACL: "public-read",
        })
      );
    })
  );
}

/**
 * Detect what kind of venue this is based on category/item names.
 */
function detectVenueType(categories: ScannedCategory[]): string {
  const allNames = categories
    .flatMap((c) => [c.name, ...c.items.map((i) => i.name)])
    .join(" ")
    .toLowerCase();

  const barKeywords = ["cocktail", "beer", "wine", "spirits", "whisky", "whiskey", "vodka", "gin", "rum", "tequila", "mojito", "margarita", "draft", "ale", "lager", "shots", "пиво", "коктейл", "вино", "виски"];
  const cafeKeywords = ["coffee", "latte", "cappuccino", "espresso", "tea", "pastry", "croissant", "muffin", "cake", "cookie", "smoothie", "juice", "breakfast", "brunch", "кофе", "чай", "латте", "капучино", "завтрак"];
  const bakeryKeywords = ["bread", "baguette", "sourdough", "pie", "tart", "eclair", "macaron", "хлеб", "булка", "выпечка"];

  const barScore = barKeywords.filter((k) => allNames.includes(k)).length;
  const cafeScore = cafeKeywords.filter((k) => allNames.includes(k)).length;
  const bakeryScore = bakeryKeywords.filter((k) => allNames.includes(k)).length;

  if (barScore >= 3) return "bar";
  if (cafeScore >= 3) return "cafe";
  if (bakeryScore >= 3) return "bakery";
  if (barScore >= 2 && barScore > cafeScore) return "bar";
  if (cafeScore >= 2 && cafeScore > barScore) return "cafe";
  return "restaurant";
}

/**
 * Create Restaurant + Categories + Items in DB. Returns total item count.
 */
async function createMenuRecords(
  companyId: string,
  scanResult: ScanResult,
  slug: string,
  detectedLanguage: string
): Promise<number> {
  const initialBackground = getPublicUrl(s3Key("background_initial.webp"));

  await prisma.restaurant.create({
    data: {
      title: scanResult.restaurantName || `${scanResult.cuisineType} Restaurant`,
      slug,
      currency: "EUR",
      source: initialBackground,
      accentColor: "#000000",
      languages: [detectedLanguage],
      defaultLanguage: detectedLanguage,
      companyId,
      checklistMenuEdited: true,
      fromScanner: true,
    },
  });

  let totalItems = 0;
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
      totalItems += itemsData.length;
    }
  }

  return totalItems;
}

/**
 * Generate a top-down flat lay background with actual dishes from the menu.
 * Returns the S3 URL or null on failure.
 */
async function generateBackground(
  venueType: string,
  cuisineType: string,
  categories: ScannedCategory[],
  companyId: string
): Promise<string | null> {
  // Pick a few representative item names from the menu for the image
  const allItems = categories.flatMap((c) => c.items.map((i) => i.name));
  const sampleItems = allItems.slice(0, 6).join(", ");

  const surfaces: Record<string, string> = {
    bar: "dark wood bar counter",
    cafe: "light wood cafe table",
    bakery: "rustic flour-dusted wooden surface",
    restaurant: "elegant dark dining table",
  };

  const surface = surfaces[venueType] || surfaces.restaurant;

  const prompt = [
    `Top-down flat lay photograph on a ${surface}.`,
    `ONLY these items are on the table, nothing else: ${sampleItems}.`,
    `Style: ${cuisineType} cuisine. Each item in its own plate/glass/bowl, beautifully arranged.`,
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

  try {
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
      return null;
    }

    const openaiData = await openaiRes.json();
    const b64 = openaiData.data?.[0]?.b64_json;
    if (!b64) return null;

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

    return getPublicUrl(key);
  } catch (error) {
    clearTimeout(timeout);
    console.error("Background generation error:", error);
    return null;
  }
}
