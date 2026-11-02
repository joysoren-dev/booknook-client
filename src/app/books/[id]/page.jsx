"use client";

import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";
import api from "@/lib/axios";
import toast from "react-hot-toast";
import Link from "next/link";
import {
  FaArrowLeft,
  FaBookOpen,
  FaUserEdit,
  FaTag,
  FaStar,
  FaLayerGroup,
  FaTimes,
  FaCheckCircle,
  FaCalendarAlt,
  FaEnvelope,
  FaUser,
} from "react-icons/fa";

export default function BookDetailsPage({ params }) {
  const unwrappedParams = use(params);
  const { id } = unwrappedParams;

  const router = useRouter();
  const { data: session, isPending: authPending } = useSession();

  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [borrowing, setBorrowing] = useState(false);
  const [returnDate, setReturnDate] = useState("");
  const [imgError, setImgError] = useState(false);

  // Private route protection
  useEffect(() => {
    if (!authPending && !session) {
      router.push(`/login?callbackUrl=/books/${id}`);
    }
  }, [session, authPending, router, id]);

  // Fetch book details
  useEffect(() => {
    const fetchBook = async () => {
      try {
        setLoading(true);
        const res = await api.get(`/books/${id}`);
        setBook(res.data);
        if (res.data?.title) {
          document.title = `BookNook | ${res.data.title}`;
        }
      } catch (err) {
        toast.error("Failed to load book details.");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchBook();
    }
  }, [id]);

  // Handle Borrow submission
  const handleConfirmBorrow = async (e) => {
    e.preventDefault();
    if (!returnDate) {
      toast.error("Please select an expected return date.");
      return;
    }

    setBorrowing(true);
    try {
      const payload = {
        bookId: book._id,
        bookTitle: book.title,
        bookImage: book.image,
        category: book.category,
        author: book.author,
        userName: session.user.name,
        userEmail: session.user.email,
        returnDate,
      };

      const res = await api.post("/borrows", payload);

      if (res.status === 201 || res.status === 200) {
        toast.success(`Successfully borrowed "${book.title}"!`);
        // Update local available stock count
        const currentCopies = Number(book.copies ?? book.quantity ?? 1);
        setBook((prev) => ({
          ...prev,
          copies: Math.max(0, currentCopies - 1),
          quantity: Math.max(0, currentCopies - 1),
        }));
        setModalOpen(false);
      }
    } catch (err) {
      const errMsg =
        err.response?.data?.message ||
        "You have already borrowed this book or it is out of stock.";
      toast.error(errMsg);
    } finally {
      setBorrowing(false);
    }
  };

  if (authPending || loading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center gap-3">
        <div className="w-10 h-10 rounded-full border-2 border-indigo-600 border-t-transparent animate-spin" />
        <p className="text-xs sm:text-sm text-slate-500 font-medium">
          Loading book details...
        </p>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="max-w-xl mx-auto my-20 p-8 text-center bg-white rounded-3xl border border-slate-200">
        <FaBookOpen className="text-4xl text-slate-300 mx-auto mb-3" />
        <h2 className="text-xl font-bold text-slate-800">Book Not Found</h2>
        <p className="text-sm text-slate-500 mt-1 mb-6">
          The requested book does not exist or may have been removed.
        </p>
        <Link
          href="/books"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 transition"
        >
          <FaArrowLeft className="text-xs" /> Back to All Books
        </Link>
      </div>
    );
  }

  // Handle both copies and quantity fields with fallback to 1
  const availableCopies = Number(book.copies ?? book.quantity ?? 1);
  const isOutOfStock = availableCopies <= 0;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
      {/* Back button */}
      <Link
        href="/books"
        className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-500 hover:text-indigo-600 mb-8 transition"
      >
        <FaArrowLeft className="text-xs" /> Back to Catalog
      </Link>

      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 p-6 sm:p-10">
        {/* Left Column: Book Cover */}
        <div className="md:col-span-5 flex flex-col items-center">
          <div className="relative w-full max-w-[320px] aspect-[3/4] rounded-2xl overflow-hidden bg-slate-100 shadow-xl border border-slate-200/60">
            <img
              src={
                imgError || !book.image
                  ? "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&q=80"
                  : book.image
              }
              alt={book.title}
              onError={() => setImgError(true)}
              className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
            />
          </div>

          {/* Quick status pill */}
          <div className="mt-5 w-full max-w-[320px] flex items-center justify-between p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs">
            <span className="font-semibold text-slate-600 flex items-center gap-1.5">
              <FaLayerGroup className="text-indigo-500" /> Available Stock:
            </span>
            <span
              className={`font-bold px-3 py-1 rounded-full text-xs ${
                isOutOfStock
                  ? "bg-rose-100 text-rose-700"
                  : "bg-emerald-100 text-emerald-700"
              }`}
            >
              {isOutOfStock
                ? "0 Copies (Out of Stock)"
                : `${availableCopies} Copies`}
            </span>
          </div>
        </div>

        {/* Right Column: Book Details & Actions */}
        <div className="md:col-span-7 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-indigo-50 text-indigo-700 border border-indigo-100">
                <FaTag className="text-[10px]" /> {book.category}
              </span>
              <div className="flex items-center gap-1 text-amber-500 text-xs font-bold bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200/60">
                <FaStar className="text-amber-400" />
                <span>{book.rating || "4.5"} / 5.0</span>
              </div>
            </div>

            <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight leading-snug">
              {book.title}
            </h1>

            <p className="text-sm sm:text-base font-medium text-slate-600 flex items-center gap-2">
              <FaUserEdit className="text-indigo-500" />
              <span>By {book.author}</span>
            </p>

            <div className="border-t border-slate-100 pt-4">
              <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                Synopsis & Overview
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed font-normal whitespace-pre-line">
                {book.description ||
                  "A timeless classic exploring deep literary themes and human experiences."}
              </p>
            </div>
          </div>

          {/* Action Area */}
          <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center gap-4">
            <button
              onClick={() => setModalOpen(true)}
              disabled={isOutOfStock}
              className={`w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl text-sm font-bold shadow-md transition ${
                isOutOfStock
                  ? "bg-slate-200 text-slate-400 cursor-not-allowed shadow-none"
                  : "bg-indigo-600 hover:bg-indigo-700 text-white hover:-translate-y-0.5"
              }`}
            >
              <FaBookOpen />
              <span>
                {isOutOfStock ? "Currently Unavailable" : "Borrow This Book"}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Borrow Confirmation Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-slate-100 space-y-5 relative">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute right-5 top-5 text-slate-400 hover:text-slate-600 p-1"
            >
              <FaTimes className="text-lg" />
            </button>

            <div className="space-y-1">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center text-lg mb-2">
                <FaBookOpen />
              </div>
              <h2 className="text-xl font-black text-slate-900">
                Confirm Borrow Request
              </h2>
              <p className="text-xs text-slate-500">
                Review circulation details before confirming this loan.
              </p>
            </div>

            <form onSubmit={handleConfirmBorrow} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">
                  Book Title
                </label>
                <input
                  type="text"
                  readOnly
                  value={book.title}
                  className="w-full px-3.5 py-2.5 bg-slate-100 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-700 font-medium cursor-not-allowed"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">
                  Borrower Name
                </label>
                <div className="relative">
                  <FaUser className="absolute left-3.5 top-3 text-slate-400 text-xs" />
                  <input
                    type="text"
                    readOnly
                    value={session?.user?.name || ""}
                    className="w-full pl-9 pr-3.5 py-2 bg-slate-100 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-700 cursor-not-allowed"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">
                  Borrower Email
                </label>
                <div className="relative">
                  <FaEnvelope className="absolute left-3.5 top-3 text-slate-400 text-xs" />
                  <input
                    type="email"
                    readOnly
                    value={session?.user?.email || ""}
                    className="w-full pl-9 pr-3.5 py-2 bg-slate-100 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-700 cursor-not-allowed"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Expected Return Date <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <FaCalendarAlt className="absolute left-3.5 top-3 text-slate-400 text-xs" />
                  <input
                    type="date"
                    required
                    min={new Date().toISOString().split("T")[0]}
                    value={returnDate}
                    onChange={(e) => setReturnDate(e.target.value)}
                    className="w-full pl-9 pr-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition"
                  />
                </div>
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm font-semibold text-slate-600 hover:bg-slate-50 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={borrowing}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs sm:text-sm font-bold shadow-md transition disabled:opacity-50"
                >
                  <FaCheckCircle className="text-xs" />
                  <span>{borrowing ? "Processing..." : "Confirm Loan"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
