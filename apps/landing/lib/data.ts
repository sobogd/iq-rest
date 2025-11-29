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
      description: true,
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
      description: true,
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
