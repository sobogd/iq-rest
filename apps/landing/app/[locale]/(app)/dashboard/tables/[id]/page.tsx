import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { TableForm } from "../table-form";
import { DashboardContainer } from "@/components/dashboard-container";
import { getTableWithTranslations, getRestaurantLanguages } from "@/lib/data";

interface EditTablePageProps {
  params: Promise<{ id: string }>;
}

export default async function EditTablePage({ params }: EditTablePageProps) {
  const { id } = await params;

  const [t, table, restaurant] = await Promise.all([
    getTranslations("reservations"),
    getTableWithTranslations(id),
    getRestaurantLanguages(),
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
      <TableForm table={table} restaurant={restaurant} translations={translations} />
    </DashboardContainer>
  );
}
