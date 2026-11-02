"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import api from "@/lib/axios";
import BookCard from "./BookCard";
import { FaArrowRight, FaFire } from "react-icons/fa";

export default function FeaturedBooks() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const res = await api.get("/books");
        // প্রথম ৪টি বই ফিচার্ড হিসেবে প্রদর্শনের জন্য
        setBooks(res.data.slice(0, 4));
      } catch (err) {
        console.error("Failed to fetch featured books:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchFeatured();
  }, []);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
        <div>
          <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100">
            <FaFire className="text-amber-500" /> Reader Favorites
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">
            Featured Collections
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Hand-picked selections trending across our reading community this
            week.
          </p>
        </div>
        <Link
          href="/books"
          className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-600 hover:text-indigo-700 transition group"
        >
          <span>Explore All Titles</span>
          <FaArrowRight className="text-xs group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="bg-white rounded-2xl border border-slate-200/80 p-4 h-[380px] animate-pulse flex flex-col justify-between"
            >
              <div className="bg-slate-200 aspect-[3/4] rounded-xl w-full" />
              <div className="space-y-2 mt-4">
                <div className="bg-slate-200 h-4 rounded w-3/4" />
                <div className="bg-slate-200 h-3 rounded w-1/2" />
              </div>
              <div className="bg-slate-200 h-9 rounded-xl w-full mt-4" />
            </div>
          ))}
        </div>
      ) : books.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {books.map((book) => (
            <BookCard key={book._id} book={book} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-white rounded-2xl border border-slate-200/60 p-8 text-slate-500 text-sm">
          No books found in the database. Ensure your server is running on port
          5000.
        </div>
      )}
    </section>
  );
}
