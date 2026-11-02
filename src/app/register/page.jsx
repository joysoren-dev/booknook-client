"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signUp, signIn } from "@/lib/auth-client";
import toast from "react-hot-toast";
import {
  FaBookOpen,
  FaUser,
  FaEnvelope,
  FaImage,
  FaLock,
} from "react-icons/fa";

export default function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    image: "",
    password: "",
  });
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errorMsg) setErrorMsg("");
  };

  const validatePassword = (pass) => {
    if (pass.length < 6) {
      return "Password must be at least 6 characters long.";
    }
    if (!/[A-Z]/.test(pass)) {
      return "Password must contain at least one uppercase letter.";
    }
    if (!/[a-z]/.test(pass)) {
      return "Password must contain at least one lowercase letter.";
    }
    return null;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const passError = validatePassword(formData.password);
    if (passError) {
      setErrorMsg(passError);
      toast.error(passError);
      return;
    }

    setLoading(true);
    try {
      const fallbackAvatar =
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&q=80";
      const userImage =
        formData.image && formData.image.trim() !== ""
          ? formData.image.trim()
          : fallbackAvatar;

      const res = await signUp.email({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        image: userImage,
      });

      if (res.error) {
        setErrorMsg(res.error.message || "Registration failed.");
        toast.error(res.error.message || "Registration failed.");
      } else {
        toast.success("Registration successful! Please log in.");
        router.push("/login");
      }
    } catch (err) {
      setErrorMsg(err.message || "Something went wrong.");
      toast.error(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signIn.social({
        provider: "google",
        callbackURL: "/",
      });
    } catch (err) {
      toast.error("Google Sign-In failed.");
    }
  };

  return (
    <div className="min-h-[calc(100vh-140px)] flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/80 shadow-lg space-y-6">
        <div className="text-center space-y-1">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 mb-2">
            <FaBookOpen className="text-2xl" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Create an Account
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Join BookNook to borrow and share your favorite reads.
          </p>
        </div>

        {errorMsg && (
          <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs sm:text-sm rounded-xl">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleRegister} className="space-y-4" noValidate>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Full Name
            </label>
            <div className="relative">
              <FaUser className="absolute left-3.5 top-3.5 text-slate-400 text-sm" />
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="John Doe"
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Email Address
            </label>
            <div className="relative">
              <FaEnvelope className="absolute left-3.5 top-3.5 text-slate-400 text-sm" />
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition"
              />
            </div>
          </div>

          {/* Photo URL: Completely Optional */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-xs font-semibold text-slate-700">
                Photo URL
              </label>
              <span className="text-[11px] text-slate-400 font-normal">
                Optional
              </span>
            </div>
            <div className="relative">
              <FaImage className="absolute left-3.5 top-3.5 text-slate-400 text-sm" />
              <input
                type="text"
                name="image"
                value={formData.image}
                onChange={handleChange}
                placeholder="https://example.com/avatar.jpg (Optional)"
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Password
            </label>
            <div className="relative">
              <FaLock className="absolute left-3.5 top-3.5 text-slate-400 text-sm" />
              <input
                type="password"
                name="password"
                required
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition"
              />
            </div>
            <p className="text-[11px] text-slate-400 mt-1">
              Must be 6+ chars with uppercase & lowercase letter.
            </p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl text-sm shadow-md transition disabled:opacity-50"
          >
            {loading ? "Creating Account..." : "Register"}
          </button>
        </form>

        <div className="relative flex items-center justify-center">
          <div className="border-t border-slate-200 w-full" />
          <span className="bg-white px-3 text-xs text-slate-400 uppercase tracking-wider">
            Or
          </span>
          <div className="border-t border-slate-200 w-full" />
        </div>

        {/* Official 4-color Google Icon Button */}
        <button
          type="button"
          onClick={handleGoogleSignIn}
          className="w-full py-2.5 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-semibold rounded-xl text-sm flex items-center justify-center gap-3 transition shadow-sm"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
            />
          </svg>
          <span>Continue with Google</span>
        </button>

        <p className="text-center text-xs text-slate-500">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-indigo-600 font-semibold hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
