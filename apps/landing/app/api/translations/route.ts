import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getUserCompanyId } from "@/lib/auth";
import { Prisma } from "@prisma/client";

type TranslationData = {
  name?: string;
  description?: string;
};

type Translations = Record<string, TranslationData>;

export async function GET() {
  try {
    const companyId = await getUserCompanyId();

    if (!companyId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get restaurant languages and all items/categories in parallel
    const [restaurant, categories, items] = await Promise.all([
      prisma.restaurant.findFirst({
        where: { companyId },
        select: { languages: true, defaultLanguage: true },
      }),
      prisma.category.findMany({
        where: { companyId },
        orderBy: { sortOrder: "asc" },
        select: {
          id: true,
          name: true,
          translations: true,
        },
      }),
      prisma.item.findMany({
        where: { companyId },
        orderBy: { sortOrder: "asc" },
        select: {
          id: true,
          name: true,
          description: true,
          translations: true,
          categoryId: true,
          category: {
            select: { name: true },
          },
        },
      }),
    ]);

    const languages = restaurant?.languages || ["en"];
    const defaultLanguage = restaurant?.defaultLanguage || "en";

    // Calculate translation progress
    // Categories: only name (no description)
    // Items: name + description
    const categoryTexts = categories.length * (languages.length - 1);
    const itemTexts = items.length * 2 * (languages.length - 1);
    const totalTexts = categoryTexts + itemTexts;
    let translatedTexts = 0;

    categories.forEach((cat) => {
      const translations = (cat.translations as Translations) || {};
      languages.forEach((lang) => {
        if (lang !== defaultLanguage && translations[lang]) {
          if (translations[lang].name) translatedTexts++;
        }
      });
    });

    items.forEach((item) => {
      const translations = (item.translations as Translations) || {};
      languages.forEach((lang) => {
        if (lang !== defaultLanguage && translations[lang]) {
          if (translations[lang].name) translatedTexts++;
          if (translations[lang].description && item.description)
            translatedTexts++;
        }
      });
    });

    const progress =
      totalTexts > 0 ? Math.round((translatedTexts / totalTexts) * 100) : 100;

    return NextResponse.json({
      languages,
      defaultLanguage,
      progress,
      translatedTexts,
      totalTexts,
      categories: categories.map((cat) => ({
        ...cat,
        type: "category" as const,
      })),
      items: items.map((item) => ({
        ...item,
        type: "item" as const,
      })),
    });
  } catch (error) {
    console.error("Error fetching translations:", error);
    return NextResponse.json(
      { error: "Failed to fetch translations" },
      { status: 500 }
    );
  }
}

interface TranslationUpdate {
  type: "category" | "item";
  id: string;
  translations: Translations;
  // For default language updates
  name?: string;
  description?: string;
}

export async function PUT(request: NextRequest) {
  try {
    const companyId = await getUserCompanyId();

    if (!companyId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { updates, defaultLanguage } = await request.json() as {
      updates: TranslationUpdate[];
      defaultLanguage: string;
    };

    if (!updates || !Array.isArray(updates)) {
      return NextResponse.json(
        { error: "updates array is required" },
        { status: 400 }
      );
    }

    // Process all updates in a transaction
    await prisma.$transaction(async (tx) => {
      for (const update of updates) {
        if (update.type === "category") {
          // Verify ownership
          const category = await tx.category.findFirst({
            where: { id: update.id, companyId },
          });
          if (!category) continue;

          // Build translations object (excluding default language)
          const translations: Translations = {};
          for (const [locale, data] of Object.entries(update.translations)) {
            if (locale !== defaultLanguage && data.name?.trim()) {
              translations[locale] = { name: data.name.trim() };
            }
          }

          await tx.category.update({
            where: { id: update.id },
            data: {
              name: update.name?.trim() || category.name,
              translations: Object.keys(translations).length > 0
                ? (translations as Prisma.InputJsonValue)
                : Prisma.JsonNull,
            },
          });
        } else if (update.type === "item") {
          // Verify ownership
          const item = await tx.item.findFirst({
            where: { id: update.id, companyId },
          });
          if (!item) continue;

          // Build translations object (excluding default language)
          const translations: Translations = {};
          for (const [locale, data] of Object.entries(update.translations)) {
            if (locale !== defaultLanguage) {
              const trans: TranslationData = {};
              if (data.name?.trim()) trans.name = data.name.trim();
              if (data.description?.trim()) trans.description = data.description.trim();
              if (trans.name || trans.description) {
                translations[locale] = trans;
              }
            }
          }

          await tx.item.update({
            where: { id: update.id },
            data: {
              name: update.name?.trim() || item.name,
              description: update.description?.trim() || null,
              translations: Object.keys(translations).length > 0
                ? (translations as Prisma.InputJsonValue)
                : Prisma.JsonNull,
            },
          });
        }
      }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error updating translations:", error);
    return NextResponse.json(
      { error: "Failed to update translations" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const companyId = await getUserCompanyId();

    if (!companyId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const language = searchParams.get("language");

    if (!language) {
      return NextResponse.json(
        { error: "language parameter is required" },
        { status: 400 }
      );
    }

    // Get all categories and items
    const [categories, items] = await Promise.all([
      prisma.category.findMany({
        where: { companyId },
        select: { id: true, translations: true },
      }),
      prisma.item.findMany({
        where: { companyId },
        select: { id: true, translations: true },
      }),
    ]);

    // Remove translations for the specified language
    await prisma.$transaction(async (tx) => {
      for (const category of categories) {
        const translations = (category.translations as Translations) || {};
        if (translations[language]) {
          delete translations[language];
          await tx.category.update({
            where: { id: category.id },
            data: {
              translations: Object.keys(translations).length > 0
                ? (translations as Prisma.InputJsonValue)
                : Prisma.JsonNull,
            },
          });
        }
      }

      for (const item of items) {
        const translations = (item.translations as Translations) || {};
        if (translations[language]) {
          delete translations[language];
          await tx.item.update({
            where: { id: item.id },
            data: {
              translations: Object.keys(translations).length > 0
                ? (translations as Prisma.InputJsonValue)
                : Prisma.JsonNull,
            },
          });
        }
      }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting translations:", error);
    return NextResponse.json(
      { error: "Failed to delete translations" },
      { status: 500 }
    );
  }
}
