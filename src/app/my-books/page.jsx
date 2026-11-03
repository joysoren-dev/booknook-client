"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";
import api from "@/lib/axios";
import toast from "react-hot-toast";
import Link from "next/link";
import {
  FaBook,
  FaEdit,
  FaStar,
  FaTag,
  FaPlus,
  FaLayerGroup,
  FaTimes,
  FaCheckCircle,
  FaUserEdit,
  FaTrashAlt,
  FaExclamationTriangle,
} from "react-icons/fa";

const CATEGORIES = [
  "Fiction",
  "Non-Fiction",
  "Science & Technology",
  "History",
  "Philosophy",
  "Fantasy",
  "Business",
  "Self-Help",
];

export default function MyBooksPage() {
  const router = useRouter();
  const { data: session, isPending: authPending } = useSession();

  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingBook, setEditingBook] = useState(null);
  const [deletingBook, setDeletingBook] = useState(null);
  const [updating, setUpdating] = useState(false);
  const [deleting, setDeleting] = useState(false);

  // Private route check
  useEffect(() => {
    if (!authPending && !session) {
      router.push("/login?callbackUrl=/my-books");
    }
  }, [session, authPending, router]);

  // Fetch only books added by current user
  const fetchMyBooks = async () => {
    if (!session?.user?.email) return;

    try {
      setLoading(true);
      const res = await api.get(`/books?userEmail=${session.user.email}`);
      setBooks(res.data || []);
    } catch (err) {
      toast.error("Failed to load your books.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (session?.user?.email) {
      fetchMyBooks();
    }
  }, [session]);

  // Helper to ensure JWT Token is set
  const ensureToken = async () => {
    if (!localStorage.getItem("access-token") && session?.user?.email) {
      const tokenRes = await api.post("/jwt", {
        email: session.user.email,
        name: session.user.name,
      });
      if (tokenRes.data?.token) {
        localStorage.setItem("access-token", tokenRes.data.token);
      }
    }
  };

  // Handle Edit submission
  const handleUpdateBook = async (e) => {
    e.preventDefault();
    setUpdating(true);

    try {
      await ensureToken();

      const payload = {
        title: editingBook.title,
        author: editingBook.author,
        category: editingBook.category,
        totalCopies: parseInt(editingBook.totalCopies, 10) || 1,
        rating: parseFloat(editingBook.rating) || 4.5,
        image: editingBook.image,
        description: editingBook.description,
      };

      const res = await api.patch(`/books/${editingBook._id}`, payload);

      if (res.status === 200) {
        toast.success(`"${editingBook.title}" updated successfully!`);
        setBooks((prev) =>
          prev.map((b) =>
            b._id === editingBook._id ? { ...b, ...payload } : b,
          ),
        );
        setEditingBook(null);
      }
    } catch (err) {
      const msg = err.response?.data?.message || "Failed to update book.";
      toast.error(msg);
    } finally {
      setUpdating(false);
    }
  };

  // Handle Delete submission with custom modal
  const handleConfirmDelete = async () => {
    if (!deletingBook) return;

    setDeleting(true);
    try {
      await ensureToken();

      const res = await api.delete(`/books/${deletingBook._id}`);
      if (res.status === 200 || res.status === 204) {
        toast.success(`"${deletingBook.title}" removed successfully!`);
        setBooks((prev) => prev.filter((b) => b._id !== deletingBook._id));
        setDeletingBook(null);
      }
    } catch (err) {
      const msg = err.response?.data?.message || "Failed to delete the book.";
      toast.error(msg);
    } finally {
      setDeleting(false);
    }
  };

  if (authPending || loading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center gap-3">
        <div className="w-10 h-10 rounded-full border-2 border-indigo-600 border-t-transparent animate-spin" />
        <p className="text-xs sm:text-sm text-slate-500 font-medium">
          Loading your contributed books...
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 min-h-[calc(100vh-320px)] flex flex-col justify-start">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100">
            Author Archive
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mt-2">
            My Books
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Manage, update, and view all titles contributed by your account.
          </p>
        </div>
        <Link
          href="/add-book"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs sm:text-sm font-semibold shadow-md transition"
        >
          <FaPlus className="text-xs" />
          <span>Add New Book</span>
        </Link>
      </div>

      {/* Empty State */}
      {books.length === 0 ? (
        <div className="bg-white rounded-3xl border border-slate-200/80 p-8 sm:p-14 text-center max-w-lg mx-auto shadow-sm my-10">
          <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center text-2xl mx-auto mb-4">
            <FaBook />
          </div>
          <h3 className="text-lg font-bold text-slate-800">
            No Contributed Books Yet
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 mb-6">
            You have not added any books to the library archive. Share your
            favorite books today!
          </p>
          <Link
            href="/add-book"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs sm:text-sm font-semibold shadow-md transition"
          >
            Add Your First Book
          </Link>
        </div>
      ) : (
        /* Books List Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
          {books.map((book) => {
            const copies = Number(
              book.totalCopies ?? book.copies ?? book.quantity ?? 0,
            );

            return (
              <div
                key={book._id}
                className="w-full bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-md transition-all duration-200 p-6 flex flex-col justify-between gap-5"
              >
                <div className="flex items-start gap-5">
                  <div className="w-24 sm:w-28 h-36 flex-shrink-0 bg-slate-100 rounded-xl overflow-hidden shadow-sm border border-slate-200">
                    <img
                      src={
                        book.image ||
                        "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&q=80"
                      }
                      alt={book.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1 min-w-0 space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-md border border-indigo-100">
                        <FaTag className="text-[10px]" />{" "}
                        {book.category || "General"}
                      </span>
                      <div className="flex items-center gap-1 text-amber-500 text-xs font-bold bg-amber-50 px-2.5 py-0.5 rounded-md border border-amber-200/60">
                        <FaStar className="text-[11px]" />
                        <span>{book.rating || "4.5"}</span>
                      </div>
                    </div>

                    <h3
                      className="font-extrabold text-slate-900 text-lg leading-snug line-clamp-2"
                      title={book.title}
                    >
                      {book.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-500 font-medium flex items-center gap-1.5">
                      <FaUserEdit className="text-indigo-500" />
                      <span className="truncate">
                        By {book.author || "Unknown Author"}
                      </span>
                    </p>
                  </div>
                </div>

                {/* Bottom Stock & Action Bar */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3 flex-wrap">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center text-sm flex-shrink-0">
                      <FaLayerGroup />
                    </div>
                    <div>
                      <span className="text-[11px] uppercase font-bold text-slate-400 block tracking-wider">
                        Available Stock
                      </span>
                      <span className="text-xs sm:text-sm font-black text-slate-800">
                        {copies} Copies
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setEditingBook(book)}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-50 hover:bg-indigo-50 text-slate-700 hover:text-indigo-600 border border-slate-200 hover:border-indigo-200 text-xs font-bold shadow-sm transition cursor-pointer"
                    >
                      <FaEdit className="text-xs" />
                      <span>Edit</span>
                    </button>

                    <button
                      onClick={() => setDeletingBook(book)}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 text-xs font-bold shadow-sm transition cursor-pointer"
                    >
                      <FaTrashAlt className="text-xs" />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Edit Book Modal */}
      {editingBook && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-200 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-100 space-y-5 relative my-8">
            <button
              onClick={() => setEditingBook(null)}
              className="absolute right-5 top-5 text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
            >
              <FaTimes className="text-lg" />
            </button>

            <div className="space-y-1">
              <h2 className="text-xl font-black text-slate-900">
                Update Book Information
              </h2>
              <p className="text-xs text-slate-500">
                Modify catalog details for{" "}
                <span className="font-bold text-slate-700">
                  {editingBook.title}
                </span>
                .
              </p>
            </div>

            <form onSubmit={handleUpdateBook} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Book Title
                </label>
                <input
                  type="text"
                  required
                  value={editingBook.title}
                  onChange={(e) =>
                    setEditingBook({ ...editingBook, title: e.target.value })
                  }
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Author
                  </label>
                  <input
                    type="text"
                    required
                    value={editingBook.author}
                    onChange={(e) =>
                      setEditingBook({ ...editingBook, author: e.target.value })
                    }
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Total Copies
                  </label>
                  <input
                    type="number"
                    min="1"
                    required
                    value={editingBook.totalCopies}
                    onChange={(e) =>
                      setEditingBook({
                        ...editingBook,
                        totalCopies: e.target.value,
                      })
                    }
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Category
                  </label>
                  <select
                    value={editingBook.category}
                    onChange={(e) =>
                      setEditingBook({
                        ...editingBook,
                        category: e.target.value,
                      })
                    }
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition cursor-pointer"
                  >
                    {CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Rating
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    min="1"
                    max="5"
                    required
                    value={editingBook.rating}
                    onChange={(e) =>
                      setEditingBook({ ...editingBook, rating: e.target.value })
                    }
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Cover Image URL
                </label>
                <input
                  type="url"
                  value={editingBook.image || ""}
                  onChange={(e) =>
                    setEditingBook({ ...editingBook, image: e.target.value })
                  }
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Description
                </label>
                <textarea
                  rows={3}
                  value={editingBook.description || ""}
                  onChange={(e) =>
                    setEditingBook({
                      ...editingBook,
                      description: e.target.value,
                    })
                  }
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setEditingBook(null)}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm font-semibold text-slate-600 hover:bg-slate-50 transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={updating}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs sm:text-sm font-bold shadow-md transition disabled:opacity-50 cursor-pointer"
                >
                  <FaCheckCircle className="text-xs" />
                  <span>{updating ? "Updating..." : "Save Changes"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Custom Delete Confirmation Modal */}
      {deletingBook && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-slate-100 text-center relative">
            <button
              onClick={() => setDeletingBook(null)}
              className="absolute right-4 top-4 text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
            >
              <FaTimes className="text-base" />
            </button>

            <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center text-xl mx-auto mb-3">
              <FaExclamationTriangle />
            </div>

            <h3 className="text-lg font-black text-slate-900 mb-1">
              Delete This Book?
            </h3>
            <p className="text-xs text-slate-500 mb-6 px-2">
              Are you sure you want to permanently remove{" "}
              <span className="font-bold text-slate-800">
                "{deletingBook.title}"
              </span>{" "}
              from the library collection? This action cannot be undone.
            </p>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setDeletingBook(null)}
                className="flex-1 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmDelete}
                disabled={deleting}
                className="flex-1 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow-md transition disabled:opacity-50 cursor-pointer"
              >
                {deleting ? "Deleting..." : "Yes, Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
