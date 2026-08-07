"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ACCOUNT_ENTITLEMENT_SELECT = exports.PAST_DUE_GRACE_DAYS = void 0;
exports.pastDueGraceEndMs = pastDueGraceEndMs;
exports.inPastDueGrace = inPastDueGrace;
exports.isTrialActive = isTrialActive;
exports.isPaidActive = isPaidActive;
exports.hasVenueAccess = hasVenueAccess;
exports.getRestaurantCaps = getRestaurantCaps;
exports.defaultFeatureFlagsForNewVenue = defaultFeatureFlagsForNewVenue;
exports.getAccountCaps = getAccountCaps;
exports.accountStateFromRow = accountStateFromRow;
exports.restaurantCapsFromRow = restaurantCapsFromRow;
exports.accountCapsFromRow = accountCapsFromRow;
exports.getRestaurantCapsById = getRestaurantCapsById;
exports.getAccountCapsByRestaurantId = getAccountCapsByRestaurantId;
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
exports.PAST_DUE_GRACE_DAYS = 3;
const DAY_MS = 86_400_000;
// One billing interval in days (approximate — a whole-day model is enough for a
// coarse 3-day grace window). Unknown / null interval → assume monthly. Accepts
// both the new ad-hoc `interval` ("month"/"year") and the legacy `billingCycle`
// ("MONTHLY"/"YEARLY").
const INTERVAL_DAYS = { month: 30, MONTHLY: 30, year: 365, YEARLY: 365 };
// Start (ms) of the CURRENT — now unpaid — Stripe period: currentPeriodEnd minus
// one billing interval. On a failed renewal Stripe advances `current_period_end`
// to the new (unpaid) period, so that timestamp is NOT the moment access should
// wind down; the renewal that FAILED sits at the period START. Grace runs from
// here, not from the (future) end.
function pastDuePeriodStartMs(currentPeriodEnd, interval) {
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
function pastDueGraceEndMs(r) {
    if (r.subscriptionStatus !== "PAST_DUE")
        return null;
    const anchorMs = r.pastDueSince
        ? new Date(r.pastDueSince).getTime()
        : r.currentPeriodEnd
            ? pastDuePeriodStartMs(new Date(r.currentPeriodEnd), r.interval)
            : null;
    if (anchorMs === null)
        return null;
    return anchorMs + exports.PAST_DUE_GRACE_DAYS * DAY_MS;
}
// True while a PAST_DUE subscription is still inside its grace window.
function inPastDueGrace(r) {
    const end = pastDueGraceEndMs(r);
    return end !== null && end > Date.now();
}
const FULL_PRO_CAPS = {
    menuOnline: true,
    orders: true,
    kds: true,
    reservations: true,
    // customDomain is an à-la-carte add-on, never implied by a tier → false in the
    // tier-derived (fallback) path; the flag path reads featCustomDomain.
    customDomain: false,
};
const INACTIVE_CAPS = {
    menuOnline: false,
    orders: false,
    kds: false,
    reservations: false,
    customDomain: false,
};
// A trial gets the full operational set (same as a paid sub).
const TRIAL_PRO_CAPS = { ...FULL_PRO_CAPS };
function isTrialActive(account) {
    return !!account.trialEndsAt && account.trialEndsAt > new Date();
}
// True while the account's subscription is paying (ACTIVE, or still inside the
// PAST_DUE grace window). There is no plan tier anymore — any active/grace
// subscription grants account-wide access; feat* flags decide the feature set.
function isPaidActive(sub) {
    if (!sub)
        return false;
    if (sub.status === "ACTIVE")
        return true;
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
function hasVenueAccess(account, restaurant) {
    if (restaurant.planOverride === "PRO")
        return true;
    if (isTrialActive(account))
        return true;
    return isPaidActive(account.subscription);
}
// True when the row carries explicit persisted feature flags (the DB read path).
// A flag-less row (unit tests, defensive callers) uses the tier fallback instead.
function hasExplicitFlags(r) {
    return (typeof r.featMenuOnline === "boolean" ||
        typeof r.featOrders === "boolean" ||
        typeof r.featKds === "boolean" ||
        typeof r.featReservations === "boolean" ||
        typeof r.featCustomDomain === "boolean");
}
// "Which" set — capabilities straight from the persisted flags. menuOnline
// defaults on (a paid venue with no explicit menu flag is still online).
function capsFromFlags(r) {
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
function tierCaps(account, restaurant) {
    return hasVenueAccess(account, restaurant) ? { ...FULL_PRO_CAPS } : { ...INACTIVE_CAPS };
}
// Capabilities for one restaurant under its account.
//   whether: hasVenueAccess (override / trial / paid subscription)
//   which:   persisted feature flags if present, else access-derived (fallback).
// No access → INACTIVE_CAPS regardless of flags (flags never leak menu/features
// to an unpaid venue). This is the single seam the whole platform gates on.
function getRestaurantCaps(account, restaurant) {
    if (!hasVenueAccess(account, restaurant))
        return { ...INACTIVE_CAPS };
    return hasExplicitFlags(restaurant) ? capsFromFlags(restaurant) : tierCaps(account, restaurant);
}
// Default feature flags for a NEWLY created venue, mirroring what the account's
// current tier would grant (so adding a venue during a trial/PRO keeps today's
// behaviour). Operational features follow trial/PRO/override. Callers persist
// these on the new Restaurant row.
function defaultFeatureFlagsForNewVenue(account, planOverride) {
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
function getAccountCaps(account) {
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
exports.ACCOUNT_ENTITLEMENT_SELECT = {
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
};
// Normalise a loaded restaurant row into (AccountState, planOverride) from its
// Account + Subscription. A missing account (should not happen post-cutover)
// resolves to inactive (fail closed).
function accountStateFromRow(row) {
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
            planOverride: row.planOverride ?? null,
        };
    }
    // No account (should not happen post-cutover) → inactive, fail closed.
    return {
        account: { trialEndsAt: null, restaurantCount: 1, venueLimit: 4, subscription: null },
        planOverride: row.planOverride ?? null,
    };
}
// Capabilities for an already-loaded restaurant row (no query). Use when the
// caller already selected ACCOUNT_ENTITLEMENT_SELECT (e.g. public menu-by-slug).
function restaurantCapsFromRow(row) {
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
function accountCapsFromRow(row) {
    const { account } = accountStateFromRow(row);
    return getAccountCaps(account);
}
// Capabilities for one restaurant by id (one indexed query). Missing row →
// inactive (fail closed).
async function getRestaurantCapsById(prisma, restaurantId) {
    const row = (await prisma.restaurant.findUnique({
        where: { id: restaurantId },
        select: exports.ACCOUNT_ENTITLEMENT_SELECT,
    }));
    if (!row)
        return { ...INACTIVE_CAPS };
    return restaurantCapsFromRow(row);
}
// Account-wide caps for one restaurant's account by restaurant id.
async function getAccountCapsByRestaurantId(prisma, restaurantId) {
    const row = (await prisma.restaurant.findUnique({
        where: { id: restaurantId },
        select: exports.ACCOUNT_ENTITLEMENT_SELECT,
    }));
    if (!row)
        return { venueLimit: 4, canAddVenue: false };
    return accountCapsFromRow(row);
}
