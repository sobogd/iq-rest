"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { MessageCircle } from "lucide-react";
import { VALID_FEATURE_IDS } from "../_lib/feature-data";
import { analytics } from "@/lib/analytics";

interface FeatureLinksProps {
  excludeFeatureId?: string;
}

export function FeatureLinks({ excludeFeatureId }: FeatureLinksProps) {
  const t = useTranslations("features");
  const tPricing = useTranslations("pricing");

  const featuresList = t.raw("list") as Array<{
    id: string;
    title: string;
    titleAccent?: string;
  }>;

  const features = featuresList.filter(
    (f) =>
      VALID_FEATURE_IDS.includes(f.id as (typeof VALID_FEATURE_IDS)[number]) &&
      f.id !== excludeFeatureId
  );

  return (
    <>
      {/* WhatsApp CTA — dark section */}
      <section className="pt-16 pb-24 md:py-20 bg-black text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight">
              {tPricing("questionsTitle")}
            </h2>
            <p className="text-sm md:text-base text-white/60 max-w-xl mx-auto">
              {tPricing("questionsBody")}
            </p>
            <div className="pt-2">
              <a
                href="https://wa.me/34637621754"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-[15px] bg-[#25D366] px-6 py-2.5 text-base font-medium text-white transition-opacity hover:opacity-90 lg:px-8 lg:py-3 lg:text-lg"
                onClick={() => analytics.track("land_whatsapp_click")}
              >
                <MessageCircle className="h-5 w-5" />
                {tPricing("questionsButton")}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Feature links */}
      {features.length > 0 && (
        <section className="py-12 lg:py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="flex flex-wrap justify-center gap-2">
                {features.map((feature) => (
                  <Link
                    key={feature.id}
                    href={`/${feature.id}`}
                    className="px-4 py-2 rounded-xl border bg-muted/50 hover:bg-muted text-sm text-muted-foreground hover:text-foreground transition-colors"
                    onClick={() => analytics.track("land_feature_link_click")}
                  >
                    {feature.titleAccent ? `${feature.title} ${feature.titleAccent}` : feature.title}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
