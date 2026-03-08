import { cn } from "@/lib/utils";

interface DashboardCardProps {
  title?: string;
  headerRight?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export function DashboardCard({ title, headerRight, children, className }: DashboardCardProps) {
  return (
    <div
      className={cn(
        "rounded-[15px] border border-border bg-muted/50 overflow-hidden [&_input]:bg-muted/50 [&_input]:rounded-[15px] [&_button[role=switch]]:rounded-[15px] [&_button[role=switch]_span]:rounded-[15px] [&_label.flex]:rounded-[15px] [&_label.flex]:bg-muted/50 [&_button[role=combobox]]:!bg-muted/50 [&_button[role=combobox]]:!rounded-[15px]",
        className
      )}
    >
      {title && (
        <div className="px-4 py-3.5 border-b border-border bg-muted/30 flex items-center justify-between">
          <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            {title}
          </h2>
          {headerRight}
        </div>
      )}
      <div className="px-4 py-4 space-y-4">{children}</div>
    </div>
  );
}
