import type { Metadata } from "next";
import { getLandingChrome } from "@/app/_landing/lib/landing-chrome";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const { auth } = await getLandingChrome(locale);
  return {
    title: `${auth.metaSignIn} · IQ Rest`,
    robots: { index: false, follow: true },
  };
}

// All UI lives in the shared (auth) layout's <AuthHero> — it derives mode
// from the pathname, so this page has nothing of its own to render.
export default function LoginPage() {
  return null;
}
