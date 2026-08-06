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

// One billing interval in days (approximate — a whole-day model is enough for a
// coarse 3-day grace window). Unknown / null interval → assume monthly. Accepts
// both the new ad-hoc `interval` ("month"/"year") and the legacy `billingCycle`
// ("MONTHLY"/"YEARLY").
const INTERVAL_DAYS: Record<string, number> = { month: 30, MONTHLY: 30, year: 365, YEARLY: 365 };

// Start (ms) of the CURRENT — now unpaid — Stripe period: currentPeriodEnd minus
// one billing interval. On a failed renewal Stripe advances `current_period_end`
// to the new (unpaid) period, so that timestamp is NOT the moment access should
// wind down; the renewal that FAILED sits at the period START. Grace runs from
// here, not from the (future) end.
function pastDuePeriodStartMs(currentPeriodEnd: Date, interval?: string | null): number {
  const days = (interval && INTERVAL_DAYS[interval]) || 30;
  return currentPeriodEnd.getTime() - days * DAY_MS;
}

// ─── Layer 1: legacy per-restaurant entitlement (behaviour-preserving) ───────

// Millisecond deadline of the PAST_DUE grace window, or null when not PAST_DUE.
// Anchored to the failed renewal (period START = currentPeriodEnd − one interval),
// NOT to the future currentPeriodEnd Stripe leaves on the row during dunning.
export function pastDueGraceEndMs(r: {
  subscriptionStatus: string | null;
  currentPeriodEnd?: Date | null;
  interval?: string | null;
}): number | null {
  if (r.subscriptionStatus !== "PAST_DUE" || !r.currentPeriodEnd) return null;
  return pastDuePeriodStartMs(new Date(r.currentPeriodEnd), r.interval) + PAST_DUE_GRACE_DAYS * DAY_MS;
}

