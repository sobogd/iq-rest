"use client";

import { useParams } from "next/navigation";
import { ArrowRight, Calendar } from "lucide-react";
import { dashboardUrl } from "@/lib/dashboard-url";

interface MigratedNoticeProps {
  title: string;
  body: string;
  cta: string;
}

export function MigratedNotice({ title, body, cta }: MigratedNoticeProps) {
  const params = useParams();
  const locale = (params?.locale as string) || "en";
  const target = dashboardUrl(`/${locale}/dashboard`);

  return (
    <div className="flex flex-col items-center justify-center h-full px-6 py-16 text-center">
      <div className="h-14 w-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-6">
        <Calendar className="h-7 w-7" strokeWidth={1.75} />
      </div>
      <h1 className="text-xl font-semibold tracking-tight mb-3 max-w-md">{title}</h1>
      <p className="text-sm text-muted-foreground mb-8 max-w-md leading-relaxed">{body}</p>
      <a
        href={target}
        className="inline-flex items-center gap-2 h-11 px-6 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 active:scale-[0.99] transition"
      >
        {cta}
        <ArrowRight className="h-4 w-4" />
      </a>
    </div>
  );
}
