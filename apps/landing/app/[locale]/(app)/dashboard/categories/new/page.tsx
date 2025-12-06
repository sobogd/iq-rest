import { getTranslations } from "next-intl/server";
import { CategoryForm } from "../category-form";
import { DashboardContainer } from "@/components/dashboard-container";
import { getRestaurantLanguages } from "@/lib/data";

export default async function NewCategoryPage() {
  const [t, restaurant] = await Promise.all([
    getTranslations("categories"),
    getRestaurantLanguages(),
  ]);

  const translations = {
    name: t("name"),
    namePlaceholder: t("namePlaceholder"),
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
      <CategoryForm restaurant={restaurant} translations={translations} />
    </DashboardContainer>
  );
}
