import Link from "next/link";
import {
  FaBookOpen,
  FaGithub,
  FaTwitter,
  FaLinkedin,
  FaHeart,
} from "react-icons/fa";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300 mt-auto border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Info */}
          <div className="space-y-4 md:col-span-1">
            <Link
              href="/"
              className="flex items-center gap-2 text-xl font-bold text-white"
            >
              <FaBookOpen className="text-2xl text-indigo-400" />
              <span>BookNook</span>
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed">
              Your gateway to knowledge. Borrow, explore, and share books across
              diverse genres effortlessly.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white text-sm font-semibold uppercase tracking-wider mb-4">
              Explore
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/"
                  className="hover:text-indigo-400 transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/books"
                  className="hover:text-indigo-400 transition-colors"
                >
                  All Books
                </Link>
              </li>
              <li>
                <Link
                  href="/books?category=Science"
                  className="hover:text-indigo-400 transition-colors"
                >
                  Science Books
                </Link>
              </li>
              <li>
                <Link
                  href="/books?category=Fiction"
                  className="hover:text-indigo-400 transition-colors"
                >
                  Fiction Collection
                </Link>
              </li>
            </ul>
          </div>

          {/* User Links */}
          <div>
            <h3 className="text-white text-sm font-semibold uppercase tracking-wider mb-4">
              Member Area
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/add-book"
                  className="hover:text-indigo-400 transition-colors"
                >
                  Add a Book
                </Link>
              </li>
              <li>
                <Link
                  href="/borrowed-books"
                  className="hover:text-indigo-400 transition-colors"
                >
                  Borrowed List
                </Link>
              </li>
              <li>
                <a
                  href="#about"
                  className="hover:text-indigo-400 transition-colors"
                >
                  About Library
                </a>
              </li>
            </ul>
          </div>

          {/* Social & Contact */}
          <div>
            <h3 className="text-white text-sm font-semibold uppercase tracking-wider mb-4">
              Connect With Us
            </h3>
            <p className="text-sm text-gray-400 mb-4">
              Follow our community updates and open library initiatives.
            </p>
            <div className="flex items-center gap-4 text-xl">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-indigo-400 transition-colors"
                aria-label="GitHub"
              >
                <FaGithub />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-indigo-400 transition-colors"
                aria-label="Twitter"
              >
                <FaTwitter />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-indigo-400 transition-colors"
                aria-label="LinkedIn"
              >
                <FaLinkedin />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-4">
          <p>
            &copy; {currentYear} BookNook Online Library. All rights reserved.
          </p>
          <p className="flex items-center gap-1">
            Built with <FaHeart className="text-red-500 text-xs" /> using
            Next.js & Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
}
