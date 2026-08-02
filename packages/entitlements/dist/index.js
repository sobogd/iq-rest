"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ACCOUNT_ENTITLEMENT_SELECT = exports.PAST_DUE_GRACE_DAYS = void 0;
exports.pastDueGraceEndMs = pastDueGraceEndMs;
exports.inPastDueGrace = inPastDueGrace;
exports.hasProFeatures = hasProFeatures;
exports.hasPaidProFeatures = hasPaidProFeatures;
exports.isTrialActive = isTrialActive;
exports.isProActive = isProActive;
exports.isBasicActive = isBasicActive;
exports.hasVenueAccess = hasVenueAccess;
exports.getRestaurantCaps = getRestaurantCaps;
exports.defaultFeatureFlagsForNewVenue = defaultFeatureFlagsForNewVenue;
exports.getAccountCaps = getAccountCaps;
exports.accountStateFromLegacyRestaurant = accountStateFromLegacyRestaurant;
exports.accountStateFromRow = accountStateFromRow;
exports.restaurantCapsFromRow = restaurantCapsFromRow;
exports.accountCapsFromRow = accountCapsFromRow;
exports.getRestaurantCapsById = getRestaurantCapsById;
exports.getAccountCapsByRestaurantId = getAccountCapsByRestaurantId;
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
exports.PAST_DUE_GRACE_DAYS = 3;
const DAY_MS = 86_400_000;
// ─── Layer 1: legacy per-restaurant entitlement (behaviour-preserving) ───────
// Millisecond deadline of the PAST_DUE grace window, or null when not PAST_DUE.
function pastDueGraceEndMs(r) {
    if (r.subscriptionStatus !== "PAST_DUE" || !r.currentPeriodEnd)
        return null;
    return new Date(r.currentPeriodEnd).getTime() + exports.PAST_DUE_GRACE_DAYS * DAY_MS;
}
// True while a PAST_DUE subscription is still inside its grace window.
function inPastDueGrace(r) {
    const end = pastDueGraceEndMs(r);
    return end !== null && end > Date.now();
}
// Central PRO-feature entitlement check. A restaurant gets orders/KDS/
// reservations when ANY of: legacy grandfather flag, active PRO sub, PRO plan
// still inside PAST_DUE grace, or an unexpired 14-day trial.
function hasProFeatures(r) {
    if (r.legacyFullAccess)
        return true;
    if (r.subscriptionStatus === "ACTIVE" && r.plan === "PRO")
        return true;
    // A PRO plan whose renewal just failed keeps its PRO features during grace.
    if (r.plan === "PRO" && inPastDueGrace(r))
        return true;
    return !!r.trialEndsAt && r.trialEndsAt > new Date();
}
// Like `hasProFeatures` but WITHOUT the trial branch — i.e. the owner is
// genuinely PAYING for PRO (active PRO sub, PRO-in-grace, or a grandfathered
// legacy venue). Use this for perks a trial must NOT get or leak to secondary
// venues (e.g. unlimited AI images). A trial FREE row returns false here.
function hasPaidProFeatures(r) {
    if (r.legacyFullAccess)
        return true;
    if (r.subscriptionStatus === "ACTIVE" && r.plan === "PRO")
        return true;
    if (r.plan === "PRO" && inPastDueGrace(r))
        return true;
    return false;
}
const FULL_PRO_CAPS = {
    menuOnline: true,
    orders: true,
    kds: true,
    reservations: true,
    aiUnlimited: true,
    // customDomain is an à-la-carte add-on, never implied by a tier → false in the
    // tier-derived (fallback) path; the flag path reads featCustomDomain.
    customDomain: false,
};
const INACTIVE_CAPS = {
    menuOnline: false,
    orders: false,
    kds: false,
    reservations: false,
    aiUnlimited: false,
    customDomain: false,
};
// BASIC = live digital menu only, no operational features, no unlimited AI.
const BASIC_CAPS = {
    menuOnline: true,
    orders: false,
    kds: false,
    reservations: false,
    aiUnlimited: false,
    customDomain: false,
};
// Full PRO but earned via trial → everything except unlimited AI (§ ai-quota:
// a trial must not get the paid-PRO AI perk).
const TRIAL_PRO_CAPS = { ...FULL_PRO_CAPS, aiUnlimited: false };
function isTrialActive(account) {
    return !!account.trialEndsAt && account.trialEndsAt > new Date();
}
// True while the account's subscription counts as an active PRO (active PRO, or
// PRO still inside PAST_DUE grace).
function isProActive(sub) {
    if (!sub)
        return false;
    if (sub.status === "ACTIVE" && sub.plan === "PRO")
        return true;
    if (sub.plan === "PRO" && inPastDueGrace({ subscriptionStatus: sub.status, currentPeriodEnd: sub.currentPeriodEnd }))
        return true;
    return false;
}
// True while the account's subscription is an active BASIC (active, or BASIC in
// PAST_DUE grace — same grace policy as PRO).
function isBasicActive(sub) {
    if (!sub)
        return false;
    if (sub.status === "ACTIVE" && sub.plan === "BASIC")
        return true;
    if (sub.plan === "BASIC" && inPastDueGrace({ subscriptionStatus: sub.status, currentPeriodEnd: sub.currentPeriodEnd }))
        return true;
    return false;
}
// "Whether" gate — does this venue have ANY access right now? Access is granted
// by (highest first): per-venue PRO override, manual comp grant, an active trial,
// an active PRO subscription (account-wide), or an active BASIC subscription that
// is pinned to THIS venue. No access → menu offline (INACTIVE_CAPS).
function hasVenueAccess(account, restaurant) {
    if (restaurant.planOverride === "PRO")
        return true;
    if (restaurant.manualAccess)
        return true;
    if (isTrialActive(account))
        return true;
    const sub = account.subscription;
    if (isProActive(sub))
        return true;
    if (isBasicActive(sub) && sub.appliesToRestaurantId === restaurant.id)
        return true;
    return false;
}
// True when the row carries explicit persisted feature flags (the DB read path).
// A flag-less row (unit tests, defensive callers) uses the tier fallback instead.
function hasExplicitFlags(r) {
    return (typeof r.featMenuOnline === "boolean" ||
        typeof r.featOrders === "boolean" ||
        typeof r.featKds === "boolean" ||
        typeof r.featReservations === "boolean" ||
        typeof r.featAiUnlimited === "boolean" ||
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
        aiUnlimited: !!r.featAiUnlimited,
        customDomain: !!r.featCustomDomain,
    };
}
// Tier-derived caps — the pre-flag behaviour, kept as the fallback for rows that
// don't carry feature flags. Resolution order (§3):
//   1. planOverride==='PRO' → full PRO   2. trial → full PRO minus AI
//   3. PRO active → full PRO   4. BASIC active → BASIC on the pinned venue only
//   5. otherwise → inactive.
function tierCaps(account, restaurant) {
    if (restaurant.planOverride === "PRO")
        return { ...FULL_PRO_CAPS };
    if (isTrialActive(account))
        return { ...TRIAL_PRO_CAPS };
    const sub = account.subscription;
    if (isProActive(sub))
        return { ...FULL_PRO_CAPS };
    if (isBasicActive(sub)) {
        return sub.appliesToRestaurantId === restaurant.id ? { ...BASIC_CAPS } : { ...INACTIVE_CAPS };
    }
    return { ...INACTIVE_CAPS };
}
// Capabilities for one restaurant under its account.
//   whether: hasVenueAccess (override / manual / trial / PRO / pinned-BASIC)
//   which:   persisted feature flags if present, else tier-derived (fallback).
// No access → INACTIVE_CAPS regardless of flags (flags never leak menu/features
// to an unpaid venue). This is the single seam the whole platform gates on.
function getRestaurantCaps(account, restaurant) {
    if (!hasVenueAccess(account, restaurant))
        return { ...INACTIVE_CAPS };
    return hasExplicitFlags(restaurant) ? capsFromFlags(restaurant) : tierCaps(account, restaurant);
}
// Default feature flags for a NEWLY created venue, mirroring what the account's
// current tier would grant (so adding a venue during a trial/PRO keeps today's
// behaviour). Operational features follow trial/PRO/override; unlimited AI is
// paid-PRO only (never a trial). Callers persist these on the new Restaurant row.
function defaultFeatureFlagsForNewVenue(account, planOverride) {
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
function getAccountCaps(account) {
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
function accountStateFromLegacyRestaurant(r) {
    return {
        account: {
            trialEndsAt: r.trialEndsAt ?? null,
            restaurantCount: 1,
            venueLimit: r.venueLimit ?? 4,
            subscription: r.plan == null
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
    featAiUnlimited: true,
    manualAccess: true,
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
                        plan: sub.plan,
                        status: sub.status,
                        currentPeriodEnd: sub.currentPeriodEnd ?? null,
                        appliesToRestaurantId: sub.appliesToRestaurantId ?? null,
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
        manualAccess: row.manualAccess,
        featMenuOnline: row.featMenuOnline,
        featOrders: row.featOrders,
        featKds: row.featKds,
        featReservations: row.featReservations,
        featCustomDomain: row.featCustomDomain,
        featAiUnlimited: row.featAiUnlimited,
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
