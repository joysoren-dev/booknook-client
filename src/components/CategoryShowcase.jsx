import Link from "next/link";
import {
  FaAtom,
  FaScroll,
  FaTheaterMasks,
  FaBrain,
  FaChild,
  FaLightbulb,
} from "react-icons/fa";

export default function CategoryShowcase() {
  const categories = [
    {
      name: "Fiction & Literature",
      slug: "Fiction",
      description:
        "Engaging tales, timeless prose, and classic stories that inspire.",
      icon: <FaTheaterMasks className="text-3xl text-indigo-500" />,
      count: "42 Titles",
      bgGradient: "from-indigo-50 to-indigo-100/50",
    },
    {
      name: "Science & Technology",
      slug: "Science",
      description:
        "Explore the cosmos, computer systems, and natural phenomena.",
      icon: <FaAtom className="text-3xl text-cyan-500" />,
      count: "38 Titles",
      bgGradient: "from-cyan-50 to-cyan-100/50",
    },
    {
      name: "History & Civilization",
      slug: "History",
      description:
        "Chronicles of ancient eras, revolutions, and world leaders.",
      icon: <FaScroll className="text-3xl text-amber-500" />,
      count: "29 Titles",
      bgGradient: "from-amber-50 to-amber-100/50",
    },
    {
      name: "Thriller & Mystery",
      slug: "Thriller",
      description:
        "Page-turning suspense, psychological depth, and detective arcs.",
      icon: <FaBrain className="text-3xl text-rose-500" />,
      count: "31 Titles",
      bgGradient: "from-rose-50 to-rose-100/50",
    },
    {
      name: "Kids & Young Readers",
      slug: "Kids",
      description:
        "Illustrated adventures, bedtime folk tales, and early learning.",
      icon: <FaChild className="text-3xl text-emerald-500" />,
      count: "24 Titles",
      bgGradient: "from-emerald-50 to-emerald-100/50",
    },
    {
      name: "Self-Help & Growth",
      slug: "Self-Help",
      description:
        "Mindset building, productivity habits, and career resilience.",
      icon: <FaLightbulb className="text-3xl text-purple-500" />,
      count: "35 Titles",
      bgGradient: "from-purple-50 to-purple-100/50",
    },
  ];

  return (
    <section className="bg-slate-100/60 py-16 border-y border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100">
            Curated Genres
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">
            Browse by Popular Category
          </h2>
          <p className="text-sm text-slate-500 mt-2">
            Select a genre to filter our comprehensive library archive and find
            your next read.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/books?category=${cat.slug}`}
              className="group relative bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-xl hover:border-indigo-200 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div
                  className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${cat.bgGradient} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}
                >
                  {cat.icon}
                </div>
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                  {cat.name}
                </h3>
                <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                  {cat.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-600">
                  {cat.count}
                </span>
                <span className="text-indigo-600 font-bold group-hover:translate-x-1 transition-transform">
                  Explore &rarr;
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
