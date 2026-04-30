import type { Viewport } from "next";
import "../globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: "#0a0a0a",
};

export default function LandingLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="sv" dir="ltr" className="dark">
      <body className="min-h-dvh bg-background text-foreground antialiased tracking-tight">
        {children}
      </body>
    </html>
  );
}
