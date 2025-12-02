import { getTranslations } from "next-intl/server";
import { CategoryForm } from "../category-form";
import { DashboardContainer } from "@/components/dashboard-container";

export default async function NewCategoryPage() {
  const t = await getTranslations("categories");

  const translations = {
    name: t("name"),
    namePlaceholder: t("namePlaceholder"),
    description_label: t("description_label"),
    descriptionPlaceholder: t("descriptionPlaceholder"),
    isActive: t("isActive"),
    save: t("save"),
    saving: t("saving"),
    cancel: t("cancel"),
  };

  return (
    <DashboardContainer>
      <CategoryForm translations={translations} />
    </DashboardContainer>
  );
}
