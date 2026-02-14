"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

interface MenuImageProps {
  src: string;
  alt: string;
  canLoad: boolean;
  onLoaded: () => void;
}

export function MenuImage({ src, alt, canLoad, onLoaded }: MenuImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [hasStartedLoading, setHasStartedLoading] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Intersection Observer to detect when image is in viewport
  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" } // Start loading 200px before visible
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  // Start loading when in view AND canLoad is true
  useEffect(() => {
    if (isInView && canLoad && !hasStartedLoading) {
      setHasStartedLoading(true);
    }
  }, [isInView, canLoad, hasStartedLoading]);

  const handleLoad = () => {
    setIsLoaded(true);
    onLoaded();
  };

  return (
    <div
      ref={containerRef}
      className="relative aspect-square w-full min-[440px]:rounded-lg overflow-hidden"
    >
      {/* Skeleton placeholder with shimmer effect */}
      <div
        className={`absolute inset-0 bg-gray-200 transition-opacity duration-300 ${
          isLoaded ? "opacity-0" : "opacity-100"
        }`}
      >
        <div className="absolute inset-0 skeleton-shimmer" />
      </div>

      {/* Actual image - only render when should load */}
      {hasStartedLoading && (
        <Image
          src={src}
          alt={alt}
          fill
          className={`object-cover transition-opacity duration-500 ${
            isLoaded ? "opacity-100" : "opacity-0"
          }`}
          sizes="(max-width: 440px) 100vw, 440px"
          onLoad={handleLoad}
        />
      )}
    </div>
  );
}
