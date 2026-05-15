import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { stripe, PRICE_LOOKUP_KEYS, getLookupKeyWithCurrency } from "@/lib/stripe";
import { getAuthCompany } from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    const company = await getAuthCompany();

    if (!company) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { priceLookupKey, locale = "en" } = await request.json();

    // Only allow BASIC lookup keys (single plan model)
    const validKeys = [PRICE_LOOKUP_KEYS.BASIC_MONTHLY, PRICE_LOOKUP_KEYS.BASIC_YEARLY];
    if (!validKeys.includes(priceLookupKey)) {
      return NextResponse.json(
        { error: "Invalid price lookup key" },
        { status: 400 }
      );
    }

    // Prevent duplicate subscriptions
    if (company.subscriptionStatus === "ACTIVE" && company.stripeSubscriptionId) {
      return NextResponse.json(
        { error: "Active subscription already exists. Use the billing portal to manage it." },
        { status: 400 }
      );
    }

    // EU-only billing — always use the EUR price lookup key. Removing the
    // geo-based currency switch keeps the checkout deterministic and avoids
    // mid-funnel currency surprises for restaurants outside the EU geo.
    const fullLookupKey = getLookupKeyWithCurrency(priceLookupKey, "EUR");

    // Get or create Stripe customer
    let customerId = company.stripeCustomerId;

    if (customerId) {
      // Verify customer exists in Stripe
      try {
        await stripe.customers.retrieve(customerId);
      } catch {
        // Customer doesn't exist, reset it
        customerId = null;
      }
    }

    if (!customerId) {
      const customer = await stripe.customers.create({
        metadata: {
          companyId: company.id,
        },
      });
      customerId = customer.id;

      await prisma.company.update({
        where: { id: company.id },
        data: { stripeCustomerId: customerId },
      });
    }

    // Get price by lookup key with currency
    const prices = await stripe.prices.list({
      lookup_keys: [fullLookupKey],
      active: true,
      limit: 1,
    });

    if (prices.data.length === 0) {
      return NextResponse.json(
        { error: `Price not found for ${fullLookupKey}. Please configure prices in Stripe Dashboard.` },
        { status: 404 }
      );
    }

    const price = prices.data[0];

    // Create checkout session
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: [
        {
          price: price.id,
          quantity: 1,
        },
      ],
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/${locale}/dashboard/billing?success=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/${locale}/dashboard/billing?canceled=true`,
      subscription_data: {
        metadata: {
          companyId: company.id,
        },
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Error creating checkout session:", error);
    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 }
    );
  }
}
