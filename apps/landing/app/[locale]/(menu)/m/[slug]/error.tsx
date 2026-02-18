"use client";

export default function MenuError({ reset }: { reset: () => void }) {
  return (
    <div className="min-h-dvh flex items-center justify-center bg-white px-6">
      <div className="text-center">
        <h1 className="text-6xl font-black text-gray-200 mb-4">Error</h1>
        <p className="text-gray-500 text-sm mb-6">Something went wrong</p>
        <button
          onClick={reset}
          className="px-6 py-2 rounded-full bg-black text-white text-sm font-medium"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
