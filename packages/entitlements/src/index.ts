import type { PrismaClient } from "@iq-rest/db";

// ─────────────────────────────────────────────────────────────────────────────
// @iq-rest/entitlements — the SINGLE source of truth for PRO-feature /
// capability resolution. Replaces the two byte-identical copies that used to
// live at apps/dashboard-api/src/common/entitlements.ts and
// apps/public-menu-api/src/common/entitlements.ts (both now re-export this).
//
// Two layers live here:
//   1. LEGACY per-restaurant helpers (hasProFeatures, grace, account-inherit) —
//      unchanged behaviour, still driven by the per-restaurant billing columns.
//      These stay live through Phases 1–3 (dual-write) and are deleted in Ph4.
//   2. The TARGET pure capability resolver (getRestaurantCaps/getAccountCaps,
//      §3 of the migration plan) — pure functions over a normalised
//      AccountState, no Prisma. Not consumed yet (wired in Phase 3); locked by
//      the golden tests now so the refactor lands against a fixed contract.
// ─────────────────────────────────────────────────────────────────────────────

// After a payment fails the subscription goes PAST_DUE; the restaurant keeps
// full access (menu online + PRO features) for this many days past the failed
// renewal (`currentPeriodEnd`) before the menu is blocked. Keep in sync with the
// dashboard-web billing-status.ts and the public-menu SPA (__root.tsx), which
// carry their own copy of this constant (browser bundles, no shared import).
export const PAST_DUE_GRACE_DAYS = 3;
const DAY_MS = 86_400_000;

// ─── Layer 1: legacy per-restaurant entitlement (behaviour-preserving) ───────

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

// Central PRO-feature entitlement check. A restaurant gets orders/KDS/
// reservations when ANY of: legacy grandfather flag, active PRO sub, PRO plan
// still inside PAST_DUE grace, or an unexpired 14-day trial.
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

// Like `hasProFeatures` but WITHOUT the trial branch — i.e. the owner is
// genuinely PAYING for PRO (active PRO sub, PRO-in-grace, or a grandfathered
// legacy venue). Use this for perks a trial must NOT get or leak to secondary
// venues (e.g. unlimited AI images). A trial FREE row returns false here.
export function hasPaidProFeatures(r: {
  plan: string | null;
  subscriptionStatus: string | null;
  currentPeriodEnd?: Date | null;
  legacyFullAccess?: boolean | null;
}): boolean {
  if (r.legacyFullAccess) return true;
  if (r.subscriptionStatus === "ACTIVE" && r.plan === "PRO") return true;
  if (r.plan === "PRO" && inPastDueGrace(r)) return true;
  return false;
}

// Prisma `select` fragment for the fields the legacy helpers need. Spread into
// any restaurant query that gates a PRO feature so the shape stays in sync.
export const PRO_FEATURE_SELECT = {
  plan: true,
  subscriptionStatus: true,
  trialEndsAt: true,
  currentPeriodEnd: true,
  legacyFullAccess: true,
} as const;

// Same fields plus `id` — needed by the account-level helpers below.
export const PRO_ACCESS_SELECT = { id: true, ...PRO_FEATURE_SELECT } as const;

// ─── Layer 1b: account-level PRO (legacy, owner-scan based) ───────────────────
//
// A single PRO subscription entitles ALL of an owner's restaurants. BASIC stays
// per-restaurant. Owner = the RestaurantUser with a null `addedBy` (creator).
//
// NOTE: plan/subscriptionStatus/billingCycle columns are TEXT in the prod DB
// (drifted from the declared enums), so Prisma enum WHERE filters (`plan:"PRO"`)
// crash at runtime (`operator does not exist: text = "Plan"`). We never filter
// those columns in SQL — load the owner-restaurant set and apply hasProFeatures
// in JS (plain string reads).

type ProDb = Pick<PrismaClient, "restaurant" | "restaurantUser">;

// True if any restaurant OWNED (RestaurantUser.addedBy === null) by one of
// `ownerIds` is entitled to PRO features. Empty list → false.
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

