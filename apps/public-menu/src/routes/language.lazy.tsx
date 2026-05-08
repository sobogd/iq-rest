import { createLazyFileRoute, useNavigate } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { Check } from "lucide-react";
import { useMenu } from "../lib/menu-context";
import { MenuHeader } from "../components/menu-header";
import { AVAILABLE_LANGUAGES } from "../lib/languages";
import { PageTitle } from "../components/page-title";

export const Route = createLazyFileRoute("/language")({ component: LanguagePage });

function LanguagePage() {
  const { restaurant } = useMenu();
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const enabled = AVAILABLE_LANGUAGES.filter((l) => restaurant.languages.includes(l.code));

  const label = t("publicMenu.language");
  return (
    <div className="h-dvh flex flex-col bg-white">
      <PageTitle routeLabel={label} />
      <MenuHeader title={label} accentColor={restaurant.accentColor} sticky />
      <div className="flex-1 overflow-auto px-5 py-4">
        <div className="max-w-md mx-auto divide-y divide-gray-200">
          {enabled.map((l) => {
            const active = i18n.language === l.code;
            return (
              <button
                key={l.code}
                onClick={async () => {
                  await i18n.changeLanguage(l.code);
                  navigate({ to: "/" });
                }}
                className="w-full flex items-center gap-3 py-4 text-left"
              >
                <span className="text-2xl">{l.flag}</span>
                <span className="flex-1 text-base text-black">{l.label}</span>
                {active ? <Check className="h-5 w-5" style={{ color: restaurant.accentColor }} /> : null}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
