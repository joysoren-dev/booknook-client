import {
  FaBookOpen,
  FaUsers,
  FaUndoAlt,
  FaShieldAlt,
  FaQuoteLeft,
  FaStar,
} from "react-icons/fa";

export default function HomeExtras() {
  const stats = [
    {
      label: "Books Available",
      value: "12,500+",
      icon: <FaBookOpen className="text-indigo-600 text-2xl" />,
    },
    {
      label: "Active Readers",
      value: "8,200+",
      icon: <FaUsers className="text-indigo-600 text-2xl" />,
    },
    {
      label: "Seamless Returns",
      value: "99.4%",
      icon: <FaUndoAlt className="text-indigo-600 text-2xl" />,
    },
    {
      label: "Verified Authors",
      value: "1,400+",
      icon: <FaShieldAlt className="text-indigo-600 text-2xl" />,
    },
  ];

  const testimonials = [
    {
      name: "Sarah Jenkins",
      role: "Literature Student",
      comment:
        "BookNook has completely transformed how I source research materials and leisure fiction. Borrowing takes just two clicks!",
      rating: 5,
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&q=80",
    },
    {
      name: "Arif Chowdhury",
      role: "Tech Enthusiast",
      comment:
        "The science and computing catalog is top-notch. Real-time availability badges save me from requesting out-of-stock titles.",
      rating: 5,
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80",
    },
    {
      name: "Elena Rostova",
      role: "Book Club Host",
      comment:
        "Managing our monthly reading circle has never been easier. Returning and tracking borrowed books is super seamless.",
      rating: 5,
      avatar:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&q=80",
    },
  ];

  return (
    <div className="space-y-20 py-16">
      {/* Extra Section 1: Library Stats */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-indigo-900 via-indigo-950 to-slate-900 rounded-3xl p-8 sm:p-12 text-white shadow-xl relative overflow-hidden">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-400 bg-indigo-500/20 px-3 py-1 rounded-full border border-indigo-400/30">
              Our Milestones
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold mt-3">
              Trusted by Passionate Readers Worldwide
            </h2>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, idx) => (
              <div
                key={idx}
                className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center backdrop-blur-sm hover:bg-white/10 transition-colors"
              >
                <div className="w-12 h-12 mx-auto rounded-xl bg-white flex items-center justify-center mb-4 shadow-sm">
                  {stat.icon}
                </div>
                <div className="text-2xl sm:text-3xl font-extrabold text-white">
                  {stat.value}
                </div>
                <div className="text-xs text-indigo-200 mt-1 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Extra Section 2: Reader Reviews */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100">
            Community Voices
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">
            What Our Readers Say
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm flex flex-col justify-between"
            >
              <div>
                <FaQuoteLeft className="text-indigo-200 text-2xl mb-4" />
                <p className="text-sm text-slate-600 leading-relaxed italic">
                  &ldquo;{t.comment}&rdquo;
                </p>
              </div>

              <div className="mt-6 pt-5 border-t border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="w-10 h-10 rounded-full object-cover ring-2 ring-indigo-500/20"
                  />
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">
                      {t.name}
                    </h4>
                    <p className="text-xs text-slate-400">{t.role}</p>
                  </div>
                </div>

                <div className="flex items-center text-amber-400 text-xs">
                  {[...Array(t.rating)].map((_, i) => (
                    <FaStar key={i} />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
