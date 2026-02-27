interface MenuPageWrapperProps {
  children: React.ReactNode;
}

export function MenuPageWrapper({ children }: MenuPageWrapperProps) {
  return (
    <div className="h-dvh flex flex-col">
      {children}
    </div>
  );
}
