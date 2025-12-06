import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";

interface TranslationData {
  name?: string;
  description?: string;
}

interface Translations {
  [locale: string]: TranslationData;
}

export async function GET(request: NextRequest) {
  const cookieStore = await cookies();
  const companyId = cookieStore.get("companyId")?.value;

  if (!companyId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const targetLanguage = searchParams.get("language");

  if (!targetLanguage) {
    return NextResponse.json(
      { error: "Language parameter is required" },
      { status: 400 }
    );
  }

  // Get restaurant's current default language
  const restaurant = await prisma.restaurant.findFirst({
    where: { companyId },
    select: { defaultLanguage: true },
  });

  if (!restaurant) {
    return NextResponse.json({ error: "Restaurant not found" }, { status: 404 });
  }

  // If target language is same as current default, no need to check
  if (restaurant.defaultLanguage === targetLanguage) {
    return NextResponse.json({ missingTranslations: [] });
  }

  // Get all categories and items
  const [categories, items] = await Promise.all([
    prisma.category.findMany({
      where: { companyId },
      select: { id: true, name: true, translations: true },
    }),
    prisma.item.findMany({
      where: { companyId },
      select: { id: true, name: true, translations: true },
    }),
  ]);

  const missingTranslations: Array<{
    type: "category" | "item";
    id: string;
    name: string;
  }> = [];

  // Check categories
  for (const category of categories) {
    const translations = (category.translations as Translations) || {};
    const targetTranslation = translations[targetLanguage];

    if (!targetTranslation?.name) {
      missingTranslations.push({
        type: "category",
        id: category.id,
        name: category.name,
      });
    }
  }

  // Check items
  for (const item of items) {
    const translations = (item.translations as Translations) || {};
    const targetTranslation = translations[targetLanguage];

    if (!targetTranslation?.name) {
      missingTranslations.push({
        type: "item",
        id: item.id,
        name: item.name,
      });
    }
  }

  return NextResponse.json({ missingTranslations });
}
