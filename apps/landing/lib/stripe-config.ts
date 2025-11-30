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
    price: { monthly: 4, yearly: 36 }, // €3/month when yearly
  },
  PRO: {
    name: "Pro",
    description: "For growing businesses",
    price: { monthly: 7, yearly: 72 }, // €6/month when yearly
  },
} as const;

export type PlanType = keyof typeof PLANS;
