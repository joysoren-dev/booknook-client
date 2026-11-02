"use client";

import Link from "next/link";
import { FaStar, FaBookOpen } from "react-icons/fa";
import { useState } from "react";

export default function BookCard({ book }) {
  const { _id, title, author, category, rating, image, quantity } = book;
  const [imgSrc, setImgSrc] = useState(
    image ||
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500&q=80",
  );

  return (
    <div className="group relative flex flex-col bg-white rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-xl hover:border-indigo-100 transition-all duration-300 overflow-hidden">
      {/* Book Cover Image with Fallback */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-slate-100">
        <img
          src={imgSrc}
          alt={title || "Book Cover"}
          onError={() =>
            setImgSrc(
              "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500&q=80",
            )
          }
          className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
        />

        {/* Category Badge Pill */}
        <span className="absolute top-3 right-3 rounded-full bg-white/90 backdrop-blur-md px-3 py-1 text-xs font-semibold text-indigo-600 shadow-sm">
          {category}
        </span>
      </div>

      {/* Book Metadata */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-base font-bold text-slate-900 group-hover:text-indigo-600 transition-colors line-clamp-1">
            {title}
          </h3>
          <p className="mt-1 text-xs text-slate-500 font-medium">by {author}</p>

          <div className="mt-3 flex items-center justify-between">
            {/* Star Rating */}
            <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-500">
              <FaStar className="text-amber-400" />
              <span>{rating ? Number(rating).toFixed(1) : "4.5"}</span>
            </div>

            {/* Availability Stock Pill */}
            <span
              className={`rounded-full px-2.5 py-0.5 text-[11px] font-medium ${
                Number(quantity) > 0
                  ? "bg-emerald-50 text-emerald-700 border border-emerald-200/60"
                  : "bg-rose-50 text-rose-700 border border-rose-200/60"
              }`}
            >
              {Number(quantity) > 0
                ? `${quantity} Copies Left`
                : "Out of Stock"}
            </span>
          </div>
        </div>

        {/* Action Link Button */}
        <div className="mt-5 pt-3 border-t border-slate-100">
          <Link
            href={`/books/${_id}`}
            className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-slate-50 hover:bg-indigo-600 text-slate-700 hover:text-white text-xs font-semibold tracking-wide transition-all duration-200 shadow-sm"
          >
            <FaBookOpen className="text-xs" />
            <span>View Details</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
