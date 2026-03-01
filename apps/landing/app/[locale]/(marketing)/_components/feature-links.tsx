import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { MessageCircle } from "lucide-react";
import { VALID_FEATURE_IDS } from "../_lib/feature-data";

interface FeatureLinksProps {
  excludeFeatureId?: string;
}

export async function FeatureLinks({ excludeFeatureId }: FeatureLinksProps) {
  const [t, tPricing] = await Promise.all([
    getTranslations("features"),
    getTranslations("pricing"),
  ]);

  const featuresList = t.raw("list") as Array<{
    id: string;
    title: string;
  }>;

  const features = featuresList.filter(
    (f) =>
      VALID_FEATURE_IDS.includes(f.id as (typeof VALID_FEATURE_IDS)[number]) &&
      f.id !== excludeFeatureId
  );

  if (features.length === 0) return null;

  return (
    <section className="py-12 lg:py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 lg:mb-16">
            <h3 className="text-lg font-semibold mb-2">{tPricing("questionsTitle")}</h3>
            <p className="text-sm text-muted-foreground mb-4 max-w-md mx-auto">{tPricing("questionsBody")}</p>
            <a
              href="https://wa.me/34637621754"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-md bg-[#25D366] px-5 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90"
            >
              <MessageCircle className="h-4 w-4" />
              {tPricing("questionsButton")}
            </a>
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            {features.map((feature) => (
              <Link
                key={feature.id}
                href={`/${feature.id}`}
                className="px-4 py-2 rounded-full border bg-muted/50 hover:bg-muted text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {feature.title}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
