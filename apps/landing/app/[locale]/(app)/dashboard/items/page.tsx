import { getTranslations } from "next-intl/server";
import { ItemsList } from "./items-list";

export default async function ItemsPage() {
  const t = await getTranslations("items");

  const translations = {
    delete: t("delete"),
    noItems: t("noItems"),
    deleteConfirm: t("deleteConfirm"),
    cancel: t("cancel"),
    moveUp: t("moveUp"),
    moveDown: t("moveDown"),
    edit: t("edit"),
  };

  return <ItemsList translations={translations} />;
}
