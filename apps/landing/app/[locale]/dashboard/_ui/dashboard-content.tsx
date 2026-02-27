"use client";

import { DashboardNavSidebar } from "../_components/dashboard-nav";

interface DashboardContentProps {
  children: React.ReactNode;
  innerClassName?: string;
}

export function DashboardContent({ children, innerClassName = "" }: DashboardContentProps) {
  return (
    <div className="max-w-lg md:max-w-none md:w-[45rem] mx-auto md:flex md:gap-4 min-h-full">
      <DashboardNavSidebar />
      <div className={`flex-1 min-w-0 ${innerClassName}`}>
        {children}
      </div>
    </div>
  );
}
