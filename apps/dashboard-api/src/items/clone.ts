import { Prisma, type Item } from "@iq-rest/db";
import type { PrismaService } from "../prisma/prisma.service";
import { copyMenuImage } from "../upload/s3";

// Suffix appended to the top-level cloned entity's name so the copy is
// distinguishable from its source in the menu list. Nested entities (items
// inside a cloned category, categories inside a cloned group) are NOT suffixed
// — only the thing the user actually pressed "duplicate" on is marked.
export const COPY_SUFFIX = " (Copy)";

// Fresh option / variant ids for a cloned item. Option ids are unique only
// within an item, but the public menu and order-item snapshots key on them, so
// a copy must own its own ids instead of reusing the source's.
function newOptId(): string {
  return "opt_" + Math.random().toString(36).slice(2, 10);
}
function newVarId(): string {
  return "var_" + Math.random().toString(36).slice(2, 10);
}

type OptLike = { id?: string; variants?: unknown; [k: string]: unknown };
type VarLike = { id?: string; [k: string]: unknown };

// Deep-copy an item's options JSON, assigning new ids to every option and
// variant. Returns null when there are no options (stored as JSON null).
export function regenOptionIds(
  options: Prisma.JsonValue | null | undefined,
): Prisma.InputJsonValue | null {
  if (!Array.isArray(options)) return null;
  const next = (options as OptLike[]).map((opt) => {
    if (!opt || typeof opt !== "object") return opt;
    const variants = Array.isArray(opt.variants)
      ? (opt.variants as VarLike[]).map((v) =>
          v && typeof v === "object" ? { ...v, id: newVarId() } : v,
        )
      : opt.variants;
    return { ...opt, id: newOptId(), variants };
  });
  return next as Prisma.InputJsonValue;
}

// Append the suffix to the default-language name inside a translations JSON
// (`{ [lang]: { name, ... } }`) so the copy reads "… (Copy)" in that language
// too — the bare `name` column alone would leave the translated title stale.
// Other languages are left untouched. Works for both Category and Item
// translations since only the shared `name` field is touched.
export function suffixTranslationName(
  translations: Prisma.JsonValue | null,
  defaultLang: string,
  suffix: string,
): Prisma.JsonValue | null {
  if (!translations || typeof translations !== "object" || Array.isArray(translations)) {
    return translations;
  }
  const t = translations as Record<string, { name?: unknown } & Record<string, unknown>>;
  const row = t[defaultLang];
  if (!row || typeof row !== "object" || typeof row.name !== "string" || !row.name) {
    return translations;
  }
  return { ...t, [defaultLang]: { ...row, name: `${row.name}${suffix}` } } as Prisma.JsonValue;
}

// Clone a single item row into the given restaurant/category. Duplicates its
// S3 image into a fresh object, regenerates option ids, and appends the copy
// suffix only when asked (the top-level duplicated item). Not wrapped in a
// transaction — the S3 copy is an external side effect.
export async function cloneItemRecord(
  prisma: PrismaService,
  source: Item,
  opts: {
    restaurantId: string;
    categoryId: string | null;
    defaultLang: string;
    nameSuffix?: string;
  },
): Promise<Item> {
  const { restaurantId, categoryId, defaultLang, nameSuffix } = opts;
  const imageUrl = await copyMenuImage(source.imageUrl, restaurantId);

  // Position the copy at the end of its target category. An orphaned clone
  // (no category) keeps the source order — there are no siblings to collide.
  let sortOrder = source.sortOrder;
  if (categoryId) {
    const max = await prisma.item.aggregate({
      where: { restaurantId, categoryId, deletedAt: null },
      _max: { sortOrder: true },
    });
    sortOrder = (max._max.sortOrder ?? -1) + 1;
  }

  const name = nameSuffix ? `${source.name}${nameSuffix}` : source.name;
  const translations = nameSuffix
    ? suffixTranslationName(source.translations, defaultLang, nameSuffix)
    : source.translations;

  return prisma.item.create({
    data: {
      name,
      description: source.description,
      price: source.price,
      imageUrl,
      categoryId,
      isActive: source.isActive,
      translations: (translations as Prisma.InputJsonValue) ?? Prisma.JsonNull,
      allergens: source.allergens,
      diets: source.diets,
      options: (regenOptionIds(source.options) as Prisma.InputJsonValue) ?? Prisma.JsonNull,
      sortOrder,
      restaurantId,
    },
  });
}
