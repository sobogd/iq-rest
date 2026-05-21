import { prisma } from "./prisma";

/**
 * Primary restaurant id for a company (first by createdAt). Old soqrmenuweb
 * dashboard always edits the primary restaurant; never sees multi-restaurant
 * accounts as multi. Mirrors AuthGuard fallback in the new dashboard API.
 *
 * Throws when the company has zero restaurants — every post-onboarding path
 * that calls this assumes at least one exists, and Phase 0C now enforces
 * NOT NULL on items/categories/page_views.restaurantId so a missing primary
 * would also break inserts.
 */
export async function getPrimaryRestaurantId(companyId: string): Promise<string> {
  const r = await prisma.restaurant.findFirst({
    where: { companyId },
    select: { id: true },
    orderBy: { createdAt: "asc" },
  });
  if (!r) throw new Error(`No restaurant for company ${companyId}`);
  return r.id;
}
