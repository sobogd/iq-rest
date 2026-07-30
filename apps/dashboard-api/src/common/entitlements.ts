import type { PrismaClient, Prisma } from "@iq-rest/db";

// Central PRO-feature entitlement check.
//
// As of the PRO-gating change, the operational features — order taking
// (Orders + waiter kiosk), the kitchen display (KDS), and reservations — are
// PRO-only. BASIC is a "live digital menu" tier with no order/kitchen/booking
// surface and no kiosks.
//
// A restaurant gets these features when ANY of:
//   - it has an ACTIVE PRO subscription, OR
//   - it is inside its 14-day trial window (`trialEndsAt > now`), OR
//   - it is a PRO plan still inside the post-payment-failure grace window
//     (PAST_DUE, `currentPeriodEnd + PAST_DUE_GRACE_DAYS` not yet passed), OR
//   - it carries the `legacyFullAccess` grandfather flag (a few pre-gating
//     BASIC venues that already relied on orders/kitchen/reservations).
//
// Distinct from `isPaidActive` (ai-quota.ts), which gates the menu staying
// online + AI image generation and still treats BASIC as paid. Keep the two
// separate: BASIC keeps its menu, but loses the operational features.

// After a payment fails the subscription goes PAST_DUE; the restaurant keeps
// full access (menu online + PRO features) for this many days past the failed
// renewal (`currentPeriodEnd`) before the menu is blocked. Keep in sync with
// the public-menu-api copy and the public-menu SPA (__root.tsx).
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

// Prisma `select` fragment for the fields `hasProFeatures` needs. Spread into
// any restaurant query that gates a PRO feature so the shape stays in sync.
export const PRO_FEATURE_SELECT = {
  plan: true,
  subscriptionStatus: true,
  trialEndsAt: true,
  currentPeriodEnd: true,
  legacyFullAccess: true,
} as const;

// Same fields plus `id` — needed by the account-level helpers below, which have
// to know which restaurant they're resolving the owner for.
export const PRO_ACCESS_SELECT = { id: true, ...PRO_FEATURE_SELECT } as const;

// ─── Account-level PRO ──────────────────────────────────────────────────────
//
// Pricing model: a single PRO subscription entitles ALL of an owner's
// restaurants (the "PRO = multiple restaurants" promise on the landing).
// BASIC stays per-restaurant (only the one venue it's paid on). So entitlement
// is: this restaurant's OWN row is entitled, OR the restaurant's owner holds
// PRO on any of their restaurants. Owner = the RestaurantUser with a null
// `addedBy` (the creator); managers attached via grant don't count.

type ProDb = Pick<PrismaClient, "restaurant" | "restaurantUser">;

// Prisma `where` fragment mirroring `hasProFeatures`, pushed into SQL so the
// account-level lookups resolve in a single indexed query instead of loading
// rows and filtering in JS. MUST stay in lockstep with `hasProFeatures`:
//   legacy OR (ACTIVE PRO) OR (PRO in PAST_DUE grace) OR (trial not expired).
// PAST_DUE grace: currentPeriodEnd + grace > now  ⟺  currentPeriodEnd > now-grace.
function entitledWhere(): Prisma.RestaurantWhereInput {
  const now = new Date();
  const graceCutoff = new Date(now.getTime() - PAST_DUE_GRACE_DAYS * DAY_MS);
  return {
    OR: [
      { legacyFullAccess: true },
      { plan: "PRO", subscriptionStatus: "ACTIVE" },
      { plan: "PRO", subscriptionStatus: "PAST_DUE", currentPeriodEnd: { gt: graceCutoff } },
      { trialEndsAt: { gt: now } },
    ],
  };
}

// True if any restaurant OWNED (RestaurantUser.addedBy === null) by one of
// `ownerIds` is entitled to PRO. One indexed query, short-circuits on first hit.
export async function ownerHasProAccess(
  prisma: ProDb,
  ownerIds: string[],
): Promise<boolean> {
  if (ownerIds.length === 0) return false;
  const hit = await prisma.restaurant.findFirst({
    where: {
      AND: [
        entitledWhere(),
        { restaurantUsers: { some: { userId: { in: ownerIds }, addedBy: null } } },
      ],
    },
    select: { id: true },
  });
  return hit !== null;
}

// Account-aware entitlement for a single restaurant. Fast path: if the row is
// entitled on its own (own PRO sub / trial / legacy) return true with NO query.
// Otherwise a single query asks: does an entitled restaurant exist that is owned
// by an owner of this one? — so a PRO owner's extra (FREE-row) restaurants
// inherit PRO. Orphan rows (no addedBy=null owner) fail closed. Pass a row
// selected with PRO_ACCESS_SELECT.
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
  const hit = await prisma.restaurant.findFirst({
    where: {
      AND: [
        entitledWhere(),
        {
          restaurantUsers: {
            some: {
              addedBy: null,
              user: {
                restaurantUsers: {
                  some: { addedBy: null, restaurantId: restaurant.id },
                },
              },
            },
          },
        },
      ],
    },
    select: { id: true },
  });
  return hit !== null;
}
