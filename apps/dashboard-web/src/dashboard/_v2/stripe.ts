import { loadStripe, type Stripe } from "@stripe/stripe-js";

// Publishable (test/live) key — set VITE_STRIPE_PUBLISHABLE_KEY in the env.
const PK = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY as string | undefined;

let promise: Promise<Stripe | null> | null = null;
export function getStripe(): Promise<Stripe | null> {
  if (!promise) promise = loadStripe(PK || "");
  return promise;
}

export const hasStripeKey = !!PK;
