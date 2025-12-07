import { getTranslations } from "next-intl/server";
import { TableForm } from "../table-form";
import { DashboardContainer } from "@/components/dashboard-container";
import { getRestaurantLanguages } from "@/lib/data";

export default async function NewTablePage() {
  const [t, restaurant] = await Promise.all([
    getTranslations("reservations"),
    getRestaurantLanguages(),
  ]);

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
    status: t("status"),
    active: t("active"),
    inactive: t("inactive"),
    save: t("save"),
    saving: t("saving"),
    cancel: t("cancel"),
    error: t("error"),
    close: t("close"),
  };

  return (
    <DashboardContainer>
      <TableForm restaurant={restaurant} translations={translations} />
    </DashboardContainer>
  );
}
