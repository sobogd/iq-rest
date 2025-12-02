"use client";

import { useTranslations } from "next-intl";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";

interface AnalyticsData {
  plan: string;
  limit: number | null;
  monthlyViews: number;
  weeklyViews: number;
  todayViews: number;
  uniqueSessions: number;
  viewsByPage: { page: string; count: number }[];
  viewsByLanguage: { language: string; count: number }[];
  viewsByDay: { date: string; count: number }[];
}

interface AnalyticsClientProps {
  data: AnalyticsData;
}

const PAGE_LABELS: Record<string, string> = {
  home: "Home",
  menu: "Menu",
  contacts: "Contacts",
  language: "Language",
};

const LANGUAGE_LABELS: Record<string, string> = {
  en: "English",
  es: "Español",
  de: "Deutsch",
  fr: "Français",
  ru: "Русский",
};

export function AnalyticsClient({ data }: AnalyticsClientProps) {
  const t = useTranslations("analytics");

  const usagePercent = data.limit ? Math.min(100, (data.monthlyViews / data.limit) * 100) : 0;
  const isNearLimit = data.limit ? data.monthlyViews >= data.limit * 0.8 : false;
  const isOverLimit = data.limit ? data.monthlyViews >= data.limit : false;

  const maxPageViews = Math.max(...data.viewsByPage.map((v) => v.count), 1);
  const maxLangViews = Math.max(...data.viewsByLanguage.map((v) => v.count), 1);
  const maxDayViews = Math.max(...data.viewsByDay.map((v) => v.count), 1);

  return (
    <div className="space-y-6">
      {/* Left Column */}
      <div className="space-y-5">
        {/* Monthly Usage */}
        {data.limit && (
          <div className="space-y-2">
            <Label>{t("monthlyUsage")}</Label>
            <div className="p-3 border rounded-md space-y-2">
              <div className="flex justify-between text-sm">
                <span className="font-medium">{data.monthlyViews.toLocaleString()} / {data.limit.toLocaleString()}</span>
                <span className="text-muted-foreground">{t("scansThisMonth")}</span>
              </div>
              <Progress
                value={usagePercent}
                className={isOverLimit ? "[&>div]:bg-destructive" : isNearLimit ? "[&>div]:bg-yellow-500" : ""}
              />
              {isOverLimit && (
                <p className="text-sm text-destructive">{t("limitReached")}</p>
              )}
            </div>
          </div>
        )}

        {/* Stats Grid */}
        <div className="space-y-2">
          <Label>{t("overview")}</Label>
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 border rounded-md">
              <div className="text-2xl font-bold">{data.todayViews.toLocaleString()}</div>
              <div className="text-sm text-muted-foreground">{t("todayViews")}</div>
            </div>
            <div className="p-3 border rounded-md">
              <div className="text-2xl font-bold">{data.weeklyViews.toLocaleString()}</div>
              <div className="text-sm text-muted-foreground">{t("weeklyViews")}</div>
            </div>
            <div className="p-3 border rounded-md">
              <div className="text-2xl font-bold">{data.monthlyViews.toLocaleString()}</div>
              <div className="text-sm text-muted-foreground">{t("monthlyViews")}</div>
            </div>
            <div className="p-3 border rounded-md">
              <div className="text-2xl font-bold">{data.uniqueSessions.toLocaleString()}</div>
              <div className="text-sm text-muted-foreground">{t("uniqueVisitors")}</div>
            </div>
          </div>
        </div>

        {/* Views by Page */}
        <div className="space-y-2">
          <Label>{t("viewsByPage")}</Label>
          <div className="p-3 border rounded-md space-y-3">
            {data.viewsByPage.length === 0 ? (
              <p className="text-sm text-muted-foreground">{t("noData")}</p>
            ) : (
              data.viewsByPage
                .sort((a, b) => b.count - a.count)
                .map((item) => (
                  <div key={item.page} className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>{PAGE_LABELS[item.page] || item.page}</span>
                      <span className="text-muted-foreground">{item.count}</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary rounded-full transition-all"
                        style={{ width: `${(item.count / maxPageViews) * 100}%` }}
                      />
                    </div>
                  </div>
                ))
            )}
          </div>
        </div>
      </div>

      {/* Right Column */}
      <div className="space-y-5">
        {/* Views by Language */}
        <div className="space-y-2">
          <Label>{t("viewsByLanguage")}</Label>
          <div className="p-3 border rounded-md space-y-3">
            {data.viewsByLanguage.length === 0 ? (
              <p className="text-sm text-muted-foreground">{t("noData")}</p>
            ) : (
              data.viewsByLanguage
                .sort((a, b) => b.count - a.count)
                .map((item) => (
                  <div key={item.language} className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>{LANGUAGE_LABELS[item.language] || item.language}</span>
                      <span className="text-muted-foreground">{item.count}</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary rounded-full transition-all"
                        style={{ width: `${(item.count / maxLangViews) * 100}%` }}
                      />
                    </div>
                  </div>
                ))
            )}
          </div>
        </div>

        {/* Daily Views Chart */}
        <div className="space-y-2">
          <Label>{t("dailyViews")}</Label>
          <div className="p-3 border rounded-md">
            {data.viewsByDay.length === 0 ? (
              <p className="text-sm text-muted-foreground">{t("noData")}</p>
            ) : (
              <div className="flex items-end gap-2 h-24">
                {data.viewsByDay.map((item) => (
                  <div key={item.date} className="flex-1 flex flex-col items-center gap-1">
                    <div className="w-full flex justify-center">
                      <div
                        className="w-full max-w-6 bg-primary rounded-t transition-all"
                        style={{
                          height: `${Math.max(4, (item.count / maxDayViews) * 80)}px`,
                        }}
                      />
                    </div>
                    <span className="text-[10px] text-muted-foreground">
                      {new Date(item.date).toLocaleDateString("en", { weekday: "short" })}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
