import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const cookieStore = await cookies();
  const userEmail = cookieStore.get("user_email");

  if (!userEmail?.value) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { email: userEmail.value },
    include: {
      companies: {
        include: { company: true },
        take: 1,
      },
    },
  });

  const company = user?.companies[0]?.company;

  if (!company) {
    return NextResponse.json({ error: "No company found" }, { status: 404 });
  }

  return NextResponse.json({
    plan: company.plan,
    billingCycle: company.billingCycle,
    subscriptionStatus: company.subscriptionStatus,
    currentPeriodEnd: company.currentPeriodEnd?.toISOString() ?? null,
    paymentProcessing: company.paymentProcessing,
  });
}
