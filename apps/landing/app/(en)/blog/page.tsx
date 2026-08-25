import type { Metadata } from "next";
import type { LandingTexts } from "@/app/_landing/types";
import TEXTS_JSON from "../texts.json";
import { BlogIndexView } from "@/app/_landing/blog/blog-index-view";
import { blogIndexCards } from "@/app/_landing/blog/page-data";
import { buildBlogIndexMetadata } from "@/app/_landing/blog/metadata";
import { blogBreadcrumbJsonLd } from "@/app/_landing/blog/json-ld";
import { resolveBlogTexts } from "@/app/_landing/blog/blog-texts";

const TEXTS = TEXTS_JSON as unknown as LandingTexts;
const BLOG = resolveBlogTexts(TEXTS);

export const dynamic = "force-static";
export const revalidate = false;

export const metadata: Metadata = buildBlogIndexMetadata("en", BLOG);

export default async function BlogIndexPage() {
  const cards = await blogIndexCards("en");
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: blogBreadcrumbJsonLd("en", BLOG.title) }}
      />
      <BlogIndexView locale="en" texts={TEXTS} cards={cards} />
    </>
  );
}
