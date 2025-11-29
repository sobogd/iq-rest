import { getTranslations } from "next-intl/server";
import { ItemsList } from "./items-list";
import { getItems } from "@/lib/data";

export default async function ItemsPage() {
  const [t, items] = await Promise.all([
    getTranslations("items"),
    getItems(),
  ]);

  const translations = {
    delete: t("delete"),
    noItems: t("noItems"),
    deleteConfirm: t("deleteConfirm"),
    cancel: t("cancel"),
    moveUp: t("moveUp"),
    moveDown: t("moveDown"),
    edit: t("edit"),
  };

  return <ItemsList translations={translations} initialData={items} />;
}
