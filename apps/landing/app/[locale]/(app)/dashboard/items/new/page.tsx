import { getTranslations } from "next-intl/server";
import { ItemForm } from "../item-form";

export default async function NewItemPage() {
  const t = await getTranslations("items");

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
    isActive: t("isActive"),
    save: t("save"),
    saving: t("saving"),
    cancel: t("cancel"),
    error: t("error"),
    close: t("close"),
  };

  return (
    <div className="p-6">
      <ItemForm translations={translations} />
    </div>
  );
}
