import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { prisma } from "@/lib/prisma";
import { stripe, PRICE_LOOKUP_KEYS } from "@/lib/stripe";
import type Stripe from "stripe";
import { Plan, BillingCycle, SubscriptionStatus } from "@prisma/client";

export async function POST(request: NextRequest) {
  const body = await request.text();
  const headersList = await headers();
  const signature = headersList.get("stripe-signature");

  if (!signature) {
    return NextResponse.json(
      { error: "Missing stripe-signature header" },
      { status: 400 }
    );
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (error) {
    console.error("Webhook signature verification failed:", error);
    return NextResponse.json(
      { error: "Invalid signature" },
      { status: 400 }
    );
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object;
        const sessionData = session as { subscription?: string; metadata?: Record<string, string> };
        const companyId = sessionData.subscription
          ? (await getCompanyIdFromSubscription(sessionData.subscription))
          : sessionData.metadata?.companyId;

        if (companyId && sessionData.subscription) {
          const subscription = await stripe.subscriptions.retrieve(
            sessionData.subscription
          );
          await updateCompanySubscription(companyId, subscription as unknown as SubscriptionData);
        }
        break;
      }

      case "customer.subscription.created": {
        const subscription = event.data.object as unknown as SubscriptionData;
        const companyId = await getCompanyIdFromSubscription(subscription.id);

        if (companyId) {
          // Cancel old subscription if exists
          const company = await prisma.company.findUnique({
            where: { id: companyId },
            select: { stripeSubscriptionId: true },
          });

          if (company?.stripeSubscriptionId && company.stripeSubscriptionId !== subscription.id) {
            try {
              await stripe.subscriptions.cancel(company.stripeSubscriptionId);
            } catch (error) {
              console.error("Error canceling old subscription:", error);
            }
          }

          await updateCompanySubscription(companyId, subscription);
        }
        break;
      }

      case "customer.subscription.updated": {
        const subscription = event.data.object as unknown as SubscriptionData;
        const companyId = await getCompanyIdFromSubscription(subscription.id);

        if (companyId) {
          await updateCompanySubscription(companyId, subscription);
        }
        break;
      }

      case "customer.subscription.deleted": {
        const subscription = event.data.object as unknown as SubscriptionData;
        const companyId = await getCompanyIdFromSubscription(subscription.id);

        if (companyId) {
          // Only reset to FREE if this is the current subscription
          // (not an old subscription that was replaced)
          const company = await prisma.company.findUnique({
            where: { id: companyId },
            select: { stripeSubscriptionId: true },
          });

          if (company?.stripeSubscriptionId === subscription.id) {
            await prisma.company.update({
              where: { id: companyId },
              data: {
                plan: "FREE",
                billingCycle: null,
                subscriptionStatus: "CANCELED",
                currentPeriodEnd: null,
                stripeSubscriptionId: null,
                paymentProcessing: false,
              },
            });
          }
        }
        break;
      }

      case "invoice.payment_succeeded": {
        const invoice = event.data.object;
        const subscriptionId = (invoice as { subscription?: string | null }).subscription;
        if (subscriptionId) {
          const companyId = await getCompanyIdFromSubscription(subscriptionId);
          if (companyId) {
            await prisma.company.update({
              where: { id: companyId },
              data: { subscriptionStatus: "ACTIVE", paymentProcessing: false },
            });
            // Mark conversion flag on Session
            prisma.session.updateMany({
              where: { companyId, paidSubscription: false },
              data: { paidSubscription: true },
            }).catch(() => {});
          }
        }
        break;
      }

      case "invoice.payment_failed": {
        const invoice = event.data.object;
        const subscriptionId = (invoice as { subscription?: string | null }).subscription;
        if (subscriptionId) {
          const companyId = await getCompanyIdFromSubscription(subscriptionId);
          if (companyId) {
            await prisma.company.update({
              where: { id: companyId },
              data: { subscriptionStatus: "PAST_DUE" },
            });
          }
        }
        break;
      }
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Webhook handler error:", error);
    return NextResponse.json(
      { error: "Webhook handler failed" },
      { status: 500 }
    );
  }
}

async function getCompanyIdFromSubscription(subscriptionId: string): Promise<string | null> {
  // First check by subscription ID
  const company = await prisma.company.findFirst({
    where: { stripeSubscriptionId: subscriptionId },
  });

  if (company) return company.id;

  // If not found, check subscription metadata
  try {
    const subscription = await stripe.subscriptions.retrieve(subscriptionId) as unknown as SubscriptionData;
    const companyId = subscription.metadata?.companyId;
    if (companyId) return companyId;

    // Last resort: check by customer ID
    if (subscription.customer) {
      const customerCompany = await prisma.company.findFirst({
        where: { stripeCustomerId: subscription.customer },
      });
      return customerCompany?.id ?? null;
    }
  } catch (error) {
    console.error("Error retrieving subscription:", error);
  }

  return null;
}

interface SubscriptionData {
  id: string;
  status: string;
  current_period_end?: number;
  items: {
    data: Array<{
      current_period_end?: number;
      price: {
        id: string;
        lookup_key?: string | null;
      };
    }>;
  };
  metadata?: Record<string, string>;
  customer?: string;
}

async function updateCompanySubscription(
  companyId: string,
  subscription: SubscriptionData
) {
  const subscriptionItem = subscription.items.data[0];
  const lookupKey = subscriptionItem?.price.lookup_key;

  // Determine plan and billing cycle from lookup key
  let plan: Plan = "FREE";
  let billingCycle: BillingCycle | null = null;

  if (lookupKey) {
    if (lookupKey === PRICE_LOOKUP_KEYS.BASIC_MONTHLY) {
      plan = "BASIC";
      billingCycle = "MONTHLY";
    } else if (lookupKey === PRICE_LOOKUP_KEYS.BASIC_YEARLY) {
      plan = "BASIC";
      billingCycle = "YEARLY";
    } else if (lookupKey === PRICE_LOOKUP_KEYS.PRO_MONTHLY) {
      plan = "PRO";
      billingCycle = "MONTHLY";
    } else if (lookupKey === PRICE_LOOKUP_KEYS.PRO_YEARLY) {
      plan = "PRO";
      billingCycle = "YEARLY";
    }
  }

  // Map Stripe status to our status
  let subscriptionStatus: SubscriptionStatus = "INACTIVE";
  switch (subscription.status) {
    case "active":
    case "trialing":
      subscriptionStatus = "ACTIVE";
      break;
    case "past_due":
      subscriptionStatus = "PAST_DUE";
      break;
    case "canceled":
    case "unpaid":
      subscriptionStatus = "CANCELED";
      break;
    case "incomplete":
    case "incomplete_expired":
      subscriptionStatus = "EXPIRED";
      break;
  }

  // Get current_period_end from subscription item or subscription level
  // Handle both number (unix timestamp) and other formats
  const periodEnd = subscriptionItem?.current_period_end ?? subscription.current_period_end;
  let currentPeriodEnd: Date | null = null;

  if (periodEnd && typeof periodEnd === 'number' && periodEnd > 0) {
    currentPeriodEnd = new Date(periodEnd * 1000);
    // Validate the date is valid
    if (isNaN(currentPeriodEnd.getTime())) {
      currentPeriodEnd = null;
    }
  }

  await prisma.company.update({
    where: { id: companyId },
    data: {
      stripeSubscriptionId: subscription.id,
      plan,
      billingCycle,
      subscriptionStatus,
      currentPeriodEnd,
      paymentProcessing: false,
    },
  });
}
