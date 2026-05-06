import Image from "next/image";
import type { LandingTexts } from "../types";

interface FeaturesProps {
  texts: LandingTexts["features"];
}

const FEATURE_IMAGES: Record<number, string> = {
  0: "/samples/online-orders-floorplan.webp",
  1: "/samples/languages-picker.webp",
  2: "/samples/reservations-list.webp",
  3: "/samples/design-customization.webp",
  4: "/samples/menu-item-editor.webp",
  5: "/samples/kitchen-display.webp",
};

const FEATURE_TAG_VARIANT: Record<number, "default" | "green"> = {
  0: "default",
  1: "default",
  2: "default",
  3: "default",
  4: "default",
  5: "green",
};

const TAG_STYLES = {
  default: "bg-primary/10 text-primary border-primary/30",
  green: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
} as const;

export function Features({ texts }: FeaturesProps) {
  return (
    <section id="features" data-section="features" className="scroll-mt-16 py-16 bg-muted/20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight mb-3 text-center lg:text-start">
          {texts.heading}{" "}
          <span className="text-muted-foreground">{texts.headingAccent}</span>
        </h2>
        <p className="text-base sm:text-lg text-muted-foreground mb-10 text-center lg:text-start">{texts.sub}</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-10 items-start">
          {texts.items.map(({ Icon, title, desc, tag }, i) => {
            const image = FEATURE_IMAGES[i];
            const variant = FEATURE_TAG_VARIANT[i] ?? "default";
            const tagEl = tag && (
              <span
                className={`w-fit inline-flex items-center px-2.5 py-0.5 text-xs font-medium rounded-lg border ${TAG_STYLES[variant]}`}
              >
                {tag}
              </span>
            );

            if (image) {
              return (
                <div
                  key={title}
                  className="flex flex-col items-center text-center gap-3 sm:grid sm:grid-cols-[30%_1fr] sm:items-center sm:text-start sm:gap-x-5 sm:gap-y-1 sm:[grid-template-areas:'image_tag''image_title''image_desc']"
                >
                  <div className="w-full max-w-[200px] mb-3 sm:mb-0 sm:max-w-none sm:[grid-area:image] relative aspect-square rounded-3xl overflow-hidden border-[6px] border-[hsl(0_0%_8%)] bg-background">
                    <Image
                      src={image}
                      alt={title}
                      fill
                      sizes="(max-width: 640px) 60vw, 15vw"
                      className="object-cover"
                      priority={i === 0}
                    />
                  </div>
                  <div className="sm:[grid-area:tag] sm:self-end">{tagEl}</div>
                  <h3 className="sm:[grid-area:title] text-base sm:text-lg font-semibold tracking-tight">
                    {title}
                  </h3>
                  <p className="sm:[grid-area:desc] sm:self-start text-sm sm:text-base text-muted-foreground leading-relaxed">
                    {desc}
                  </p>
                </div>
              );
            }
            return (
              <div key={title} className="flex flex-row gap-4 sm:gap-5 items-start">
                <div className="shrink-0 h-10 w-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                  <Icon className="h-5 w-5" strokeWidth={2} />
                </div>
                <div className="min-w-0 flex-1">
                  {tagEl && <div className="mb-2 sm:mb-4">{tagEl}</div>}
                  <div className="text-base sm:text-lg font-semibold tracking-tight mb-2">{title}</div>
                  <div className="text-sm sm:text-base text-muted-foreground leading-relaxed">{desc}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
