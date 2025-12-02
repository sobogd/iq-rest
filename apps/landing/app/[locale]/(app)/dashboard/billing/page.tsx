import { getTranslations } from "next-intl/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { BillingClient } from "./billing-client";
import { DashboardContainer } from "@/components/dashboard-container";

async function getCompanySubscription() {
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

export default async function BillingPage({
  searchParams,
}: {
  searchParams: Promise<{ success?: string; canceled?: string }>;
}) {
  const t = await getTranslations("billing");
  const params = await searchParams;
  const company = await getCompanySubscription();

  if (!company) {
    return (
      <DashboardContainer>
        <p className="text-muted-foreground">{t("unauthorized")}</p>
      </DashboardContainer>
    );
  }

  return (
    <DashboardContainer>
      <BillingClient
      currentPlan={company.plan}
      billingCycle={company.billingCycle}
      subscriptionStatus={company.subscriptionStatus}
      showSuccess={params.success === "true"}
      showCanceled={params.canceled === "true"}
      paymentProcessing={company.paymentProcessing}
      />
    </DashboardContainer>
  );
}
