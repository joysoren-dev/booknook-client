import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from "react-hot-toast";
import TokenSync from "@/components/TokenSync";

export const metadata = {
  title: "BookNook | Online Library",
  description: "Discover, borrow, and share your favorite books seamlessly.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-slate-50 text-slate-800 antialiased">
        <Toaster position="top-right" reverseOrder={false} />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <TokenSync />
        <Navbar />
        {children}
        <Footer />
        <Toaster position="top-right" />
      </body>
    </html>
  );
}