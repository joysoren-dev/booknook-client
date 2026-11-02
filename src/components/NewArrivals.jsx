"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import api from "@/lib/axios";
import BookCard from "./BookCard";
import { FaArrowRight, FaBookOpen } from "react-icons/fa";

export default function NewArrivals() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNewArrivals = async () => {
      try {
        const res = await api.get("/books");
        // Requirements: Load latest 6 books
        setBooks(res.data.slice(0, 6));
      } catch (err) {
        console.error("Failed to fetch new arrivals:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchNewArrivals();
  }, []);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100">
          <FaBookOpen className="text-xs" /> Fresh Catalog
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">
          New Arrivals
        </h2>
        <p className="text-sm text-slate-500 mt-2">
          Discover the newest additions to our library shelves, available for
          borrowing today.
        </p>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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

      {/* Requirement: "See All Books" button below cards */}
      <div className="mt-12 text-center">
        <Link
          href="/books"
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold shadow-md shadow-indigo-100 transition-all duration-200 hover:-translate-y-0.5"
        >
          <span>See All Books</span>
          <FaArrowRight className="text-xs" />
        </Link>
      </div>
    </section>
  );
}
