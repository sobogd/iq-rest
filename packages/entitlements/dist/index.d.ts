import type { PrismaClient } from "@iq-rest/db";
export declare const PAST_DUE_GRACE_DAYS = 3;
export declare function pastDueGraceEndMs(r: {
    subscriptionStatus: string | null;
    currentPeriodEnd?: Date | null;
    interval?: string | null;
}): number | null;
export declare function inPastDueGrace(r: {
    subscriptionStatus: string | null;
    currentPeriodEnd?: Date | null;
    interval?: string | null;
}): boolean;
export declare function hasProFeatures(r: {
    plan: string | null;
    subscriptionStatus: string | null;
    trialEndsAt?: Date | null;
    currentPeriodEnd?: Date | null;
    legacyFullAccess?: boolean | null;
}): boolean;
export declare function hasPaidProFeatures(r: {
    plan: string | null;
    subscriptionStatus: string | null;
    currentPeriodEnd?: Date | null;
    legacyFullAccess?: boolean | null;
}): boolean;
export type PlanCode = "FREE" | "BASIC" | "PRO";
export type PlanOverride = "PRO" | null;
export type SubscriptionState = {
    plan: PlanCode | string | null;
    status: string | null;
    currentPeriodEnd?: Date | null;
    interval?: string | null;
    appliesToRestaurantId?: string | null;
};
export type AccountState = {
    trialEndsAt?: Date | null;
    restaurantCount?: number;
    venueLimit: number;
    subscription: SubscriptionState | null;
};
export type RestaurantCapabilities = {
    menuOnline: boolean;
    orders: boolean;
    kds: boolean;
    reservations: boolean;
    customDomain: boolean;
};
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
export declare function isTrialActive(account: Pick<AccountState, "trialEndsAt">): boolean;
export declare function isProActive(sub: SubscriptionState | null): boolean;
export declare function isBasicActive(sub: SubscriptionState | null): boolean;
export declare function hasVenueAccess(account: AccountState, restaurant: {
    id: string;
    planOverride?: PlanOverride | string | null;
}): boolean;
export declare function getRestaurantCaps(account: AccountState, restaurant: {
    id: string;
    planOverride?: PlanOverride | string | null;
} & RestaurantFeatureFlags): RestaurantCapabilities;
export declare function defaultFeatureFlagsForNewVenue(account: AccountState, planOverride?: PlanOverride | string | null): {
    featMenuOnline: boolean;
    featOrders: boolean;
    featKds: boolean;
    featReservations: boolean;
    featCustomDomain: boolean;
};
export declare function getAccountCaps(account: AccountState): AccountCapabilities;
export declare function accountStateFromLegacyRestaurant(r: {
    id: string;
    plan: string | null;
    subscriptionStatus: string | null;
    trialEndsAt?: Date | null;
    currentPeriodEnd?: Date | null;
    legacyFullAccess?: boolean | null;
    venueLimit?: number;
}): {
    account: AccountState;
    restaurant: {
        id: string;
        planOverride: PlanOverride;
    };
};
export declare const ACCOUNT_ENTITLEMENT_SELECT: {
    readonly id: true;
    readonly planOverride: true;
    readonly accountId: true;
    readonly featMenuOnline: true;
    readonly featOrders: true;
    readonly featKds: true;
    readonly featReservations: true;
    readonly featCustomDomain: true;
    readonly account: {
        readonly select: {
            readonly trialEndsAt: true;
            readonly venueLimit: true;
            readonly subscription: {
                readonly select: {
                    readonly plan: true;
                    readonly status: true;
                    readonly billingCycle: true;
                    readonly currentPeriodEnd: true;
                    readonly appliesToRestaurantId: true;
                    readonly cancelAtPeriodEnd: true;
                    readonly amount: true;
                    readonly currency: true;
                    readonly interval: true;
                };
            };
            readonly _count: {
                readonly select: {
                    readonly restaurants: true;
                };
            };
        };
    };
};
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
        _count?: {
            restaurants: number;
        };
    } | null;
};
export declare function accountStateFromRow(row: RestaurantEntitlementRow): {
    account: AccountState;
    planOverride: PlanOverride;
};
export declare function restaurantCapsFromRow(row: RestaurantEntitlementRow): RestaurantCapabilities;
export declare function accountCapsFromRow(row: RestaurantEntitlementRow): AccountCapabilities;
type EntitlementDb = Pick<PrismaClient, "restaurant">;
export declare function getRestaurantCapsById(prisma: EntitlementDb, restaurantId: string): Promise<RestaurantCapabilities>;
export declare function getAccountCapsByRestaurantId(prisma: EntitlementDb, restaurantId: string): Promise<AccountCapabilities>;
export {};
