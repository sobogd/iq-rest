import { SkeletonHeader } from "../_components";

export default function OrderLoading() {
  return (
    <div className="h-dvh flex flex-col">
      <SkeletonHeader />
      <main className="flex-1 flex justify-center px-5 py-6 bg-white overflow-auto">
        <div className="max-w-[440px] w-full space-y-3">
          {/* Cart item skeletons */}
          {[1, 2, 3].map((n) => (
            <div
              key={n}
              className="flex items-center gap-3 border-2 border-gray-200 rounded-lg px-4 py-3"
            >
              <div className="flex-1 space-y-2">
                <div className="h-4 w-32 bg-gray-200 rounded animate-pulse" />
                <div className="h-3 w-20 bg-gray-200 rounded animate-pulse" />
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-9 h-9 rounded-lg border-2 border-gray-200" />
                <div className="w-7 h-4 bg-gray-200 rounded animate-pulse" />
                <div className="w-9 h-9 rounded-lg bg-gray-200 animate-pulse" />
              </div>
            </div>
          ))}
          {/* Total skeleton */}
          <div className="flex items-center justify-between pt-2">
            <div className="h-5 w-16 bg-gray-200 rounded animate-pulse" />
            <div className="h-6 w-24 bg-gray-200 rounded animate-pulse" />
          </div>
          {/* Input skeletons */}
          <div className="h-12 border-2 border-gray-200 rounded-md animate-pulse" />
          <div className="h-20 border-2 border-gray-200 rounded-md animate-pulse" />
          {/* Button skeleton */}
          <div className="h-14 rounded-lg bg-gray-200 animate-pulse" />
        </div>
      </main>
    </div>
  );
}
