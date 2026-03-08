import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { HeaderCreateButton } from "./header-create-button";
import { Logo } from "@/components/Logo";

export async function Header() {
  const t = await getTranslations("header");

  return (
    <header className="border-b sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 hover:opacity-80">
            <Logo height={22} />
          </Link>

          <HeaderCreateButton>{t("getStarted")}</HeaderCreateButton>
        </div>
      </div>
    </header>
  );
}
