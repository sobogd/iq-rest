export default function ReserveLoading() {
  return (
    <div className="flex flex-col h-full bg-white">
      <div className="flex-1 flex justify-center px-5 pt-20">
        <div className="max-w-[440px] w-full space-y-6">
          <div className="h-6 w-32 bg-gray-200 rounded animate-pulse" />
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-16 w-14 bg-gray-200 rounded-xl animate-pulse" />
            ))}
          </div>
          <div className="space-y-3">
            <div className="h-10 w-full bg-gray-200 rounded-lg animate-pulse" />
            <div className="h-10 w-full bg-gray-200 rounded-lg animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
}
