import Link from "next/link";
import { FaBookReader, FaSearch } from "react-icons/fa";

export default function HeroBanner() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-indigo-900 via-indigo-800 to-slate-900 text-white py-20 lg:py-28">
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 mb-6">
          <FaBookReader /> Expand Your Horizons
        </span>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight max-w-3xl leading-tight">
          Discover, Borrow & Share Your Favorite Books
        </h1>

        <p className="mt-6 text-lg sm:text-xl text-indigo-200 max-w-2xl leading-relaxed">
          Access a vast library of science, history, fiction, and kids titles.
          Manage your reading journey seamlessly with BookNook.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link
            href="/books"
            className="flex items-center gap-2 bg-indigo-500 hover:bg-indigo-600 text-white font-medium px-6 py-3 rounded-lg shadow-lg hover:shadow-indigo-500/30 transition transform hover:-translate-y-0.5"
          >
            <FaSearch />
            <span>Explore Library</span>
          </Link>
          <Link
            href="/add-book"
            className="bg-white/10 hover:bg-white/20 text-white border border-white/20 font-medium px-6 py-3 rounded-lg backdrop-blur-sm transition"
          >
            Contribute a Book
          </Link>
        </div>
      </div>
    </section>
  );
}
