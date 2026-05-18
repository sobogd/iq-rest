import { Check } from "lucide-react";

interface FeatureSeoBlockProps {
  description: string;
  fullDescription: string;
  benefits: string[];
  benefitsHeading?: string;
}

// SEO body for feature pages, in the centered LP style — replaces the
// Founder section from the homepage layout. Lead paragraph + longer copy
// + benefits checklist.
export function FeatureSeoBlock({
  description,
  fullDescription,
  benefits,
  benefitsHeading,
}: FeatureSeoBlockProps) {
  return (
    <div className="w-full">
      <p className="text-base sm:text-lg text-foreground leading-relaxed mb-5 text-start">
        {description}
      </p>
      <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-8 whitespace-pre-line text-start">
        {fullDescription}
      </p>
      {benefits.length > 0 ? (
        <>
          {benefitsHeading ? (
            <h2 className="text-xl sm:text-2xl font-medium tracking-tight mb-6 text-foreground text-start">
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
