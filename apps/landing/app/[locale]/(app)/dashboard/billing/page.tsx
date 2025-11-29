import { getTranslations } from "next-intl/server";

export default async function BillingPage() {
  const t = await getTranslations("sidebar.menu");

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">{t("billing")}</h1>
      <p className="text-muted-foreground mt-1">Coming soon</p>
    </div>
  );
}
