import type { Metadata } from "next";
import { routing } from "@/i18n/routing";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  metadataBase: new URL('https://sobogdqr.com'),
  title: {
    default: "SobogdQR - QR Menu for Restaurant & Cafe | Digital Menu Website",
    template: "%s | SobogdQR"
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
  authors: [{ name: "SobogdQR" }],
  creator: "SobogdQR",
  publisher: "SobogdQR",
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
    url: 'https://sobogdqr.com',
    title: 'SobogdQR - QR Menu for Restaurant & Cafe',
    description: 'Create professional QR menu for restaurant and cafe in minutes. Digital menu website solution with instant updates.',
    siteName: 'SobogdQR',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SobogdQR - QR Menu for Restaurant & Cafe',
    description: 'Create professional QR menu for restaurant and cafe in minutes.',
  },
  alternates: {
    canonical: 'https://sobogdqr.com',
    languages: {
      'en': 'https://sobogdqr.com/en',
      'es': 'https://sobogdqr.com/es',
    },
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
