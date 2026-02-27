"use client";

import { Link } from "@/i18n/routing";
import { CSSProperties } from "react";

interface MenuNavLinkProps {
  href: string;
  className?: string;
  style?: CSSProperties;
  prefetch?: boolean;
  children: React.ReactNode;
}

export function MenuNavLink({ href, className, style, prefetch, children }: MenuNavLinkProps) {
  return (
    <Link href={href} className={className} style={style} prefetch={prefetch}>
      {children}
    </Link>
  );
}
