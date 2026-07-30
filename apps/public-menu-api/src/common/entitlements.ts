import type { PrismaClient } from "@iq-rest/db";

// PRO-feature entitlement (diner side). Mirrors the dashboard-api helper:
// orders + reservations are PRO-only. A restaurant is entitled when it has an
// ACTIVE PRO subscription, is inside its trial window, is a PRO plan still in
// its post-payment-failure grace window, or carries the `legacyFullAccess`
// grandfather flag. BASIC = view-only menu.

// After a payment fails the subscription goes PAST_DUE; the restaurant keeps
// full access (menu online + PRO features) for this many days past the failed
// renewal (`currentPeriodEnd`) before the menu is blocked. Keep in sync with
// the dashboard-api copy and the public-menu SPA (__root.tsx).
export const PAST_DUE_GRACE_DAYS = 3;
const DAY_MS = 86_400_000;

// Millisecond deadline of the PAST_DUE grace window, or null when not PAST_DUE.
export function pastDueGraceEndMs(r: {
  subscriptionStatus: string | null;
  currentPeriodEnd?: Date | null;
}): number | null {
  if (r.subscriptionStatus !== "PAST_DUE" || !r.currentPeriodEnd) return null;
  return new Date(r.currentPeriodEnd).getTime() + PAST_DUE_GRACE_DAYS * DAY_MS;
}

// True while a PAST_DUE subscription is still inside its grace window.
export function inPastDueGrace(r: {
  subscriptionStatus: string | null;
  currentPeriodEnd?: Date | null;
}): boolean {
  const end = pastDueGraceEndMs(r);
  return end !== null && end > Date.now();
}

export function hasProFeatures(r: {
  plan: string | null;
  subscriptionStatus: string | null;
  trialEndsAt?: Date | null;
  currentPeriodEnd?: Date | null;
  legacyFullAccess?: boolean | null;
}): boolean {
  if (r.legacyFullAccess) return true;
  if (r.subscriptionStatus === "ACTIVE" && r.plan === "PRO") return true;
  // A PRO plan whose renewal just failed keeps its PRO features during grace.
  if (r.plan === "PRO" && inPastDueGrace(r)) return true;
  return !!r.trialEndsAt && r.trialEndsAt > new Date();
}

export const PRO_FEATURE_SELECT = {
  plan: true,
  subscriptionStatus: true,
  trialEndsAt: true,
  currentPeriodEnd: true,
  legacyFullAccess: true,
} as const;

// Same fields plus `id` — needed by the account-level helpers below.
export const PRO_ACCESS_SELECT = { id: true, ...PRO_FEATURE_SELECT } as const;

// ─── Account-level PRO (mirrors dashboard-api) ──────────────────────────────
//
// A single PRO subscription entitles ALL of an owner's restaurants (the
// "PRO = multiple restaurants" promise). BASIC stays per-restaurant. Diner
// side has no logged-in user, so the owner is resolved straight from the
// restaurant row (the RestaurantUser with null `addedBy`, i.e. the creator).

type ProDb = Pick<PrismaClient, "restaurant" | "restaurantUser">;

// True if ANY restaurant OWNED (RestaurantUser.addedBy === null) by one of
// `ownerIds` is itself entitled to PRO features. Empty list → false.
export async function ownerHasProAccess(
  prisma: ProDb,
  ownerIds: string[],
): Promise<boolean> {
  if (ownerIds.length === 0) return false;
  const owned = await prisma.restaurant.findMany({
    where: {
      restaurantUsers: { some: { userId: { in: ownerIds }, addedBy: null } },
    },
    select: PRO_FEATURE_SELECT,
  });
  return owned.some(hasProFeatures);
}

// Account-aware entitlement for a single restaurant. Fast path returns without
// a query when the row is entitled on its own; otherwise the restaurant's
// owner is checked so a PRO owner's extra (FREE-row) venues inherit PRO.
export async function restaurantHasProAccess(
  prisma: ProDb,
  restaurant: {
    id: string;
    plan: string | null;
    subscriptionStatus: string | null;
    trialEndsAt?: Date | null;
    currentPeriodEnd?: Date | null;
    legacyFullAccess?: boolean | null;
  },
): Promise<boolean> {
  if (hasProFeatures(restaurant)) return true;
  const ownerIds = await resolveOwnerIds(prisma, restaurant.id);
  return ownerHasProAccess(prisma, ownerIds);
}

// Resolve the owning user(s) of a restaurant. Normally exactly one
// RestaurantUser has `addedBy = null` (the creator). If the creator row is
// missing (orphan), fall back to the earliest attached user so the venue can
// still inherit PRO instead of being permanently locked out.
async function resolveOwnerIds(
  prisma: ProDb,
  restaurantId: string,
): Promise<string[]> {
  const owners = await prisma.restaurantUser.findMany({
    where: { restaurantId, addedBy: null },
    select: { userId: true },
  });
  if (owners.length > 0) return owners.map((o) => o.userId);
  const earliest = await prisma.restaurantUser.findFirst({
    where: { restaurantId },
    orderBy: { addedAt: "asc" },
    select: { userId: true },
  });
  return earliest ? [earliest.userId] : [];
}
