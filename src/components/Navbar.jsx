"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "@/lib/auth-client";
import toast from "react-hot-toast";
import {
  FaBookOpen,
  FaSignOutAlt,
  FaBars,
  FaTimes,
  FaUser,
} from "react-icons/fa";
import { useState } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const { data: session, isPending } = useSession();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [imgError, setImgError] = useState(false);

  const handleLogout = async () => {
    try {
      await signOut();
      toast.success("Logged out successfully!");
      setProfileDropdownOpen(false);
      setMobileMenuOpen(false);
      setTimeout(() => {
        window.location.href = "/login";
      }, 600);
    } catch (error) {
      toast.error("Failed to log out");
    }
  };

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "All Books", href: "/books" },
    ...(session
      ? [
        { name: "Add Book", href: "/add-book" },
        { name: "My Books", href: "/my-books" },
        { name: "My Borrows", href: "/my-borrows" },
      ]
      : []),
  ];

  return (
    /* 1. Updated Navbar Background with a richer modern glassmorphism look */
    <header className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">

        {/* 2. Made Brand Logo Larger & More Prominent */}
        <Link
          href="/"
          className="flex items-center gap-3 text-2xl sm:text-3xl font-black text-white tracking-tight group"
        >
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-indigo-500 to-amber-500 flex items-center justify-center text-white shadow-lg group-hover:scale-105 transition-transform">
            <FaBookOpen className="text-xl" />
          </div>
          <span className="bg-gradient-to-r from-white via-slate-200 to-indigo-400 bg-clip-text text-transparent">
            BookNook
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors ${isActive
                  ? "text-indigo-400 font-semibold"
                  : "text-slate-300 hover:text-indigo-400"
                  }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Desktop Auth State */}
        <div className="hidden md:flex items-center gap-4">
          {isPending ? (
            <div className="w-8 h-8 rounded-full border-2 border-indigo-500 border-t-transparent animate-spin" />
          ) : session ? (
            <div className="relative">
              <button
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                className="flex items-center gap-2 focus:outline-none p-1 rounded-full hover:ring-2 hover:ring-indigo-400 transition cursor-pointer"
              >
                {session.user?.image && !imgError ? (
                  <img
                    src={session.user.image}
                    alt={session.user.name || "User Avatar"}
                    referrerPolicy="no-referrer"
                    onError={() => setImgError(true)}
                    className="w-10 h-10 rounded-full object-cover ring-2 ring-indigo-500 shadow-md"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-sm ring-2 ring-indigo-400 shadow-md">
                    {session.user?.name
                      ? session.user.name.charAt(0).toUpperCase()
                      : "U"}
                  </div>
                )}
              </button>

              {profileDropdownOpen && (
                <div className="absolute right-0 mt-2 w-52 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl py-2 z-50">
                  <div className="px-4 py-2.5 border-b border-slate-800">
                    <p className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">
                      Signed in as
                    </p>
                    <p className="text-sm font-bold text-slate-200 truncate mt-0.5">
                      {session.user?.name || "Reader"}
                    </p>
                    <p className="text-xs text-slate-400 truncate">
                      {session.user?.email}
                    </p>
                  </div>

                  <Link
                    href="/profile"
                    onClick={() => setProfileDropdownOpen(false)}
                    className="flex items-center gap-2.5 px-4 py-2.5 text-xs sm:text-sm font-medium text-slate-300 hover:bg-indigo-600/20 hover:text-indigo-400 transition"
                  >
                    <FaUser className="text-xs text-slate-400" />
                    <span>My Profile</span>
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="w-full text-left flex items-center gap-2.5 px-4 py-2.5 text-xs sm:text-sm font-medium text-red-400 hover:bg-red-500/10 transition cursor-pointer"
                  >
                    <FaSignOutAlt className="text-xs" />
                    <span>Logout</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link
                href="/login"
                className="text-sm font-medium text-slate-300 hover:text-white px-3 py-1.5 transition"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium px-4 py-2 rounded-xl shadow-lg shadow-indigo-600/30 transition"
              >
                Register
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-slate-300 hover:text-white p-2 cursor-pointer text-xl"
          >
            {mobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-800 bg-slate-950 px-4 pt-3 pb-5 space-y-3 shadow-xl">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block text-base font-medium py-1.5 text-slate-300 hover:text-indigo-400"
            >
              {link.name}
            </Link>
          ))}
          <div className="pt-3 border-t border-slate-800">
            {session ? (
              <div className="space-y-2">
                <p className="text-sm font-bold text-slate-200">
                  {session.user?.name}
                </p>
                <Link
                  href="/profile"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-sm text-indigo-400 font-medium"
                >
                  My Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-sm text-red-400 flex items-center gap-1.5 cursor-pointer pt-1"
                >
                  <FaSignOutAlt /> Logout
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-2 pt-1">
                <Link
                  href="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-2.5 border border-slate-700 rounded-xl text-sm font-medium text-slate-300 hover:bg-slate-900"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-medium shadow-lg shadow-indigo-600/30"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}