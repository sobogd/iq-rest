import type { Metadata, Viewport } from "next";
import { routing } from "@/i18n/routing";
import { notFound } from "next/navigation";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  interactiveWidget: "resizes-content",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL('https://iq-rest.com'),
  title: {
    default: "IQ Rest - QR Menu for Restaurant & Cafe | Digital Menu Website",
    template: "%s | IQ Rest"
  },
  description:
    "Create professional QR menu for restaurant and cafe in minutes. Digital menu website solution with instant updates, multilingual support, and analytics. Perfect for restaurants and cafes.",
  keywords: [
    "qr menu for restaurant",
    "qr menu for cafe",
    "website for restaurant",
    "website for cafe",
    "digital menu",
    "restaurant qr code menu",
    "cafe qr menu",
    "online menu restaurant",
    "contactless menu",
    "restaurant website builder",
    "cafe website builder"
  ],
  authors: [{ name: "IQ Rest" }],
  creator: "IQ Rest",
  publisher: "IQ Rest",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    alternateLocale: ['es_ES', 'de_DE', 'fr_FR', 'it_IT', 'pt_PT', 'nl_NL', 'pl_PL', 'ru_RU', 'uk_UA', 'sv_SE', 'da_DK', 'ja_JP', 'ko_KR', 'zh_CN', 'ar_SA', 'tr_TR'],
    url: 'https://iq-rest.com',
    title: 'IQ Rest - QR Menu for Restaurant & Cafe',
    description: 'Create professional QR menu for restaurant and cafe in minutes. Digital menu website solution with instant updates.',
    siteName: 'IQ Rest',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'IQ Rest - QR Menu for Restaurant & Cafe',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'IQ Rest - QR Menu for Restaurant & Cafe',
    description: 'Create professional QR menu for restaurant and cafe in minutes.',
    images: ['/og-image.png'],
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '32x32' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: [
      { url: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  manifest: '/manifest.webmanifest',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'IQ Rest',
  },
};

export function generateStaticParams() {
  // Per-locale custom landings (app/<locale>/page.tsx) replace the [locale]/page.tsx
  // for the bare locale URL. List locales that have their own landing here.
  // Every locale now has a custom landing under app/<locale>/
  const CUSTOM_LANDING_LOCALES = routing.locales;
  return routing.locales
    .filter((l) => !CUSTOM_LANDING_LOCALES.includes(l))
    .map((locale) => ({ locale }));
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
