import { useEffect, useRef, useState } from "react";

interface Props {
  src: string;
  alt: string;
  priority?: boolean;
}

// Lazy-loads as soon as the card is within ~400px of the viewport. Browser
// HTTP/2 multiplexing handles concurrency — no hand-rolled queue.
export function MenuImage({ src, alt, priority }: Props) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(!!priority);
  const ref = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (priority) return;
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          obs.disconnect();
        }
      },
      { rootMargin: "400px" },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [priority]);

  // If the image is already cached by the browser, the native `load` event
  // can fire before React attaches our onLoad handler — leaving the gray
  // placeholder visible forever. Sync via img.complete after each src change.
  useEffect(() => {
    if (!isInView) return;
    const img = imgRef.current;
    if (img && img.complete && img.naturalWidth > 0) setIsLoaded(true);
  }, [isInView, src]);

  // Reset loaded state when src changes (item swap via filter).
  useEffect(() => {
    setIsLoaded(false);
  }, [src]);

  return (
    <div ref={ref} className="relative aspect-square w-full min-[440px]:rounded-lg overflow-hidden">
      <div
        className={
          "absolute inset-0 bg-gray-200 transition-opacity duration-300 " +
          (isLoaded ? "opacity-0" : "opacity-100")
        }
      />
      {isInView ? (
        <img
          ref={imgRef}
          src={src}
          alt={alt}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          className={
            "absolute inset-0 w-full h-full object-cover transition-opacity duration-500 " +
            (isLoaded ? "opacity-100" : "opacity-0")
          }
          onLoad={() => setIsLoaded(true)}
          onError={() => setIsLoaded(true)}
        />
      ) : null}
    </div>
  );
}
