import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getUserCompanyId } from "@/lib/auth";

export async function GET() {
  try {
    const companyId = await getUserCompanyId();
    if (!companyId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get restaurant languages
    const restaurant = await prisma.restaurant.findFirst({
      where: { companyId },
      select: { languages: true, defaultLanguage: true },
    });

    if (!restaurant) {
      return NextResponse.json({ error: "Restaurant not found" }, { status: 404 });
    }

    const languages = restaurant.languages || ["en"];
    const defaultLanguage = restaurant.defaultLanguage || "en";
    const otherLanguages = languages.filter((l) => l !== defaultLanguage);

    if (otherLanguages.length === 0) {
      return NextResponse.json({ stats: {} });
    }

    // Get all categories with translations
    const categories = await prisma.category.findMany({
      where: { companyId },
      select: { id: true, name: true, translations: true },
    });

    // Get all items with translations
    const items = await prisma.item.findMany({
      where: { category: { companyId } },
      select: { id: true, name: true, description: true, translations: true },
    });

    // Calculate stats per language
    const stats: Record<string, { translated: number; total: number; percentage: number }> = {};

    for (const lang of otherLanguages) {
      let translated = 0;
      let total = 0;

      // Count category names
      for (const category of categories) {
        total += 1; // category name
        const trans = category.translations as Record<string, { name?: string }> | null;
        if (trans?.[lang]?.name?.trim()) {
          translated += 1;
        }
      }

      // Count item names and descriptions
      for (const item of items) {
        total += 1; // item name
        if (item.description) {
          total += 1; // item description (only if main description exists)
        }

        const trans = item.translations as Record<string, { name?: string; description?: string }> | null;
        if (trans?.[lang]?.name?.trim()) {
          translated += 1;
        }
        if (item.description && trans?.[lang]?.description?.trim()) {
          translated += 1;
        }
      }

      const percentage = total > 0 ? Math.round((translated / total) * 100) : 0;
      stats[lang] = { translated, total, percentage };
    }

    return NextResponse.json({ stats });
  } catch (error) {
    console.error("Failed to get translation stats:", error);
    return NextResponse.json({ error: "Failed to get stats" }, { status: 500 });
  }
}
