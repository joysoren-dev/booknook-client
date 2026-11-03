"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import api from "@/lib/axios";
import {
  FaBookOpen,
  FaSearch,
  FaStar,
  FaTag,
  FaArrowRight,
  FaFilter,
} from "react-icons/fa";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&q=80";

export default function BooksCatalogPage() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [filterAvailable, setFilterAvailable] = useState(false);

  useEffect(() => {
    document.title = "BookNook | All Books";
    const fetchBooks = async () => {
      try {
        setLoading(true);
        const res = await api.get("/books");
        setBooks(res.data || []);
      } catch (err) {
        console.error("Failed to load books:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  const categories = [
    "All",
    ...new Set(books.map((b) => b.category).filter(Boolean)),
  ];

  // Filtering Logic
  const filteredBooks = books.filter((book) => {
    const matchesSearch =
      book.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || book.category === selectedCategory;
    const copies = Number(
      book.totalCopies ?? book.copies ?? book.quantity ?? 0,
    );
    const matchesAvailability = filterAvailable ? copies > 0 : true;

    return matchesSearch && matchesCategory && matchesAvailability;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 min-h-[calc(100vh-320px)]">
      {/* Header */}
      <div className="mb-8">
        <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100">
          Entire Collection
        </span>
        <h1 className="text-2xl sm:text-4xl font-black text-slate-900 mt-2">
          All Books
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Browse through our complete catalog, filter by genres, and check
          real-time availability.
        </p>
      </div>

      {/* Search & Filter Toolbar */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/90 shadow-sm mb-10 flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-80">
          <FaSearch className="absolute left-3.5 top-3.5 text-slate-400 text-xs" />
          <input
            type="text"
            placeholder="Search by title or author..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          <div className="relative flex-1 sm:flex-initial">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full sm:w-auto px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition cursor-pointer"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat === "All" ? "All Categories" : cat}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={() => setFilterAvailable(!filterAvailable)}
            className={`px-4 py-2.5 rounded-xl border text-xs sm:text-sm font-bold transition flex items-center gap-2 cursor-pointer ${
              filterAvailable
                ? "bg-indigo-600 text-white border-indigo-600 shadow-sm"
                : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"
            }`}
          >
            <FaFilter className="text-[10px]" />
            <span>Available Only</span>
          </button>
        </div>
      </div>

      {/* Catalog Grid (3 cards per row on desktop as requested) */}
      {loading ? (
        <div className="min-h-[40vh] flex flex-col items-center justify-center gap-3">
          <div className="w-10 h-10 rounded-full border-2 border-indigo-600 border-t-transparent animate-spin" />
          <p className="text-xs sm:text-sm text-slate-500 font-medium">
            Loading library books...
          </p>
        </div>
      ) : filteredBooks.length === 0 ? (
        <div className="bg-white rounded-3xl border border-slate-200/80 p-10 text-center max-w-md mx-auto shadow-sm my-8">
          <FaBookOpen className="text-4xl text-slate-300 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-slate-800">No Books Found</h3>
          <p className="text-xs text-slate-500 mt-1">
            Try adjusting your search query or filter options.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBooks.map((book) => {
            const copies = Number(
              book.totalCopies ?? book.copies ?? book.quantity ?? 0,
            );
            const isOut = copies <= 0;

            return (
              <div
                key={book._id}
                className="bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-md transition overflow-hidden flex flex-col justify-between group"
              >
                <div>
                  <div className="relative aspect-[3/4] w-full bg-slate-100 overflow-hidden border-b border-slate-100">
                    <img
                      src={
                        book.image && book.image.trim() !== ""
                          ? book.image
                          : FALLBACK_IMAGE
                      }
                      alt={book.title || "Book Cover"}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = FALLBACK_IMAGE;
                      }}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                    />
                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md px-2 py-0.5 rounded-md text-[11px] font-bold text-amber-600 flex items-center gap-1 shadow-sm">
                      <FaStar className="text-amber-400 text-[10px]" />
                      <span>
                        {book.rating ? Number(book.rating).toFixed(1) : "4.5"}
                      </span>
                    </div>
                  </div>

                  <div className="p-5 space-y-2">
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-md">
                      <FaTag className="text-[8px]" />{" "}
                      {book.category || "General"}
                    </span>
                    <h3
                      className="font-black text-slate-900 text-lg leading-snug line-clamp-1"
                      title={book.title}
                    >
                      {book.title}
                    </h3>
                    <p className="text-xs text-slate-500 font-medium truncate">
                      By {book.author || "Unknown Author"}
                    </p>
                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                      {book.description ||
                        "Explore an enriching literary journey filled with captivating insights and engaging perspectives."}
                    </p>
                  </div>
                </div>

                <div className="p-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span
                    className={`font-bold text-xs px-2.5 py-1 rounded-md ${
                      isOut
                        ? "bg-rose-50 text-rose-600"
                        : "bg-emerald-50 text-emerald-700"
                    }`}
                  >
                    {isOut ? "Out of Stock" : `${copies} Available`}
                  </span>

                  <Link
                    href={`/books/${book._id}`}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-50 text-indigo-700 hover:bg-indigo-600 hover:text-white text-xs font-bold transition"
                  >
                    <span>View Details</span>
                    <FaArrowRight className="text-[9px]" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
