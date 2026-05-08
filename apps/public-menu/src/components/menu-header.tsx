import { Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";

interface Props {
  title: string;
  accentColor?: string;
  backTo?: string;
  sticky?: boolean;
}

export function MenuHeader({ title, accentColor, backTo = "/", sticky }: Props) {
  const bg = accentColor || "#000000";
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
      <div className="h-14 max-w-[440px] w-full flex items-center relative mx-auto">
        <Link
          to={backTo}
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
