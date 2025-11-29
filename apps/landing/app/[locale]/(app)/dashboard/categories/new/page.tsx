import { getTranslations } from "next-intl/server";
import { CategoryForm } from "../category-form";

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
    <div className="p-6">
      <CategoryForm translations={translations} />
    </div>
  );
}
