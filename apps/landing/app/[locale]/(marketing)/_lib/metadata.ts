import { locales } from "@/i18n/routing";

const BASE_URL = "https://iq-rest.com";

// Build alternates object for all supported locales
export function buildAlternates(path: string) {
  const languages: Record<string, string> = {
    "x-default": `${BASE_URL}/en${path}`,
  };
  locales.forEach((loc) => {
    languages[loc] = `${BASE_URL}/${loc}${path}`;
  });
  return languages;
}
