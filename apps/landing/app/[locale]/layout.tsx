import { notFound } from "next/navigation";
import { locales, rtlLocales } from "@/lib/locales";
import "../globals.css";
import { LegacyAuthRedirect } from "@/app/_landing/components/onboarding/legacy-auth-redirect";
import { BrandSchema } from "@/app/_landing/components/brand-schema";
import { CurrencyProvider } from "@/app/_landing/lib/currency-context";
import { getLandingChrome } from "@/app/_landing/lib/landing-chrome";
import { LandingStringsProvider } from "@/app/_landing/lib/landing-strings";
import type { Metadata } from "next";

export const metadata: Metadata = {
  other: {
    google: "notranslate",
  },
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!(locales as readonly string[]).includes(locale)) {
    notFound();
  }

  const chrome = await getLandingChrome(locale);

  return (
    <html lang={locale} dir={(rtlLocales as readonly string[]).includes(locale) ? "rtl" : "ltr"} suppressHydrationWarning className="notranslate" translate="no">
      <body className="min-h-dvh flex flex-col">
        {/* Organization + WebSite via BrandSchema (same @id #organization/#website
            as every marketing page) — the [locale] tree (auth/legal/blog) used to
            emit its own bare WebSite here, which split the entity across routes. */}
        <BrandSchema />
        <LandingStringsProvider value={{ locale, common: chrome.common, auth: chrome.auth }}>
          <CurrencyProvider>
            {children}
          </CurrencyProvider>
          <LegacyAuthRedirect locale={locale} />
        </LandingStringsProvider>
      </body>
    </html>
  );
}
