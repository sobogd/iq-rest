export default function LanguageLoading() {
  return (
    <div className="h-dvh flex flex-col">
      {/* Header */}
      <header className="shrink-0 h-14 bg-black flex items-center px-5">
        <div className="max-w-[440px] w-full flex items-center relative mx-auto">
          <div className="h-6 w-6 rounded bg-white/20" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-4 w-24 rounded bg-white/20" />
          </div>
        </div>
      </header>
      {/* Language list skeleton */}
      <nav className="flex-1 pt-5 bg-white flex justify-center">
        <div className="max-w-[440px] w-full">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-14 flex items-center border-b border-gray-100 px-5">
              <div className="h-5 w-24 bg-gray-200 rounded animate-pulse" />
            </div>
          ))}
        </div>
      </nav>
    </div>
  );
}
