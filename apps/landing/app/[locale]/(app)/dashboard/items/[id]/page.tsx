import { getTranslations } from "next-intl/server";
import { ItemEditClient } from "./item-edit-client";

export default async function EditItemPage() {
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
    notFound: t("notFound"),
    delete: t("delete"),
    deleteConfirm: t("deleteConfirm"),
  };

  return (
    <div className="p-6">
      <ItemEditClient translations={translations} />
    </div>
  );
}
