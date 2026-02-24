import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { VALID_FEATURE_IDS } from "../_lib/feature-data";

interface FeatureLinksProps {
  excludeFeatureId?: string;
}

export async function FeatureLinks({ excludeFeatureId }: FeatureLinksProps) {
  const t = await getTranslations("features");

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
