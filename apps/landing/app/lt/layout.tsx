import type { Viewport } from "next";
import "../globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { LandingI18nWrap } from "@/app/_landing/components/landing-i18n-wrap";
import { RegionPromptModal } from "@/app/_landing/components/region-prompt-modal";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
};

export default async function LandingLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="lt" dir="ltr" translate="no" suppressHydrationWarning>
      <body className="min-h-dvh bg-background text-foreground antialiased tracking-tight">
        <ThemeProvider attribute="class" forcedTheme="dark" disableTransitionOnChange storageKey="iq-rest-theme-v2">
          <LandingI18nWrap locale="lt">{children}</LandingI18nWrap>
          <RegionPromptModal />
        </ThemeProvider>
      </body>
    </html>
  );
}
