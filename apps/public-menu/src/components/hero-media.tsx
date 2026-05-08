import { useState, useRef } from "react";

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
      <div
        className={
          "absolute inset-0 transition-opacity duration-500 " +
          (loaded ? "opacity-0" : "opacity-100")
        }
        style={{ backgroundColor: accentColor }}
      />
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
        <img
          src={src}
          alt={alt}
          className={
            "absolute inset-0 w-full h-full object-cover transition-opacity duration-500 " +
            (loaded ? "opacity-100" : "opacity-0")
          }
          onLoad={() => setLoaded(true)}
        />
      )}
    </>
  );
}
