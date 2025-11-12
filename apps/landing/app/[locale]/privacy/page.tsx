import { useTranslations } from "next-intl";

export default function PrivacyPage() {
  const t = useTranslations("footer.legal");

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center">
          {t("privacy")}
        </h1>
        <div className="prose prose-lg max-w-none">
          <p className="text-muted-foreground text-center">
            Coming soon...
          </p>
        </div>
      </div>
    </div>
  );
}
