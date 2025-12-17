import { getTranslations } from "next-intl/server";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/routing";

export async function CtaSection() {
  const t = await getTranslations("features");

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <div className="space-y-2">
            <h2 className="text-3xl md:text-4xl font-bold">{t("readyTitle")}</h2>
            <p className="text-base sm:text-lg md:text-lg text-muted-foreground leading-relaxed">
              {t("readyDescription")}
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button asChild size="lg" className="text-lg px-8 py-6">
              <Link href="/dashboard">{t("getStarted")}</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="text-lg px-8 py-6"
            >
              <Link href="/pricing">{t("viewPricing")}</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
