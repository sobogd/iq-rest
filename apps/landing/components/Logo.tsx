import Image from "next/image";

interface LogoProps {
  height?: number;
  className?: string;
}

export function Logo({ height = 40, className }: LogoProps) {
  // Original aspect ratio: 525x113 ≈ 4.65:1
  const width = Math.round(height * 4.65);
  return (
    <Image
      src="/iq-rest-logo.png"
      alt="IQ Rest"
      width={width}
      height={height}
      className={className}
    />
  );
}
