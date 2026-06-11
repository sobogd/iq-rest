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
  // Page-level titles already carry the "| IQ Rest" brand suffix, so the
  // template must NOT append it again (was producing "... | IQ Rest | IQ Rest").
  // `%s` passes the page title through verbatim; `default` covers segments
  // that set no title of their own.
  title: {
    default: "IQ Rest - QR Menu for Restaurant & Cafe | Digital Menu Website",
    template: "%s"
  },
  description:
    "Create professional QR menu for restaurant and cafe in minutes. Digital menu website solution with instant updates, multilingual support, and analytics. Perfect for restaurants and cafes.",
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
    alternateLocale: ['ar_SA', 'bg_BG', 'ca_ES', 'cs_CZ', 'da_DK', 'de_DE', 'el_GR', 'es_ES', 'et_EE', 'fa_IR', 'fi_FI', 'fr_FR', 'ga_IE', 'hr_HR', 'hu_HU', 'is_IS', 'it_IT', 'ja_JP', 'ko_KR', 'lt_LT', 'lv_LV', 'nl_NL', 'no_NO', 'pl_PL', 'pt_PT', 'ro_RO', 'ru_RU', 'sk_SK', 'sl_SI', 'sr_RS', 'sv_SE', 'tr_TR', 'uk_UA', 'zh_CN'],
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
      { url: '/icon.png', type: 'image/png' },
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
  return routing.locales.map((locale) => ({ locale }));
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
