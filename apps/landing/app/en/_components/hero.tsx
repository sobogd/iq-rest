import Image from "next/image";
import { Check } from "lucide-react";
import { CtaButton } from "./cta-button";
import { PAIN_BULLETS, VERTICALS } from "../_lib/data";
import type { HeroVariant } from "../_lib/variants";
import sampleMain from "@/public/samples/sample-main.webp";
import sampleMainPage from "@/public/samples/sample-main-page.webp";
import sampleContacts from "@/public/samples/sample-contacts.webp";

export function Hero({ variant }: { variant: HeroVariant }) {
  return (
    <section className="container mx-auto px-4 pt-8 pb-16 lg:pt-12">
      <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-10 lg:gap-16 items-center">
        <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
          <div className="flex flex-wrap gap-1 sm:gap-1.5 mb-5 justify-center lg:justify-start">
            {VERTICALS.map((v) => (
              <span
                key={v}
                className="text-[9px] sm:text-[10px] uppercase tracking-wider text-muted-foreground border border-border rounded-full px-2 sm:px-2.5 py-[1px] sm:py-0.5"
              >
                {v}
              </span>
            ))}
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight leading-[1.1] mb-4">
            {variant.headline}{" "}
            <span className="bg-gradient-to-br from-primary to-amber-400 bg-clip-text text-transparent">
              {variant.headlineAccent}
            </span>
          </h1>

          <p className="text-sm sm:text-base text-muted-foreground max-w-xl mb-7 leading-snug">
            {variant.sub}
          </p>

          <div className="w-full">
            <CtaButton align="center-mobile" />
          </div>

          <ul className="mt-8 inline-grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-xs text-foreground/90 max-w-xl text-left mx-auto lg:mx-0">
            {PAIN_BULLETS.map((b) => (
              <li key={b} className="flex items-start gap-2">
                <Check className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-primary" />
                <span>{b}</span>
              </li>
            ))}
          </ul>

          <div className="mt-8 flex items-center gap-2 text-[11px] text-muted-foreground">
            <span className="text-amber-400">★★★★★</span>
            <span>4.9 · 500+ restaurants in 30+ countries</span>
          </div>
        </div>

        <div className="relative w-full max-w-[520px] mx-auto lg:max-w-none aspect-[5/4]">
          <Image
            src={sampleMain}
            alt="QR menu preview"
            priority
            placeholder="blur"
            sizes="(min-width: 1024px) 18vw, 30vw"
            className="absolute left-0 top-0 w-[36%] h-auto rounded-[2rem] overflow-hidden z-0"
          />
          <Image
            src={sampleContacts}
            alt="Restaurant contact page with map"
            priority
            placeholder="blur"
            sizes="(min-width: 1024px) 18vw, 30vw"
            className="absolute right-0 bottom-0 w-[36%] h-auto rounded-[2rem] overflow-hidden z-0"
          />
          <Image
            src={sampleMainPage}
            alt="Restaurant website homepage"
            priority
            placeholder="blur"
            sizes="(min-width: 1024px) 22vw, 38vw"
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[44%] h-auto rounded-[2rem] overflow-hidden z-10"
          />
        </div>
      </div>
    </section>
  );
}
