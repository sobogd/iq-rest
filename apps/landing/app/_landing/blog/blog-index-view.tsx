import { LandingHeader } from "../components/header";
import { LandingFooter } from "../components/footer";
import { PageTracker } from "../components/page-tracker";
import { LinkForward } from "../components/link-forward";
import { PAGE, Band, Content } from "../components/shell";
import type { LandingChrome } from "../lib/landing-chrome";
import type { BlogManifestEntry } from "./types";
import { blogHref } from "./inline";
import { formatBlogDate, resolveBlogTexts } from "./blog-texts";

export type BlogCardData = {
  entry: BlogManifestEntry;
  title: string;
  excerpt: string;
};

// Blog index: header → title band → 2-per-row card grid (newest first) →
// footer. Same page shell as pricing/help; cards reuse the landing card skin.
export function BlogIndexView({
  locale,
  texts,
  cards,
}: {
  locale: string;
  texts: LandingChrome;
  cards: BlogCardData[];
}) {
  const blog = resolveBlogTexts(texts);
  return (
    <main className={PAGE}>
      <PageTracker page="blog" />
      <LandingHeader
        texts={texts.header}
        locale={locale}
        featureLinks={texts.footer.featureLinks}
        compact
        navLayout="grouped"
      />

      <Content>
        <Band section="blog-intro">
          <h1 className="text-3xl sm:text-4xl font-medium tracking-tight leading-[1.15]">
            {blog.title}
          </h1>
          <p className="mt-3 max-w-[640px] text-sm sm:text-base text-muted-foreground/80 leading-relaxed">
            {blog.intro}
          </p>
        </Band>

        <Band section="blog-list" className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {cards.map(({ entry, title, excerpt }) => (
            <LinkForward
              key={entry.id}
              href={blogHref(locale, entry.id)}
              prefetch={false}
              trackName={`Blog card: ${entry.id}`}
              className="group flex flex-col gap-3 rounded-2xl border border-border p-6 transition-colors hover:bg-muted/50"
            >
              <time
                dateTime={entry.date}
                className="text-xs font-medium uppercase tracking-wide text-muted-foreground/70"
              >
                {formatBlogDate(entry.date, locale)}
              </time>
              <h2 className="text-lg sm:text-xl font-semibold leading-snug text-foreground">
                {title}
              </h2>
              <p className="text-sm text-muted-foreground/80 leading-relaxed">{excerpt}</p>
              <span className="mt-auto pt-1 text-sm font-semibold text-foreground underline-offset-2 group-hover:underline">
                {blog.readMore} →
              </span>
            </LinkForward>
          ))}
        </Band>
      </Content>

      <LandingFooter
        texts={texts.footer}
        headerTexts={texts.header}
        locale={locale}
        routeKey="/blog"
      />
    </main>
  );
}
