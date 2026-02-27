"use client";

import { useState, useRef } from "react";
import Image from "next/image";

interface HeroMediaProps {
  src: string;
  alt: string;
  accentColor: string;
}

function isVideo(url: string) {
  return /\.(mp4|webm|mov)$/i.test(url);
}

export function HeroMedia({ src, alt, accentColor }: HeroMediaProps) {
  const [loaded, setLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <>
      {/* Accent color background — visible until media loads */}
      <div
        className={`absolute inset-0 transition-opacity duration-500 ${
          loaded ? "opacity-0" : "opacity-100"
        }`}
        style={{ backgroundColor: accentColor }}
      />

      {/* Media */}
      {isVideo(src) ? (
        <video
          ref={videoRef}
          src={src}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          onPlaying={() => setLoaded(true)}
          onLoadedData={() => setLoaded(true)}
          className="absolute inset-0 w-full h-full object-cover"
        />
      ) : (
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          style={{ objectFit: "cover" }}
          sizes="100vw"
          priority
          onLoad={() => setLoaded(true)}
        />
      )}
    </>
  );
}
