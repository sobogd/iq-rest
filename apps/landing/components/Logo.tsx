import Image from "next/image";

interface LogoProps {
  height?: number;
  className?: string;
}

export function Logo({ height = 40, className }: LogoProps) {
  const width = Math.round(height * 3.36);
  return (
    <Image
      src="/wordmark.svg"
      alt="QRgine"
      width={width}
      height={height}
      className={className}
    />
  );
}
