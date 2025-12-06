import { getTranslations } from "next-intl/server";
import { TableForm } from "../table-form";
import { DashboardContainer } from "@/components/dashboard-container";

export default async function NewTablePage() {
  const t = await getTranslations("reservations");

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
  };

  return (
    <DashboardContainer>
      <TableForm translations={translations} />
    </DashboardContainer>
  );
}
