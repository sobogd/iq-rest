"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "@/i18n/routing";

interface PageHeaderProps {
  title: string;
  children?: React.ReactNode;
  onBack?: () => void;
}

export function PageHeader({ title, children, onBack }: PageHeaderProps) {
  const router = useRouter();

  return (
    <header className="flex h-14 shrink-0 items-center px-6 my-4">
      <button
        onClick={onBack || (() => router.back())}
        className="flex items-center justify-center h-10 w-10 bg-muted/30 rounded-xl hover:bg-muted/50 transition-colors"
      >
        <ArrowLeft className="h-5 w-5" />
      </button>
      <h1 className="text-xl font-semibold flex-1 ml-3">{title}</h1>
      {children}
    </header>
  );
}
