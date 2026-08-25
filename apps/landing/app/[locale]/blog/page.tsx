import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { locales } from "@/lib/locales";
import { getLandingChrome } from "@/app/_landing/lib/landing-chrome";
import { BlogIndexView } from "@/app/_landing/blog/blog-index-view";
import { blogIndexCards } from "@/app/_landing/blog/page-data";
import { buildBlogIndexMetadata } from "@/app/_landing/blog/metadata";
import { blogBreadcrumbJsonLd } from "@/app/_landing/blog/json-ld";
import { resolveBlogTexts } from "@/app/_landing/blog/blog-texts";

export const dynamic = "force-static";
export const dynamicParams = false;
export const revalidate = false;

// English is served at the root (/blog) by app/(en)/blog — exclude it here so
// /en/blog never builds (middleware 301s it to /blog anyway).
export function generateStaticParams() {
  return locales.filter((l) => l !== "en").map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const chrome = await getLandingChrome(locale);
  return buildBlogIndexMetadata(locale, resolveBlogTexts(chrome));
}

export default async function BlogIndexPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!(locales as readonly string[]).includes(locale)) notFound();

  const chrome = await getLandingChrome(locale);
  const cards = await blogIndexCards(locale);
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: blogBreadcrumbJsonLd(locale, resolveBlogTexts(chrome).title),
        }}
      />
      <BlogIndexView locale={locale} texts={chrome} cards={cards} />
    </>
  );
}
