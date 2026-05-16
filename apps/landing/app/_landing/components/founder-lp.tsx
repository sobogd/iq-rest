import Image from "next/image";
import type { LandingTexts } from "../types";

interface FounderProps {
  texts: LandingTexts["founder"];
}

export function FounderLp({ texts }: FounderProps) {
  return (
    <div className="flex flex-col gap-8 items-center max-w-4xl mx-auto">
          <div className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-full overflow-hidden flex-shrink-0 mx-auto">
            <Image
              src="/contacts.webp"
              alt={texts.photoAlt}
              fill
              sizes="160px"
              className="object-cover"
            />
          </div>

          <div className="text-center">
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
  );
}
