import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { LandingTexts } from "@/app/_landing/types";
import TEXTS_JSON from "../../texts.json";
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

const TEXTS = TEXTS_JSON as unknown as LandingTexts;

export const dynamic = "force-static";
export const dynamicParams = false;
export const revalidate = false;

export function generateStaticParams() {
  return BLOG_ARTICLES.map((a) => ({ slug: a.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const entry = blogEntry(slug);
  const content = entry && (await loadBlogArticle(slug, "en"));
  if (!entry || !content) return {};
  return buildBlogArticleMetadata("en", entry, content);
}

export default async function BlogArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const entry = blogEntry(slug);
  const content = entry && (await loadBlogArticle(slug, "en"));
  if (!entry || !content) notFound();

  const related = await blogRelated("en", slug);
  const faqLd = blogFaqJsonLd(content);
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: blogPostingJsonLd("en", entry, content) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: blogBreadcrumbJsonLd("en", resolveBlogTexts(TEXTS).title, entry, content.h1),
        }}
      />
      {faqLd ? (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqLd }} />
      ) : null}
      <BlogArticleView locale="en" texts={TEXTS} entry={entry} content={content} related={related} />
    </>
  );
}
