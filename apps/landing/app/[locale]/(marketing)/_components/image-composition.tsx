import Image from "next/image";

type LayoutVariant = "hero" | "horizontal" | "duo" | "trio";

interface ImageCompositionProps {
  images: {
    left: { src: string; alt: string };
    center: { src: string; alt: string };
    right: { src: string; alt: string };
  };
  layout?: LayoutVariant;
  className?: string;
}

export function ImageComposition({ images, layout = "hero", className = "" }: ImageCompositionProps) {
  if (layout === "trio") {
    return (
      <div className={`relative w-full aspect-[3/2] max-w-[500px] mx-auto ${className}`}>
        {/* Glow effect */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[40%] bg-primary/20 blur-3xl rounded-full" />

        {/* Left image (red) */}
        <div
          className="absolute left-0 top-[50%] z-10 w-[35%] animate-float-left"
          style={{
            filter: "drop-shadow(0 10px 20px rgba(0,0,0,0.3)) drop-shadow(0 6px 6px rgba(0,0,0,0.2))",
          }}
        >
          <Image
            src={images.left.src}
            alt={images.left.alt}
            width={260}
            height={520}
            className="w-full h-auto"
          />
        </div>

        {/* Center image (green) - main, on top */}
        <div
          className="absolute left-1/2 top-1/2 z-30 w-[40%] -translate-x-1/2 -translate-y-1/2 animate-float-center"
          style={{
            filter: "drop-shadow(0 25px 40px rgba(0,0,0,0.4)) drop-shadow(0 10px 10px rgba(0,0,0,0.25))",
          }}
        >
          <Image
            src={images.center.src}
            alt={images.center.alt}
            width={280}
            height={560}
            className="w-full h-auto"
          />
        </div>

        {/* Right image (blue) */}
        <div
          className="absolute right-0 top-[50%] z-10 w-[35%] animate-float-right"
          style={{
            filter: "drop-shadow(0 10px 20px rgba(0,0,0,0.3)) drop-shadow(0 6px 6px rgba(0,0,0,0.2))",
          }}
        >
          <Image
            src={images.right.src}
            alt={images.right.alt}
            width={260}
            height={520}
            className="w-full h-auto"
          />
        </div>
      </div>
    );
  }

  if (layout === "duo") {
    return (
      <div className={`relative w-full aspect-[3/2] max-w-[400px] mx-auto ${className}`}>
        {/* Glow effect */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[40%] bg-primary/20 blur-3xl rounded-full" />

        {/* Left image - slightly higher */}
        <div
          className="absolute left-[5%] top-[45%] z-10 w-[48%] animate-float-left"
          style={{
            filter: "drop-shadow(0 15px 25px rgba(0,0,0,0.35)) drop-shadow(0 8px 8px rgba(0,0,0,0.2))",
          }}
        >
          <Image
            src={images.left.src}
            alt={images.left.alt}
            width={280}
            height={560}
            className="w-full h-auto"
          />
        </div>

        {/* Right image - slightly lower */}
        <div
          className="absolute right-[5%] top-[55%] z-20 w-[48%] animate-float-right"
          style={{
            filter: "drop-shadow(0 15px 25px rgba(0,0,0,0.35)) drop-shadow(0 8px 8px rgba(0,0,0,0.2))",
          }}
        >
          <Image
            src={images.right.src}
            alt={images.right.alt}
            width={280}
            height={560}
            className="w-full h-auto"
          />
        </div>
      </div>
    );
  }

  if (layout === "horizontal") {
    return (
      <div className={`relative w-full aspect-[3/2] max-w-[500px] mx-auto ${className}`}>
        {/* Glow effect */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[40%] bg-primary/20 blur-3xl rounded-full" />

        {/* Left image - slightly higher */}
        <div
          className="absolute left-0 top-[45%] z-10 w-[32%] animate-float-left"
          style={{
            filter: "drop-shadow(0 10px 20px rgba(0,0,0,0.3)) drop-shadow(0 6px 6px rgba(0,0,0,0.2))",
          }}
        >
          <Image
            src={images.left.src}
            alt={images.left.alt}
            width={260}
            height={520}
            className="w-full h-auto"
          />
        </div>

        {/* Center image - main, on top, larger */}
        <div
          className="absolute left-1/2 top-1/2 z-30 w-[42%] animate-float-center"
          style={{
            filter: "drop-shadow(0 25px 40px rgba(0,0,0,0.4)) drop-shadow(0 10px 10px rgba(0,0,0,0.25))",
          }}
        >
          <Image
            src={images.center.src}
            alt={images.center.alt}
            width={280}
            height={560}
            className="w-full h-auto"
          />
        </div>

        {/* Right image - slightly lower */}
        <div
          className="absolute right-0 top-[60%] z-10 w-[32%] animate-float-right"
          style={{
            filter: "drop-shadow(0 10px 20px rgba(0,0,0,0.3)) drop-shadow(0 6px 6px rgba(0,0,0,0.2))",
          }}
        >
          <Image
            src={images.right.src}
            alt={images.right.alt}
            width={260}
            height={520}
            className="w-full h-auto"
          />
        </div>
      </div>
    );
  }

  // Default: hero layout with tilted phones
  return (
    <div className={`relative w-full aspect-square max-w-[400px] md:max-w-[700px] mx-auto ${className}`}>
      {/* Glow effect */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[40%] bg-primary/20 blur-3xl rounded-full" />

      {/* Back left image - rotated left */}
      <div
        className="absolute left-[5%] top-1/2 z-10 w-[40%] animate-orbit-left"
        style={{
          filter: "drop-shadow(0 10px 20px rgba(0,0,0,0.3)) drop-shadow(0 6px 6px rgba(0,0,0,0.2))",
        }}
      >
        <Image
          src={images.left.src}
          alt={images.left.alt}
          width={260}
          height={520}
          className="w-full h-auto"
        />
      </div>

      {/* Center image - main, on top */}
      <div
        className="absolute left-1/2 top-1/2 z-30 w-[45%] animate-orbit-center"
        style={{
          filter: "drop-shadow(0 25px 40px rgba(0,0,0,0.4)) drop-shadow(0 10px 10px rgba(0,0,0,0.25))",
        }}
      >
        <Image
          src={images.center.src}
          alt={images.center.alt}
          width={280}
          height={560}
          className="w-full h-auto"
        />
      </div>

      {/* Back right image - rotated right */}
      <div
        className="absolute right-[5%] top-1/2 z-10 w-[40%] animate-orbit-right"
        style={{
          filter: "drop-shadow(0 10px 20px rgba(0,0,0,0.3)) drop-shadow(0 6px 6px rgba(0,0,0,0.2))",
        }}
      >
        <Image
          src={images.right.src}
          alt={images.right.alt}
          width={260}
          height={520}
          className="w-full h-auto"
        />
      </div>
    </div>
  );
}
