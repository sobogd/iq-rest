import type { PrismaClient } from "@iq-rest/db";

// ─────────────────────────────────────────────────────────────────────────────
// @iq-rest/entitlements — the SINGLE source of truth for capability resolution.
// Re-exported by both APIs (apps/*/src/common/entitlements.ts).
//
// Access ("whether" a venue is live) is gated on the account SUBSCRIPTION STATUS
// (+ trial + per-venue planOverride) — there is no plan-tier concept anymore
// (PRO/BASIC/FREE were retired for à-la-carte per-feature pricing). WHICH
// features a live venue gets come entirely from its persisted feat* flags. The
// resolver is pure (no Prisma); callers build AccountState from the Account +
// Subscription rows (accountStateFromRow).
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

// ─── PAST_DUE grace window ───────────────────────────────────────────────────

// Millisecond deadline of the PAST_DUE grace window, or null when not PAST_DUE.
// Anchored on `pastDueSince` — the EXACT moment the renewal first failed, stamped
// by the Stripe webhook / reconcile. Falls back to the interval-derived period
// START (currentPeriodEnd − one interval) for rows not yet backfilled with a
// pastDueSince. Never uses the future currentPeriodEnd Stripe leaves on the row
// during dunning (that would keep grace open for the whole unpaid period).
export function pastDueGraceEndMs(r: {
  subscriptionStatus: string | null;
  pastDueSince?: Date | null;
  currentPeriodEnd?: Date | null;
  interval?: string | null;
}): number | null {
  if (r.subscriptionStatus !== "PAST_DUE") return null;
  const anchorMs = r.pastDueSince
    ? new Date(r.pastDueSince).getTime()
    : r.currentPeriodEnd
      ? pastDuePeriodStartMs(new Date(r.currentPeriodEnd), r.interval)
      : null;
  if (anchorMs === null) return null;
  return anchorMs + PAST_DUE_GRACE_DAYS * DAY_MS;
}

// True while a PAST_DUE subscription is still inside its grace window.
export function inPastDueGrace(r: {
  subscriptionStatus: string | null;
  pastDueSince?: Date | null;
  currentPeriodEnd?: Date | null;
  interval?: string | null;
}): boolean {
  const end = pastDueGraceEndMs(r);
  return end !== null && end > Date.now();
}

// ─────────────────────────────────────────────────────────────────────────────
// Pure capability resolver — no Prisma, no DB. Callers build AccountState from
// the Account + Subscription rows (accountStateFromRow).
// ─────────────────────────────────────────────────────────────────────────────

// Per-venue full-access bypass (free comp). 'PRO' → the venue is
// full PRO regardless of the account subscription. Usually null.
export type PlanOverride = "PRO" | null;

export type SubscriptionState = {
  status: string | null; // ACTIVE | PAST_DUE | CANCELED | INACTIVE | ...
  currentPeriodEnd?: Date | null;
  // Billing interval ("month"/"year" or legacy "MONTHLY"/"YEARLY"). Used as the
  // FALLBACK anchor for the PAST_DUE grace window (period start) when pastDueSince
  // is absent.
  interval?: string | null;
  // Exact moment the renewal first failed — the primary PAST_DUE grace anchor.
  pastDueSince?: Date | null;
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
  // customDomain is an à-la-carte add-on, never implied by a tier → false in the
  // tier-derived (fallback) path; the flag path reads featCustomDomain.
  customDomain: false,
};

const INACTIVE_CAPS: RestaurantCapabilities = {
  menuOnline: false,
  orders: false,
  kds: false,
  reservations: false,
  customDomain: false,
};

// A trial gets the full operational set (same as a paid sub).
const TRIAL_PRO_CAPS: RestaurantCapabilities = { ...FULL_PRO_CAPS };

export function isTrialActive(account: Pick<AccountState, "trialEndsAt">): boolean {
  return !!account.trialEndsAt && account.trialEndsAt > new Date();
}

// True while the account's subscription is paying (ACTIVE, or still inside the
// PAST_DUE grace window). There is no plan tier anymore — any active/grace
// subscription grants account-wide access; feat* flags decide the feature set.
export function isPaidActive(sub: SubscriptionState | null): boolean {
  if (!sub) return false;
  if (sub.status === "ACTIVE") return true;
  return inPastDueGrace({
    subscriptionStatus: sub.status,
    pastDueSince: sub.pastDueSince,
    currentPeriodEnd: sub.currentPeriodEnd,
    interval: sub.interval,
  });
}

