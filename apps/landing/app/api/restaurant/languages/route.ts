import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getUserCompanyId } from "@/lib/auth";
import { Prisma } from "@prisma/client";

type TranslationData = {
  name?: string;
  description?: string;
};

type Translations = Record<string, TranslationData>;

export async function PUT(request: NextRequest) {
  try {
    const companyId = await getUserCompanyId();

    if (!companyId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { languages, defaultLanguage } = await request.json();

    if (!languages || !Array.isArray(languages) || languages.length === 0) {
      return NextResponse.json(
        { error: "At least one language is required" },
        { status: 400 }
      );
    }

    if (!defaultLanguage || !languages.includes(defaultLanguage)) {
      return NextResponse.json(
        { error: "Default language must be in the languages list" },
        { status: 400 }
      );
    }

    const existing = await prisma.restaurant.findFirst({
      where: { companyId },
    });

    if (!existing) {
      return NextResponse.json(
        { error: "Restaurant not found" },
        { status: 404 }
      );
    }

    const oldDefaultLanguage = existing.defaultLanguage;
    const oldLanguages = existing.languages || [];

    // If defaultLanguage changed, swap translations
    if (oldDefaultLanguage !== defaultLanguage) {
      await swapTranslationsOnLanguageChange(
        companyId,
        oldDefaultLanguage,
        defaultLanguage
      );
    }

    // Check for removed languages and clean up translations
    const removedLanguages = oldLanguages.filter(
      (lang) => !languages.includes(lang) && lang !== defaultLanguage
    );
    if (removedLanguages.length > 0) {
      await removeTranslationsForLanguages(companyId, removedLanguages);
    }

    const restaurant = await prisma.restaurant.update({
      where: { id: existing.id },
      data: {
        languages,
        defaultLanguage,
      },
    });

    return NextResponse.json(restaurant);
  } catch (error) {
    console.error("Error updating languages:", error);
    return NextResponse.json(
      { error: "Failed to update languages" },
      { status: 500 }
    );
  }
}

async function swapTranslationsOnLanguageChange(
  companyId: string,
  oldDefault: string,
  newDefault: string
) {
  const [categories, items] = await Promise.all([
    prisma.category.findMany({ where: { companyId } }),
    prisma.item.findMany({ where: { companyId } }),
  ]);

  // Categories only have name (no description)
  for (const category of categories) {
    const translations = (category.translations as Translations) || {};
    const newTranslations: Translations = {
      ...translations,
      [oldDefault]: {
        name: category.name,
      },
    };

    const newDefaultData = translations[newDefault] || {};
    const newName = newDefaultData.name || category.name;

    delete newTranslations[newDefault];

    await prisma.category.update({
      where: { id: category.id },
      data: {
        name: newName,
        translations: newTranslations as Prisma.InputJsonValue,
      },
    });
  }

  for (const item of items) {
    const translations = (item.translations as Translations) || {};
    const newTranslations: Translations = {
      ...translations,
      [oldDefault]: {
        name: item.name,
        description: item.description || undefined,
      },
    };

    const newDefaultData = translations[newDefault] || {};
    const newName = newDefaultData.name || item.name;
    const newDescription = newDefaultData.description || item.description;

    delete newTranslations[newDefault];

    await prisma.item.update({
      where: { id: item.id },
      data: {
        name: newName,
        description: newDescription || null,
        translations: newTranslations as Prisma.InputJsonValue,
      },
    });
  }
}

async function removeTranslationsForLanguages(
  companyId: string,
  languagesToRemove: string[]
) {
  const [categories, items] = await Promise.all([
    prisma.category.findMany({ where: { companyId } }),
    prisma.item.findMany({ where: { companyId } }),
  ]);

  for (const category of categories) {
    const translations = (category.translations as Translations) || {};
    let hasChanges = false;

    for (const lang of languagesToRemove) {
      if (translations[lang]) {
        delete translations[lang];
        hasChanges = true;
      }
    }

    if (hasChanges) {
      await prisma.category.update({
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
    let hasChanges = false;

    for (const lang of languagesToRemove) {
      if (translations[lang]) {
        delete translations[lang];
        hasChanges = true;
      }
    }

    if (hasChanges) {
      await prisma.item.update({
        where: { id: item.id },
        data: {
          translations: Object.keys(translations).length > 0
            ? (translations as Prisma.InputJsonValue)
            : Prisma.JsonNull,
        },
      });
    }
  }
}
