"use client";

import { analytics } from "@/lib/analytics";
import Image from "next/image";

interface ListCardProps {
  href: string;
  title: string;
  subtitle: string;
  date: string; // ISO YYYY-MM-DD
  image: string;
  publishedOnLabel: string;
  readMoreLabel: string;
  locale: string;
}

function formatDate(iso: string, locale: string): string {
  try {
    return new Date(iso).toLocaleDateString(locale, {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch {
    return iso;
  }
}

export function ChangelogListCard({
  href,
  title,
  subtitle,
  date,
  image,
  publishedOnLabel,
  readMoreLabel,
  locale,
}: ListCardProps) {
  return (
    <a
      href={href}
      onClick={() => analytics.track("land_changelog_card_click")}
      className="group flex flex-col bg-card border border-border rounded-2xl overflow-hidden hover:border-primary/40 transition-colors h-full"
    >
      <div className="relative aspect-[16/9] bg-secondary overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
          className="object-cover group-hover:scale-[1.02] transition-transform duration-500"
        />
      </div>
      <div className="flex flex-col gap-3 p-5 flex-1">
        <div className="text-[11px] uppercase tracking-wider text-muted-foreground">
          {publishedOnLabel} · {formatDate(date, locale)}
        </div>
        <h3 className="text-lg font-semibold leading-snug text-foreground group-hover:text-primary transition-colors">
          {title}
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">{subtitle}</p>
        <span className="mt-auto text-sm text-primary font-medium">
          {readMoreLabel} →
        </span>
      </div>
    </a>
  );
}
