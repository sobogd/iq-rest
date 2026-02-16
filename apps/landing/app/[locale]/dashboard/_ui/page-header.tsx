"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "@/i18n/routing";

interface PageHeaderProps {
  title: string;
  children?: React.ReactNode;
  onBack?: () => void;
  backHref?: string;
}

export function PageHeader({ title, children, onBack, backHref = "/dashboard" }: PageHeaderProps) {
  const router = useRouter();

  return (
    <header className="shrink-0 shadow-sm px-6">
      <div className="flex items-center py-3 max-w-lg mx-auto">
        <button
          onClick={onBack || (() => router.push(backHref))}
          className="flex items-center justify-center h-10 w-10 bg-muted/30 rounded-xl hover:bg-muted/50 transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <h1 className="text-xl font-semibold flex-1 ml-3">{title}</h1>
        {children}
      </div>
    </header>
  );
}
