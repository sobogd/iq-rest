import { prisma } from "@/lib/prisma";

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
export async function generateUniqueSlug(title: string): Promise<string> {
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
