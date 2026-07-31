"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ACCOUNT_ENTITLEMENT_SELECT = exports.PRO_ACCESS_SELECT = exports.PRO_FEATURE_SELECT = exports.PAST_DUE_GRACE_DAYS = void 0;
exports.pastDueGraceEndMs = pastDueGraceEndMs;
exports.inPastDueGrace = inPastDueGrace;
exports.hasProFeatures = hasProFeatures;
exports.hasPaidProFeatures = hasPaidProFeatures;
exports.ownerHasProAccess = ownerHasProAccess;
exports.restaurantHasProAccess = restaurantHasProAccess;
exports.isTrialActive = isTrialActive;
exports.isProActive = isProActive;
exports.isBasicActive = isBasicActive;
exports.getRestaurantCaps = getRestaurantCaps;
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
// Prisma `select` fragment for the fields the legacy helpers need. Spread into
// any restaurant query that gates a PRO feature so the shape stays in sync.
exports.PRO_FEATURE_SELECT = {
    plan: true,
    subscriptionStatus: true,
    trialEndsAt: true,
    currentPeriodEnd: true,
    legacyFullAccess: true,
};
// Same fields plus `id` — needed by the account-level helpers below.
exports.PRO_ACCESS_SELECT = { id: true, ...exports.PRO_FEATURE_SELECT };
// True if any restaurant OWNED (RestaurantUser.addedBy === null) by one of
// `ownerIds` is entitled to PRO features. Empty list → false.
async function ownerHasProAccess(prisma, ownerIds) {
    if (ownerIds.length === 0)
        return false;
    const owned = await prisma.restaurant.findMany({
        where: {
            restaurantUsers: { some: { userId: { in: ownerIds }, addedBy: null } },
        },
        select: exports.PRO_FEATURE_SELECT,
    });
    return owned.some(hasProFeatures);
}
// Account-aware entitlement for a single restaurant. Fast path returns without a
// query when the row is entitled on its own; otherwise resolve the owner and
// check their venues so a PRO owner's extra (FREE-row) venues inherit PRO.
// Orphan rows (no addedBy=null owner) fail closed.
async function restaurantHasProAccess(prisma, restaurant) {
    if (hasProFeatures(restaurant))
        return true;
    const owners = await prisma.restaurantUser.findMany({
        where: { restaurantId: restaurant.id, addedBy: null },
        select: { userId: true },
    });
    return ownerHasProAccess(prisma, owners.map((o) => o.userId));
}
const FULL_PRO_CAPS = {
    menuOnline: true,
    orders: true,
    kds: true,
    reservations: true,
    aiUnlimited: true,
};
const INACTIVE_CAPS = {
    menuOnline: false,
    orders: false,
    kds: false,
    reservations: false,
    aiUnlimited: false,
};
// BASIC = live digital menu only, no operational features, no unlimited AI.
const BASIC_CAPS = {
    menuOnline: true,
    orders: false,
    kds: false,
    reservations: false,
    aiUnlimited: false,
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
// Capabilities for one restaurant under its account. Resolution order (§3):
//   1. planOverride==='PRO'  → full PRO, regardless of subscription (highest).
//   2. trial active          → full PRO (minus unlimited AI) for every venue.
//   3. PRO active            → full PRO for every venue.
//   4. BASIC active          → BASIC only for the appliesToRestaurantId venue;
//                              every other venue is inactive.
//   5. otherwise             → inactive (menu offline).
function getRestaurantCaps(account, restaurant) {
    if (restaurant.planOverride === "PRO")
        return { ...FULL_PRO_CAPS };
    if (isTrialActive(account))
        return { ...TRIAL_PRO_CAPS };
    const sub = account.subscription;
    if (isProActive(sub))
        return { ...FULL_PRO_CAPS };
    if (isBasicActive(sub)) {
        return sub.appliesToRestaurantId === restaurant.id
            ? { ...BASIC_CAPS }
            : { ...INACTIVE_CAPS };
    }
    return { ...INACTIVE_CAPS };
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
                },
            },
            _count: { select: { restaurants: true } },
        },
    },
    // legacy fallback (accountId still NULL during dual-write)
    plan: true,
    subscriptionStatus: true,
    trialEndsAt: true,
    currentPeriodEnd: true,
    legacyFullAccess: true,
};
// Normalise a loaded restaurant row into (AccountState, planOverride). Uses the
// real Account when present; otherwise falls back to the legacy columns.
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
    const legacy = accountStateFromLegacyRestaurant({
        id: row.id,
        plan: row.plan ?? null,
        subscriptionStatus: row.subscriptionStatus ?? null,
        trialEndsAt: row.trialEndsAt ?? null,
        currentPeriodEnd: row.currentPeriodEnd ?? null,
        legacyFullAccess: row.legacyFullAccess ?? null,
    });
    return { account: legacy.account, planOverride: legacy.restaurant.planOverride };
}
// Capabilities for an already-loaded restaurant row (no query). Use when the
// caller already selected ACCOUNT_ENTITLEMENT_SELECT (e.g. public menu-by-slug).
function restaurantCapsFromRow(row) {
    const { account, planOverride } = accountStateFromRow(row);
    return getRestaurantCaps(account, { id: row.id, planOverride });
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
