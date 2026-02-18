export default function ContactsLoading() {
  return (
    <div className="h-dvh flex flex-col">
      <div className="flex-1 relative">
        {/* Map placeholder */}
        <div className="absolute inset-0 bg-gray-200 animate-pulse">
          <div className="absolute inset-0 skeleton-shimmer" />
        </div>
        {/* Header */}
        <header className="absolute top-0 inset-x-0 h-14 bg-black flex items-center px-5 z-10">
          <div className="max-w-[440px] w-full flex items-center relative mx-auto">
            <div className="h-6 w-6 rounded bg-white/20" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="h-4 w-20 rounded bg-white/20" />
            </div>
          </div>
        </header>
        {/* Action buttons skeleton */}
        <nav className="absolute bottom-0 inset-x-0 flex justify-center pb-8 z-10">
          <div className="flex items-center gap-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="w-14 h-14 rounded-full bg-gray-300 animate-pulse" />
            ))}
          </div>
        </nav>
      </div>
    </div>
  );
}
