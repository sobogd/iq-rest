import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getUserCompanyId } from "@/lib/auth";
import { getMenuTemplate } from "@/lib/menu-templates";
import { translateTemplate } from "@/lib/menu-templates-i18n";

export async function POST(request: NextRequest) {
  try {
    const companyId = await getUserCompanyId();
    if (!companyId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { type, locale } = await request.json();

    // "Start from scratch" — skip template, just mark onboarding done
    if (type === "scratch") {
      await prisma.$transaction([
        prisma.company.update({
          where: { id: companyId },
          data: { onboardingStep: 2 },
        }),
        prisma.restaurant.updateMany({
          where: { companyId },
          data: { startedFromScratch: true },
        }),
      ]);
      return NextResponse.json({ success: true });
    }

    const rawTemplate = getMenuTemplate(type);
    if (!rawTemplate) {
      return NextResponse.json({ error: "Invalid restaurant type" }, { status: 400 });
    }

    const isNonEnglish = locale && locale !== "en";
    const isEnglish = !locale || locale === "en";

    // Main fields use the user's locale; secondary language gets translations
    const template = isNonEnglish
      ? translateTemplate(rawTemplate, locale)
      : rawTemplate;

    // For English users, pre-compute Spanish translations for the secondary language
    const esTemplate = isEnglish
      ? translateTemplate(rawTemplate, "es")
      : null;

    await prisma.$transaction(async (tx) => {
      for (let catIndex = 0; catIndex < template.categories.length; catIndex++) {
        const cat = template.categories[catIndex];
        const rawCat = rawTemplate.categories[catIndex];

        // Build translations for the secondary language
        let catTranslations: Record<string, { name: string }> | undefined;
        if (isNonEnglish) {
          catTranslations = { en: { name: rawCat.name } };
        } else if (esTemplate) {
          const esCat = esTemplate.categories[catIndex];
          catTranslations = { es: { name: esCat.name } };
        }

        const category = await tx.category.create({
          data: {
            name: cat.name,
            sortOrder: catIndex,
            isActive: true,
            companyId,
            ...(catTranslations && { translations: catTranslations }),
          },
        });

        for (let itemIndex = 0; itemIndex < cat.items.length; itemIndex++) {
          const item = cat.items[itemIndex];
          const rawItem = rawCat.items[itemIndex];

          // Build translations for the secondary language
          let itemTranslations: Record<string, Record<string, string>> | undefined;
          if (isNonEnglish) {
            const en: Record<string, string> = { name: rawItem.name };
            if (rawItem.description) en.description = rawItem.description;
            itemTranslations = { en };
          } else if (esTemplate) {
            const esItem = esTemplate.categories[catIndex].items[itemIndex];
            const es: Record<string, string> = { name: esItem.name };
            if (esItem.description) es.description = esItem.description;
            itemTranslations = { es };
          }

          await tx.item.create({
            data: {
              name: item.name,
              price: item.price,
              description: item.description || null,
              sortOrder: itemIndex,
              isActive: true,
              categoryId: category.id,
              companyId,
              ...(itemTranslations && { translations: itemTranslations }),
            },
          });
        }
      }

      // Mark onboarding step 2 complete (type done)
      await tx.company.update({
        where: { id: companyId },
        data: { onboardingStep: 2 },
      });
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error setting up menu:", error);
    return NextResponse.json(
      { error: "Failed to set up menu" },
      { status: 500 }
    );
  }
}
