import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { ItemForm } from "../item-form";
import { DashboardContainer } from "@/components/dashboard-container";
import { getItemWithTranslations, getCategories, getRestaurantLanguages } from "@/lib/data";

interface EditItemPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditItemPage({ params }: EditItemPageProps) {
  const { id } = await params;

  const [t, item, categories, restaurant] = await Promise.all([
    getTranslations("items"),
    getItemWithTranslations(id),
    getCategories(),
    getRestaurantLanguages(),
  ]);

  if (!item) {
    notFound();
  }

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
    status: t("status"),
    active: t("active"),
    inactive: t("inactive"),
    save: t("save"),
    saving: t("saving"),
    cancel: t("cancel"),
    error: t("error"),
    close: t("close"),
    delete: t("delete"),
    deleteConfirm: t("deleteConfirm"),
  };

  return (
    <DashboardContainer>
      <ItemForm item={item} categories={categories} restaurant={restaurant} translations={translations} />
    </DashboardContainer>
  );
}
