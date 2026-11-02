"use client";

import { useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import {
  FaUserCircle,
  FaEnvelope,
  FaCalendarAlt,
  FaBookOpen,
} from "react-icons/fa";

export default function ProfilePage() {
  const { data: session, isPending } = useSession();
  const router = useRouter();
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    document.title = "BookNook | My Profile";
    if (!isPending && !session) {
      router.push("/login?callbackUrl=/profile");
    }
  }, [session, isPending, router]);

  if (isPending) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-indigo-600 border-t-transparent animate-spin" />
      </div>
    );
  }

  if (!session) return null;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden">
        {/* Banner header */}
        <div className="h-36 bg-gradient-to-r from-indigo-600 via-indigo-700 to-slate-900" />

        <div className="px-6 sm:px-10 pb-8">
          {/* Avatar and basic info */}
          <div className="relative -mt-16 flex flex-col sm:flex-row items-center sm:items-end gap-5 mb-8 text-center sm:text-left">
            {session.user?.image && !imgError ? (
              <img
                src={session.user.image}
                alt={session.user.name || "User"}
                referrerPolicy="no-referrer"
                onError={() => setImgError(true)}
                className="w-28 h-28 rounded-2xl object-cover ring-4 ring-white shadow-md bg-white"
              />
            ) : (
              <div className="w-28 h-28 rounded-2xl bg-indigo-50 border-2 border-indigo-200 text-indigo-600 flex items-center justify-center font-bold text-4xl shadow-md">
                {session.user?.name
                  ? session.user.name.charAt(0).toUpperCase()
                  : "U"}
              </div>
            )}

            <div className="space-y-1">
              <h1 className="text-2xl font-black text-slate-900">
                {session.user?.name}
              </h1>
              <p className="text-sm text-slate-500 flex items-center justify-center sm:justify-start gap-2">
                <FaEnvelope className="text-xs text-indigo-500" />
                <span>{session.user?.email}</span>
              </p>
            </div>
          </div>

          {/* Quick shortcuts */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-100">
            <Link
              href="/my-books"
              className="p-5 rounded-2xl bg-slate-50 hover:bg-indigo-50 border border-slate-200/80 hover:border-indigo-200 transition group flex items-center justify-between"
            >
              <div>
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Contributions
                </p>
                <h3 className="text-base font-bold text-slate-800 group-hover:text-indigo-600 mt-0.5">
                  My Added Books
                </h3>
              </div>
              <FaBookOpen className="text-xl text-indigo-500 group-hover:scale-110 transition-transform" />
            </Link>

            <Link
              href="/my-borrows"
              className="p-5 rounded-2xl bg-slate-50 hover:bg-indigo-50 border border-slate-200/80 hover:border-indigo-200 transition group flex items-center justify-between"
            >
              <div>
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Circulation
                </p>
                <h3 className="text-base font-bold text-slate-800 group-hover:text-indigo-600 mt-0.5">
                  My Borrowed List
                </h3>
              </div>
              <FaCalendarAlt className="text-xl text-indigo-500 group-hover:scale-110 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
