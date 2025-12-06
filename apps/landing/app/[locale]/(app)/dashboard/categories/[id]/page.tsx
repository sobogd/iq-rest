import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { CategoryForm } from "../category-form";
import { DashboardContainer } from "@/components/dashboard-container";
import { getCategoryWithTranslations, getRestaurantLanguages } from "@/lib/data";

interface EditCategoryPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditCategoryPage({ params }: EditCategoryPageProps) {
  const { id } = await params;

  const [t, category, restaurant] = await Promise.all([
    getTranslations("categories"),
    getCategoryWithTranslations(id),
    getRestaurantLanguages(),
  ]);

  if (!category) {
    notFound();
  }

  const translations = {
    name: t("name"),
    namePlaceholder: t("namePlaceholder"),
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
      <CategoryForm category={category} restaurant={restaurant} translations={translations} />
    </DashboardContainer>
  );
}