// True while a PAST_DUE subscription is still inside its grace window.
export function inPastDueGrace(r: {
  subscriptionStatus: string | null;
  currentPeriodEnd?: Date | null;
  interval?: string | null;
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

// NOTE (Phase 4 cutover): the legacy Prisma-coupled helpers PRO_FEATURE_SELECT /
// PRO_ACCESS_SELECT / ownerHasProAccess / restaurantHasProAccess were removed —
// they read the per-restaurant billing columns that no longer exist. All
// entitlement now flows through Layer 3 (account resolver) below. The pure
// hasProFeatures / hasPaidProFeatures above remain for the golden tests.

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
  // Billing interval ("month"/"year" or legacy "MONTHLY"/"YEARLY"). Used to
  // anchor the PAST_DUE grace window to the failed renewal (period start).
  interval?: string | null;
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
  customDomain: boolean; // serve this venue on its own domain (flag-gated)
};

// Persisted per-restaurant feature flags (billing-features-constructor). When a
// row carries these, they are the authoritative "which features" set once access
// is granted; a row without them (unit tests / defensive callers) falls back to
// the tier-derived caps (pre-flag behaviour) — see getRestaurantCaps.
export type RestaurantFeatureFlags = {
  featMenuOnline?: boolean | null;
  featOrders?: boolean | null;
  featKds?: boolean | null;
  featReservations?: boolean | null;
  featCustomDomain?: boolean | null;
  featAiUnlimited?: boolean | null;
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
  // customDomain is an à-la-carte add-on, never implied by a tier → false in the
  // tier-derived (fallback) path; the flag path reads featCustomDomain.
  customDomain: false,
};

const INACTIVE_CAPS: RestaurantCapabilities = {
  menuOnline: false,
  orders: false,
  kds: false,
  reservations: false,
  aiUnlimited: false,
  customDomain: false,
};

// BASIC = live digital menu only, no operational features, no unlimited AI.
const BASIC_CAPS: RestaurantCapabilities = {
  menuOnline: true,
  orders: false,
  kds: false,
  reservations: false,
  aiUnlimited: false,
  customDomain: false,
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
  if (
    sub.plan === "PRO" &&
    inPastDueGrace({ subscriptionStatus: sub.status, currentPeriodEnd: sub.currentPeriodEnd, interval: sub.interval })
  )
    return true;
  return false;
}

// True while the account's subscription is an active BASIC (active, or BASIC in
// PAST_DUE grace — same grace policy as PRO).
export function isBasicActive(sub: SubscriptionState | null): boolean {
  if (!sub) return false;
  if (sub.status === "ACTIVE" && sub.plan === "BASIC") return true;
  if (
    sub.plan === "BASIC" &&
    inPastDueGrace({ subscriptionStatus: sub.status, currentPeriodEnd: sub.currentPeriodEnd, interval: sub.interval })
  )
    return true;
  return false;
}

// "Whether" gate — does this venue have ANY access right now? Access is granted
// by (highest first): per-venue PRO override, an active trial, an active PRO
// subscription (account-wide), or an active BASIC subscription that is pinned to
// THIS venue. No access → menu offline (INACTIVE_CAPS). (Free comps are done via
// a manually-set ACTIVE subscription now — the manualAccess bypass was removed.)
export function hasVenueAccess(
  account: AccountState,
  restaurant: { id: string; planOverride?: PlanOverride | string | null },
): boolean {
  if (restaurant.planOverride === "PRO") return true;
  if (isTrialActive(account)) return true;
  const sub = account.subscription;
  if (isProActive(sub)) return true;
  if (isBasicActive(sub) && sub!.appliesToRestaurantId === restaurant.id) return true;
  return false;
}

// True when the row carries explicit persisted feature flags (the DB read path).
// A flag-less row (unit tests, defensive callers) uses the tier fallback instead.
function hasExplicitFlags(r: RestaurantFeatureFlags): boolean {
  return (
    typeof r.featMenuOnline === "boolean" ||
    typeof r.featOrders === "boolean" ||
    typeof r.featKds === "boolean" ||
    typeof r.featReservations === "boolean" ||
    typeof r.featAiUnlimited === "boolean" ||
    typeof r.featCustomDomain === "boolean"
  );
}

// "Which" set — capabilities straight from the persisted flags. menuOnline
// defaults on (a paid venue with no explicit menu flag is still online).
function capsFromFlags(r: RestaurantFeatureFlags): RestaurantCapabilities {
  return {
    menuOnline: r.featMenuOnline ?? true,
    orders: !!r.featOrders,
    kds: !!r.featKds,
    reservations: !!r.featReservations,
    aiUnlimited: !!r.featAiUnlimited,
    customDomain: !!r.featCustomDomain,
  };
}

// Tier-derived caps — the pre-flag behaviour, kept as the fallback for rows that
// don't carry feature flags. Resolution order (§3):
//   1. planOverride==='PRO' → full PRO   2. trial → full PRO minus AI
//   3. PRO active → full PRO   4. BASIC active → BASIC on the pinned venue only
//   5. otherwise → inactive.
function tierCaps(
  account: AccountState,
  restaurant: { id: string; planOverride?: PlanOverride | string | null },
): RestaurantCapabilities {
  if (restaurant.planOverride === "PRO") return { ...FULL_PRO_CAPS };
  if (isTrialActive(account)) return { ...TRIAL_PRO_CAPS };
  const sub = account.subscription;
  if (isProActive(sub)) return { ...FULL_PRO_CAPS };
  if (isBasicActive(sub)) {
    return sub!.appliesToRestaurantId === restaurant.id ? { ...BASIC_CAPS } : { ...INACTIVE_CAPS };
  }
  return { ...INACTIVE_CAPS };
}

// Capabilities for one restaurant under its account.
//   whether: hasVenueAccess (override / manual / trial / PRO / pinned-BASIC)
//   which:   persisted feature flags if present, else tier-derived (fallback).
// No access → INACTIVE_CAPS regardless of flags (flags never leak menu/features
// to an unpaid venue). This is the single seam the whole platform gates on.
export function getRestaurantCaps(
  account: AccountState,
  restaurant: {
    id: string;
    planOverride?: PlanOverride | string | null;
  } & RestaurantFeatureFlags,
): RestaurantCapabilities {
  if (!hasVenueAccess(account, restaurant)) return { ...INACTIVE_CAPS };
  return hasExplicitFlags(restaurant) ? capsFromFlags(restaurant) : tierCaps(account, restaurant);
}

// Default feature flags for a NEWLY created venue, mirroring what the account's
// current tier would grant (so adding a venue during a trial/PRO keeps today's
// behaviour). Operational features follow trial/PRO/override; unlimited AI is
// paid-PRO only (never a trial). Callers persist these on the new Restaurant row.
export function defaultFeatureFlagsForNewVenue(
  account: AccountState,
  planOverride?: PlanOverride | string | null,
): {
  featMenuOnline: boolean;
  featOrders: boolean;
  featKds: boolean;
  featReservations: boolean;
  featAiUnlimited: boolean;
  featCustomDomain: boolean;
} {
  const override = planOverride === "PRO";
  const operational = override || isTrialActive(account) || isProActive(account.subscription);
  const paidPro = override || isProActive(account.subscription);
  return {
    featMenuOnline: true,
    featOrders: operational,
    featKds: operational,
    featReservations: operational,
    featAiUnlimited: paidPro,
    featCustomDomain: false,
  };
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

// ─────────────────────────────────────────────────────────────────────────────
// Layer 3: Prisma-backed account entitlement (Phase 3 — the live read path)
//
// Callers switch from the legacy per-restaurant helpers (Layer 1) to these. A
// restaurant's capabilities are resolved from its Account + Subscription (the
// account is the entitlement boundary; §3). During the dual-write window a
// restaurant whose `accountId` is still NULL (orphan / not yet backfilled) falls
// back to its legacy billing columns so nothing fails closed mid-migration.
// ─────────────────────────────────────────────────────────────────────────────

// Prisma `select` fragment: spread into any restaurant query that needs account
// entitlement so the account + subscription + venue-count come along in ONE
// query (no per-request owner scan). Includes the legacy columns as the
// orphan-row fallback.
export const ACCOUNT_ENTITLEMENT_SELECT = {
  id: true,
  planOverride: true,
  accountId: true,
  // Persisted per-restaurant feature flags (billing-features-constructor).
  featMenuOnline: true,
  featOrders: true,
  featKds: true,
  featReservations: true,
  featCustomDomain: true,
  featAiUnlimited: true,
  account: {
    select: {
      trialEndsAt: true,
      venueLimit: true,
      subscription: {
        select: {
          plan: true,
          status: true,
          billingCycle: true,
          currentPeriodEnd: true,
          appliesToRestaurantId: true,
          cancelAtPeriodEnd: true,
          amount: true,
          currency: true,
          interval: true,
        },
      },
      _count: { select: { restaurants: true } },
    },
  },
} as const;

// The shape produced by ACCOUNT_ENTITLEMENT_SELECT. Post-cutover every
// restaurant has an account (accountId NOT NULL), so `account` is always present
// at runtime; it stays optional in the type only for defensive callers.
export type RestaurantEntitlementRow = {
  id: string;
  planOverride?: string | null;
  accountId?: string | null;
  featMenuOnline?: boolean | null;
  featOrders?: boolean | null;
  featKds?: boolean | null;
  featReservations?: boolean | null;
  featCustomDomain?: boolean | null;
  featAiUnlimited?: boolean | null;
  account?: {
    trialEndsAt: Date | null;
    venueLimit: number;
    subscription: {
      plan: string;
      status: string;
      billingCycle?: string | null;
      currentPeriodEnd: Date | null;
      appliesToRestaurantId: string | null;
      cancelAtPeriodEnd?: boolean | null;
      amount?: number | null;
      currency?: string | null;
      interval?: string | null;
    } | null;
    _count?: { restaurants: number };
  } | null;
};

// Normalise a loaded restaurant row into (AccountState, planOverride) from its
// Account + Subscription. A missing account (should not happen post-cutover)
// resolves to inactive (fail closed).
export function accountStateFromRow(row: RestaurantEntitlementRow): {
  account: AccountState;
  planOverride: PlanOverride;
} {
  if (row.account) {
    const sub = row.account.subscription;
    return {
      account: {
        trialEndsAt: row.account.trialEndsAt ?? null,
        restaurantCount: row.account._count?.restaurants ?? 1,
        venueLimit: row.account.venueLimit,
        subscription: sub
          ? {
              plan: sub.plan,
              status: sub.status,
              currentPeriodEnd: sub.currentPeriodEnd ?? null,
              // New ad-hoc `interval`, falling back to the legacy `billingCycle`
              // — anchors the PAST_DUE grace window to the failed renewal.
              interval: sub.interval ?? sub.billingCycle ?? null,
              appliesToRestaurantId: sub.appliesToRestaurantId ?? null,
            }
          : null,
      },
      planOverride: (row.planOverride as PlanOverride) ?? null,
    };
  }
  // No account (should not happen post-cutover) → inactive, fail closed.
  return {
    account: { trialEndsAt: null, restaurantCount: 1, venueLimit: 4, subscription: null },
    planOverride: (row.planOverride as PlanOverride) ?? null,
  };
}

// Capabilities for an already-loaded restaurant row (no query). Use when the
// caller already selected ACCOUNT_ENTITLEMENT_SELECT (e.g. public menu-by-slug).
export function restaurantCapsFromRow(row: RestaurantEntitlementRow): RestaurantCapabilities {
  const { account, planOverride } = accountStateFromRow(row);
  return getRestaurantCaps(account, {
    id: row.id,
    planOverride,
    featMenuOnline: row.featMenuOnline,
    featOrders: row.featOrders,
    featKds: row.featKds,
    featReservations: row.featReservations,
    featCustomDomain: row.featCustomDomain,
    featAiUnlimited: row.featAiUnlimited,
  });
}

// Account-wide caps (venueLimit / canAddVenue) from an already-loaded row.
export function accountCapsFromRow(row: RestaurantEntitlementRow): AccountCapabilities {
  const { account } = accountStateFromRow(row);
  return getAccountCaps(account);
}

type EntitlementDb = Pick<PrismaClient, "restaurant">;

// Capabilities for one restaurant by id (one indexed query). Missing row →
// inactive (fail closed).
export async function getRestaurantCapsById(
  prisma: EntitlementDb,
  restaurantId: string,
): Promise<RestaurantCapabilities> {
  const row = (await prisma.restaurant.findUnique({
    where: { id: restaurantId },
    select: ACCOUNT_ENTITLEMENT_SELECT,
  })) as RestaurantEntitlementRow | null;
  if (!row) return { ...INACTIVE_CAPS };
  return restaurantCapsFromRow(row);
}

// Account-wide caps for one restaurant's account by restaurant id.
export async function getAccountCapsByRestaurantId(
  prisma: EntitlementDb,
  restaurantId: string,
): Promise<AccountCapabilities> {
  const row = (await prisma.restaurant.findUnique({
    where: { id: restaurantId },
    select: ACCOUNT_ENTITLEMENT_SELECT,
  })) as RestaurantEntitlementRow | null;
  if (!row) return { venueLimit: 4, canAddVenue: false };
  return accountCapsFromRow(row);
}