// Account-aware entitlement for a single restaurant. Fast path returns without a
// query when the row is entitled on its own; otherwise resolve the owner and
// check their venues so a PRO owner's extra (FREE-row) venues inherit PRO.
// Orphan rows (no addedBy=null owner) fail closed.
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
  const owners = await prisma.restaurantUser.findMany({
    where: { restaurantId: restaurant.id, addedBy: null },
    select: { userId: true },
  });
  return ownerHasProAccess(
    prisma,
    owners.map((o) => o.userId),
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Layer 2: TARGET pure capability resolver (§3 / §5 of the migration plan)
//
// Pure functions over a normalised AccountState — no Prisma, no DB. The caller
// (Phase 3) builds AccountState from the Account + Subscription rows; a trivial
// adapter (`accountStateFromLegacyRestaurant`, below) also builds it from a
// single current restaurant row so the resolver can be exercised against
// today's data. Resolution order matches §3 exactly.
// ─────────────────────────────────────────────────────────────────────────────

export type PlanCode = "FREE" | "BASIC" | "PRO";

// Per-venue PRO bypass (migrated from legacyFullAccess). 'PRO' → the venue is
// full PRO regardless of the account subscription. Usually null.
export type PlanOverride = "PRO" | null;

export type SubscriptionState = {
  plan: PlanCode | string | null;
  status: string | null; // ACTIVE | PAST_DUE | CANCELED | INACTIVE | ...
  currentPeriodEnd?: Date | null;
  // BASIC: which single venue "takes" the subscription. PRO/trial = null.
  appliesToRestaurantId?: string | null;
};

export type AccountState = {
  trialEndsAt?: Date | null;
  // Number of restaurants the account holds; PRO/trial can hold up to venueLimit.
  restaurantCount?: number;
  venueLimit: number;
  subscription: SubscriptionState | null;
};

export type RestaurantCapabilities = {
  menuOnline: boolean; // false → public-menu paywall overlay
  orders: boolean;
  kds: boolean;
  reservations: boolean;
  aiUnlimited: boolean; // paid PRO only — a trial does NOT get unlimited AI
};

export type AccountCapabilities = {
  venueLimit: number;
  canAddVenue: boolean;
};

const FULL_PRO_CAPS: RestaurantCapabilities = {
  menuOnline: true,
  orders: true,
  kds: true,
  reservations: true,
  aiUnlimited: true,
};

const INACTIVE_CAPS: RestaurantCapabilities = {
  menuOnline: false,
  orders: false,
  kds: false,
  reservations: false,
  aiUnlimited: false,
};

// BASIC = live digital menu only, no operational features, no unlimited AI.
const BASIC_CAPS: RestaurantCapabilities = {
  menuOnline: true,
  orders: false,
  kds: false,
  reservations: false,
  aiUnlimited: false,
};

// Full PRO but earned via trial → everything except unlimited AI (§ ai-quota:
// a trial must not get the paid-PRO AI perk).
const TRIAL_PRO_CAPS: RestaurantCapabilities = { ...FULL_PRO_CAPS, aiUnlimited: false };

export function isTrialActive(account: Pick<AccountState, "trialEndsAt">): boolean {
  return !!account.trialEndsAt && account.trialEndsAt > new Date();
}

// True while the account's subscription counts as an active PRO (active PRO, or
// PRO still inside PAST_DUE grace).
export function isProActive(sub: SubscriptionState | null): boolean {
  if (!sub) return false;
  if (sub.status === "ACTIVE" && sub.plan === "PRO") return true;
  if (sub.plan === "PRO" && inPastDueGrace({ subscriptionStatus: sub.status, currentPeriodEnd: sub.currentPeriodEnd }))
    return true;
  return false;
}

// True while the account's subscription is an active BASIC (active, or BASIC in
// PAST_DUE grace — same grace policy as PRO).
export function isBasicActive(sub: SubscriptionState | null): boolean {
  if (!sub) return false;
  if (sub.status === "ACTIVE" && sub.plan === "BASIC") return true;
  if (sub.plan === "BASIC" && inPastDueGrace({ subscriptionStatus: sub.status, currentPeriodEnd: sub.currentPeriodEnd }))
    return true;
  return false;
}

// Capabilities for one restaurant under its account. Resolution order (§3):
//   1. planOverride==='PRO'  → full PRO, regardless of subscription (highest).
//   2. trial active          → full PRO (minus unlimited AI) for every venue.
//   3. PRO active            → full PRO for every venue.
//   4. BASIC active          → BASIC only for the appliesToRestaurantId venue;
//                              every other venue is inactive.
//   5. otherwise             → inactive (menu offline).
export function getRestaurantCaps(
  account: AccountState,
  restaurant: { id: string; planOverride?: PlanOverride | string | null },
): RestaurantCapabilities {
  if (restaurant.planOverride === "PRO") return { ...FULL_PRO_CAPS };
  if (isTrialActive(account)) return { ...TRIAL_PRO_CAPS };
  const sub = account.subscription;
  if (isProActive(sub)) return { ...FULL_PRO_CAPS };
  if (isBasicActive(sub)) {
    return sub!.appliesToRestaurantId === restaurant.id
      ? { ...BASIC_CAPS }
      : { ...INACTIVE_CAPS };
  }
  return { ...INACTIVE_CAPS };
}

// Account-wide capabilities: how many venues may exist / be created.
// canAddVenue = (trial || PRO active) && count < venueLimit. BASIC / no-sub
// accounts cannot add venues (the create gate for the very first venue is
// handled at onboarding, not here).
export function getAccountCaps(account: AccountState): AccountCapabilities {
  const count = account.restaurantCount ?? 0;
  const unlimitedTier = isTrialActive(account) || isProActive(account.subscription);
  return {
    venueLimit: account.venueLimit,
    canAddVenue: unlimitedTier && count < account.venueLimit,
  };
}

// Adapter: build an AccountState from a single legacy restaurant row (today's
// per-restaurant billing columns). Lets the target resolver run against current
// data before the Account/Subscription tables exist. In Phase 3 the caller
// builds AccountState from the real Account + Subscription instead.
//
// legacyFullAccess maps to planOverride='PRO' on the restaurant, so it is passed
// through on the restaurant side, not the account side (per §3: per-venue, not
// account-wide). Here we surface it via the returned `planOverride`.
export function accountStateFromLegacyRestaurant(r: {
  id: string;
  plan: string | null;
  subscriptionStatus: string | null;
  trialEndsAt?: Date | null;
  currentPeriodEnd?: Date | null;
  legacyFullAccess?: boolean | null;
  venueLimit?: number;
}): { account: AccountState; restaurant: { id: string; planOverride: PlanOverride } } {
  return {
    account: {
      trialEndsAt: r.trialEndsAt ?? null,
      restaurantCount: 1,
      venueLimit: r.venueLimit ?? 4,
      subscription:
        r.plan == null
          ? null
          : {
              plan: r.plan,
              status: r.subscriptionStatus,
              currentPeriodEnd: r.currentPeriodEnd ?? null,
              appliesToRestaurantId: r.plan === "BASIC" ? r.id : null,
            },
    },
    restaurant: { id: r.id, planOverride: r.legacyFullAccess ? "PRO" : null },
  };
}
