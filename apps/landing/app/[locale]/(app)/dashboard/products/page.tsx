import { getTranslations } from "next-intl/server";

export default async function ProductsPage() {
  const t = await getTranslations("sidebar.menu");

  return (
    <div className="p-6 pb-24">
      <h1 className="text-2xl font-bold">{t("products")}</h1>
      <p className="text-muted-foreground mt-1">Coming soon</p>
    </div>
  );
}
