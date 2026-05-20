import Image from "next/image";
import { Quote } from "lucide-react";
import type { LandingTexts } from "../types";

interface FounderProps {
  texts: LandingTexts["founder"];
}

export function FounderLp({ texts }: FounderProps) {
  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col items-center text-center py-6 sm:py-10">
      <p className="text-xs font-medium uppercase tracking-widest text-primary mb-6">
        {texts.eyebrow}
      </p>

      <Quote
        aria-hidden
        className="h-10 w-10 sm:h-12 sm:w-12 text-primary/40 mb-4 rotate-180"
        strokeWidth={1.5}
      />

      <blockquote className="text-xl sm:text-2xl lg:text-3xl font-medium tracking-tight leading-snug mb-8 max-w-3xl">
        {texts.quoteStart}{" "}
        <span className="bg-gradient-to-br from-primary to-amber-400 bg-clip-text text-transparent">
          {texts.quoteAccent}
        </span>
      </blockquote>

      {(() => {
        const parts = texts.sign.split("·").map((s) => s.trim());
        const name = parts[0] ?? texts.sign;
        const role = parts.slice(1).join(" · ");
        return (
          <div className="flex flex-col items-center text-center gap-2 sm:flex-row sm:items-center sm:gap-3 sm:text-start">
            <div className="relative w-14 h-14 sm:w-12 sm:h-12 rounded-full overflow-hidden flex-shrink-0">
              <Image
                src="/contacts.webp"
                alt={texts.photoAlt}
                fill
                sizes="56px"
                className="object-cover"
              />
            </div>
            <div className="flex flex-col">
              <p className="text-base font-medium text-foreground/90">{name}</p>
              {role ? (
                <p className="text-base text-muted-foreground">{role}</p>
              ) : null}
            </div>
          </div>
        );
      })()}
    </div>
  );
}
