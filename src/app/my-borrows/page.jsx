"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";
import api from "@/lib/axios";
import toast from "react-hot-toast";
import Link from "next/link";
import {
  FaBookOpen,
  FaCalendarAlt,
  FaTag,
  FaUndoAlt,
  FaArrowRight,
  FaExclamationTriangle,
} from "react-icons/fa";

export default function MyBorrowsPage() {
  const router = useRouter();
  const { data: session, isPending: authPending } = useSession();

  const [borrows, setBorrows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [returningId, setReturningId] = useState(null);

  // Private route validation
  useEffect(() => {
    if (!authPending && !session) {
      router.push("/login?callbackUrl=/my-borrows");
    }
  }, [session, authPending, router]);

  // Fetch user borrow records
  const fetchBorrows = async () => {
    if (!session?.user?.email) return;

    try {
      setLoading(true);
      const res = await api.get(`/borrows?email=${session.user.email}`);
      setBorrows(res.data || []);
    } catch (err) {
      toast.error("Failed to load your borrowed books.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (session?.user?.email) {
      fetchBorrows();
    }
  }, [session]);

  // Handle return book action
  const handleReturn = async (borrowId, bookTitle) => {
    const confirmReturn = window.confirm(
      `Are you sure you want to return "${bookTitle}"?`,
    );
    if (!confirmReturn) return;

    setReturningId(borrowId);
    try {
      const res = await api.delete(`/borrows/${borrowId}`);
      if (res.status === 200) {
        toast.success(`"${bookTitle}" returned successfully!`);
        setBorrows((prev) => prev.filter((item) => item._id !== borrowId));
      }
    } catch (err) {
      const msg = err.response?.data?.message || "Failed to return the book.";
      toast.error(msg);
    } finally {
      setReturningId(null);
    }
  };

  if (authPending || loading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center gap-3">
        <div className="w-10 h-10 rounded-full border-2 border-indigo-600 border-t-transparent animate-spin" />
        <p className="text-xs sm:text-sm text-slate-500 font-medium">
          Retrieving your borrowed books...
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest bg-indigo-50 px-3 py-1 rounded-full">
            Circulation Log
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mt-2">
            My Borrowed Books
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Track your ongoing loans and return books when you are finished
            reading.
          </p>
        </div>
        <Link
          href="/books"
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-indigo-600 hover:text-indigo-700 transition"
        >
          <span>Explore More Books</span>
          <FaArrowRight className="text-xs" />
        </Link>
      </div>

      {/* Empty State */}
      {borrows.length === 0 ? (
        <div className="bg-white rounded-3xl border border-slate-200/80 p-8 sm:p-14 text-center max-w-lg mx-auto shadow-sm">
          <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center text-2xl mx-auto mb-4">
            <FaBookOpen />
          </div>
          <h3 className="text-lg font-bold text-slate-800">
            No Borrowed Books Found
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 mb-6">
            You haven't borrowed any titles yet. Browse the collection to find
            your next read!
          </p>
          <Link
            href="/books"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs sm:text-sm font-semibold shadow-md transition"
          >
            Browse Catalog
          </Link>
        </div>
      ) : (
        /* Borrowed Books Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {borrows.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden flex flex-col justify-between hover:shadow-md transition"
            >
              <div className="p-5 flex gap-4">
                <div className="w-20 h-28 flex-shrink-0 bg-slate-100 rounded-xl overflow-hidden shadow-sm border border-slate-200">
                  <img
                    src={
                      item.bookImage ||
                      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&q=80"
                    }
                    alt={item.bookTitle}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1 space-y-2">
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md">
                    <FaTag className="text-[9px]" />{" "}
                    {item.category || "General"}
                  </span>
                  <h3 className="font-bold text-slate-900 text-sm sm:text-base leading-snug line-clamp-2">
                    {item.bookTitle}
                  </h3>
                  <p className="text-xs text-slate-500 font-medium">
                    By {item.author || "Unknown Author"}
                  </p>
                </div>
              </div>

              {/* Loan Details & Action */}
              <div className="px-5 py-3.5 bg-slate-50/80 border-t border-slate-100 flex items-center justify-between text-xs">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-1.5 text-slate-500 text-[11px]">
                    <FaCalendarAlt className="text-slate-400" />
                    <span>Return by:</span>
                  </div>
                  <span className="font-bold text-indigo-900">
                    {item.returnDate || "No date specified"}
                  </span>
                </div>

                <button
                  onClick={() => handleReturn(item._id, item.bookTitle)}
                  disabled={returningId === item._id}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white hover:bg-rose-50 border border-slate-200 hover:border-rose-200 text-slate-700 hover:text-rose-600 font-bold transition text-xs shadow-sm disabled:opacity-50"
                >
                  <FaUndoAlt className="text-[10px]" />
                  <span>
                    {returningId === item._id ? "Returning..." : "Return"}
                  </span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
