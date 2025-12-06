import { getTranslations } from "next-intl/server";
import { RestaurantForm } from "./restaurant-form";
import { DashboardContainer } from "@/components/dashboard-container";

export default async function SettingsPage() {
  const t = await getTranslations("settings");

  const translations = {
    title: t("title"),
    titlePlaceholder: t("titlePlaceholder"),
    description: t("description"),
    descriptionPlaceholder: t("descriptionPlaceholder"),
    slug: t("slug"),
    slugPlaceholder: t("slugPlaceholder"),
    source: t("source"),
    uploadMedia: t("uploadMedia"),
    removeMedia: t("removeMedia"),
    coordinates: t("coordinates"),
    xPlaceholder: t("xPlaceholder"),
    yPlaceholder: t("yPlaceholder"),
    phone: t("phone"),
    phonePlaceholder: t("phonePlaceholder"),
    instagram: t("instagram"),
    instagramPlaceholder: t("instagramPlaceholder"),
    whatsapp: t("whatsapp"),
    whatsappPlaceholder: t("whatsappPlaceholder"),
    save: t("save"),
    saving: t("saving"),
    saved: t("saved"),
    basicInfo: t("basicInfo"),
    contacts: t("contacts"),
    reservations: t("reservations"),
    reservationsEnabled: t("reservationsEnabled"),
    reservationMode: t("reservationMode"),
    reservationModeAuto: t("reservationModeAuto"),
    reservationModeManual: t("reservationModeManual"),
    reservationSlotMinutes: t("reservationSlotMinutes"),
    workingHours: t("workingHours"),
    workingHoursStart: t("workingHoursStart"),
    workingHoursEnd: t("workingHoursEnd"),
    minutes: t("minutes"),
  };

  return (
    <DashboardContainer>
      <RestaurantForm translations={translations} />
    </DashboardContainer>
  );
}
