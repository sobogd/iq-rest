import { SkeletonHeader } from "../_components";

export default function ContactsLoading() {
  return (
    <div className="h-dvh flex flex-col">
      <div className="flex-1 relative">
        {/* Map placeholder */}
        <div className="absolute inset-0 bg-gray-200 animate-pulse">
          <div className="absolute inset-0 skeleton-shimmer" />
        </div>
        {/* Header */}
        <SkeletonHeader absolute />
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
