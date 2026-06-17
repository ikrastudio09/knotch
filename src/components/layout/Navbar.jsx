"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import Link from "next/link";
import { ShoppingCart, Heart, User, ChevronDown } from "lucide-react";
import toast from "react-hot-toast";
import { useCart } from "@/context/CartContext";
import { useRouter, usePathname } from "next/navigation";
import { Nunito } from "next/font/google";

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-nunito",
});

export default function Header() {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const {
    cartCount,
    wishlistCount,
    fetchCounts,
    setCartCount,
    setWishlistCount,
  } = useCart();
  const router = useRouter();
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  // Navbar is only transparent on the home page before scrolling.
  // Every other page starts white so text/logo stay visible.
  const isTransparent = isHomePage && !isScrolled;

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch("/api/auth/me");
        setIsLoggedIn(res.ok);
        if (res.ok) fetchCounts();
      } catch {
        setIsLoggedIn(false);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, [fetchCounts]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = async () => {
    setIsProfileOpen(false);
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      setIsLoggedIn(false);
      toast.success("Logged out successfully");
      setCartCount(0);
      setWishlistCount(0);
      router.push("/Login");
    } catch (error) {
      console.error("Logout failed:", error);
      toast.error("Logout failed");
    }
  };

  const textColor = isTransparent ? "text-white" : "text-black";

  return (
    <header
      className={`${nunito.variable} font-sans fixed top-0 left-0 w-full py-4 px-6 z-50 transition-all duration-300 ${
        isTransparent ? "bg-transparent" : "bg-white shadow-md"
      } ${textColor}`}
      style={{ fontFamily: "var(--font-nunito)" }}
    >
      <div className="max-w-7xl mx-auto grid grid-cols-3 items-center">
        {/* Left - Nav links (desktop) */}
        <nav className="hidden md:flex items-center space-x-8 justify-start">
          <Link
            href="/products"
            className="text-sm uppercase tracking-wide font-semibold hover:opacity-70 transition-opacity"
          >
            Shop
          </Link>
          <Link
            href="/products/type/new-arrivals"
            className="text-sm uppercase tracking-wide font-semibold hover:opacity-70 transition-opacity"
          >
            New In
          </Link>
          <Link
            href="/products/type/sale"
            className="text-sm uppercase tracking-wide font-semibold hover:opacity-70 transition-opacity"
          >
            Sale
          </Link>
        </nav>

        {/* Mobile - hamburger (left) */}
        <button
          className="md:hidden flex items-center justify-self-start"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <div className="space-y-1.5">
            <span className={`block w-6 h-0.5 ${isTransparent ? "bg-white" : "bg-black"}`} />
            <span className={`block w-6 h-0.5 ${isTransparent ? "bg-white" : "bg-black"}`} />
            <span className={`block w-6 h-0.5 ${isTransparent ? "bg-white" : "bg-black"}`} />
          </div>
        </button>

        {/* Center - Logo */}
        <div className="justify-self-center">
          <Link href="/" className="block hover:opacity-80 transition-opacity">
            <Image
              src="/Images/logo_white.png"
              alt="Studio 88 Logo"
              width={130}
              height={45}
              priority
              className="object-contain"
            />
          </Link>
        </div>

        {/* Right - Actions */}
        <div className="flex items-center space-x-4 sm:space-x-6 justify-self-end">
          <Link href="/Cart" className="relative hover:opacity-70 transition-opacity">
            <ShoppingCart size={22} />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-black text-white text-[10px] font-bold px-1.5 py-[1px] rounded-full min-w-[16px] flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>

          <Link href="/Wishlist" className="relative hover:opacity-70 transition-opacity hidden sm:inline-flex">
            <Heart size={22} />
            {wishlistCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-black text-white text-[10px] font-bold px-1.5 py-[1px] rounded-full min-w-[16px] flex items-center justify-center">
                {wishlistCount}
              </span>
            )}
          </Link>

          {!loading &&
            (isLoggedIn ? (
              <div className="relative">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center space-x-1 hover:opacity-70 transition-opacity"
                >
                  <User size={22} />
                  <ChevronDown size={16} />
                </button>

                {isProfileOpen && (
                  <>
                    <div className="fixed inset-0 z-10" onClick={() => setIsProfileOpen(false)} />
                    <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-lg shadow-xl z-20 overflow-hidden border border-gray-100">
                      <Link
                        href="/Profile"
                        className="block px-4 py-3 text-sm font-medium hover:bg-gray-50 transition-colors"
                        onClick={() => setIsProfileOpen(false)}
                      >
                        Profile
                      </Link>
                      <Link
                        href="/Orders"
                        className="block px-4 py-3 text-sm font-medium hover:bg-gray-50 transition-colors"
                        onClick={() => setIsProfileOpen(false)}
                      >
                        Order History
                      </Link>
                      <button
                        className="w-full text-left px-4 py-3 text-sm font-medium hover:bg-gray-50 transition-colors border-t border-gray-100"
                        onClick={handleLogout}
                      >
                        Logout
                      </button>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <div className="hidden sm:flex items-center space-x-3">
                <Link
                  href="/Login"
                  className={`text-sm font-semibold uppercase tracking-wide px-4 py-2 rounded-full border transition-all duration-200 ${
                    isTransparent
                      ? "border-white text-white hover:bg-white hover:text-black"
                      : "border-black text-black hover:bg-black hover:text-white"
                  }`}
                >
                  Login
                </Link>
                <Link
                  href="/Signup"
                  className={`text-sm font-semibold uppercase tracking-wide px-4 py-2 rounded-full transition-all duration-200 ${
                    isTransparent
                      ? "bg-white text-black hover:bg-gray-200"
                      : "bg-black text-white hover:bg-gray-800"
                  }`}
                >
                  Sign Up
                </Link>
              </div>
            ))}
        </div>
      </div>

      {/* Mobile dropdown menu */}
      {isMobileMenuOpen && (
        <nav
          className={`md:hidden flex flex-col items-center space-y-4 mt-4 pt-4 pb-2 border-t ${
            isTransparent ? "border-white/20" : "border-gray-200"
          }`}
        >
          <Link
            href="/products"
            className="text-sm uppercase tracking-wide font-semibold hover:opacity-70 transition-opacity"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Shop
          </Link>
          <Link
            href="/products/type/new-arrivals"
            className="text-sm uppercase tracking-wide font-semibold hover:opacity-70 transition-opacity"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            New In
          </Link>
          <Link
            href="/products/type/sale"
            className="text-sm uppercase tracking-wide font-semibold hover:opacity-70 transition-opacity"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Sale
          </Link>

          {!isLoggedIn && (
            <div className="flex items-center space-x-3 pt-2">
              <Link
                href="/Login"
                className={`text-sm font-semibold uppercase tracking-wide px-4 py-2 rounded-full border ${
                  isTransparent ? "border-white text-white" : "border-black text-black"
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Login
              </Link>
              <Link
                href="/Signup"
                className={`text-sm font-semibold uppercase tracking-wide px-4 py-2 rounded-full ${
                  isTransparent ? "bg-white text-black" : "bg-black text-white"
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Sign Up
              </Link>
            </div>
          )}
        </nav>
      )}
    </header>
  );
}