import { ArrowLeft } from "lucide-react";
import { Link } from "@/i18n/routing";

const DEMO_SLUG = "love-eatery";

interface MenuHeaderProps {
  slug: string;
  title: string;
  sticky?: boolean;
  absolute?: boolean;
  accentColor?: string;
}

export function MenuHeader({ slug, title, sticky, absolute, accentColor }: MenuHeaderProps) {
  const isDemo = slug === DEMO_SLUG;
  const positionClass = absolute
    ? "absolute top-0 inset-x-0"
    : sticky
    ? "sticky top-0"
    : "";

  return (
    <header
      className={`shrink-0 flex flex-col justify-end px-5 z-10 ${positionClass}`}
      style={{
        height: isDemo ? 81 : 56,
        paddingTop: isDemo ? 25 : 0,
        backgroundColor: accentColor || "#000000",
      }}
    >
      <div className="h-14 max-w-[440px] w-full flex items-center relative mx-auto">
        <Link href={`/m/${slug}`} className="p-2 -ml-2 text-white z-10">
          <ArrowLeft className="h-6 w-6" />
        </Link>
        <h1 className="absolute inset-0 flex items-center justify-center text-lg font-semibold text-white">
          {title}
        </h1>
      </div>
    </header>
  );
}
