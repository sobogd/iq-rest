import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { getUserCompanyId } from "@/lib/auth";
import { moveFromTemp, s3Key, getPublicUrl } from "@/lib/s3";
import { Prisma } from "@prisma/client";
import { locales, Locale } from "@/i18n/routing";
import { COUNTRY_CENTERS, getCoordinatesByCountry } from "@/lib/country-centers";
import { generateUniqueSlug } from "@/lib/slug";

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
          currency: data.currency ?? existing.currency,
          source: finalSource !== undefined ? finalSource : existing.source,
          accentColor: data.accentColor ?? existing.accentColor,
          address: data.address !== undefined ? (data.address || null) : existing.address,
          x: data.x !== undefined ? (data.x || null) : existing.x,
          y: data.y !== undefined ? (data.y || null) : existing.y,
          phone: data.phone !== undefined ? (data.phone || null) : existing.phone,
          instagram: data.instagram !== undefined ? (data.instagram || null) : existing.instagram,
          whatsapp: data.whatsapp !== undefined ? (data.whatsapp || null) : existing.whatsapp,
          languages: data.languages ?? existing.languages,
          defaultLanguage: newDefaultLanguage,
          hideTitle: data.hideTitle ?? existing.hideTitle,
          // Reservation settings
          reservationsEnabled: data.reservationsEnabled ?? existing.reservationsEnabled,
          reservationMode: data.reservationMode ?? existing.reservationMode,
          reservationSlotMinutes: data.reservationSlotMinutes ?? existing.reservationSlotMinutes,
          workingHoursStart: data.workingHoursStart ?? existing.workingHoursStart,
          workingHoursEnd: data.workingHoursEnd ?? existing.workingHoursEnd,
          // WhatsApp orders
          ordersEnabled: data.ordersEnabled ?? existing.ordersEnabled,
          orderNameEnabled: data.orderNameEnabled ?? existing.orderNameEnabled,
          orderPhoneEnabled: data.orderPhoneEnabled ?? existing.orderPhoneEnabled,
          orderAddressEnabled: data.orderAddressEnabled ?? existing.orderAddressEnabled,
          orderMode: data.orderMode ?? existing.orderMode,
        },
      });

      // Ensure onboarding step is at least 2 (name done, skip type)
      await prisma.company.updateMany({
        where: { id: companyId, onboardingStep: { lt: 2 } },
        data: { onboardingStep: 2 },
      });

      // Mark checklist flags (fire-and-forget, no-op if already set)
      const isContactsSave = data.phone !== undefined || data.instagram !== undefined || data.whatsapp !== undefined;
      const isBrandSave = data.source !== undefined || data.accentColor !== undefined;

      if (isContactsSave) {
        prisma.restaurant.updateMany({
          where: { companyId, checklistContactsSaved: false },
          data: { checklistContactsSaved: true },
        }).catch(() => {});
        prisma.session.updateMany({
          where: { companyId, modifiedContacts: false },
          data: { modifiedContacts: true },
        }).catch(() => {});
      }
      if (isBrandSave) {
        prisma.restaurant.updateMany({
          where: { companyId, checklistBrandCustomized: false },
          data: { checklistBrandCustomized: true },
        }).catch(() => {});
        prisma.session.updateMany({
          where: { companyId, modifiedDesign: false },
          data: { modifiedDesign: true },
        }).catch(() => {});
      }

      return NextResponse.json(restaurant);
    } else {
      // Create new
      const finalTitle = (data.title && typeof data.title === "string" && data.title.trim()) ? data.title.trim() : "";

      // Get locale from Referer URL (e.g., /pt/dashboard -> pt)
      const referer = request.headers.get("referer");
      const localeMatch = referer?.match(new RegExp(`/(${locales.join("|")})/`));
      const userLocale: Locale = localeMatch?.[1] as Locale || "en";

      // Generate unique slug from title (random if no title)
      const slug = await generateUniqueSlug(finalTitle || Math.random().toString(36).substring(2, 10));

      // Set initial background image for new restaurants
      const initialBackground = getPublicUrl(s3Key("background_initial.webp"));

      // Get coordinates: prefer country-specific (from geo_country cookie), fallback to locale-based
      const cookieStore = await cookies();
      const geoCountry = cookieStore.get("geo_country")?.value || null;
      const countryCoords = getCoordinatesByCountry(geoCountry);
      const center = countryCoords || COUNTRY_CENTERS[userLocale];

      const restaurant = await prisma.restaurant.create({
        data: {
          title: finalTitle,
          description: data.description || null,
          slug,
          currency: data.currency || "EUR",
          source: finalSource ?? initialBackground,
          accentColor: data.accentColor || "#000000",
          address: data.address || null,
          x: data.x || center?.lng?.toString() || null,
          y: data.y || center?.lat?.toString() || null,
          phone: data.phone || null,
          instagram: data.instagram || null,
          whatsapp: data.whatsapp || null,
          languages: data.languages || [userLocale],
          defaultLanguage: data.defaultLanguage || userLocale,
          hideTitle: data.hideTitle ?? false,
          // Reservation settings
          reservationsEnabled: data.reservationsEnabled ?? false,
          reservationMode: data.reservationMode ?? "manual",
          reservationSlotMinutes: data.reservationSlotMinutes ?? 90,
          workingHoursStart: data.workingHoursStart ?? "10:00",
          workingHoursEnd: data.workingHoursEnd ?? "22:00",
          // WhatsApp orders
          ordersEnabled: data.ordersEnabled ?? false,
          orderNameEnabled: data.orderNameEnabled ?? true,
          orderPhoneEnabled: data.orderPhoneEnabled ?? false,
          orderAddressEnabled: data.orderAddressEnabled ?? false,
          orderMode: data.orderMode ?? "internal",
          companyId,
          startedFromScratch: true,
        },
      });

      // Mark onboarding complete
      await prisma.company.update({
        where: { id: companyId },
        data: { onboardingStep: 3 },
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
