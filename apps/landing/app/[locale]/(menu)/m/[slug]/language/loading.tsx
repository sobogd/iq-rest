export default function LanguageLoading() {
  return (
    <div className="flex flex-col h-full bg-white">
      <div className="flex-1 flex justify-center pt-20">
        <div className="max-w-[440px] w-full space-y-1 px-5">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-14 flex items-center border-b border-gray-100 px-5">
              <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
