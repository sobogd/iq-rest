import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { Prisma } from "@iq-rest/db";
import { z } from "zod";
import { PrismaService } from "../prisma/prisma.service";
import { AutoTranslateService } from "../auto-translate/auto-translate.service";
import { cloneItemRecord, COPY_SUFFIX } from "./clone";

// Bounds so the client can't stuff unbounded attacker-controlled JSON into the
// `options` column (consumed later by public-menu / order snapshots).
const MAX_LOCALES = 60;
const MAX_STR = 500;
const MAX_VARIANTS = 100;
const MAX_OPTIONS = 50;
const MAX_DELTA = 1_000_000;

const mlSchema = z
  .record(z.string().min(1).max(20), z.string().max(MAX_STR))
  .refine((m) => Object.keys(m).length <= MAX_LOCALES, { message: "Too many locales" });

// Accept string or number, coerce to a finite bounded number, store a canonical
// 2-decimal string so downstream parseDecimal() never sees NaN / garbage.
const priceDeltaSchema = z
  .union([z.string(), z.number()])
  .optional()
  .transform((v) => {
    if (v === undefined) return undefined;
    const n = typeof v === "number" ? v : parseFloat(String(v).replace(",", ".").trim());
    if (!Number.isFinite(n)) return "0.00";
    const clamped = Math.max(-MAX_DELTA, Math.min(MAX_DELTA, n));
    return clamped.toFixed(2);
  });

const variantSchema = z.object({
  id: z.string().min(1).max(80),
  name: mlSchema.nullable().optional(),
  priceDelta: priceDeltaSchema,
}).strict();
const optionSchema = z.object({
  id: z.string().min(1).max(80),
  name: mlSchema.nullable().optional(),
  type: z.enum(["single", "multi"]).optional(),
  required: z.boolean().optional(),
  variants: z.array(variantSchema).max(MAX_VARIANTS).optional(),
}).strict();
const optionsArraySchema = z.array(optionSchema).max(MAX_OPTIONS).nullable();

function validateOptions(raw: unknown): unknown {
  if (raw === null || raw === undefined) return raw;
  const parsed = optionsArraySchema.safeParse(raw);
  if (!parsed.success) throw new BadRequestException("Invalid options payload");
  return parsed.data;
}

interface ItemUpsert {
  name: string;
  description?: string | null;
  price: number;
  imageUrl?: string | null;
  categoryId: string;
  isActive?: boolean;
  translations?: Record<string, { name?: string; description?: string }> | null;
  allergens?: string[];
  diets?: string[];
  options?: unknown;
  sortOrder?: number;
}

interface Ctx {

  restaurantId: string;
}