// "Whether" gate — does this venue have ANY access right now? Access is granted
// by (highest first): per-venue full-access override, an active trial, or a
// paying account subscription (account-wide). No access → menu offline
// (INACTIVE_CAPS). Free comps are done via planOverride or a manually-set ACTIVE
// subscription.
export function hasVenueAccess(
  account: AccountState,
  restaurant: { id: string; planOverride?: PlanOverride | string | null },
): boolean {
  if (restaurant.planOverride === "PRO") return true;
  if (isTrialActive(account)) return true;
  return isPaidActive(account.subscription);
}

// True when the row carries explicit persisted feature flags (the DB read path).
// A flag-less row (unit tests, defensive callers) uses the tier fallback instead.
function hasExplicitFlags(r: RestaurantFeatureFlags): boolean {
  return (
    typeof r.featMenuOnline === "boolean" ||
    typeof r.featOrders === "boolean" ||
    typeof r.featKds === "boolean" ||
    typeof r.featReservations === "boolean" ||
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
    customDomain: !!r.featCustomDomain,
  };
}

// Access-derived caps — the fallback for rows that don't carry feature flags
// (unit tests / defensive callers). Any granted access → full operational set;
// no access → inactive. Real DB rows always carry feat* flags and use
// capsFromFlags instead.
function tierCaps(
  account: AccountState,
  restaurant: { id: string; planOverride?: PlanOverride | string | null },
): RestaurantCapabilities {
  return hasVenueAccess(account, restaurant) ? { ...FULL_PRO_CAPS } : { ...INACTIVE_CAPS };
}

// Capabilities for one restaurant under its account.
//   whether: hasVenueAccess (override / trial / paid subscription)
//   which:   persisted feature flags if present, else access-derived (fallback).
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
// behaviour). Operational features follow trial/PRO/override. Callers persist
// these on the new Restaurant row.
export function defaultFeatureFlagsForNewVenue(
  account: AccountState,
  planOverride?: PlanOverride | string | null,
): {
  featMenuOnline: boolean;
  featOrders: boolean;
  featKds: boolean;
  featReservations: boolean;
  featCustomDomain: boolean;
} {
  const override = planOverride === "PRO";
  const operational = override || isTrialActive(account) || isPaidActive(account.subscription);
  return {
    featMenuOnline: true,
    featOrders: operational,
    featKds: operational,
    featReservations: operational,
    featCustomDomain: false,
  };
}

// Account-wide capabilities: how many venues may exist / be created.
// canAddVenue = (trial || paid subscription) && count < venueLimit. No-sub
// accounts cannot add venues (the create gate for the very first venue is
// handled at onboarding, not here).
export function getAccountCaps(account: AccountState): AccountCapabilities {
  const count = account.restaurantCount ?? 0;
  const unlimitedTier = isTrialActive(account) || isPaidActive(account.subscription);
  return {
    venueLimit: account.venueLimit,
    canAddVenue: unlimitedTier && count < account.venueLimit,
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// Prisma-backed account entitlement (the live read path). A restaurant's
// capabilities are resolved from its Account + Subscription (the account is the
// entitlement boundary).
// ─────────────────────────────────────────────────────────────────────────────

// Prisma `select` fragment: spread into any restaurant query that needs account
// entitlement so the account + subscription + venue-count come along in ONE
// query (no per-request owner scan).
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
  account: {
    select: {
      trialEndsAt: true,
      venueLimit: true,
      subscription: {
        select: {
          status: true,
          billingCycle: true,
          currentPeriodEnd: true,
          pastDueSince: true,
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
  account?: {
    trialEndsAt: Date | null;
    venueLimit: number;
    subscription: {
      status: string;
      billingCycle?: string | null;
      currentPeriodEnd: Date | null;
      pastDueSince?: Date | null;
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
              status: sub.status,
              currentPeriodEnd: sub.currentPeriodEnd ?? null,
              // New ad-hoc `interval`, falling back to the legacy `billingCycle`
              // — the FALLBACK grace anchor when pastDueSince is absent.
              interval: sub.interval ?? sub.billingCycle ?? null,
              // Exact failed-renewal moment — the primary PAST_DUE grace anchor.
              pastDueSince: sub.pastDueSince ?? null,
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
