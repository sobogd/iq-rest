"use client";

import { useTranslations } from "next-intl";
import { MessageCircle } from "lucide-react";
import { PricingCards } from "./pricing-cards";
import type { SupportedCurrency } from "@/lib/country-currency-map";

interface PricingSectionProps {
  noIndex?: boolean;
  hideComparison?: boolean;
  hideButtons?: boolean;
  currency: SupportedCurrency;
}

export function PricingSection({ noIndex = false, hideComparison = false, hideButtons = false, currency }: PricingSectionProps) {
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
        <PricingCards hideComparison={hideComparison} hideButtons={hideButtons} currency={currency} />
        <div className="mt-12 text-center">
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
      </div>
    </div>
  );

  if (noIndex) {
    return <div data-noindex="true">{content}</div>;
  }

  return content;
}
