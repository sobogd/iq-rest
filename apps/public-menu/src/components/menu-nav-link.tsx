import { Link } from "@tanstack/react-router";
import { ReactNode, CSSProperties } from "react";

interface Props {
  to: string;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
  prefetch?: boolean;
}

export function MenuNavLink({ to, className, style, children }: Props) {
  return (
    <Link to={to} className={className} style={style}>
      {children}
    </Link>
  );
}
