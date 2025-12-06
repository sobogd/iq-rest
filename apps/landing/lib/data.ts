import { prisma } from "@/lib/prisma";
import { getUserCompanyId } from "@/lib/auth";
import type { Category, ItemWithCategory } from "@/types";

// Server-side data fetching functions for SSR

export async function getCategories(): Promise<Category[]> {
  const companyId = await getUserCompanyId();

  if (!companyId) {
    return [];
  }

  const categories = await prisma.category.findMany({
    where: { companyId },
    orderBy: { sortOrder: "asc" },
    select: {
      id: true,
      name: true,
      sortOrder: true,
      isActive: true,
    },
  });

  return categories;
}

export async function getItems(): Promise<ItemWithCategory[]> {
  const companyId = await getUserCompanyId();

  if (!companyId) {
    return [];
  }

  const items = await prisma.item.findMany({
    where: { companyId },
    orderBy: { sortOrder: "asc" },
    include: {
      category: {
        select: { id: true, name: true, sortOrder: true },
      },
    },
  });

  // Convert Decimal to number for serialization
  return items.map((item) => ({
    id: item.id,
    name: item.name,
    description: item.description,
    price: Number(item.price),
    imageUrl: item.imageUrl,
    sortOrder: item.sortOrder,
    isActive: item.isActive,
    categoryId: item.categoryId,
    category: item.category,
  }));
}

export async function getCategoryById(id: string): Promise<Category | null> {
  const companyId = await getUserCompanyId();

  if (!companyId) {
    return null;
  }

  const category = await prisma.category.findFirst({
    where: { id, companyId },
    select: {
      id: true,
      name: true,
      sortOrder: true,
      isActive: true,
    },
  });

  return category;
}

export async function getItemById(id: string): Promise<ItemWithCategory | null> {
  const companyId = await getUserCompanyId();

  if (!companyId) {
    return null;
  }

  const item = await prisma.item.findFirst({
    where: { id, companyId },
    include: {
      category: {
        select: { id: true, name: true, sortOrder: true },
      },
    },
  });

  if (!item) {
    return null;
  }

  return {
    id: item.id,
    name: item.name,
    description: item.description,
    price: Number(item.price),
    imageUrl: item.imageUrl,
    sortOrder: item.sortOrder,
    isActive: item.isActive,
    categoryId: item.categoryId,
    category: item.category,
  };
}

export interface ItemWithTranslations {
  id: string;
  name: string;
  description: string | null;
  price: number;
  imageUrl: string | null;
  sortOrder: number;
  isActive: boolean;
  categoryId: string;
  translations: Record<string, { name?: string; description?: string }> | null;
}

export async function getItemWithTranslations(id: string): Promise<ItemWithTranslations | null> {
  const companyId = await getUserCompanyId();

  if (!companyId) {
    return null;
  }

  const item = await prisma.item.findFirst({
    where: { id, companyId },
  });

  if (!item) {
    return null;
  }

  return {
    id: item.id,
    name: item.name,
    description: item.description,
    price: Number(item.price),
    imageUrl: item.imageUrl,
    sortOrder: item.sortOrder,
    isActive: item.isActive,
    categoryId: item.categoryId,
    translations: item.translations as Record<string, { name?: string; description?: string }> | null,
  };
}

export interface CategoryWithTranslations {
  id: string;
  name: string;
  sortOrder: number;
  isActive: boolean;
  translations: Record<string, { name?: string }> | null;
}

export async function getCategoryWithTranslations(id: string): Promise<CategoryWithTranslations | null> {
  const companyId = await getUserCompanyId();

  if (!companyId) {
    return null;
  }

  const category = await prisma.category.findFirst({
    where: { id, companyId },
  });

  if (!category) {
    return null;
  }

  return {
    id: category.id,
    name: category.name,
    sortOrder: category.sortOrder,
    isActive: category.isActive,
    translations: category.translations as Record<string, { name?: string }> | null,
  };
}

export interface RestaurantLanguages {
  languages: string[];
  defaultLanguage: string;
}

export async function getRestaurantLanguages(): Promise<RestaurantLanguages | null> {
  const companyId = await getUserCompanyId();

  if (!companyId) {
    return null;
  }

  const restaurant = await prisma.restaurant.findFirst({
    where: { companyId },
    select: {
      languages: true,
      defaultLanguage: true,
    },
  });

  if (!restaurant) {
    return null;
  }

  return {
    languages: restaurant.languages || ["en"],
    defaultLanguage: restaurant.defaultLanguage || "en",
  };
}

export interface TranslationStats {
  translated: number;
  total: number;
  percentage: number;
}

export interface LanguagesPageData {
  languages: string[];
  defaultLanguage: string;
  stats: Record<string, TranslationStats>;
}

export async function getLanguagesPageData(): Promise<LanguagesPageData | null> {
  const companyId = await getUserCompanyId();

  if (!companyId) {
    return null;
  }

  const restaurant = await prisma.restaurant.findFirst({
    where: { companyId },
    select: {
      languages: true,
      defaultLanguage: true,
    },
  });

  if (!restaurant) {
    return null;
  }

  const languages = restaurant.languages || ["en"];
  const defaultLanguage = restaurant.defaultLanguage || "en";
  const otherLanguages = languages.filter((l) => l !== defaultLanguage);

  const stats: Record<string, TranslationStats> = {};

  if (otherLanguages.length > 0) {
    const categories = await prisma.category.findMany({
      where: { companyId },
      select: { id: true, name: true, translations: true },
    });

    const items = await prisma.item.findMany({
      where: { category: { companyId } },
      select: { id: true, name: true, description: true, translations: true },
    });

    for (const lang of otherLanguages) {
      let translated = 0;
      let total = 0;

      for (const category of categories) {
        total += 1;
        const trans = category.translations as Record<string, { name?: string }> | null;
        if (trans?.[lang]?.name?.trim()) {
          translated += 1;
        }
      }

      for (const item of items) {
        total += 1;
        if (item.description) {
          total += 1;
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
  }

  return {
    languages,
    defaultLanguage,
    stats,
  };
}
