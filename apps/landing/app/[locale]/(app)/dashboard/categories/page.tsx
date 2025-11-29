import { getTranslations } from "next-intl/server";
import { CategoriesList } from "./categories-list";

export default async function CategoriesPage() {
  const t = await getTranslations("categories");

  const translations = {
    delete: t("delete"),
    noCategories: t("noCategories"),
    deleteConfirm: t("deleteConfirm"),
    cancel: t("cancel"),
    moveUp: t("moveUp"),
    moveDown: t("moveDown"),
    edit: t("edit"),
  };

  return <CategoriesList translations={translations} />;
}
