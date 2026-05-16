import type { Viewport } from "next";
import "../globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
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

export default function LandingLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="sl" dir="ltr" translate="no" suppressHydrationWarning>
      <body className="min-h-dvh bg-background text-foreground antialiased tracking-tight">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
          <RegionPromptModal />
        </ThemeProvider>
      </body>
    </html>
  );
}
