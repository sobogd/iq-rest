import { useTranslations } from "next-intl";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function DashboardPage() {
  const t = useTranslations("dashboard");

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">{t("title")}</h1>
        <p className="text-muted-foreground mt-2">{t("subtitle")}</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Menu Card */}
        <Card>
          <CardHeader>
            <CardTitle>{t("cards.menu.title")}</CardTitle>
            <CardDescription>{t("cards.menu.description")}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-32 flex items-center justify-center bg-muted rounded-lg">
              <span className="text-muted-foreground">{t("comingSoon")}</span>
            </div>
          </CardContent>
        </Card>

        {/* QR Code Card */}
        <Card>
          <CardHeader>
            <CardTitle>{t("cards.qrCode.title")}</CardTitle>
            <CardDescription>{t("cards.qrCode.description")}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-32 flex items-center justify-center bg-muted rounded-lg">
              <span className="text-muted-foreground">{t("comingSoon")}</span>
            </div>
          </CardContent>
        </Card>

        {/* Analytics Card */}
        <Card>
          <CardHeader>
            <CardTitle>{t("cards.analytics.title")}</CardTitle>
            <CardDescription>{t("cards.analytics.description")}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-32 flex items-center justify-center bg-muted rounded-lg">
              <span className="text-muted-foreground">{t("comingSoon")}</span>
            </div>
          </CardContent>
        </Card>

        {/* Settings Card */}
        <Card>
          <CardHeader>
            <CardTitle>{t("cards.settings.title")}</CardTitle>
            <CardDescription>{t("cards.settings.description")}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-32 flex items-center justify-center bg-muted rounded-lg">
              <span className="text-muted-foreground">{t("comingSoon")}</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