@Injectable()
export class ItemsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly autoTranslate: AutoTranslateService,
  ) {}

  list(ctx: Ctx) {
    return this.prisma.item.findMany({
      where: { restaurantId: ctx.restaurantId, deletedAt: null },
      orderBy: { sortOrder: "asc" },
      take: 2000,
    });
  }

  async create(ctx: Ctx, body: ItemUpsert) {
    const cat = await this.prisma.category.findFirst({
      where: { id: body.categoryId, restaurantId: ctx.restaurantId, deletedAt: null },
      select: { isGroup: true },
    });
    if (!cat) throw new BadRequestException("Category not found");
    if (cat.isGroup) throw new BadRequestException("Cannot add items to a group category");
    const max = await this.prisma.item.aggregate({
      where: { restaurantId: ctx.restaurantId, categoryId: body.categoryId, deletedAt: null },
      _max: { sortOrder: true },
    });
    const validatedOptions = validateOptions(body.options);
    const created = await this.prisma.item.create({
      data: {
        name: body.name,
        description: body.description ?? null,
        price: new Prisma.Decimal(body.price),
        imageUrl: body.imageUrl ?? null,
        categoryId: body.categoryId,
        isActive: body.isActive ?? true,
        translations: (body.translations as Prisma.InputJsonValue) ?? Prisma.JsonNull,
        allergens: body.allergens ?? [],
        diets: body.diets ?? [],
        options: (validatedOptions as Prisma.InputJsonValue) ?? Prisma.JsonNull,
        sortOrder: (max._max.sortOrder ?? -1) + 1,

        restaurantId: ctx.restaurantId,
      },
    });
    await this.autoTranslate.translateItem({

      restaurantId: ctx.restaurantId,
      itemId: created.id,
      sourceNameChanged: true,
      sourceDescriptionChanged: !!body.description,
    });
    return this.prisma.item.findFirst({ where: { id: created.id } });
  }

  async update(ctx: Ctx, id: string, body: Partial<ItemUpsert>) {
    // `translations` and `options` are read-modify-write JSON blobs. Under two
    // concurrent updates of the same item, a plain read-then-update loses one
    // side's merge. Do the read + merge + write inside one Serializable
    // transaction so Postgres aborts a conflicting concurrent writer instead of
    // silently dropping data. autoTranslate runs AFTER commit (it re-reads).
    const { updated, sourceNameChanged, sourceDescriptionChanged } = await this.prisma.$transaction(
      async (tx) => {
        const item = await tx.item.findFirst({ where: { id, restaurantId: ctx.restaurantId, deletedAt: null } });
        if (!item) throw new NotFoundException();
        const data: Prisma.ItemUpdateInput = {};
        if (body.name !== undefined) data.name = body.name;
        if (body.description !== undefined) data.description = body.description ?? null;
        if (body.price !== undefined) data.price = new Prisma.Decimal(body.price);
        if (body.imageUrl !== undefined) data.imageUrl = body.imageUrl ?? null;
        if (body.categoryId !== undefined) {
          const targetCat = await tx.category.findFirst({
            where: { id: body.categoryId, restaurantId: ctx.restaurantId, deletedAt: null },
            select: { isGroup: true },
          });
          if (!targetCat) throw new BadRequestException("Category not found");
          if (targetCat.isGroup) throw new BadRequestException("Cannot move item to a group category");
          data.category = { connect: { id: body.categoryId } };
          // Moving to a different category: append to the end of the target
          // category so the item's stale sortOrder can't collide with existing
          // siblings there (which corrupts the whole category's ordering).
          if (body.categoryId !== item.categoryId && body.sortOrder === undefined) {
            const max = await tx.item.aggregate({
              where: { restaurantId: ctx.restaurantId, categoryId: body.categoryId, deletedAt: null },
              _max: { sortOrder: true },
            });
            data.sortOrder = (max._max.sortOrder ?? -1) + 1;
          }
        }
        if (body.isActive !== undefined) data.isActive = body.isActive;
        const nameChanged = body.name !== undefined && body.name !== item.name;
        const descriptionChanged =
          body.description !== undefined && (body.description ?? null) !== (item.description ?? null);
        if (body.translations !== undefined) {
          const resetLocks: ("name" | "description")[] = [];
          if (nameChanged) resetLocks.push("name");
          if (descriptionChanged) resetLocks.push("description");
          const merged = mergeTranslationsWithLocks(
            item.translations as TranslationsRow | null,
            body.translations as Record<string, { name?: string; description?: string }> | null,
            ["name", "description"],
            resetLocks,
          );
          data.translations = (merged as Prisma.InputJsonValue) ?? Prisma.JsonNull;
        }
        if (body.allergens !== undefined) data.allergens = body.allergens;
        if (body.diets !== undefined) data.diets = body.diets;
        if (body.options !== undefined) {
          const validatedOptions = validateOptions(body.options);
          const restaurant = await tx.restaurant.findUnique({
            where: { id: ctx.restaurantId },
            select: { defaultLanguage: true },
          });
          const defaultLang = restaurant?.defaultLanguage || "en";
          const prevOptions = Array.isArray(item.options) ? (item.options as DishOptLike[]) : [];
          const nextOptions = resetTargetLangsOnSourceRename(prevOptions, validatedOptions, defaultLang);
          data.options = (nextOptions as Prisma.InputJsonValue) ?? Prisma.JsonNull;
        }
        if (body.sortOrder !== undefined) data.sortOrder = body.sortOrder;
        const row = await tx.item.update({ where: { id }, data });
        return { updated: row, sourceNameChanged: nameChanged, sourceDescriptionChanged: descriptionChanged };
      },
      { isolationLevel: Prisma.TransactionIsolationLevel.Serializable },
    );
    await this.autoTranslate.translateItem({

      restaurantId: ctx.restaurantId,
      itemId: updated.id,
      sourceNameChanged,
      sourceDescriptionChanged,
    });
    return this.prisma.item.findFirst({ where: { id: updated.id } });
  }

  async patch(ctx: Ctx, id: string, body: { isActive?: boolean }) {
    const item = await this.prisma.item.findFirst({ where: { id, restaurantId: ctx.restaurantId, deletedAt: null } });
    if (!item) throw new NotFoundException();
    return this.prisma.item.update({
      where: { id },
      data: { ...(body.isActive !== undefined ? { isActive: body.isActive } : {}) },
    });
  }

  async remove(ctx: Ctx, id: string) {
    const item = await this.prisma.item.findFirst({ where: { id, restaurantId: ctx.restaurantId, deletedAt: null } });
    if (!item) throw new NotFoundException();
    await this.prisma.item.update({ where: { id }, data: { deletedAt: new Date() } });
  }

  // Clone a dish with everything it carries — translations, options/variants,
  // allergens, diets, and a fresh copy of its S3 image — into the same
  // category, marked "(Copy)".
  async duplicate(ctx: Ctx, id: string) {
    const item = await this.prisma.item.findFirst({ where: { id, restaurantId: ctx.restaurantId, deletedAt: null } });
    if (!item) throw new NotFoundException();
    const restaurant = await this.prisma.restaurant.findUnique({
      where: { id: ctx.restaurantId },
      select: { defaultLanguage: true },
    });
    const created = await cloneItemRecord(this.prisma, item, {
      restaurantId: ctx.restaurantId,
      categoryId: item.categoryId,
      defaultLang: restaurant?.defaultLanguage || "en",
      nameSuffix: COPY_SUFFIX,
    });
    return this.prisma.item.findFirst({ where: { id: created.id } });
  }

  async reorderBulk(ctx: Ctx, items: { id: string; sortOrder: number }[]) {
    if (!Array.isArray(items) || items.length === 0) return { ok: true };
    await this.prisma.$transaction(
      items.map((it) =>
        this.prisma.item.updateMany({
          where: { id: it.id, restaurantId: ctx.restaurantId, deletedAt: null },
          data: { sortOrder: it.sortOrder },
        }),
      ),
    );
    return { ok: true };
  }

  async reorder(ctx: Ctx, itemId: string, direction: "up" | "down") {
    const item = await this.prisma.item.findFirst({ where: { id: itemId, restaurantId: ctx.restaurantId, deletedAt: null } });
    if (!item) throw new NotFoundException();
    const siblings = await this.prisma.item.findMany({
      where: { restaurantId: ctx.restaurantId, categoryId: item.categoryId, deletedAt: null },
      orderBy: { sortOrder: "asc" },
      select: { id: true, sortOrder: true },
    });
    const idx = siblings.findIndex((it) => it.id === itemId);
    const target = direction === "up" ? idx - 1 : idx + 1;
    if (target < 0 || target >= siblings.length) return { swapped: [] };

    const a = siblings[idx];
    const b = siblings[target];
    await this.prisma.$transaction([
      this.prisma.item.update({ where: { id: a.id }, data: { sortOrder: b.sortOrder } }),
      this.prisma.item.update({ where: { id: b.id }, data: { sortOrder: a.sortOrder } }),
    ]);
    return {
      swapped: [
        { id: a.id, sortOrder: b.sortOrder },
        { id: b.id, sortOrder: a.sortOrder },
      ],
    };
  }
}

