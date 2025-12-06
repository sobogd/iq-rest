import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { TableForm } from "../table-form";
import { DashboardContainer } from "@/components/dashboard-container";
import { prisma } from "@/lib/prisma";
import { getUserCompanyId } from "@/lib/auth";

async function getTable(id: string) {
  const companyId = await getUserCompanyId();
  if (!companyId) return null;

  const restaurant = await prisma.restaurant.findFirst({
    where: { companyId },
    select: { id: true },
  });

  if (!restaurant) return null;

  const table = await prisma.table.findFirst({
    where: { id, restaurantId: restaurant.id },
  });

  return table;
}

interface EditTablePageProps {
  params: Promise<{ id: string }>;
}

export default async function EditTablePage({ params }: EditTablePageProps) {
  const { id } = await params;
  const [t, table] = await Promise.all([
    getTranslations("reservations"),
    getTable(id),
  ]);

  if (!table) {
    notFound();
  }

  const translations = {
    tableNumber: t("tableNumber"),
    tableNumberPlaceholder: t("tableNumberPlaceholder"),
    capacity: t("capacity"),
    capacityPlaceholder: t("capacityPlaceholder"),
    zone: t("zone"),
    zonePlaceholder: t("zonePlaceholder"),
    image: t("image"),
    uploadImage: t("uploadImage"),
    removeImage: t("removeImage"),
    isActive: t("isActive"),
    save: t("save"),
    saving: t("saving"),
    cancel: t("cancel"),
    error: t("error"),
    close: t("close"),
    delete: t("delete"),
    deleteConfirm: t("deleteConfirm"),
  };

  return (
    <DashboardContainer>
      <TableForm table={table} translations={translations} />
    </DashboardContainer>
  );
}
