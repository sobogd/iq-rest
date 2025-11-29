// Shared types for Categories and Items modules
// Using Prisma types as base and extending for client-side use

import type { Category as PrismaCategory, Item as PrismaItem } from "@prisma/client";

// Category types
export type Category = Pick<
  PrismaCategory,
  "id" | "name" | "description" | "sortOrder" | "isActive"
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
  categoryId: string;
}

export interface ItemWithCategory extends Item {
  category: Pick<Category, "id" | "name" | "sortOrder">;
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
