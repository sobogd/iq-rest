import Image from "next/image";

interface FeatureRowProps {
  id?: string;
  image: { src: string; alt: string };
  eyebrow?: string;
  heading: string;
  body: string;
  bullets?: string[];
  /** Reverse to put image on the right at lg+. Mobile stays image-first. */
  reverse?: boolean;
}

export function FeatureRow({
  id,
  image,
  eyebrow,
  heading,
  body,
  bullets,
  reverse = false,
}: FeatureRowProps) {
  return (
    <section
      id={id}
      data-section="feature-row"
      className="scroll-mt-16 w-full px-4 sm:px-6 lg:px-10 xl:px-14 py-12 sm:py-16 lg:py-4"
    >
      <div className="grid grid-cols-1 gap-8 lg:gap-14 xl:gap-20 lg:grid-cols-[1fr_1fr] lg:items-center">
        <div
          className={
            "w-full " +
            (reverse
              ? "order-1 lg:order-2 lg:max-w-[calc(100%-100px)] lg:ml-auto"
              : "order-1 lg:order-1 lg:max-w-[calc(100%-100px)] lg:mr-auto")
          }
        >
          <div className="relative w-full aspect-[4/3] overflow-hidden rounded-2xl lg:rounded-3xl shadow-2xl ring-1 ring-black/5 dark:ring-white/5">
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>

        <div
          className={
            "flex flex-col items-start text-start " +
            (reverse ? "order-2 lg:order-1" : "order-2 lg:order-2")
          }
        >
          {eyebrow ? (
            <span className="inline-flex items-center h-6 leading-none text-[10px] uppercase tracking-wider text-muted-foreground border border-border rounded-full px-2.5 mb-4">
              {eyebrow}
            </span>
          ) : null}
          <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-medium tracking-tight leading-[1.1] mb-4">
            {heading}
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-muted-foreground/80 max-w-xl mb-5 leading-snug">
            {body}
          </p>
          {bullets && bullets.length > 0 ? (
            <ul className="flex flex-col gap-2 text-base text-foreground/80 lg:text-start">
              {bullets.map((b) => (
                <li key={b} className="flex items-start gap-2.5">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-br from-[hsl(9,100%,58%)] to-[hsl(35,95%,55%)]" />
                  <span className="leading-snug">{b}</span>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </div>
    </section>
  );
}
