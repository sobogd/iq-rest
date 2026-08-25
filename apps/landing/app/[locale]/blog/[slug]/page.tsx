import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { locales } from "@/lib/locales";
import { getLandingChrome } from "@/app/_landing/lib/landing-chrome";
import { BlogArticleView } from "@/app/_landing/blog/blog-article-view";
import { BLOG_ARTICLES, blogEntry, loadBlogArticle } from "@/app/_landing/blog/registry";
import { blogRelated } from "@/app/_landing/blog/page-data";
import { buildBlogArticleMetadata } from "@/app/_landing/blog/metadata";
import {
  blogBreadcrumbJsonLd,
  blogFaqJsonLd,
  blogPostingJsonLd,
} from "@/app/_landing/blog/json-ld";
import { resolveBlogTexts } from "@/app/_landing/blog/blog-texts";

export const dynamic = "force-static";
export const dynamicParams = false;
export const revalidate = false;

export function generateStaticParams() {
  return locales
    .filter((l) => l !== "en")
    .flatMap((locale) => BLOG_ARTICLES.map((a) => ({ locale, slug: a.id })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const entry = blogEntry(slug);
  const content = entry && (await loadBlogArticle(slug, locale));
  if (!entry || !content) return {};
  return buildBlogArticleMetadata(locale, entry, content);
}

export default async function BlogArticlePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!(locales as readonly string[]).includes(locale)) notFound();

  const entry = blogEntry(slug);
  const content = entry && (await loadBlogArticle(slug, locale));
  if (!entry || !content) notFound();

  const chrome = await getLandingChrome(locale);
  const related = await blogRelated(locale, slug);
  const faqLd = blogFaqJsonLd(content);
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: blogPostingJsonLd(locale, entry, content) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: blogBreadcrumbJsonLd(locale, resolveBlogTexts(chrome).title, entry, content.h1),
        }}
      />
      {faqLd ? (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqLd }} />
      ) : null}
      <BlogArticleView
        locale={locale}
        texts={chrome}
        entry={entry}
        content={content}
        related={related}
      />
    </>
  );
}
