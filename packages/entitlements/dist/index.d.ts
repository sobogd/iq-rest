import type { PrismaClient } from "@iq-rest/db";
export declare const PAST_DUE_GRACE_DAYS = 3;
export declare function pastDueGraceEndMs(r: {
    subscriptionStatus: string | null;
    currentPeriodEnd?: Date | null;
}): number | null;
export declare function inPastDueGrace(r: {
    subscriptionStatus: string | null;
    currentPeriodEnd?: Date | null;
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
export declare const PRO_FEATURE_SELECT: {
    readonly plan: true;
    readonly subscriptionStatus: true;
    readonly trialEndsAt: true;
    readonly currentPeriodEnd: true;
    readonly legacyFullAccess: true;
};
export declare const PRO_ACCESS_SELECT: {
    readonly plan: true;
    readonly subscriptionStatus: true;
    readonly trialEndsAt: true;
    readonly currentPeriodEnd: true;
    readonly legacyFullAccess: true;
    readonly id: true;
};
type ProDb = Pick<PrismaClient, "restaurant" | "restaurantUser">;
export declare function ownerHasProAccess(prisma: ProDb, ownerIds: string[]): Promise<boolean>;
export declare function restaurantHasProAccess(prisma: ProDb, restaurant: {
    id: string;
    plan: string | null;
    subscriptionStatus: string | null;
    trialEndsAt?: Date | null;
    currentPeriodEnd?: Date | null;
    legacyFullAccess?: boolean | null;
}): Promise<boolean>;
export type PlanCode = "FREE" | "BASIC" | "PRO";
export type PlanOverride = "PRO" | null;
export type SubscriptionState = {
    plan: PlanCode | string | null;
    status: string | null;
    currentPeriodEnd?: Date | null;
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
    aiUnlimited: boolean;
};
export type AccountCapabilities = {
    venueLimit: number;
    canAddVenue: boolean;
};
export declare function isTrialActive(account: Pick<AccountState, "trialEndsAt">): boolean;
export declare function isProActive(sub: SubscriptionState | null): boolean;
export declare function isBasicActive(sub: SubscriptionState | null): boolean;
export declare function getRestaurantCaps(account: AccountState, restaurant: {
    id: string;
    planOverride?: PlanOverride | string | null;
}): RestaurantCapabilities;
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
export {};
