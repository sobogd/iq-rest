import { getTranslations } from "next-intl/server";
import { MessageCircle } from "lucide-react";

export async function WhatsAppBlock() {
  const t = await getTranslations("pricing");

  return (
    <section className="py-12">
      <div className="container mx-auto px-4 text-center">
        <h3 className="text-lg font-semibold mb-2">{t("questionsTitle")}</h3>
        <p className="text-sm text-muted-foreground mb-4 max-w-md mx-auto">{t("questionsBody")}</p>
        <a
          href="https://wa.me/34637621754"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-md bg-[#25D366] px-5 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90"
        >
          <MessageCircle className="h-4 w-4" />
          {t("questionsButton")}
        </a>
      </div>
    </section>
  );
}
