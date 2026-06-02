import { Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import type { ReactNode } from "react";
import { useForwardedSearch } from "../lib/forward-search";

interface Props {
  title: string;
  accentColor?: string;
  backTo?: string;
  sticky?: boolean;
  right?: ReactNode;
}

export function MenuHeader({ title, accentColor, backTo = "/", sticky, right }: Props) {
  const bg = accentColor || "#000000";
  const search = useForwardedSearch();
  return (
    <header
      className={
        "shrink-0 flex flex-col justify-end px-5 z-10 " +
        (sticky ? "sticky top-0" : "")
      }
      style={{
        minHeight: 56,
        paddingTop: "env(safe-area-inset-top, 0px)",
        backgroundColor: bg,
      }}
    >
      <div className="min-h-14 max-w-[440px] w-full flex items-center gap-2 mx-auto py-1.5">
        <Link
          to={backTo}
          search={search}
          className="p-2 -ml-2 text-white shrink-0"
          aria-label="Back"
        >
          <ArrowLeft className="h-6 w-6" />
        </Link>
        <h1
          className="flex-1 min-w-0 text-center text-base font-semibold text-white leading-tight"
          style={{ display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}
        >
          {title}
        </h1>
        <div className="shrink-0 w-10 flex justify-end">{right}</div>
      </div>
    </header>
  );
}
