import { Link } from "@tanstack/react-router";
import { ReactNode, CSSProperties } from "react";
import { useForwardedSearch } from "../lib/forward-search";

interface Props {
  to: string;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
  prefetch?: boolean;
}

export function MenuNavLink({ to, className, style, children }: Props) {
  const search = useForwardedSearch();
  return (
    <Link to={to} search={search} className={className} style={style}>
      {children}
    </Link>
  );
}
