"use client";

import { useTranslations } from "next-intl";
import { PricingCards } from "./pricing-cards";

interface PricingSectionProps {
  noIndex?: boolean;
  hideComparison?: boolean;
  hideButtons?: boolean;
}

export function PricingSection({ noIndex = false, hideComparison = false, hideButtons = false }: PricingSectionProps) {
  const t = useTranslations("pricing");

  const content = (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl md:text-4xl font-bold text-center mb-4">
          {t("simpleTitle")}
        </h2>
        <p className="text-sm md:text-base font-medium text-primary text-center mb-12">
          {t("socialProof")}
        </p>
        <PricingCards hideComparison={hideComparison} hideButtons={hideButtons} />
      </div>
    </div>
  );

  if (noIndex) {
    return <div data-noindex="true">{content}</div>;
  }

  return content;
}
