"use client";

import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation, EffectFade } from "swiper/modules";
import { FaBookOpen, FaArrowRight } from "react-icons/fa";

// Swiper core styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";

export default function HeroBanner() {
  const slides = [
    {
      badge: "Curated Catalog",
      title: "Discover, Borrow & Share Your Favorite Books",
      desc: "Access thousands of titles across literature, science, history, and arts. Your modern neighborhood library is just a click away.",
      bgGradient: "from-slate-950 via-indigo-950 to-slate-900",
      accentColor: "indigo",
    },
    {
      badge: "Limitless Learning",
      title: "Expand Your Mind With Science & Tech Archives",
      desc: "Deep-dive into computing, physics, philosophy, and cutting-edge research guides. Borrow and track your reading journey seamlessly.",
      bgGradient: "from-slate-950 via-sky-950 to-slate-900",
      accentColor: "sky",
    },
    {
      badge: "Community Circle",
      title: "Contribute Books & Connect With Passionate Readers",
      desc: "Join a thriving community of book lovers. Share your personal collection, read genuine reviews, and return books easily.",
      bgGradient: "from-slate-950 via-violet-950 to-slate-900",
      accentColor: "violet",
    },
  ];

  return (
    <div className="relative w-full overflow-hidden bg-slate-950 text-white">
      <Swiper
        modules={[Autoplay, Pagination, Navigation, EffectFade]}
        effect="fade"
        speed={800}
        autoplay={{
          delay: 4500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
          bulletActiveClass:
            "swiper-pagination-bullet-active !bg-indigo-500 !w-8",
        }}
        navigation={true}
        loop={true}
        className="w-full min-h-[460px] sm:min-h-[520px]"
      >
        {slides.map((slide, idx) => (
          <SwiperSlide key={idx}>
            <div
              className={`w-full min-h-[460px] sm:min-h-[520px] bg-gradient-to-br ${slide.bgGradient} flex items-center justify-center relative px-6 py-20`}
            >
              {/* Subtle background glow */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-500/10 via-transparent to-transparent pointer-events-none" />

              <div className="max-w-3xl mx-auto text-center relative z-10 space-y-6">
                <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-white/10 border border-white/20 text-indigo-300">
                  <FaBookOpen className="text-xs" /> {slide.badge}
                </span>

                <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight sm:leading-tight text-white drop-shadow-sm">
                  {slide.title}
                </h1>

                <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed">
                  {slide.desc}
                </p>

                {/* Requirement: "Browse Books" button that goes to the All Books page */}
                <div className="pt-2">
                  <Link
                    href="/books"
                    className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-bold shadow-lg shadow-indigo-600/30 transition-all hover:-translate-y-0.5"
                  >
                    <span>Browse Books</span>
                    <FaArrowRight className="text-xs" />
                  </Link>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
