import Image from "next/image";
import { SHADOW_STYLES, ANIMATION_BASE } from "./styles";
import type { BaseLayoutProps } from "./types";

export function HeroLayout({ images, className = "", priority = false }: BaseLayoutProps) {
  return (
    <div className={`relative w-full aspect-square max-w-[400px] md:max-w-[700px] mx-auto ${className}`}>
      {/* Glow effect */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[40%] bg-primary/20 blur-3xl rounded-full" />

      {/* Back left image - rotated left */}
      <div
        className={`absolute left-[5%] top-1/2 z-10 w-[40%] ${ANIMATION_BASE} animate-orbit-left`}
        style={{ filter: SHADOW_STYLES.side }}
      >
        <Image
          src={images.left.src}
          alt={images.left.alt}
          width={260}
          height={520}
          priority={priority}
          className="w-full h-auto"
        />
      </div>

      {/* Center image - main, on top */}
      <div
        className={`absolute left-1/2 top-1/2 z-30 w-[45%] ${ANIMATION_BASE} animate-orbit-center`}
        style={{ filter: SHADOW_STYLES.main }}
      >
        <Image
          src={images.center.src}
          alt={images.center.alt}
          width={280}
          height={560}
          priority={priority}
          className="w-full h-auto"
        />
      </div>

      {/* Back right image - rotated right */}
      <div
        className={`absolute right-[5%] top-1/2 z-10 w-[40%] ${ANIMATION_BASE} animate-orbit-right`}
        style={{ filter: SHADOW_STYLES.side }}
      >
        <Image
          src={images.right.src}
          alt={images.right.alt}
          width={260}
          height={520}
          priority={priority}
          className="w-full h-auto"
        />
      </div>
    </div>
  );
}
