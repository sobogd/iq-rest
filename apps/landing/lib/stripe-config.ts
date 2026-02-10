// Client-safe Stripe configuration (no Stripe SDK import)

// Lookup keys for prices (create these in Stripe Dashboard)
export const PRICE_LOOKUP_KEYS = {
  BASIC_MONTHLY: "basic_monthly",
  BASIC_YEARLY: "basic_yearly",
  PRO_MONTHLY: "pro_monthly",
  PRO_YEARLY: "pro_yearly",
} as const;

// Plan details for UI
export const PLANS = {
  FREE: {
    name: "Free",
    description: "Get started with basic features",
    price: { monthly: 0, yearly: 0 },
  },
  BASIC: {
    name: "Basic",
    description: "For small restaurants",
    price: { monthly: 14.9, yearly: 118.8 }, // $9.9/month when yearly
  },
  PRO: {
    name: "Pro",
    description: "For growing businesses",
    price: { monthly: 39.9, yearly: 348 }, // $29/month when yearly
  },
} as const;

export type PlanType = keyof typeof PLANS;
