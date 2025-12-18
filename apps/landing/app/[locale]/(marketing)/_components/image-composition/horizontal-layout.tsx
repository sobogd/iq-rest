import Image from "next/image";
import { SHADOW_STYLES, ANIMATION_BASE } from "./styles";
import type { BaseLayoutProps } from "./types";

export function HorizontalLayout({ images, className = "", priority = false }: BaseLayoutProps) {
  const sideSizes = "(max-width: 768px) 110px, 160px";
  const centerSizes = "(max-width: 768px) 145px, 210px";

  return (
    <div className={`relative w-full aspect-[3/2] max-w-[500px] mx-auto ${className}`}>
      {/* Glow effect */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[40%] bg-primary/20 blur-3xl rounded-full" />

      {/* Left image - slightly higher */}
      <div
        className={`absolute left-0 top-[45%] z-10 w-[32%] ${ANIMATION_BASE} animate-float-left`}
        style={{ filter: SHADOW_STYLES.side }}
      >
        <Image
          src={images.left.src}
          alt={images.left.alt}
          width={160}
          height={320}
          priority={priority}
          sizes={sideSizes}
          className="w-full h-auto"
        />
      </div>

      {/* Center image - main, on top, larger */}
      <div
        className={`absolute left-1/2 top-1/2 z-30 w-[42%] ${ANIMATION_BASE} animate-float-center`}
        style={{ filter: SHADOW_STYLES.main }}
      >
        <Image
          src={images.center.src}
          alt={images.center.alt}
          width={210}
          height={420}
          priority={priority}
          sizes={centerSizes}
          className="w-full h-auto"
        />
      </div>

      {/* Right image - slightly lower */}
      <div
        className={`absolute right-0 top-[60%] z-10 w-[32%] ${ANIMATION_BASE} animate-float-right`}
        style={{ filter: SHADOW_STYLES.side }}
      >
        <Image
          src={images.right.src}
          alt={images.right.alt}
          width={160}
          height={320}
          priority={priority}
          sizes={sideSizes}
          className="w-full h-auto"
        />
      </div>
    </div>
  );
}
