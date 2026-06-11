import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";

// Deep merge: fallback values are used when user locale is missing keys
function deepMerge(fallback: Record<string, any>, override: Record<string, any>): Record<string, any> {
  const result = { ...fallback };
  for (const key of Object.keys(override)) {
    if (
      override[key] &&
      typeof override[key] === "object" &&
      !Array.isArray(override[key]) &&
      fallback[key] &&
      typeof fallback[key] === "object" &&
      !Array.isArray(fallback[key])
    ) {
      result[key] = deepMerge(fallback[key], override[key]);
    } else {
      result[key] = override[key];
    }
  }
  return result;
}

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  if (!locale || !routing.locales.includes(locale as any)) {
    locale = routing.defaultLocale;
  }

  const userMessages = (await import(`../messages/${locale}.json`)).default;
  const fallbackMessages = locale !== "en"
    ? (await import(`../messages/en.json`)).default
    : undefined;

  const messages = fallbackMessages
    ? deepMerge(fallbackMessages, userMessages)
    : userMessages;

  return {
    locale,
    messages,
    getMessageFallback({ namespace, key }) {
      return [namespace, key].filter(Boolean).join(".");
    },
  };
});
