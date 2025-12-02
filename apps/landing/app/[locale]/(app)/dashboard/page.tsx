import { getTranslations } from "next-intl/server";
import { getUserCompany } from "@/lib/auth";
import { DashboardContainer } from "@/components/dashboard-container";

export default async function DashboardPage() {
  const [t, company] = await Promise.all([
    getTranslations("sidebar.menu"),
    getUserCompany(),
  ]);

  return (
    <DashboardContainer>
      <h1 className="text-2xl font-bold">{t("dashboard")}</h1>
      {company && (
        <div className="mt-4 p-4 bg-muted rounded-lg">
          <p className="text-sm text-muted-foreground">Company Name</p>
          <p className="font-medium">{company.name}</p>
          <p className="text-sm text-muted-foreground mt-2">Company ID</p>
          <p className="font-mono text-sm">{company.id}</p>
        </div>
      )}
    </DashboardContainer>
  );
}
