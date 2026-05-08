import { Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";

interface Props {
  title: string;
  accentColor?: string;
  backTo?: string;
  sticky?: boolean;
}

export function MenuHeader({ title, accentColor = "#000", backTo = "/", sticky }: Props) {
  return (
    <div
      className={
        "shrink-0 px-5 py-3 flex items-center gap-3 bg-white border-b border-gray-200 " +
        (sticky ? "sticky top-0 z-30" : "")
      }
    >
      <Link
        to={backTo}
        className="h-9 w-9 inline-flex items-center justify-center rounded-full text-black active:bg-gray-100"
        style={{ color: accentColor }}
      >
        <ArrowLeft className="h-5 w-5" />
      </Link>
      <h1 className="text-base font-semibold text-black truncate">{title}</h1>
    </div>
  );
}
