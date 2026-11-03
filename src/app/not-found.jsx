"use client";

import Link from "next/link";
import { FaBookOpen, FaHome } from "react-icons/fa";

export default function NotFound() {
  return (
    <div className="min-h-[75vh] flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 text-center">
      <div className="w-20 h-20 bg-indigo-50 text-indigo-600 rounded-3xl flex items-center justify-center text-3xl mb-6 shadow-sm border border-indigo-100">
        <FaBookOpen />
      </div>

      <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100 mb-3">
        404 Error
      </span>

      <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
        Page Not Found
      </h1>

      <p className="mt-3 text-sm sm:text-base text-slate-500 max-w-md mx-auto leading-relaxed">
        The page you are looking for might have been removed, had its name
        changed, or is temporarily unavailable in our library archive.
      </p>

      <div className="mt-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold shadow-md transition-all duration-200 hover:-translate-y-0.5 cursor-pointer"
        >
          <FaHome className="text-sm" />
          <span>Back to Home</span>
        </Link>
      </div>
    </div>
  );
}
