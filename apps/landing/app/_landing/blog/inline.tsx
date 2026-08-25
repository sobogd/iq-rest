import React from "react";
import { localizedHref } from "@/lib/locale-slug-overrides";
import { localePath } from "@/lib/locale-paths";
import { LinkForward } from "../components/link-forward";

// Markdown-lite renderer for blog strings (see types.ts for the syntax).
// Links resolve per locale at render time, so translated JSON carries the SAME
// href tokens as the English master and can never point at a wrong-locale slug.

const LINK_RE = /\[([^\]]+)\]\(([^)\s]+)\)/g;
const BOLD_RE = /\*\*([^*]+)\*\*/g;

export function blogHref(locale: string, slug?: string): string {
  return localePath(locale, slug ? `/blog/${slug}` : "/blog");
}

function resolveHref(target: string, locale: string): string {
  if (target.startsWith("route:")) return localizedHref(target.slice(6), locale);
  if (target.startsWith("blog:")) return blogHref(locale, target.slice(5));
  return target;
}

function renderBold(text: string, keyBase: string): React.ReactNode[] {
  const nodes: React.ReactNode[] = [];
  let last = 0;
  let m: RegExpExecArray | null;
  const re = new RegExp(BOLD_RE);
  while ((m = re.exec(text)) !== null) {
    if (m.index > last) nodes.push(text.slice(last, m.index));
    nodes.push(
      <strong key={`${keyBase}-b${m.index}`} className="font-semibold text-foreground">
        {m[1]}
      </strong>,
    );
    last = m.index + m[0].length;
  }
  if (last < text.length) nodes.push(text.slice(last));
  return nodes;
}

/** Parse a blog string into React nodes: links first, bold inside the rest. */
export function renderInline(text: string, locale: string): React.ReactNode[] {
  const nodes: React.ReactNode[] = [];
  let last = 0;
  let m: RegExpExecArray | null;
  const re = new RegExp(LINK_RE);
  while ((m = re.exec(text)) !== null) {
    if (m.index > last) nodes.push(...renderBold(text.slice(last, m.index), `t${last}`));
    const href = resolveHref(m[2], locale);
    const external = href.startsWith("http");
    nodes.push(
      external ? (
        <a
          key={`l${m.index}`}
          href={href}
          rel="noopener noreferrer"
          className="underline underline-offset-2 hover:text-foreground"
        >
          {m[1]}
        </a>
      ) : (
        <LinkForward
          key={`l${m.index}`}
          href={href}
          prefetch={false}
          trackName={`Blog inline link: ${m[2]}`}
          className="underline underline-offset-2 hover:text-foreground"
        >
          {m[1]}
        </LinkForward>
      ),
    );
    last = m.index + m[0].length;
  }
  if (last < text.length) nodes.push(...renderBold(text.slice(last), `t${last}`));
  return nodes;
}
