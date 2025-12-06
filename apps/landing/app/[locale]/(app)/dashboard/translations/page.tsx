import { getTranslations } from "next-intl/server";
import { TranslationsList } from "./translations-list";
import { DashboardContainer } from "@/components/dashboard-container";
import { getLanguagesPageData } from "@/lib/data";

export default async function TranslationsPage() {
  const [t, data] = await Promise.all([
    getTranslations("translations"),
    getLanguagesPageData(),
  ]);

  const translations = {
    defaultLanguage: t("defaultLanguage"),
    deleteTranslationsConfirm: t("deleteTranslationsConfirm"),
    cancel: t("cancel"),
    confirm: t("confirm"),
  };

  return (
    <DashboardContainer>
      <TranslationsList
        translations={translations}
        initialLanguages={data?.languages || ["en"]}
        initialDefaultLanguage={data?.defaultLanguage || "en"}
        initialStats={data?.stats || {}}
      />
    </DashboardContainer>
  );
}
