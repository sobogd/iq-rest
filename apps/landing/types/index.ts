// Shared types for Categories and Items modules
// Using Prisma types as base and extending for client-side use

import type { Category as PrismaCategory, Item as PrismaItem } from "@prisma/client";

// Category types
export type Category = Pick<
  PrismaCategory,
  "id" | "name" | "sortOrder" | "isActive"
>;

export type CategoryWithTimestamps = PrismaCategory;

// Item types - price converted to number for client-side use
export interface Item {
  id: string;
  name: string;
  description: string | null;
  price: number; // Decimal converted to number
  imageUrl: string | null;
  sortOrder: number;
  isActive: boolean;
  // null = orphaned item whose category was deleted (FK ON DELETE SET NULL).
  categoryId: string | null;
}

export interface ItemWithCategory extends Item {
  category: Pick<Category, "id" | "name" | "sortOrder"> | null;
}

// API response types
export interface ApiError {
  error: string;
}

export interface ReorderRequest {
  categoryId?: string;
  itemId?: string;
  direction: "up" | "down";
}
