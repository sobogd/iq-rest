import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getUserCompanyId } from "@/lib/auth";
import { moveFromTemp } from "@/lib/s3";
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

    const restaurant = await prisma.restaurant.findFirst({
      where: { companyId },
    });

    return NextResponse.json(restaurant);
  } catch (error) {
    console.error("Error fetching restaurant:", error);
    return NextResponse.json(
      { error: "Failed to fetch restaurant" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const companyId = await getUserCompanyId();

    if (!companyId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data = await request.json();

    // Move source from temp to permanent location if needed
    // Only process if source is provided in the request
    let finalSource: string | null | undefined = undefined;
    if (data.source !== undefined) {
      finalSource = data.source
        ? await moveFromTemp(data.source, companyId, "restaurants")
        : null;
    }

    // Check if restaurant already exists
    const existing = await prisma.restaurant.findFirst({
      where: { companyId },
    });

    if (existing) {
      const oldDefaultLanguage = existing.defaultLanguage;
      const newDefaultLanguage = data.defaultLanguage ?? existing.defaultLanguage;
      const oldLanguages = existing.languages || [];
      const newLanguages = data.languages ?? existing.languages ?? ["en"];

      // If defaultLanguage changed, swap translations
      if (oldDefaultLanguage !== newDefaultLanguage) {
        await swapTranslationsOnLanguageChange(
          companyId,
          oldDefaultLanguage,
          newDefaultLanguage
        );
      }

      // Check for removed languages and clean up translations
      const removedLanguages = oldLanguages.filter(
        (lang) => !newLanguages.includes(lang) && lang !== newDefaultLanguage
      );
      if (removedLanguages.length > 0) {
        await removeTranslationsForLanguages(companyId, removedLanguages);
      }

      // Update existing
      const restaurant = await prisma.restaurant.update({
        where: { id: existing.id },
        data: {
          title: data.title ?? existing.title,
          description: data.description !== undefined ? (data.description || null) : existing.description,
          slug: data.slug !== undefined ? (data.slug || null) : existing.slug,
          source: finalSource !== undefined ? finalSource : existing.source,
          address: data.address !== undefined ? (data.address || null) : existing.address,
          x: data.x !== undefined ? (data.x || null) : existing.x,
          y: data.y !== undefined ? (data.y || null) : existing.y,
          phone: data.phone !== undefined ? (data.phone || null) : existing.phone,
          instagram: data.instagram !== undefined ? (data.instagram || null) : existing.instagram,
          whatsapp: data.whatsapp !== undefined ? (data.whatsapp || null) : existing.whatsapp,
          languages: data.languages ?? existing.languages,
          defaultLanguage: newDefaultLanguage,
          // Reservation settings
          reservationsEnabled: data.reservationsEnabled ?? existing.reservationsEnabled,
          reservationMode: data.reservationMode ?? existing.reservationMode,
          reservationSlotMinutes: data.reservationSlotMinutes ?? existing.reservationSlotMinutes,
          workingHoursStart: data.workingHoursStart ?? existing.workingHoursStart,
          workingHoursEnd: data.workingHoursEnd ?? existing.workingHoursEnd,
        },
      });

      return NextResponse.json(restaurant);
    } else {
      // Create new
      if (!data.title) {
        return NextResponse.json(
          { error: "Title is required" },
          { status: 400 }
        );
      }

      const restaurant = await prisma.restaurant.create({
        data: {
          title: data.title,
          description: data.description || null,
          slug: data.slug || null,
          source: finalSource,
          address: data.address || null,
          x: data.x || null,
          y: data.y || null,
          phone: data.phone || null,
          instagram: data.instagram || null,
          whatsapp: data.whatsapp || null,
          languages: data.languages || ["en"],
          defaultLanguage: data.defaultLanguage || "en",
          // Reservation settings
          reservationsEnabled: data.reservationsEnabled ?? false,
          reservationMode: data.reservationMode ?? "manual",
          reservationSlotMinutes: data.reservationSlotMinutes ?? 90,
          workingHoursStart: data.workingHoursStart ?? "10:00",
          workingHoursEnd: data.workingHoursEnd ?? "22:00",
          companyId,
        },
      });

      return NextResponse.json(restaurant, { status: 201 });
    }
  } catch (error) {
    console.error("Error saving restaurant:", error);
    return NextResponse.json(
      { error: "Failed to save restaurant" },
      { status: 500 }
    );
  }
}

/**
 * Swap translations when defaultLanguage changes.
 * - Move current name/description to translations[oldDefault]
 * - Move translations[newDefault] to name/description
 * - Remove translations[newDefault] (now it's the main field)
 */
async function swapTranslationsOnLanguageChange(
  companyId: string,
  oldDefault: string,
  newDefault: string
) {
  // Get all categories and items
  const [categories, items] = await Promise.all([
    prisma.category.findMany({ where: { companyId } }),
    prisma.item.findMany({ where: { companyId } }),
  ]);

  // Update categories (only name, no description)
  for (const category of categories) {
    const translations = (category.translations as Translations) || {};

    // Save current name to old default language
    const newTranslations: Translations = {
      ...translations,
      [oldDefault]: {
        name: category.name,
      },
    };

    // Get new default language values
    const newDefaultData = translations[newDefault] || {};
    const newName = newDefaultData.name || category.name;

    // Remove new default from translations (it's now the main field)
    delete newTranslations[newDefault];

    await prisma.category.update({
      where: { id: category.id },
      data: {
        name: newName,
        translations: newTranslations as Prisma.InputJsonValue,
      },
    });
  }

  // Update items
  for (const item of items) {
    const translations = (item.translations as Translations) || {};

    // Save current name/description to old default language
    const newTranslations: Translations = {
      ...translations,
      [oldDefault]: {
        name: item.name,
        description: item.description || undefined,
      },
    };

    // Get new default language values
    const newDefaultData = translations[newDefault] || {};
    const newName = newDefaultData.name || item.name;
    const newDescription = newDefaultData.description || item.description;

    // Remove new default from translations (it's now the main field)
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

/**
 * Remove translations for deleted languages
 */
async function removeTranslationsForLanguages(
  companyId: string,
  languagesToRemove: string[]
) {
  const [categories, items] = await Promise.all([
    prisma.category.findMany({ where: { companyId } }),
    prisma.item.findMany({ where: { companyId } }),
  ]);

  // Clean categories
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

  // Clean items
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
