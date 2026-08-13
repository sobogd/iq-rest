import Image from "next/image";
import { DemoButton, type DemoVariant } from "./demo-button";
import { Phone, Tablet } from "./device-mockups";
import { PrimaryCtaButton } from "./primary-cta-button";
import { DEMO_BTN } from "./shell";
import { getIcon, type IconKey } from "../lib/icons";

export interface FeatureHeroVertical {
  icon: IconKey;
  label: string;
}

// Feature-page hero in the home card's clothes: verticals pinned top, headline
// block centred, CTA pair pinned bottom — and the page's photo where the home
// card keeps its device mockups.
export function FeatureHeroCard({
  locale,
  verticals,
  verticalIcons,
  title,
  titleAccent,
  sub,
  primaryLabel,
  demoText,
  demoVariant,
  image,
  phones,
  tablet,
}: {
  locale: string;
  verticals: string[];
  /** Icon+label chips instead of plain text — same treatment as the home
   *  hero. Overrides `verticals` when present. */
  verticalIcons?: FeatureHeroVertical[];
  title: string;
  /** Accent tail of the headline — brand gradient, same as the home hero. */
  titleAccent?: string;
  sub: string;
  primaryLabel: string;
  demoText: string;
  demoVariant: DemoVariant;
  image?: { src: string; alt: string };
  /** Two-phone artwork instead of `image` — same overlapping stack as the
   *  home hero's device panel, minus the tablets. */
  phones?: { src: string; alt: string }[];
  /** Single-tablet artwork on the warm tint — same framing as the home
   *  feature cards. Takes precedence over `image`. */
  tablet?: { src: string; alt: string };
}) {
  const hasArt = Boolean(image || phones || tablet);

  return (
    <div
      className={`overflow-hidden rounded-2xl border border-border grid grid-cols-1 ${
        hasArt ? "lg:grid-cols-[11fr_9fr]" : ""
      }`}
    >
      <div className="order-2 lg:order-1 min-w-0 flex flex-col items-start text-start gap-6 p-6 sm:p-8">
        <span className="flex flex-wrap items-center justify-start gap-x-4 gap-y-1 text-sm text-muted-foreground/80">
          {verticalIcons
            ? verticalIcons.map((v) => {
                const Icon = getIcon(v.icon);
                return (
                  <span key={v.label} className="inline-flex items-center gap-1.5">
                    <Icon className="h-4 w-4 shrink-0 text-muted-foreground" strokeWidth={2} />
                    {v.label}
                  </span>
                );
              })
            : verticals.map((v) => <span key={v}>{v}</span>)}
        </span>

        <div className="my-auto min-w-0 flex flex-col gap-4">
          <h1 className="text-4xl sm:text-[2.5rem] font-medium tracking-tight leading-[1.1]">
            {title}
            {titleAccent ? (
              <>
                {" "}
                <span className="sm:whitespace-nowrap bg-gradient-to-br from-primary to-amber-400 bg-clip-text text-transparent">
                  {titleAccent}
                </span>
              </>
            ) : null}
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground/80 leading-relaxed">{sub}</p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <PrimaryCtaButton text={primaryLabel} trackName="Hero CTA" />
          <DemoButton
            text={demoText}
            locale={locale}
            trackName="Hero demo"
            variant={demoVariant}
            className={DEMO_BTN}
          />
        </div>
      </div>

      {phones && phones.length >= 2 ? (
        <div className="order-1 lg:order-2 relative overflow-hidden bg-[hsl(32_44%_92%)] dark:bg-[hsl(32_14%_14%)] aspect-[4/3] lg:aspect-auto lg:min-h-[21.5rem]">
          {/* Same overlapping stack as the home hero's device panel, minus
              the tablets: the front phone covers a slice of the one behind. */}
          <div className="absolute inset-0 flex items-end justify-center">
            <div className="relative w-[70%] max-w-[280px] aspect-[280/289]">
              <Phone
                cropBottom
                ratio="720 / 1313"
                image={phones[0]}
                className="absolute left-0 bottom-0 w-[58%] z-10"
                sizes="(max-width: 1024px) 40vw, 165px"
              />
              <Phone
                cropBottom
                ratio="720 / 1278"
                image={phones[1]}
                className="absolute right-0 bottom-0 w-[58%] z-20"
                sizes="(max-width: 1024px) 40vw, 165px"
              />
            </div>
          </div>
        </div>
      ) : tablet ? (
        <div className="order-1 lg:order-2 relative overflow-hidden bg-[hsl(32_44%_92%)] dark:bg-[hsl(32_14%_14%)] aspect-[4/3] lg:aspect-auto lg:min-h-[21.5rem]">
          {/* Tablet pinned to the bottom edge, bottom bezel cropped away so the
              screen itself meets the card edge — reads as the device coming out
              from under the frame. Larger than the home cards' tablet art. */}
          <div className="absolute inset-x-0 bottom-0 flex justify-center">
            <Tablet className="w-[85%]" image={tablet} cropBottom priority />
          </div>
        </div>
      ) : image ? (
        <div className="order-1 lg:order-2 relative overflow-hidden aspect-[4/3] lg:aspect-auto lg:min-h-[21.5rem]">
          <Image
            src={image.src}
            alt={image.alt}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 450px"
            className="object-cover"
          />
        </div>
      ) : null}
    </div>
  );
}
