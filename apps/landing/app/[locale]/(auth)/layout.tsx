import { headers } from "next/headers";
import { LandingHeader } from "@/app/_landing/components/header";
import { LandingFooter } from "@/app/_landing/components/footer";
import { PageTracker } from "@/app/_landing/components/page-tracker";
import { AuthHero } from "@/app/_landing/components/onboarding/auth-hero";
import { PAGE, Content } from "@/app/_landing/components/shell";
import { routeKeyFromPath } from "@/lib/locale-slug-overrides";
// Single source of chrome (header/footer nav copy) for every non-marketing
// page — the SAME loader legal pages use. Built locales get their own
// texts.json; the rest fall back to English. Keeps the header identical across
// marketing / auth / legal for a given locale.
import { getLandingChrome } from "@/app/_landing/lib/landing-chrome";

// Shared by /login and /register (route group, no URL segment added) so
// Header/Footer/the hero never remount when switching between them — only
// the AuthHero's internal `mode` (derived from the pathname) changes.
export default async function AuthLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const chrome = await getLandingChrome(locale);
  // /login vs /register — so the footer language switcher keeps the visitor on
  // the SAME auth page in the target language instead of dropping them on home.
  const pathname = (await headers()).get("x-pathname") ?? "";
  const routeKey = routeKeyFromPath(pathname);

  return (
    <main className={`${PAGE} min-h-dvh bg-background text-foreground antialiased tracking-tight`}>
      <PageTracker page="auth" />
      <LandingHeader
        texts={chrome.header}
        locale={locale}
        featureLinks={chrome.footer.featureLinks}
        compact
        navLayout="grouped"
      />

      <Content>
        <AuthHero locale={locale} />
        {/* /login and /register render null (all UI is in <AuthHero>), so this
            slot is empty — kept inside the content flow, not after the footer. */}
        {children}
      </Content>

      <LandingFooter texts={chrome.footer} headerTexts={chrome.header} locale={locale} routeKey={routeKey} />
    </main>
  );
}
