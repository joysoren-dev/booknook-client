"use client";

import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import {
  FaBookOpen,
  FaArrowRight,
  FaCompass,
  FaFeatherAlt,
} from "react-icons/fa";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

export default function HeroBanner() {
  const slides = [
    {
      badge: "Curated Catalog",
      icon: <FaBookOpen className="text-xs" />,
      title: "Discover, Borrow & Share Your Favorite Books",
      desc: "Access thousands of titles across literature, science, history, and arts. Your modern neighborhood library is just a click away.",
      image:
        "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=1920&q=80",
      badgeClass: "text-indigo-300 border-indigo-400/30 bg-indigo-500/20",
      btnClass: "bg-indigo-600 hover:bg-indigo-500 shadow-indigo-600/30",
    },
    {
      badge: "Endless Knowledge",
      icon: <FaCompass className="text-xs" />,
      title: "Expand Your Horizon With Science & Tech Archives",
      desc: "Deep-dive into computing, physics, philosophy, and cutting-edge research guides. Track and borrow titles seamlessly.",
      // Rock-solid aesthetic dark library shelves image
      image:
        "https://images.unsplash.com/photo-1568667256549-094345857637?auto=format&fit=crop&w=1920&q=80",
      badgeClass: "text-sky-300 border-sky-400/30 bg-sky-500/20",
      btnClass: "bg-sky-600 hover:bg-sky-500 shadow-sky-600/30",
    },
    {
      badge: "Community Circle",
      icon: <FaFeatherAlt className="text-xs" />,
      title: "Contribute Books & Connect With Passionate Readers",
      desc: "Join a thriving community of book lovers. Share your personal collection, read genuine reviews, and manage your returns smoothly.",
      image:
        "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=1920&q=80",
      badgeClass: "text-purple-300 border-purple-400/30 bg-purple-500/20",
      btnClass: "bg-purple-600 hover:bg-purple-500 shadow-purple-600/30",
    },
  ];

  return (
    <div className="relative w-full overflow-hidden bg-slate-950 text-white">
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        speed={800}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
          bulletActiveClass:
            "swiper-pagination-bullet-active !bg-indigo-500 !w-8",
        }}
        navigation={true}
        loop={true}
        className="w-full min-h-[500px] sm:min-h-[560px]"
      >
        {slides.map((slide, idx) => (
          <SwiperSlide key={idx}>
            <div className="relative w-full min-h-[500px] sm:min-h-[560px] flex items-center justify-center px-6 py-24 overflow-hidden">
              {/* Reliable Background Image with Smooth Scaling */}
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 scale-105"
                style={{ backgroundImage: `url(${slide.image})` }}
              />
              <div className="absolute inset-0 bg-slate-950/70 backdrop-blur-[1px]" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent pointer-events-none" />

              {/* Slide Content */}
              <div className="max-w-3xl mx-auto text-center relative z-10 space-y-6">
                <span
                  className={`inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold tracking-wider uppercase border backdrop-blur-md ${slide.badgeClass}`}
                >
                  {slide.icon} {slide.badge}
                </span>

                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight sm:leading-tight text-white drop-shadow-md">
                  {slide.title}
                </h1>

                <p className="text-sm sm:text-base text-slate-200 max-w-2xl mx-auto font-normal leading-relaxed drop-shadow-sm">
                  {slide.desc}
                </p>

                <div className="pt-2">
                  <Link
                    href="/books"
                    className={`inline-flex items-center gap-2.5 px-8 py-3.5 rounded-xl ${slide.btnClass} text-white text-sm font-bold shadow-lg transition-all duration-200 hover:-translate-y-0.5`}
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
