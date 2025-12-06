import { getTranslations } from "next-intl/server";
import { DashboardContainer } from "@/components/dashboard-container";
import { TablesList } from "./tables-list";
import { prisma } from "@/lib/prisma";
import { getUserCompanyId } from "@/lib/auth";

async function getTables() {
  const companyId = await getUserCompanyId();
  if (!companyId) return [];

  const restaurant = await prisma.restaurant.findFirst({
    where: { companyId },
    select: { id: true },
  });

  if (!restaurant) return [];

  const tables = await prisma.table.findMany({
    where: { restaurantId: restaurant.id },
    orderBy: { sortOrder: "asc" },
  });

  return tables;
}

export default async function TablesPage() {
  const t = await getTranslations("reservations");
  const tables = await getTables();

  const translations = {
    noTables: t("noTables"),
    guests: t("guests"),
  };

  return (
    <DashboardContainer>
      <TablesList initialData={tables} translations={translations} />
    </DashboardContainer>
  );
}
