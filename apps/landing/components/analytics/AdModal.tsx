"use client";

import { useEffect, useState } from "react";

interface AdModalProps {
  onComplete: () => void;
}

export function AdModal({ onComplete }: AdModalProps) {
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          onComplete();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl p-8 max-w-sm w-full text-center shadow-2xl">
        {/* Logo/Brand */}
        <div className="mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-2xl mb-3">
            <svg
              className="w-8 h-8 text-red-600"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M3 3h6v6H3V3zm2 2v2h2V5H5zm8-2h6v6h-6V3zm2 2v2h2V5h-2zM3 13h6v6H3v-6zm2 2v2h2v-2H5zm13-2h1v1h-1v-1zm-3 0h1v1h-1v-1zm1 1h1v1h-1v-1zm2 0h1v1h-1v-1zm-1 1h1v1h-1v-1zm1 1h1v1h-1v-1zm-2 0h1v1h-1v-1zm-1 1h1v1h-1v-1zm2 0h1v1h-1v-1zm1 1h1v1h-1v-1z" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-gray-900">IQ Rest</h2>
          <p className="text-sm text-gray-500 mt-1">Digital QR Menu Solution</p>
        </div>

        {/* Ad placeholder */}
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 mb-6">
          <p className="text-gray-600 text-sm mb-3">
            Create your own QR menu for free
          </p>
          <a
            href="https://iq-rest.com/dashboard"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-red-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-red-700 transition-colors"
          >
            Get Started
          </a>
        </div>

        {/* Countdown */}
        <div className="text-sm text-gray-400">
          {countdown > 0 ? (
            <span>Continue in {countdown}s</span>
          ) : (
            <span>Loading...</span>
          )}
        </div>
      </div>
    </div>
  );
}
