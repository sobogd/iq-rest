"use client";

import NextLink from "next/link";
import { useSearchParams } from "next/navigation";
import type { AnchorHTMLAttributes, ReactNode, MouseEvent } from "react";
import { analytics } from "@/lib/analytics";

/** URL params that should ride along on every internal navigation. Anything
 *  outside this allowlist is dropped — keeps tracking signal alive across
 *  page hops without polluting URLs with arbitrary state. */
const FORWARD_PARAMS = new Set([
  "gads",
  "gclid",
  "gbraid",
  "wbraid",
  "kw",
  "term",
  "campaign",
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
]);

interface LinkForwardProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "onClick"> {
  href: string;
  children: ReactNode;
  /** Fires once on click; tracks via the shared analytics sink. Optional. */
  trackEvent?: string;
  /** Called *after* the analytics track, before navigation. Use for state side
   *  effects only — don't try to cancel navigation from here. */
  onClick?: (e: MouseEvent<HTMLAnchorElement>) => void;
  /** Forwarded to next/link. Set to `false` for lists with many internal
   *  destinations (e.g. the 35-tile language switcher) to avoid the
   *  middleware-tracked SSR roundtrip that prefetching would trigger. */
  prefetch?: boolean;
}

function isOpaqueProtocol(href: string): boolean {
  return /^(mailto:|tel:|sms:)/i.test(href);
}

function isHashOnly(href: string): boolean {
  return href.startsWith("#");
}

/** Hosts that belong to our domain family — params should ride along when
 *  navigating to these even though they're a different origin. Anything else
 *  is a third-party destination and stays untouched. */
function isOurDomain(host: string): boolean {
  const h = host.toLowerCase();
  return h === "iq-rest.com" || h.endsWith(".iq-rest.com");
}

/** Drop-in replacement for `<a href>` and `<Link href>` that automatically
 *  carries forwarded tracking params (gads / gclid / utm_* / etc.) from the
 *  current URL onto the destination. External URLs, mailto/tel/sms, and
 *  hash-only fragments are rendered as plain anchors with no rewriting. */
export function LinkForward({
  href,
  children,
  trackEvent,
  onClick,
  prefetch,
  ...rest
}: LinkForwardProps) {
  const sp = useSearchParams();

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    if (trackEvent) analytics.track(trackEvent);
    onClick?.(e);
  };

  // Hash-only fragments stay on the same page — no params to forward.
  if (isHashOnly(href)) {
    return (
      <a href={href} onClick={handleClick} {...rest}>
        {children}
      </a>
    );
  }

  // mailto / tel / sms — opaque, no rewriting possible.
  if (isOpaqueProtocol(href)) {
    return (
      <a href={href} onClick={handleClick} {...rest}>
        {children}
      </a>
    );
  }

  const forwarded: Array<[string, string]> = [];
  if (sp) {
    for (const [k, v] of sp.entries()) {
      if (FORWARD_PARAMS.has(k)) forwarded.push([k, v]);
    }
  }

  // Absolute URL → check whether it's our domain family. If yes, append
  // params via plain anchor (cross-origin, next/link can't help). If no,
  // it's truly third-party and stays as a plain link.
  if (/^https?:/i.test(href)) {
    let url: URL;
    try {
      url = new URL(href);
    } catch {
      return (
        <a href={href} onClick={handleClick} {...rest}>
          {children}
        </a>
      );
    }
    if (isOurDomain(url.hostname) && forwarded.length > 0) {
      for (const [k, v] of forwarded) {
        if (!url.searchParams.has(k)) url.searchParams.set(k, v);
      }
    }
    return (
      <a href={url.toString()} onClick={handleClick} {...rest}>
        {children}
      </a>
    );
  }

  // Internal path: merge forwarded params, but never clobber a destination
  // that already declared its own value for the same key.
  let finalHref = href;
  if (forwarded.length > 0) {
    const [pathPart, queryPart = ""] = href.split("?");
    const params = new URLSearchParams(queryPart);
    for (const [k, v] of forwarded) {
      if (!params.has(k)) params.set(k, v);
    }
    const qs = params.toString();
    finalHref = qs ? `${pathPart}?${qs}` : pathPart;
  }

  return (
    <NextLink
      href={finalHref}
      onClick={handleClick}
      {...(prefetch === false ? { prefetch: false } : prefetch !== undefined ? { prefetch } : {})}
      {...rest}
    >
      {children}
    </NextLink>
  );
}
