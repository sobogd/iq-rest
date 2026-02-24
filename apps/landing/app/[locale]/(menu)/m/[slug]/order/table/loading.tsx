import { SkeletonHeader } from "../../_components";

export default function TableLoading() {
  return (
    <div className="h-dvh flex flex-col">
      <SkeletonHeader />
      <main className="flex-1 flex justify-center px-5 py-6 bg-white overflow-auto">
        <div className="max-w-[440px] w-full space-y-6">
          {/* Label skeleton */}
          <div className="h-5 w-36 bg-gray-200 rounded animate-pulse" />
          {/* Table button skeletons */}
          {[1, 2, 3, 4].map((n) => (
            <div
              key={n}
              className="h-16 rounded-lg border-2 border-gray-200 px-4 flex flex-col justify-center gap-1.5"
            >
              <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
              <div className="h-3 w-16 bg-gray-200 rounded animate-pulse" />
            </div>
          ))}
          {/* Button skeleton */}
          <div className="h-14 rounded-lg bg-gray-200 animate-pulse" />
        </div>
      </main>
    </div>
  );
}
