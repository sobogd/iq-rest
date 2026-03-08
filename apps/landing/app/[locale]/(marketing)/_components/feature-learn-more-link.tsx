"use client";

import { Link } from "@/i18n/routing";
import { analytics } from "@/lib/analytics";

interface FeatureLearnMoreLinkProps {
  featureId: string;
  className: string;
  children: React.ReactNode;
}

export function FeatureLearnMoreLink({ featureId, className, children }: FeatureLearnMoreLinkProps) {
  return (
    <Link
      href={`/${featureId}`}
      className={className}
      onClick={() => analytics.marketing.featureLinkClick(featureId)}
    >
      {children}
    </Link>
  );
}
