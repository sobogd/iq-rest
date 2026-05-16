import { Check } from "lucide-react";

interface FeatureSeoBlockProps {
  description: string;
  fullDescription: string;
  benefits: string[];
  benefitsHeading?: string;
}

/** SEO-rich body section for feature pages — replaces the Founder section on
 *  the homepage layout. Renders a lead paragraph (description), a longer
 *  fullDescription, and a benefits checklist. Designed to surface keywords
 *  like "qr menu for restaurant", "restaurant website", "online ordering",
 *  etc. that already live in the per-locale features content. */
export function FeatureSeoBlock({
  description,
  fullDescription,
  benefits,
  benefitsHeading,
}: FeatureSeoBlockProps) {
  return (
    <div className="max-w-3xl mx-auto">
        <p className="text-base sm:text-lg text-foreground leading-relaxed mb-5">
          {description}
        </p>
        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-8 whitespace-pre-line">
          {fullDescription}
        </p>
        {benefits.length > 0 ? (
          <>
            {benefitsHeading ? (
              <h2 className="text-xl sm:text-2xl font-medium tracking-tight mb-4 text-foreground">
                {benefitsHeading}
              </h2>
            ) : null}
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 text-sm sm:text-base text-foreground/90">
              {benefits.map((b) => (
                <li key={b} className="flex items-start gap-2">
                  <Check className="h-4 w-4 flex-shrink-0 text-primary mt-1" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </>
        ) : null}
    </div>
  );
}
