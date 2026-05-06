import Image from "next/image";
import type { LandingTexts } from "../types";

interface FounderProps {
  texts: LandingTexts["founder"];
}

export function Founder({ texts }: FounderProps) {
  return (
    <section data-section="founder" className="py-8 sm:py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr] gap-8 lg:gap-12 items-center max-w-4xl mx-auto">
          <div className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-full overflow-hidden flex-shrink-0 mx-auto lg:mx-0">
            <Image
              src="/contacts.webp"
              alt={texts.photoAlt}
              fill
              sizes="160px"
              className="object-cover"
            />
          </div>

          <div className="text-center lg:text-start">
            <p className="text-xs font-medium uppercase tracking-widest text-primary mb-3">
              {texts.eyebrow}
            </p>
            <p className="text-lg sm:text-xl font-medium tracking-tight leading-snug mb-4">
              &ldquo;{texts.quoteStart}{" "}
              <span className="bg-gradient-to-br from-primary to-amber-400 bg-clip-text text-transparent">
                {texts.quoteAccent}
              </span>
              &rdquo;
            </p>
            <p className="text-sm text-muted-foreground">{texts.sign}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
