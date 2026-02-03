import Stripe from "stripe";

// Re-export client-safe config
export { PRICE_LOOKUP_KEYS, PLANS, type PlanType } from "./stripe-config";

// Lazy initialization to avoid build errors when STRIPE_SECRET_KEY is not set
let stripeInstance: Stripe | null = null;

export const stripe = new Proxy({} as Stripe, {
  get(_, prop) {
    if (!stripeInstance) {
      if (!process.env.STRIPE_SECRET_KEY) {
        throw new Error("STRIPE_SECRET_KEY is not configured");
      }
      stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY, {
        apiVersion: "2026-01-28.clover",
        typescript: true,
      });
    }
    return (stripeInstance as any)[prop];
  },
});
