import Image from "next/image";
import type { LandingTexts } from "../types";

interface FounderProps {
  texts: LandingTexts["founder"];
}

export function FounderLp({ texts }: FounderProps) {
  return (
    <div className="flex flex-col items-center text-center gap-6 sm:gap-8 lg:flex-row lg:items-center lg:text-start lg:gap-10">
      <div className="relative w-[120px] h-[120px] rounded-full overflow-hidden flex-shrink-0">
        <Image
          src="/contacts.webp"
          alt={texts.photoAlt}
          fill
          sizes="120px"
          className="object-cover"
        />
      </div>

      <div className="min-w-0">
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
