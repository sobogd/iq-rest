import { getTranslations } from "next-intl/server";
import { CategoryEditClient } from "./category-edit-client";

export default async function EditCategoryPage() {
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
    notFound: t("notFound"),
    delete: t("delete"),
    deleteConfirm: t("deleteConfirm"),
  };

  return (
    <div className="p-6">
      <CategoryEditClient translations={translations} />
    </div>
  );
}
