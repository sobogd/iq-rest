import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { getUserCompanyId } from "@/lib/auth";
import { moveFromTemp, s3Key, getPublicUrl } from "@/lib/s3";
import { Prisma } from "@prisma/client";
import { locales, Locale } from "@/i18n/routing";
import { COUNTRY_CENTERS, getCoordinatesByCountry } from "@/lib/country-centers";

// Locale → phone country code mapping
const LOCALE_PHONE_CODES: Record<string, string> = {
  en: "+44", es: "+34", de: "+49", fr: "+33", it: "+39",
  pt: "+351", nl: "+31", pl: "+48", ru: "+7", uk: "+380",
  sv: "+46", da: "+45", no: "+47", fi: "+358", cs: "+420",
  el: "+30", tr: "+90", ro: "+40", hu: "+36", bg: "+359",
  hr: "+385", sk: "+421", sl: "+386", et: "+372", lv: "+371",
  lt: "+370", sr: "+381", ca: "+34", ga: "+353", is: "+354",
  fa: "+98", ar: "+966", ja: "+81", ko: "+82", zh: "+86",
};

type TranslationData = {
  name?: string;
  description?: string;
};

type Translations = Record<string, TranslationData>;

// Transliteration map for Cyrillic to Latin
const translitMap: Record<string, string> = {
  а: "a", б: "b", в: "v", г: "g", д: "d", е: "e", ё: "yo", ж: "zh",
  з: "z", и: "i", й: "y", к: "k", л: "l", м: "m", н: "n", о: "o",
  п: "p", р: "r", с: "s", т: "t", у: "u", ф: "f", х: "kh", ц: "ts",
  ч: "ch", ш: "sh", щ: "shch", ъ: "", ы: "y", ь: "", э: "e", ю: "yu", я: "ya",
  // Ukrainian specific
  і: "i", ї: "yi", є: "ye", ґ: "g",
};

/**
 * Generate a URL-friendly slug from a title
 */
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

/**
 * Generate a 5-character hash
 */
function generateHash(): string {
  return Math.random().toString(36).substring(2, 7);
}

/**
 * Generate a unique slug, adding hash only if needed
 */
async function generateUniqueSlug(title: string): Promise<string> {
  const baseSlug = generateSlugFromTitle(title);

  if (!baseSlug) {
    return generateHash();
  }

  // Check if base slug is available
  const existing = await prisma.restaurant.findFirst({
    where: { slug: baseSlug },
  });

  if (!existing) {
    return baseSlug;
  }

  // Slug is taken, add hash
  return `${baseSlug}-${generateHash()}`;
}

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
        },
      });

      // Ensure onboarding step is at least 1 (name done)
      await prisma.company.updateMany({
        where: { id: companyId, onboardingStep: 0 },
        data: { onboardingStep: 1 },
      });

      // Mark checklist flags (fire-and-forget, no-op if already set)
      const isContactsSave = data.phone !== undefined || data.instagram !== undefined || data.whatsapp !== undefined;
      const isBrandSave = data.source !== undefined || data.accentColor !== undefined;

      if (isContactsSave) {
        prisma.restaurant.updateMany({
          where: { companyId, checklistContactsSaved: false },
          data: { checklistContactsSaved: true },
        }).catch(() => {});
      }
      if (isBrandSave) {
        prisma.restaurant.updateMany({
          where: { companyId, checklistBrandCustomized: false },
          data: { checklistBrandCustomized: true },
        }).catch(() => {});
      }

      return NextResponse.json(restaurant);
    } else {
      // Create new
      if (!data.title) {
        return NextResponse.json(
          { error: "Title is required" },
          { status: 400 }
        );
      }

      // Get locale from Referer URL (e.g., /pt/dashboard/onboarding -> pt)
      const referer = request.headers.get("referer");
      const localeMatch = referer?.match(new RegExp(`/(${locales.join("|")})/`));
      const userLocale: Locale = localeMatch?.[1] as Locale || "en";

      // Generate unique slug from title
      const slug = await generateUniqueSlug(data.title);

      // Set initial background image for new restaurants
      const initialBackground = getPublicUrl(s3Key("background_initial.webp"));

      // Generate test contact data based on locale
      const phoneCode = LOCALE_PHONE_CODES[userLocale] || "+1";
      const testPhone = `${phoneCode} 12345`;

      // Get coordinates: prefer country-specific (from geo_country cookie), fallback to locale-based
      const cookieStore = await cookies();
      const geoCountry = cookieStore.get("geo_country")?.value || null;
      const countryCoords = getCoordinatesByCountry(geoCountry);
      const center = countryCoords || COUNTRY_CENTERS[userLocale];

      const restaurant = await prisma.restaurant.create({
        data: {
          title: data.title,
          description: data.description || null,
          slug,
          currency: data.currency || "EUR",
          source: finalSource ?? initialBackground,
          accentColor: data.accentColor || "#000000",
          address: data.address || null,
          x: data.x || center?.lng?.toString() || null,
          y: data.y || center?.lat?.toString() || null,
          phone: data.phone || testPhone,
          instagram: data.instagram || "instagram",
          whatsapp: data.whatsapp || testPhone,
          languages: data.languages || (userLocale === "en" ? ["en", "es"] : [userLocale, "en"]),
          defaultLanguage: data.defaultLanguage || userLocale,
          hideTitle: data.hideTitle ?? false,
          // Reservation settings
          reservationsEnabled: data.reservationsEnabled ?? false,
          reservationMode: data.reservationMode ?? "manual",
          reservationSlotMinutes: data.reservationSlotMinutes ?? 90,
          workingHoursStart: data.workingHoursStart ?? "10:00",
          workingHoursEnd: data.workingHoursEnd ?? "22:00",
          companyId,
        },
      });

      // Mark onboarding step 1 complete (name done)
      await prisma.company.update({
        where: { id: companyId },
        data: { onboardingStep: 1 },
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
