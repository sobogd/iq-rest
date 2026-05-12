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


export function Features({ texts }: FeaturesProps) {
  return (
    <section id="features" data-section="features" className="scroll-mt-16 py-16 bg-muted/20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight mb-3 text-center lg:text-start">
          {texts.heading}{" "}
          <span className="text-muted-foreground">{texts.headingAccent}</span>
        </h2>
        <p className="text-base sm:text-lg text-muted-foreground mb-10 text-center lg:text-start">{texts.sub}</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-12 items-start">
          {texts.items.map(({ Icon, title, desc }, i) => {
            const image = FEATURE_IMAGES[i];

            if (image) {
              const mirror = i % 2 === 1;
              const gridCols = mirror
                ? "grid-cols-[1fr_45%] sm:grid-cols-[25%_1fr]"
                : "grid-cols-[45%_1fr] sm:grid-cols-[25%_1fr]";
              const areas = mirror
                ? "[grid-template-areas:'title_image''desc_image'] sm:[grid-template-areas:'image_title''image_desc']"
                : "[grid-template-areas:'image_title''image_desc']";
              const imageEdge = mirror
                ? "-mr-4 sm:mr-0 rounded-r-none rounded-l-3xl sm:rounded-3xl border-y-[6px] border-l-[6px] sm:border-r-[6px] border-foreground/10"
                : "-ml-4 sm:ml-0 rounded-l-none rounded-r-3xl sm:rounded-3xl border-y-[6px] border-r-[6px] sm:border-l-[6px] border-foreground/10";
              return (
                <div
                  key={title}
                  className={`grid ${gridCols} ${areas} items-center text-start gap-x-4 gap-y-2 sm:gap-x-5`}
                >
                  <div className={`[grid-area:image] relative aspect-square overflow-hidden bg-background ${imageEdge}`}>
                    <Image
                      src={image}
                      alt={title}
                      fill
                      sizes="(max-width: 640px) 30vw, 15vw"
                      className="object-cover"
                      priority={i === 0}
                    />
                  </div>
                  <h3 className={`[grid-area:title] self-end text-lg sm:text-xl font-semibold tracking-tight ${mirror ? "sm:text-start" : ""}`}>
                    {title}
                  </h3>
                  <p className={`[grid-area:desc] self-start text-sm sm:text-base text-muted-foreground leading-relaxed ${mirror ? "sm:text-start" : ""}`}>
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
                  <div className="text-lg sm:text-xl font-semibold tracking-tight mb-2">{title}</div>
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
