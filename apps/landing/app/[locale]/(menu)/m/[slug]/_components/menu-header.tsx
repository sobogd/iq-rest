import { ArrowLeft } from "lucide-react";
import { Link } from "@/i18n/routing";

interface MenuHeaderProps {
  slug: string;
  title: string;
  sticky?: boolean;
  absolute?: boolean;
  accentColor?: string;
  isPreview?: boolean;
}

export function MenuHeader({
  slug,
  title,
  sticky,
  absolute,
  accentColor,
  isPreview,
}: MenuHeaderProps) {
  const positionClass = absolute
    ? "absolute top-0 inset-x-0"
    : sticky
    ? "sticky top-0"
    : "";

  return (
    <header
      className={`shrink-0 flex flex-col justify-end px-5 z-10 ${positionClass}`}
      style={{
        height: isPreview ? 93 : 56,
        paddingTop: isPreview ? 37 : 0,
        backgroundColor: accentColor || "#000000",
      }}
    >
      <div className="h-14 max-w-[440px] w-full flex items-center relative mx-auto">
        <Link href={`/m/${slug}${isPreview ? "?preview=1" : ""}`} className="p-2 -ml-2 text-white z-10">
          <ArrowLeft className="h-6 w-6" />
        </Link>
        <h1 className="absolute inset-0 flex items-center justify-center text-lg font-semibold text-white">
          {title}
        </h1>
      </div>
    </header>
  );
}
