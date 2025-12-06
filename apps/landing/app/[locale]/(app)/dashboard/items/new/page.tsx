import { getTranslations } from "next-intl/server";
import { ItemForm } from "../item-form";
import { DashboardContainer } from "@/components/dashboard-container";
import { getCategories, getRestaurantLanguages } from "@/lib/data";

export default async function NewItemPage() {
  const [t, categories, restaurant] = await Promise.all([
    getTranslations("items"),
    getCategories(),
    getRestaurantLanguages(),
  ]);

  const translations = {
    name: t("name"),
    namePlaceholder: t("namePlaceholder"),
    description_label: t("description_label"),
    descriptionPlaceholder: t("descriptionPlaceholder"),
    price: t("price"),
    pricePlaceholder: t("pricePlaceholder"),
    category: t("category"),
    categoryPlaceholder: t("categoryPlaceholder"),
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
      <ItemForm categories={categories} restaurant={restaurant} translations={translations} />
    </DashboardContainer>
  );
}
