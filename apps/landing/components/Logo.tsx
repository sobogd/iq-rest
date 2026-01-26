import Image from "next/image";

interface LogoProps {
  width?: number;
  height?: number;
  className?: string;
}

export function Logo({ width = 40, height = 40, className }: LogoProps) {
  return (
    <Image
      src="/logo.svg"
      alt="IQ Rest Logo"
      width={width}
      height={height}
      className={className}
    />
  );
}
