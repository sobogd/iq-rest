export default function MenuLoading() {
  return (
    <div className="flex flex-col h-full bg-white">
      {/* Tab bar skeleton */}
      <div className="shrink-0 flex justify-center border-b border-gray-200">
        <div className="flex gap-2 px-5 py-3 max-w-[440px] w-full">
          <div className="h-5 w-16 bg-gray-200 rounded animate-pulse" />
          <div className="h-5 w-20 bg-gray-200 rounded animate-pulse" />
          <div className="h-5 w-14 bg-gray-200 rounded animate-pulse" />
        </div>
      </div>
      {/* Items skeleton */}
      <div className="flex-1 flex justify-center px-5 pt-5">
        <div className="max-w-[440px] w-full space-y-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="space-y-3">
              <div className="aspect-square w-full bg-gray-200 rounded-lg animate-pulse" />
              <div className="px-1 space-y-2">
                <div className="h-5 w-3/4 bg-gray-200 rounded animate-pulse" />
                <div className="h-4 w-1/2 bg-gray-200 rounded animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
