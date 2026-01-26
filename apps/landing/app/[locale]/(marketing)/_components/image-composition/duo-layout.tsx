import Image from "next/image";
import { SHADOW_STYLES, ANIMATION_BASE } from "./styles";
import type { BaseLayoutProps } from "./types";

export function DuoLayout({ images, className = "", priority = false }: BaseLayoutProps) {
  const imageSizes = "(max-width: 768px) 150px, 190px";

  return (
    <div className={`relative w-full aspect-[3/2] max-w-[400px] mx-auto ${className}`}>
      {/* Glow effect */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[40%] bg-primary/20 blur-3xl rounded-full" />

      {/* Left image - slightly higher */}
      <div
        className={`absolute left-[5%] top-[45%] z-10 w-[48%] ${ANIMATION_BASE} animate-float-left`}
        style={{ filter: SHADOW_STYLES.duo }}
      >
        <Image
          src={images.left.src}
          alt={images.left.alt}
          width={190}
          height={380}
          priority={priority}
          sizes={imageSizes}
          placeholder={typeof images.left.src === "object" ? "blur" : undefined}
          quality={80}
          className="w-full h-auto"
        />
      </div>

      {/* Right image - slightly lower */}
      <div
        className={`absolute right-[5%] top-[55%] z-20 w-[48%] ${ANIMATION_BASE} animate-float-right`}
        style={{ filter: SHADOW_STYLES.duo }}
      >
        <Image
          src={images.right.src}
          alt={images.right.alt}
          width={190}
          height={380}
          priority={priority}
          sizes={imageSizes}
          placeholder={typeof images.right.src === "object" ? "blur" : undefined}
          quality={80}
          className="w-full h-auto"
        />
      </div>
    </div>
  );
}
