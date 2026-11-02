import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TokenSync from "@/components/TokenSync";
import { Toaster } from "react-hot-toast";

export const metadata = {
  title: "BookNook | A Modern Online Library",
  description:
    "Borrow, explore, and share books across diverse genres effortlessly.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-slate-50 text-slate-900 antialiased">
        <TokenSync />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
