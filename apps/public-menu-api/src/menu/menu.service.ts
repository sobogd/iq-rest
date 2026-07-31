import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { ACCOUNT_ENTITLEMENT_SELECT, restaurantCapsFromRow } from "../common/entitlements";

@Injectable()
export class MenuService {
  constructor(private readonly prisma: PrismaService) {}

  async getBySlug(slug: string) {
    const restaurant = await this.prisma.restaurant.findFirst({
      where: { slug },
      select: {
        title: true,
        description: true,
        slug: true,
        accentColor: true,
        currency: true,
        source: true,
        hideTitle: true,
        hideDescription: true,
        logoUrl: true,
        hideLogo: true,
        logoScale: true,
        menuLayout: true,
        titleScale: true,
        languageSwitcher: true,
        address: true,
        phone: true,
        instagram: true,
        whatsapp: true,
        languages: true,
        defaultLanguage: true,
        // Per-restaurant overrides for the diner-SPA UI strings. Merged into
        // i18next at runtime (see public-menu __root.tsx); empty ⇒ built-in text.
        customTexts: true,
        reservationsEnabled: true,
        reservationMode: true,
        reservationSlotMinutes: true,
        reservationSchedule: true,
        ordersEnabled: true,
        orderMode: true,
        orderNameEnabled: true,
        orderPhoneEnabled: true,
        orderAddressEnabled: true,
        x: true,
        y: true,
        googlePlaceId: true,
        // Account entitlement (§3): the Account + Subscription (+ legacy columns
        // as the orphan fallback) needed to resolve menuOnline / proFeatures
        // server-side. One query, no per-request owner scan.
        ...ACCOUNT_ENTITLEMENT_SELECT,
      },
    });
    if (!restaurant) throw new NotFoundException("restaurant not found");

    // Resolve capabilities from the account once, server-side. `menuOnline`
    // gates the diner paywall overlay; `proFeatures` hides the order/booking
    // surfaces for BASIC (menu-only). The SPA consumes these directly instead of
    // re-deriving plan logic (kills the __root.tsx duplicate).
    const caps = restaurantCapsFromRow(restaurant);

    const [categories, items, tables] = await Promise.all([
      this.prisma.category.findMany({
        where: { restaurantId: restaurant.id, isActive: true, deletedAt: null },
        orderBy: { sortOrder: "asc" },
        select: { id: true, name: true, translations: true, sortOrder: true, isGroup: true, parentId: true },
      }),
      this.prisma.item.findMany({
        // Only items in a live (non-deleted) category reach diners. Covers both
        // soft-deleted categories and any orphaned items.
        where: { restaurantId: restaurant.id, isActive: true, deletedAt: null, category: { deletedAt: null } },
        orderBy: { sortOrder: "asc" },
        select: {
          id: true,
          categoryId: true,
          name: true,
          description: true,
          price: true,
          imageUrl: true,
          allergens: true,
          diets: true,
          translations: true,
          sortOrder: true,
        },
      }),
      this.prisma.table.findMany({
        where: { restaurantId: restaurant.id, isActive: true, deletedAt: null },
        orderBy: { number: "asc" },
        select: { id: true, number: true, capacity: true, zone: true, translations: true, imageUrl: true },
      }),
    ]);

    // Strip account internals from the public payload; keep the legacy billing
    // fields for now (the diner SPA still reads them until it switches to
    // menuOnline/proFeatures — they are DROPped in Phase 4).
    const {
      account: _account,
      accountId: _accountId,
      planOverride: _planOverride,
      legacyFullAccess: _legacyFullAccess,
      ...restaurantPublic
    } = restaurant as typeof restaurant & Record<string, unknown>;

    return {
      // `menuOnline` drives the diner paywall overlay; `proFeatures` hides the
      // order/booking surfaces for BASIC (menu-only). Both resolved account-side
      // so the SPA doesn't re-derive plan logic.
      restaurant: {
        ...restaurantPublic,
        proFeatures: caps.orders,
        menuOnline: caps.menuOnline,
      },
      categories,
      items: items.map((i) => ({ ...i, price: Number(i.price) })),
      tables,
    };
  }
}
