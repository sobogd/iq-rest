import { getTranslations } from "next-intl/server";
import { CategoriesList } from "./categories-list";
import { getCategories } from "@/lib/data";
import { DashboardContainer } from "@/components/dashboard-container";

export default async function CategoriesPage() {
  const [t, categories] = await Promise.all([
    getTranslations("categories"),
    getCategories(),
  ]);

  const translations = {
    delete: t("delete"),
    noCategories: t("noCategories"),
    deleteConfirm: t("deleteConfirm"),
    cancel: t("cancel"),
    moveUp: t("moveUp"),
    moveDown: t("moveDown"),
    edit: t("edit"),
  };

  return (
    <DashboardContainer>
      <CategoriesList translations={translations} initialData={categories} />
    </DashboardContainer>
  );
}
