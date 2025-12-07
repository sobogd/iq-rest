import { getTranslations } from "next-intl/server";
import { QrCodeClient } from "./qr-code-client";
import { DashboardContainer } from "@/components/dashboard-container";
import { getQrCodeSlug } from "@/lib/data";

export default async function QrCodePage() {
  const [t, slug] = await Promise.all([
    getTranslations("qrCode"),
    getQrCodeSlug(),
  ]);

  const translations = {
    paperFormat: t("paperFormat"),
    qrPerPage: t("qrPerPage"),
    customText: t("customText"),
    customTextPlaceholder: t("customTextPlaceholder"),
    textSize: t("textSize"),
    print: t("print"),
    download: t("download"),
    noSlug: t("noSlug"),
    noSlugDescription: t("noSlugDescription"),
    goToSettings: t("goToSettings"),
    menuUrl: t("menuUrl"),
    formats: {
      a4: t("formats.a4"),
      a5: t("formats.a5"),
      a6: t("formats.a6"),
      letter: t("formats.letter"),
    },
    perPage: {
      one: t("perPage.one"),
      two: t("perPage.two"),
      four: t("perPage.four"),
      six: t("perPage.six"),
      nine: t("perPage.nine"),
      sixteen: t("perPage.sixteen"),
    },
    textSizes: {
      small: t("textSizes.small"),
      medium: t("textSizes.medium"),
      large: t("textSizes.large"),
    },
  };

  return (
    <DashboardContainer>
      <QrCodeClient t={translations} slug={slug} />
    </DashboardContainer>
  );
}
