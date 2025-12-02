import { getTranslations } from "next-intl/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { SupportClient } from "./support-client";
import { DashboardContainer } from "@/components/dashboard-container";

async function getInitialMessages() {
  const cookieStore = await cookies();
  const userEmail = cookieStore.get("user_email");

  if (!userEmail?.value) return null;

  const user = await prisma.user.findUnique({
    where: { email: userEmail.value },
    include: {
      companies: {
        take: 1,
      },
    },
  });

  const companyId = user?.companies[0]?.companyId;
  if (!companyId) return null;

  const messages = await prisma.supportMessage.findMany({
    where: { companyId },
    orderBy: { createdAt: "asc" },
    select: {
      id: true,
      message: true,
      isAdmin: true,
      createdAt: true,
    },
  });

  return messages.map((m) => ({
    ...m,
    createdAt: m.createdAt.toISOString(),
  }));
}

export default async function SupportPage() {
  const t = await getTranslations("support");
  const messages = await getInitialMessages();

  if (messages === null) {
    return (
      <DashboardContainer>
        <p className="text-muted-foreground">{t("unauthorized")}</p>
      </DashboardContainer>
    );
  }

  return (
    <DashboardContainer>
      <SupportClient initialMessages={messages} />
    </DashboardContainer>
  );
}
