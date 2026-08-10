"use client";

import NextLink from "next/link";
import type { AnchorHTMLAttributes, ReactNode, MouseEvent } from "react";
import { analytics } from "@/lib/analytics";

interface LinkForwardProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "onClick"> {
  href: string;
  children: ReactNode;
  /** Event name fired as a Click on press ("Header Nav Pricing"). Optional. */
  trackName?: string;
  /** Called after the analytics track, before navigation. Use for state side
   *  effects only — don't try to cancel navigation from here. */
  onClick?: (e: MouseEvent<HTMLAnchorElement>) => void;
  /** Forwarded to next/link. Default false — landing prefetching would also
   *  trigger middleware-tracked SSR roundtrips. */
  prefetch?: boolean;
}

function isOpaqueProtocol(href: string): boolean {
  return /^(mailto:|tel:|sms:)/i.test(href);
}

function isHashOnly(href: string): boolean {
  return href.startsWith("#");
}

/** Drop-in replacement for `<a href>` and `<Link href>` that fires an
 *  analytics event on click. Plain anchors for hash fragments, opaque
 *  protocols, and absolute URLs; NextLink for internal paths. */
export function LinkForward({
  href,
  children,
  trackName,
  onClick,
  prefetch = false,
  ...rest
}: LinkForwardProps) {
  const isAbsolute = /^https?:/i.test(href);

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    if (trackName) analytics.track("Click", trackName);
    // Absolute URLs leave the document; hash fragments and mailto:/tel: don't,
    // and NextLink paths are soft navigations that keep the buffer alive.
    if (isAbsolute && !rest.target) analytics.flush();
    onClick?.(e);
  };

  if (isHashOnly(href) || isOpaqueProtocol(href) || isAbsolute) {
    return (
      <a href={href} onClick={handleClick} {...rest}>
        {children}
      </a>
    );
  }

  return (
    <NextLink href={href} onClick={handleClick} prefetch={prefetch} {...rest}>
      {children}
    </NextLink>
  );
}
