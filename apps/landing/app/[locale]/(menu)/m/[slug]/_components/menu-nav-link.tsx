"use client";

import { Link } from "@/i18n/routing";
import { CSSProperties } from "react";

interface MenuNavLinkProps {
  href: string;
  className?: string;
  style?: CSSProperties;
  children: React.ReactNode;
}

export function MenuNavLink({ href, className, style, children }: MenuNavLinkProps) {
  return (
    <Link href={href} className={className} style={style}>
      {children}
    </Link>
  );
}
