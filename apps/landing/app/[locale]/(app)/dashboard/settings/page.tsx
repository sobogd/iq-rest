import { getTranslations } from "next-intl/server";
import { RestaurantForm } from "./restaurant-form";

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
    address: t("address"),
    addressPlaceholder: t("addressPlaceholder"),
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
    languages: t("languages"),
    defaultLanguage: t("defaultLanguage"),
    selectLanguages: t("selectLanguages"),
  };

  return (
    <div className="p-6">
      <RestaurantForm translations={translations} />
    </div>
  );
}
