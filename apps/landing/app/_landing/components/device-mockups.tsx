import Image from "next/image";

// Standalone device mockups for the feature cards — a CSS device with a real
// screenshot inside, sized off the hero group's proportions (phone 170×289 +
// 8 frame, tablet 474×363 + 11 frame, radius 16).

const round = (n: number) => +n.toFixed(3);

export interface MockupImage {
  src: string;
  alt: string;
}

// ── Single devices for the feature cards ───────────────────────────────────
// Same construction as the demo modal's phone: a solid dark body with padding
// for the frame, a rounded screen well inside it and a camera dot on the top
// edge. Padding beats a border here — no seam between frame and screen, so the
// edges stay crisp at any size. Thicknesses are in `cqw` (1% of the device's
// own width) against a wrapper container, so the whole thing scales as one.
const BODY = "#1a1a1a";

function Device({
  image,
  ratio,
  frame,
  radius,
  baseW,
  dot,
  cropBottom = false,
  cropTop = false,
  priority = false,
  className,
  sizes,
}: {
  image: MockupImage;
  /** Aspect of the screen well. Pass the screenshot's own ratio when the whole
   *  screenshot has to stay visible, so nothing gets cropped. */
  ratio: string;
  /** Frame thickness and corner radius at the device's own pixel width. */
  frame: number;
  radius: number;
  baseW: number;
  dot: boolean;
  /** Cut the device off at one edge: that side loses its frame and its corner
   *  radius. Reads as a phone continuing past the edge of the artwork while the
   *  whole screenshot stays inside it. */
  cropBottom?: boolean;
  cropTop?: boolean;
  /** Set on the hero's largest device — it is the page's LCP candidate. */
  priority?: boolean;
  className: string;
  sizes: string;
}) {
  const cq = (px: number) => `${round((px / baseW) * 100)}cqw`;
  const outer = cq(radius + frame);
  const inner = cq(radius);
  const corners = (r: string) =>
    cropTop ? `0 0 ${r} ${r}` : cropBottom ? `${r} ${r} 0 0` : r;
  const pad = cropTop
    ? `0 ${cq(frame)} ${cq(frame)}`
    : cropBottom
      ? `${cq(frame)} ${cq(frame)} 0`
      : cq(frame);
  return (
    <div className={className} style={{ containerType: "inline-size" }}>
      <div
        className="relative w-full shadow-2xl"
        style={{ background: BODY, padding: pad, borderRadius: corners(outer) }}
      >
        <div
          className="relative w-full overflow-hidden bg-white"
          style={{ aspectRatio: ratio, borderRadius: corners(inner) }}
        >
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes={sizes}
            priority={priority}
            className="object-cover object-top"
          />
          {dot && !cropTop ? (
            <span
              className="absolute left-1/2 -translate-x-1/2 rounded-full bg-black/80"
              style={{ top: cq(frame * 0.7), width: cq(frame * 0.8), height: cq(frame * 0.8) }}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
}

export function Phone({
  image,
  ratio = "170 / 289",
  cropBottom = false,
  cropTop = false,
  className = "w-full",
  sizes = "(max-width: 1024px) 45vw, 320px",
}: {
  image: MockupImage;
  /** Screen aspect — pass the screenshot's own so it shows in full. */
  ratio?: string;
  cropBottom?: boolean;
  cropTop?: boolean;
  /** Overrides the default `w-full` — pass a width utility when the device
   *  isn't meant to fill its positioning wrapper (e.g. two side-by-side in
   *  one box). */
  className?: string;
  sizes?: string;
}) {
  return (
    <Device
      image={image}
      ratio={ratio}
      baseW={170}
      frame={8}
      radius={16}
      dot
      cropBottom={cropBottom}
      cropTop={cropTop}
      className={className}
      sizes={sizes}
    />
  );
}

// ── Single tablet ───────────────────────────────────────────────────────────
export function Tablet({
  image,
  cropBottom = false,
  priority = false,
  className = "w-full",
  sizes = "(max-width: 1024px) 90vw, 520px",
}: {
  image: MockupImage;
  cropBottom?: boolean;
  priority?: boolean;
  /** Overrides the default `w-full` — pass a width utility when the tablet
   *  isn't meant to fill its positioning wrapper. */
  className?: string;
  sizes?: string;
}) {
  return (
    <Device
      image={image}
      ratio="474 / 363"
      baseW={474}
      frame={11}
      radius={16}
      dot={false}
      cropBottom={cropBottom}
      priority={priority}
      className={className}
      sizes={sizes}
    />
  );
}
