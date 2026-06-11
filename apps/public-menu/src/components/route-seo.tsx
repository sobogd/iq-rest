import { useEffect } from "react";
import { useMenu } from "../lib/menu-context";

interface Props {
  // Localized route label. document.title becomes "<routeLabel> | <restaurantTitle>".
  // Omit on the home page.
  routeLabel?: string;
  // Localized SEO description. Falls back to restaurant.description.
  description?: string | null;
  // Optional JSON-LD object. Serialized into <script type="application/ld+json">.
  jsonLd?: Record<string, unknown>;
}

const SEPARATOR = " | ";

function isVideo(url: string) {
  return /\.(mp4|webm|mov)$/i.test(url);
}

function setMeta(attr: "name" | "property", key: string, content: string) {
  let el = document.head.querySelector(`meta[${attr}="${key}"]`) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.content = content;
}

export function RouteSeo({ routeLabel, description, jsonLd }: Props) {
  const { restaurant } = useMenu();
  const title = routeLabel ? `${routeLabel}${SEPARATOR}${restaurant.title}` : restaurant.title;
  const desc = description ?? restaurant.description ?? `${restaurant.title} — Menu`;
  const image = restaurant.source && !isVideo(restaurant.source) ? restaurant.source : null;

  useEffect(() => {
    document.title = title;
    setMeta("name", "description", desc);
    setMeta("property", "og:title", title);
    setMeta("property", "og:description", desc);
    setMeta("property", "og:type", "website");
    setMeta("property", "og:url", window.location.href);
    setMeta("name", "twitter:card", image ? "summary_large_image" : "summary");
    setMeta("name", "twitter:title", title);
    setMeta("name", "twitter:description", desc);
    if (image) {
      setMeta("property", "og:image", image);
      setMeta("name", "twitter:image", image);
    }
  }, [title, desc, image]);

  // Preconnect to the image origin (S3 / CDN) — saves a TLS handshake when
  // the menu loads images on /menu.
  useEffect(() => {
    if (!image) return;
    let origin: string;
    try {
      origin = new URL(image).origin;
    } catch {
      return;
    }
    if (document.head.querySelector(`link[rel="preconnect"][href="${origin}"]`)) return;
    const link = document.createElement("link");
    link.rel = "preconnect";
    link.href = origin;
    link.crossOrigin = "anonymous";
    document.head.appendChild(link);
  }, [image]);

  // Inject JSON-LD. Cleaned up on unmount so route changes don't accumulate.
  useEffect(() => {
    if (!jsonLd) return;
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.textContent = JSON.stringify(jsonLd).replace(/</g, "\\u003c");
    document.head.appendChild(script);
    return () => {
      script.remove();
    };
  }, [jsonLd]);

  return null;
}
