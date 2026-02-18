export default function MenuLoading() {
  return (
    <div className="h-dvh flex flex-col">
      {/* Header */}
      <header className="shrink-0 h-14 bg-black flex items-center px-5">
        <div className="max-w-[440px] w-full flex items-center relative mx-auto">
          <div className="h-6 w-6 rounded bg-white/20" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-4 w-28 rounded bg-white/20" />
          </div>
        </div>
      </header>

      {/* Category tabs skeleton — matches: px-4 py-3 text-sm font-semibold */}
      <div className="shrink-0 flex justify-center relative bg-white">
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gray-200" />
        <div className="flex gap-2 px-5 max-w-[440px] w-full">
          <div className="px-4 py-3"><div className="h-5 w-16 bg-gray-200 rounded" /></div>
          <div className="px-4 py-3"><div className="h-5 w-20 bg-gray-200 rounded" /></div>
          <div className="px-4 py-3"><div className="h-5 w-14 bg-gray-200 rounded" /></div>
        </div>
      </div>

      {/* Items feed skeleton */}
      <div className="flex-1 overflow-hidden bg-white">
        <div className="flex justify-center px-0 min-[440px]:px-5">
          <div className="max-w-[440px] w-full pt-0 min-[440px]:pt-5 space-y-5">
            {/* Category title — matches: px-5 pt-8 pb-3, text-sm font-bold uppercase border-b-2 pb-1 */}
            <div className="px-5 pt-8 pb-3">
              <div className="h-5 w-24 bg-gray-200 rounded" />
            </div>
            {/* Items */}
            {[1, 2].map((i) => (
              <article key={i}>
                <div className="relative aspect-square w-full min-[440px]:rounded-lg bg-gray-200">
                  <div className="absolute inset-0 skeleton-shimmer" />
                </div>
                <div className="p-5 space-y-2">
                  <div className="flex justify-between items-start gap-4">
                    <div className="h-[22px] w-3/5 bg-gray-200 rounded" />
                    <div className="h-[22px] w-14 bg-gray-200 rounded shrink-0" />
                  </div>
                  <div className="h-4 w-4/5 bg-gray-200 rounded" />
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
