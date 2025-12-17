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
  metadataBase: new URL('https://grandqr.com'),
  title: {
    default: "GrandQR - QR Menu for Restaurant & Cafe | Digital Menu Website",
    template: "%s | GrandQR"
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
  authors: [{ name: "GrandQR" }],
  creator: "GrandQR",
  publisher: "GrandQR",
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
    alternateLocale: ['es_ES'],
    url: 'https://grandqr.com',
    title: 'GrandQR - QR Menu for Restaurant & Cafe',
    description: 'Create professional QR menu for restaurant and cafe in minutes. Digital menu website solution with instant updates.',
    siteName: 'GrandQR',
    images: [
      {
        url: '/changelog/public-menu-qr-scan-1.webp',
        width: 1200,
        height: 666,
        alt: 'GrandQR - QR Menu for Restaurant & Cafe',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GrandQR - QR Menu for Restaurant & Cafe',
    description: 'Create professional QR menu for restaurant and cafe in minutes.',
    images: ['/changelog/public-menu-qr-scan-1.webp'],
  },
  alternates: {
    canonical: 'https://grandqr.com/en',
    languages: {
      en: 'https://grandqr.com/en',
      es: 'https://grandqr.com/es',
      'x-default': 'https://grandqr.com/en',
    },
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
    title: 'GrandQR',
  },
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
