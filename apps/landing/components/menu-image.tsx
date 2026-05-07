"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

interface MenuImageProps {
  src: string;
  alt: string;
  priority?: boolean;
}

export function MenuImage({ src, alt, priority }: MenuImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(!!priority);
  const containerRef = useRef<HTMLDivElement>(null);

  // Start fetching as soon as the card is within ~400px of the viewport.
  // Browser-level HTTP/2 multiplexing handles concurrency — the previous
  // hand-rolled sequential queue blocked images deep in the menu when the
  // user scrolled fast.
  useEffect(() => {
    if (priority) return;
    const element = containerRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: "400px" },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [priority]);

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

      {/* Actual image — only render once near the viewport. */}
      {isInView && (
        <Image
          src={src}
          alt={alt}
          fill
          className={`object-cover transition-opacity duration-500 ${
            isLoaded ? "opacity-100" : "opacity-0"
          }`}
          style={{ objectFit: "cover" }}
          sizes="(max-width: 440px) 100vw, 440px"
          priority={priority}
          onLoad={() => setIsLoaded(true)}
          onError={() => setIsLoaded(true)}
        />
      )}
    </div>
  );
}