type TranslationsRow = Record<string, {
  name?: string | null;
  description?: string | null;
  nameLocked?: boolean;
  descriptionLocked?: boolean;
}>;

type DishOptLike = {
  id?: string;
  name?: Record<string, string> | null;
  variants?: DishVarLike[] | null;
  [k: string]: unknown;
};
type DishVarLike = {
  id?: string;
  name?: Record<string, string> | null;
  [k: string]: unknown;
};

export function resetTargetLangsOnSourceRename(
  prevOptions: DishOptLike[],
  incomingOptionsRaw: unknown,
  defaultLang: string,
): DishOptLike[] | null {
  if (incomingOptionsRaw === null) return null;
  if (!Array.isArray(incomingOptionsRaw)) return [];
  const prevById = new Map<string, DishOptLike>();
  for (const p of prevOptions) if (p?.id) prevById.set(p.id, p);
  return (incomingOptionsRaw as DishOptLike[]).map((opt) => {
    if (!opt || typeof opt !== "object") return opt;
    const prev = opt.id ? prevById.get(opt.id) : undefined;
    const prevDefault = (prev?.name?.[defaultLang] ?? "").trim();
    const nextDefault = (opt.name?.[defaultLang] ?? "").trim();
    let name = opt.name ? { ...opt.name } : opt.name ?? null;
    if (prev && prevDefault && nextDefault && prevDefault !== nextDefault) {
      name = { [defaultLang]: nextDefault };
    }
    let variants = opt.variants;
    if (Array.isArray(variants)) {
      const prevVarsById = new Map<string, DishVarLike>();
      for (const pv of prev?.variants || []) if (pv?.id) prevVarsById.set(pv.id, pv);
      variants = variants.map((v) => {
        if (!v || typeof v !== "object") return v;
        const prevV = v.id ? prevVarsById.get(v.id) : undefined;
        const pVal = (prevV?.name?.[defaultLang] ?? "").trim();
        const nVal = (v.name?.[defaultLang] ?? "").trim();
        let vName = v.name ? { ...v.name } : v.name ?? null;
        if (prevV && pVal && nVal && pVal !== nVal) {
          vName = { [defaultLang]: nVal };
        }
        return { ...v, name: vName };
      });
    }
    return { ...opt, name, variants };
  });
}

