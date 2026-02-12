"use client";

import { useEffect, useState, useCallback } from "react";
import {
  Users,
  MousePointerClick,
  UserCheck,
  TrendingUp,
  Calendar,
  Globe,
  Monitor,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PageLoader } from "../_ui/page-loader";

interface FunnelStep {
  event: string;
  label: string;
  count: number;
}

interface AnalyticsEvent {
  id: string;
  event: string;
  sessionId: string;
  userId: string | null;
  page: string | null;
  createdAt: string;
}

interface Stats {
  totalEvents: number;
  uniqueSessions: number;
  linkedSessions: number;
}

interface GeoStatsItem {
  name: string;
  count: number;
}

interface GeoStats {
  countries: GeoStatsItem[];
  devices: GeoStatsItem[];
  browsers: GeoStatsItem[];
  os: GeoStatsItem[];
}

interface AnalyticsData {
  funnels: {
    sections: FunnelStep[];
    marketing: FunnelStep[];
    dashboard: FunnelStep[];
    conversion: FunnelStep[];
  };
  recentEvents: AnalyticsEvent[];
  stats: Stats;
  geoStats: GeoStats;
  dateRange: {
    from: string;
    to: string;
  };
}

function StatsListCard({
  title,
  items,
  icon: Icon,
}: {
  title: string;
  items: GeoStatsItem[];
  icon: React.ElementType;
}) {
  const maxCount = Math.max(...items.map((i) => i.count), 1);

  if (items.length === 0) {
    return (
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <Icon className="h-4 w-4" />
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">No data yet</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium flex items-center gap-2">
          <Icon className="h-4 w-4" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {items.map((item) => {
            const percentage = (item.count / maxCount) * 100;
            return (
              <div key={item.name} className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span>{item.name}</span>
                  <span className="text-muted-foreground">{item.count}</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary/70 rounded-full"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}

function FunnelCard({ title, steps }: { title: string; steps: FunnelStep[] }) {
  const maxCount = Math.max(...steps.map((s) => s.count), 1);

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto pb-2">
          <div className="flex gap-2 min-w-max">
            {steps.map((step, index) => {
              const percentage = maxCount > 0 ? (step.count / maxCount) * 100 : 0;
              const prevCount = index > 0 ? steps[index - 1].count : step.count;
              const dropoff = prevCount > 0 ? ((prevCount - step.count) / prevCount) * 100 : 0;

              const tooltipText = `${step.label}\n${step.count} users${index > 0 && dropoff > 0 ? `\n-${dropoff.toFixed(0)}% drop` : ""}`;

              return (
                <div key={step.event} className="flex flex-col items-center w-16">
                  <div className="h-24 w-full flex items-end justify-center">
                    <div
                      className="w-10 rounded-t cursor-pointer transition-all bg-primary/70 hover:bg-primary"
                      style={{ height: `${Math.max(percentage, 4)}%` }}
                      title={tooltipText}
                    />
                  </div>
                  <div className="mt-1 text-center">
                    <p className="text-xs font-medium">{step.count}</p>
                    <p className="text-[9px] text-muted-foreground leading-tight h-6 overflow-hidden">
                      {step.label}
                    </p>
                    {index > 0 && dropoff > 0 && (
                      <p className="text-[9px] text-red-500">-{dropoff.toFixed(0)}%</p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function AdminAnalyticsPage() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Date range state
  const [dateFrom, setDateFrom] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() - 30);
    return d.toISOString().split("T")[0];
  });
  const [dateTo, setDateTo] = useState(() => {
    return new Date().toISOString().split("T")[0];
  });

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ from: dateFrom, to: dateTo });
      const res = await fetch(`/api/admin/analytics?${params}`);
      if (!res.ok) {
        if (res.status === 403) {
          setError("Access denied");
        } else {
          setError("Failed to load data");
        }
        return;
      }
      const json = await res.json();
      setData(json);
      setError(null);
    } catch {
      setError("Failed to load data");
    } finally {
      setLoading(false);
    }
  }, [dateFrom, dateTo]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString("en-GB", {
      day: "numeric",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading && !data) {
    return <PageLoader />;
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-muted-foreground">{error}</p>
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-auto p-6 space-y-6">
        {/* Date Range Filter */}
        <Card>
          <CardContent className="pt-4">
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">From:</span>
                <Input
                  type="date"
                  value={dateFrom}
                  onChange={(e) => setDateFrom(e.target.value)}
                  className="w-40"
                />
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">To:</span>
                <Input
                  type="date"
                  value={dateTo}
                  onChange={(e) => setDateTo(e.target.value)}
                  className="w-40"
                />
              </div>
              <Button onClick={fetchData} size="sm" disabled={loading}>
                {loading ? "Loading..." : "Apply"}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <MousePointerClick className="h-8 w-8 text-primary" />
                <div>
                  <p className="text-2xl font-bold">{data.stats.totalEvents}</p>
                  <p className="text-sm text-muted-foreground">Events</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <Users className="h-8 w-8 text-primary" />
                <div>
                  <p className="text-2xl font-bold">{data.stats.uniqueSessions}</p>
                  <p className="text-sm text-muted-foreground">Sessions</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <UserCheck className="h-8 w-8 text-primary" />
                <div>
                  <p className="text-2xl font-bold">{data.stats.linkedSessions}</p>
                  <p className="text-sm text-muted-foreground">Logged In</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <TrendingUp className="h-8 w-8 text-primary" />
                <div>
                  <p className="text-2xl font-bold">
                    {data.stats.uniqueSessions > 0
                      ? ((data.stats.linkedSessions / data.stats.uniqueSessions) * 100).toFixed(1)
                      : 0}%
                  </p>
                  <p className="text-sm text-muted-foreground">Conversion</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 4 Funnels */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FunnelCard title="Landing Sections" steps={data.funnels.sections} />
          <FunnelCard title="Marketing Pages" steps={data.funnels.marketing} />
          <FunnelCard title="Dashboard Pages" steps={data.funnels.dashboard} />
          <FunnelCard title="Conversion Funnel" steps={data.funnels.conversion} />
        </div>

        {/* Geo & Device Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatsListCard
            title="Countries"
            items={data.geoStats.countries}
            icon={Globe}
          />
          <StatsListCard
            title="Devices"
            items={data.geoStats.devices}
            icon={Monitor}
          />
          <StatsListCard
            title="Browsers"
            items={data.geoStats.browsers}
            icon={Globe}
          />
          <StatsListCard
            title="OS"
            items={data.geoStats.os}
            icon={Monitor}
          />
        </div>

        {/* Recent Events */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Events</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 max-h-[400px] overflow-auto">
              {data.recentEvents.map((event) => (
                <div
                  key={event.id}
                  className="flex items-center justify-between p-3 rounded-lg bg-muted/30 text-sm"
                >
                  <div className="flex items-center gap-3">
                    <code className="text-xs bg-muted px-2 py-1 rounded">
                      {event.event}
                    </code>
                    {event.userId && (
                      <span className="text-xs text-green-600 bg-green-100 dark:bg-green-900/30 px-2 py-0.5 rounded">
                        logged in
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-4 text-muted-foreground">
                    <span className="text-xs font-mono">
                      {event.sessionId.slice(0, 8)}...
                    </span>
                    <span className="text-xs">{formatDate(event.createdAt)}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
