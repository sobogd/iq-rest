import Stripe from "stripe";

// Re-export client-safe config
export { PRICE_LOOKUP_KEYS, PLANS, type PlanType } from "./stripe-config";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-11-17.clover",
  typescript: true,
});
