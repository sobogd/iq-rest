import { LandingHeader } from "../components/header";
import { LandingFooter } from "../components/footer";
import { PageTracker } from "../components/page-tracker";
import { LinkForward } from "../components/link-forward";
import { FinalCta } from "../components/final-cta";
import { PAGE, Band, Content, PRIMARY_BTN } from "../components/shell";
import { localizedHref } from "@/lib/locale-slug-overrides";
import type { LandingChrome } from "../lib/landing-chrome";
import type { BlogArticleContent, BlogBlock, BlogManifestEntry } from "./types";
import { blogHref, renderInline } from "./inline";
import { formatBlogDate, resolveBlogTexts } from "./blog-texts";
import type { BlogCardData } from "./blog-index-view";

function BlockView({ block, locale }: { block: BlogBlock; locale: string }) {
  switch (block.type) {
    case "h2":
      return (
        <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-foreground mt-10 mb-4">
          {renderInline(block.text, locale)}
        </h2>
      );
    case "h3":
      return (
        <h3 className="text-lg font-semibold text-foreground mt-8 mb-3">
          {renderInline(block.text, locale)}
        </h3>
      );
    case "p":
      return (
        <p className="text-[15px] leading-relaxed text-foreground/80 mb-3">
          {renderInline(block.text, locale)}
        </p>
      );
    case "list":
      return (
        <ul className="list-disc pl-5 space-y-1.5 mb-3 text-[15px] leading-relaxed text-foreground/80 marker:text-foreground/40">
          {block.items.map((it, i) => (
            <li key={i}>{renderInline(it, locale)}</li>
          ))}
        </ul>
      );
    case "steps":
      return (
        <ol className="list-decimal pl-5 space-y-1.5 mb-3 text-[15px] leading-relaxed text-foreground/80 marker:text-foreground/40">
          {block.items.map((it, i) => (
            <li key={i}>{renderInline(it, locale)}</li>
          ))}
        </ol>
      );
    case "table":
      return (
        <div className="my-5 overflow-x-auto rounded-xl border border-border">
          <table className="w-full min-w-[480px] text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                {block.headers.map((h, i) => (
                  <th key={i} className="px-4 py-3 text-start font-semibold text-foreground">
                    {renderInline(h, locale)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, ri) => (
                <tr key={ri} className="border-b border-border last:border-b-0">
                  {row.map((cell, ci) => (
                    <td key={ci} className="px-4 py-3 align-top text-foreground/80">
                      {renderInline(cell, locale)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    case "tip":
      return (
        <div className="my-4 rounded-xl border border-border bg-card/60 px-4 py-3 text-[14px] leading-relaxed text-foreground/80">
          💡 {renderInline(block.text, locale)}
        </div>
      );
    case "note":
      return (
        <div className="my-4 rounded-xl border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-[14px] leading-relaxed text-foreground/80">
          {renderInline(block.text, locale)}
        </div>
      );
    case "cta":
      return (
        <div className="my-6 flex flex-col items-start gap-3 rounded-2xl border border-border bg-[hsl(35_37%_94.5%)] dark:bg-[hsl(31_16%_11.5%)] p-6">
          <p className="text-lg font-semibold text-foreground">{block.heading}</p>
          <p className="text-sm text-muted-foreground/80 leading-relaxed">
            {renderInline(block.text, locale)}
          </p>
          <LinkForward
            href={localizedHref(block.routeKey, locale)}
            prefetch={false}
            trackName={`Blog CTA: ${block.routeKey}`}
            className={PRIMARY_BTN}
          >
            {block.buttonLabel}
          </LinkForward>
        </div>
      );
    case "faq":
      return (
        <div className="mt-10">
          <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-foreground mb-4">
            {block.heading}
          </h2>
          <div className="flex flex-col gap-3">
            {block.items.map((it, i) => (
              <div key={i} className="rounded-xl border border-border px-4 py-3">
                <p className="font-semibold text-foreground text-[15px]">{it.q}</p>
                <p className="mt-1.5 text-[15px] leading-relaxed text-foreground/80">
                  {renderInline(it.a, locale)}
                </p>
              </div>
            ))}
          </div>
        </div>
      );
    default:
      return null;
  }
}

// Article page: header → article card (date, h1, intro, blocks) → related
// articles → final CTA → footer. Language switcher stays on THIS article in
// the target locale — blog slugs are shared, so `/blog/<id>` works as a
// routeKey via the slugForRoute fallback.
export function BlogArticleView({
  locale,
  texts,
  entry,
  content,
  related,
}: {
  locale: string;
  texts: LandingChrome;
  entry: BlogManifestEntry;
  content: BlogArticleContent;
  related: BlogCardData[];
}) {
  const blog = resolveBlogTexts(texts);
  return (
    <main className={PAGE}>
      <PageTracker page="blog-article" />
      <LandingHeader
        texts={texts.header}
        locale={locale}
        featureLinks={texts.footer.featureLinks}
        compact
        navLayout="grouped"
      />

      <Content>
        <Band section="blog-article">
          <article className="rounded-2xl border border-border p-6 sm:p-10">
            <div className="mx-auto max-w-[720px]">
              <LinkForward
                href={blogHref(locale)}
                prefetch={false}
                trackName="Blog back to index"
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                ← {blog.backToBlog}
              </LinkForward>
              <time
                dateTime={entry.date}
                className="mt-6 block text-xs font-medium uppercase tracking-wide text-muted-foreground/70"
              >
                {formatBlogDate(entry.date, locale)}
              </time>
              <h1 className="mt-2 text-2xl sm:text-[2rem] font-medium tracking-tight leading-[1.2]">
                {content.h1}
              </h1>
              <p className="mt-4 text-base leading-relaxed text-foreground/80">
                {renderInline(content.intro, locale)}
              </p>
              <div className="mt-6">
                {content.blocks.map((b, i) => (
                  <BlockView key={i} block={b} locale={locale} />
                ))}
              </div>
            </div>
          </article>
        </Band>

        {related.length > 0 && (
          <Band section="blog-related">
            <h2 className="mb-4 text-xl font-semibold tracking-tight text-foreground">
              {blog.relatedHeading}
            </h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {related.map(({ entry: rel, title, excerpt }) => (
                <LinkForward
                  key={rel.id}
                  href={blogHref(locale, rel.id)}
                  prefetch={false}
                  trackName={`Blog related: ${rel.id}`}
                  className="group flex flex-col gap-2 rounded-2xl border border-border p-6 transition-colors hover:bg-muted/50"
                >
                  <time
                    dateTime={rel.date}
                    className="text-xs font-medium uppercase tracking-wide text-muted-foreground/70"
                  >
                    {formatBlogDate(rel.date, locale)}
                  </time>
                  <h3 className="text-lg font-semibold leading-snug text-foreground">{title}</h3>
                  <p className="text-sm text-muted-foreground/80 leading-relaxed">{excerpt}</p>
                </LinkForward>
              ))}
            </div>
          </Band>
        )}

        <Band section="blog-cta">
          <FinalCta
            texts={texts.finalCta}
            ctaText={texts.ctaText}
            demoText={texts.demoText}
            microcopy={texts.microcopy}
            locale={locale}
          />
        </Band>
      </Content>

      <LandingFooter
        texts={texts.footer}
        headerTexts={texts.header}
        locale={locale}
        routeKey={`/blog/${entry.id}`}
      />
    </main>
  );
}
