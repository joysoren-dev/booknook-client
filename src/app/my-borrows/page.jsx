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
  FaUserEdit,
  FaTimes,
  FaExclamationCircle,
} from "react-icons/fa";

export default function MyBorrowsPage() {
  const router = useRouter();
  const { data: session, isPending: authPending } = useSession();

  const [borrows, setBorrows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [returningId, setReturningId] = useState(null);
  const [targetBook, setTargetBook] = useState(null);

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

  // Execute return
  const confirmReturnAction = async () => {
    if (!targetBook) return;

    const bookToReturn = targetBook;
    setReturningId(bookToReturn._id);

    try {
      // Ensure token exists
      if (!localStorage.getItem("access-token") && session?.user?.email) {
        const tokenRes = await api.post("/jwt", {
          email: session.user.email,
          name: session.user.name,
        });
        if (tokenRes.data?.token) {
          localStorage.setItem("access-token", tokenRes.data.token);
        }
      }

      const res = await api.delete(`/borrows/${bookToReturn._id}`);
      if (res.status === 200) {
        toast.success(`"${bookToReturn.bookTitle}" returned successfully!`);
        setBorrows((prev) =>
          prev.filter((item) => item._id !== bookToReturn._id),
        );
        setTargetBook(null);
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
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 min-h-[calc(100vh-320px)] flex flex-col justify-start">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100">
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
        <div className="bg-white rounded-3xl border border-slate-200/80 p-8 sm:p-14 text-center max-w-lg mx-auto shadow-sm my-10">
          <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center text-2xl mx-auto mb-4">
            <FaBookOpen />
          </div>
          <h3 className="text-lg font-bold text-slate-800">
            No Borrowed Books Found
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 mb-6">
            You currently have no books on loan. Browse the collection to
            discover new stories!
          </p>
          <Link
            href="/books"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs sm:text-sm font-semibold shadow-md transition"
          >
            Browse Catalog
          </Link>
        </div>
      ) : (
        /* Wide Card Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
          {borrows.map((item) => (
            <div
              key={item._id}
              className="w-full bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-md transition-all duration-200 p-5 flex flex-col justify-between gap-5"
            >
              <div className="flex items-start gap-5">
                <div className="w-24 sm:w-28 h-36 flex-shrink-0 bg-slate-100 rounded-xl overflow-hidden shadow-sm border border-slate-200">
                  <img
                    src={
                      item.bookImage ||
                      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&q=80"
                    }
                    alt={item.bookTitle}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1 min-w-0 space-y-2">
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-md border border-indigo-100">
                    <FaTag className="text-[10px]" />{" "}
                    {item.category || "General"}
                  </span>

                  <h3 className="font-extrabold text-slate-900 text-lg sm:text-xl leading-snug line-clamp-2">
                    {item.bookTitle}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-500 font-medium flex items-center gap-1.5">
                    <FaUserEdit className="text-indigo-500" />
                    <span>By {item.author || "Unknown Author"}</span>
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-slate-600">
                  <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center text-xs flex-shrink-0">
                    <FaCalendarAlt />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
                      Return Due
                    </span>
                    <span className="text-xs sm:text-sm font-extrabold text-slate-800">
                      {item.returnDate || "No date set"}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => setTargetBook(item)}
                  disabled={returningId === item._id}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 text-xs sm:text-sm font-bold shadow-sm transition disabled:opacity-50 cursor-pointer"
                >
                  <FaUndoAlt className="text-xs" />
                  <span>Return Book</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modern Custom Return Confirmation Modal */}
      {targetBook && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-slate-100 text-center relative">
            <button
              onClick={() => setTargetBook(null)}
              className="absolute right-4 top-4 text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
            >
              <FaTimes className="text-base" />
            </button>

            <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center text-xl mx-auto mb-3">
              <FaExclamationCircle />
            </div>

            <h3 className="text-lg font-black text-slate-900 mb-1">
              Return Book?
            </h3>
            <p className="text-xs text-slate-500 mb-6 px-2">
              Are you sure you want to return{" "}
              <span className="font-bold text-slate-800">
                "{targetBook.bookTitle}"
              </span>
              ? This will make the book available for others in the library.
            </p>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setTargetBook(null)}
                className="flex-1 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmReturnAction}
                disabled={returningId === targetBook._id}
                className="flex-1 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow-md transition disabled:opacity-50 cursor-pointer"
              >
                {returningId === targetBook._id
                  ? "Returning..."
                  : "Yes, Return"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
