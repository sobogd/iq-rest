import { LegacyAuthRedirect } from "./onboarding/legacy-auth-redirect";
import { BrandSchema } from "./brand-schema";
import { CurrencyProvider } from "../lib/currency-context";
import { getLandingChrome } from "../lib/landing-chrome";
import { LandingStringsProvider } from "../lib/landing-strings";

/** Wraps landing-route children with the page-local string context (locale +
 *  `common`/`auth` copy from the locale's texts.json via getLandingChrome —
 *  messages/<locale>.json is not used). Use from per-locale
 *  `app/<locale>/layout.tsx`. */
export async function LandingI18nWrap({
  locale,
  children,
}: {
  locale: string;
  children: React.ReactNode;
}) {
  const chrome = await getLandingChrome(locale);
  return (
    <LandingStringsProvider value={{ locale, common: chrome.common, auth: chrome.auth }}>
      <BrandSchema />
      <CurrencyProvider>{children}</CurrencyProvider>
      <LegacyAuthRedirect locale={locale} />
    </LandingStringsProvider>
  );
}
