import { getTranslations } from "next-intl/server";
import { HeroCreateButton } from "./hero-create-button";

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
          <div className="flex justify-center pt-4">
            <HeroCreateButton>{t("getStarted")}</HeroCreateButton>
          </div>
        </div>
      </div>
    </section>
  );
}
