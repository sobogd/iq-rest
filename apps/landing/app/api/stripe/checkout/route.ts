import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { stripe, PRICE_LOOKUP_KEYS } from "@/lib/stripe";

async function getUserCompany() {
  const cookieStore = await cookies();
  const userEmail = cookieStore.get("user_email");

  if (!userEmail?.value) return null;

  const user = await prisma.user.findUnique({
    where: { email: userEmail.value },
    include: {
      companies: {
        include: { company: true },
        take: 1,
      },
    },
  });

  return user?.companies[0]?.company ?? null;
}

export async function POST(request: NextRequest) {
  try {
    const company = await getUserCompany();

    if (!company) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { priceLookupKey } = await request.json();

    // Validate price lookup key
    const validKeys = Object.values(PRICE_LOOKUP_KEYS);
    if (!validKeys.includes(priceLookupKey)) {
      return NextResponse.json(
        { error: "Invalid price lookup key" },
        { status: 400 }
      );
    }

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

    // Get price by lookup key
    const prices = await stripe.prices.list({
      lookup_keys: [priceLookupKey],
      active: true,
      limit: 1,
    });

    if (prices.data.length === 0) {
      return NextResponse.json(
        { error: "Price not found. Please configure prices in Stripe Dashboard." },
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
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/en/dashboard/billing?success=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/en/dashboard/billing?canceled=true`,
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
