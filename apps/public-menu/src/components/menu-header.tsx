import { Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { useForwardedSearch } from "../lib/forward-search";

interface Props {
  title: string;
  accentColor?: string;
  backTo?: string;
  sticky?: boolean;
}

export function MenuHeader({ title, accentColor, backTo = "/", sticky }: Props) {
  const bg = accentColor || "#000000";
  const search = useForwardedSearch();
  // ?preview=1 means rendered inside the dashboard's iPhone-simulating iframe,
  // which doesn't have a real safe-area inset — fake the notch space so the
  // header looks right next to the simulated camera cutout.
  const isPreview = search.preview === "1";
  return (
    <header
      className={
        "shrink-0 flex flex-col justify-end px-5 z-10 " +
        (sticky ? "sticky top-0" : "")
      }
      style={{
        minHeight: isPreview ? 93 : 56,
        paddingTop: isPreview ? 37 : "env(safe-area-inset-top, 0px)",
        backgroundColor: bg,
      }}
    >
      <div className="h-14 max-w-[440px] w-full flex items-center relative mx-auto">
        <Link
          to={backTo}
          search={search}
          className="p-2 -ml-2 text-white z-10"
          aria-label="Back"
        >
          <ArrowLeft className="h-6 w-6" />
        </Link>
        <h1 className="absolute inset-0 flex items-center justify-center text-lg font-semibold text-white">
          {title}
        </h1>
      </div>
    </header>
  );
}
