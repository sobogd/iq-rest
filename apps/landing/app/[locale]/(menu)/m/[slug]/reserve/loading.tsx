import { SkeletonHeader } from "../_components";

export default function ReserveLoading() {
  return (
    <div className="h-dvh flex flex-col">
      {/* Header */}
      <SkeletonHeader />
      {/* Form skeleton — only guest selector visible initially */}
      <main className="flex-1 flex justify-center px-5 py-6 bg-white overflow-auto">
        <div className="max-w-[440px] w-full">
          <div className="space-y-3">
            {/* Label: "Select guests:" — text-base font-semibold */}
            <div className="h-5 w-full bg-gray-200 rounded animate-pulse" />
            {/* 3x4 grid of guest count buttons — h-11 rounded-lg border-2 */}
            <div className="grid grid-cols-3 gap-3">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((n) => (
                <div key={n} className="h-11 rounded-lg border-2 border-gray-200 bg-white" />
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
