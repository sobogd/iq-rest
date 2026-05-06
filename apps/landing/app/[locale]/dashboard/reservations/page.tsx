import { getTranslations } from "next-intl/server";
import { requireAuth } from "../_lib/require-auth";
import { MigratedNotice } from "../_components/migrated-notice";

export default async function Page() {
  await requireAuth();
  const t = await getTranslations("reservations");
  return (
    <MigratedNotice
      title={t("movedTitle")}
      body={t("movedBody")}
      cta={t("movedCta")}
    />
  );
}
