import { useEffect } from "react";
import { useMenu } from "../lib/menu-context";

interface Props {
  // Localized route label. When provided, document.title becomes
  // "<routeLabel> | <restaurantTitle>". Omit on the home page.
  routeLabel?: string;
  // Localized SEO description for this route. Falls back to restaurant.description.
  description?: string | null;
}

const SEPARATOR = " | ";

export function PageTitle({ routeLabel, description }: Props) {
  const { restaurant } = useMenu();
  const title = routeLabel ? `${routeLabel}${SEPARATOR}${restaurant.title}` : restaurant.title;
  const desc = description ?? restaurant.description;

  useEffect(() => {
    document.title = title;
  }, [title]);

  useEffect(() => {
    if (!desc) return;
    let meta = document.querySelector('meta[name="description"]') as HTMLMetaElement | null;
    if (!meta) {
      meta = document.createElement("meta");
      meta.name = "description";
      document.head.appendChild(meta);
    }
    meta.content = desc;
  }, [desc]);

  return null;
}
