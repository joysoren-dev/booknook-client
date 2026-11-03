"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";
import api from "@/lib/axios";
import toast from "react-hot-toast";
import {
  FaBook,
  FaUserEdit,
  FaImage,
  FaStar,
  FaLayerGroup,
  FaTags,
  FaPlusCircle,
  FaAlignLeft,
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

export default function AddBookPage() {
  const router = useRouter();
  const { data: session, isPending: authPending } = useSession();

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    category: "Fiction",
    totalCopies: 5,
    rating: 4.5,
    image: "",
    description: "",
  });

  // Private route check
  useEffect(() => {
    if (!authPending && !session) {
      router.push("/login?callbackUrl=/add-book");
    }
  }, [session, authPending, router]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.author) {
      toast.error("Book title and author are required.");
      return;
    }

    setLoading(true);
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

      const payload = {
        ...formData,
        totalCopies: parseInt(formData.totalCopies, 10) || 1,
        rating: parseFloat(formData.rating) || 4.5,
        userEmail: session?.user?.email,
        userName: session?.user?.name,
      };

      const res = await api.post("/books", payload);
      if (res.status === 201 || res.status === 200) {
        toast.success(`"${formData.title}" added successfully!`);
        router.push("/books");
      }
    } catch (err) {
      const msg = err.response?.data?.message || "Failed to add book.";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  if (authPending) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="w-10 h-10 rounded-full border-2 border-indigo-600 border-t-transparent animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-10">
        {/* Header section with proper spacing */}
        <div className="mb-8 border-b border-slate-100 pb-5">
          <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100">
            Catalog Management
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mt-3">
            Add a New Book
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Fill in the details below to add a new book to the library
            collection.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Title */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Book Title <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <FaBook className="absolute left-3.5 top-3.5 text-slate-400 text-xs" />
                <input
                  type="text"
                  required
                  name="title"
                  placeholder="e.g. To Kill a Mockingbird"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full pl-9 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition"
                />
              </div>
            </div>

            {/* Author */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Author Name <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <FaUserEdit className="absolute left-3.5 top-3.5 text-slate-400 text-xs" />
                <input
                  type="text"
                  required
                  name="author"
                  placeholder="e.g. Harper Lee"
                  value={formData.author}
                  onChange={handleChange}
                  className="w-full pl-9 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition"
                />
              </div>
            </div>

            {/* Category */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Category / Genre
              </label>
              <div className="relative">
                <FaTags className="absolute left-3.5 top-3.5 text-slate-400 text-xs" />
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full pl-9 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition appearance-none cursor-pointer"
                >
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Total Copies */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Total Copies / Quantity
              </label>
              <div className="relative">
                <FaLayerGroup className="absolute left-3.5 top-3.5 text-slate-400 text-xs" />
                <input
                  type="number"
                  required
                  min="1"
                  max="1000"
                  name="totalCopies"
                  value={formData.totalCopies}
                  onChange={handleChange}
                  className="w-full pl-9 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition"
                />
              </div>
            </div>

            {/* Rating */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Rating (1.0 - 5.0)
              </label>
              <div className="relative">
                <FaStar className="absolute left-3.5 top-3.5 text-slate-400 text-xs" />
                <input
                  type="number"
                  step="0.1"
                  min="1"
                  max="5"
                  name="rating"
                  value={formData.rating}
                  onChange={handleChange}
                  className="w-full pl-9 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition"
                />
              </div>
            </div>

            {/* Cover Image URL */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Cover Image URL
              </label>
              <div className="relative">
                <FaImage className="absolute left-3.5 top-3.5 text-slate-400 text-xs" />
                <input
                  type="url"
                  name="image"
                  placeholder="https://images.unsplash.com/photo-..."
                  value={formData.image}
                  onChange={handleChange}
                  className="w-full pl-9 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition"
                />
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Book Description / Synopsis
            </label>
            <div className="relative">
              <FaAlignLeft className="absolute left-3.5 top-3.5 text-slate-400 text-xs" />
              <textarea
                rows={4}
                name="description"
                placeholder="Write a brief overview of this book..."
                value={formData.description}
                onChange={handleChange}
                className="w-full pl-9 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end pt-4 border-t border-slate-100">
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs sm:text-sm font-bold shadow-md transition disabled:opacity-50"
            >
              <FaPlusCircle className="text-xs" />
              <span>{loading ? "Adding Book..." : "Add Book"}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
