import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { getAuthCompany } from "@/lib/auth";
import { dashboardUrl } from "@/lib/dashboard-url";

export async function POST(request: NextRequest) {
  try {
    const company = await getAuthCompany();

    if (!company) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!company.stripeCustomerId) {
      return NextResponse.json(
        { error: "No subscription found" },
        { status: 400 }
      );
    }

    const { locale = "en" } = await request.json().catch(() => ({}));

    // Always send the user back to the new SPA dashboard's billing settings,
    // even when they opened the portal from the legacy monolith — the old
    // billing page is being retired.
    const session = await stripe.billingPortal.sessions.create({
      customer: company.stripeCustomerId,
      return_url: dashboardUrl(`/${locale}/dashboard/settings/billing`),
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Error creating portal session:", error);
    return NextResponse.json(
      { error: "Failed to create portal session" },
      { status: 500 }
    );
  }
}
