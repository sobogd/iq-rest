import Image from "next/image";
import { SHADOW_STYLES, ANIMATION_BASE } from "./styles";
import type { BaseLayoutProps } from "./types";

export function TrioLayout({ images, className = "", priority = false }: BaseLayoutProps) {
  const sideSizes = "(max-width: 768px) 120px, 175px";
  const centerSizes = "(max-width: 768px) 140px, 200px";

  return (
    <div className={`relative w-full aspect-[3/2] max-w-[500px] mx-auto ${className}`}>
      {/* Glow effect */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[40%] bg-primary/20 blur-3xl rounded-full" />

      {/* Left image */}
      <div
        className={`absolute left-0 top-[50%] z-10 w-[35%] ${ANIMATION_BASE} animate-float-left`}
        style={{ filter: SHADOW_STYLES.side }}
      >
        <Image
          src={images.left.src}
          alt={images.left.alt}
          width={175}
          height={350}
          priority={priority}
          sizes={sideSizes}
          className="w-full h-auto"
        />
      </div>

      {/* Center image - main, on top */}
      <div
        className={`absolute left-1/2 top-1/2 z-30 w-[40%] -translate-x-1/2 -translate-y-1/2 ${ANIMATION_BASE} animate-float-center`}
        style={{ filter: SHADOW_STYLES.main }}
      >
        <Image
          src={images.center.src}
          alt={images.center.alt}
          width={200}
          height={400}
          priority={priority}
          sizes={centerSizes}
          className="w-full h-auto"
        />
      </div>

      {/* Right image */}
      <div
        className={`absolute right-0 top-[50%] z-10 w-[35%] ${ANIMATION_BASE} animate-float-right`}
        style={{ filter: SHADOW_STYLES.side }}
      >
        <Image
          src={images.right.src}
          alt={images.right.alt}
          width={175}
          height={350}
          priority={priority}
          sizes={sideSizes}
          className="w-full h-auto"
        />
      </div>
    </div>
  );
}