export function mergeTranslationsWithLocks(
  prev: TranslationsRow | null,
  incoming: TranslationsRow | null | undefined,
  fields: ("name" | "description")[],
  resetLocksOn: ("name" | "description")[] = [],
): TranslationsRow | null {
  if (incoming === null) return null;
  const out: TranslationsRow = {};
  const langs = new Set<string>([
    ...Object.keys(prev || {}),
    ...Object.keys(incoming || {}),
  ]);
  for (const lang of langs) {
    const p = (prev || {})[lang] || {};
    const i = (incoming || {})[lang] || {};
    const row: TranslationsRow[string] = {};
    for (const f of fields) {
      const lockKey = (f === "name" ? "nameLocked" : "descriptionLocked") as
        "nameLocked" | "descriptionLocked";
      const incomingHas = (incoming || {})[lang] && i[f] !== undefined;
      let value = incomingHas ? (i[f] ?? null) : (p[f] ?? null);
      const sourceFieldChanged = resetLocksOn.includes(f);
      let locked = sourceFieldChanged ? false : !!p[lockKey];
      if (incomingHas && (i[f] ?? null) !== (p[f] ?? null)) {
        locked = !!(i[f] && (i[f] ?? "").length > 0);
      }
      if (value !== null && value !== undefined) row[f] = value;
      if (locked) row[lockKey] = true;
    }
    if (Object.keys(row).length > 0) out[lang] = row;
  }
  return out;
}
