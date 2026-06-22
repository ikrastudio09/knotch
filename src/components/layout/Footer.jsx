"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Instagram,
  Facebook,
  Mail,
  Phone,
  MessageCircle,
} from "lucide-react";
import Image from "next/image";
import toast from "react-hot-toast";

export default function Footer() {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (data.success) {
        toast.success("Subscribed Officially!")
        setEmail("");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong.")
    }
  };

  return (
    <footer className="bg-black text-white" id="contact">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-4 gap-12">
          {/* Column 1 - Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="inline-block mb-4">
              <Image
                src="/Images/logo_nobg.png"
                alt="Knotch Logo"
                width={180}
                height={70}
                className="object-contain"
              />
            </Link>

            <p className="text-sm text-gray-400 leading-relaxed font-inter">
              Elevating your style with premium occasionwear. Where comfort
              meets sophistication.
            </p>
          </div>

          {/* Column 2 - Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 tracking-wide font-nunito">
              Quick Links
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/Help#about"
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/products"
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                  Collections
                </Link>
              </li>
              <li>
                <Link
                  href="/products/type/new-arrivals"
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link
                  href="/products/type/sale"
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                  Sale
                </Link>
              </li>
              <li>
                <Link
                  href="/Help#contact"
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3 - Customer Service */}
          <div>
            <h3 className="text-lg font-semibold mb-4 tracking-wide font-nunito">
              Customer Service
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/Help#shipping"
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                  Shipping & Delivery
                </Link>
              </li>
              <li>
                <Link
                  href="/Refund"
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                  Returns & Exchanges
                </Link>
              </li>
              <li>
                <Link
                  href="/Help#care"
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                  Size Guide
                </Link>
              </li>
              <li>
                <Link
                  href="/Help#faq"
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                  FAQs
                </Link>
              </li>
              <li>
                <Link
                  href="/Help#care"
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                  Care Instructions
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4 - Newsletter & Social */}
          <div>
            <h3 className="text-lg font-semibold mb-4 tracking-wide font-nunito">
              Stay Connected
            </h3>
            <p className="text-sm text-gray-400 mb-4">
              Subscribe for exclusive offers and updates.
            </p>

            <form onSubmit={handleSubmit} className="mb-6">
              <div className="flex">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email"
                  required
                  className="flex-1 px-4 py-2 bg-white text-black text-sm focus:outline-none "
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-white text-black hover:bg-gray-200 transition-colors"
                  aria-label="Subscribe"
                >
                  <Mail size={18} />
                </button>
              </div>
            </form>

            {/* Social Media */}
            <div>
              <h4 className="text-base font-semibold mb-3 font-nunito">
                Connect
              </h4>
              <div className="flex flex-wrap gap-3 mb-4">
                <Link
                  href="https://instagram.com/knotch.co"
                  target="_blank"
                  className="w-12 h-12 bg-gray-900 rounded-full flex items-center justify-center text-white hover:bg-gray-800 transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram size={20} />
                </Link>
                {/* <Link
                  href="https://facebook.com/isabella"
                  target="_blank"
                  className="w-12 h-12 bg-gray-900 rounded-full flex items-center justify-center text-white hover:bg-gray-800 transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook size={20} />
                </Link> */}
                {/* <Link
                  href="https://twitter.com/isabella"
                  target="_blank"
                  className="w-12 h-12 bg-gray-900 rounded-full flex items-center justify-center text-white hover:bg-gray-800 transition-colors"
                  aria-label="Twitter"
                >
                  <Twitter size={20} />
                </Link> */}
                <Link
                  href="https://wa.me/918983985787"
                  target="_blank"
                  className="w-12 h-12 bg-gray-900 rounded-full flex items-center justify-center text-white hover:bg-gray-800 transition-colors"
                  aria-label="WhatsApp"
                >
                  <MessageCircle size={20} />
                </Link>
                {/* <Link
                  href="mailto:hello@isabella.com"
                  className="w-12 h-12 bg-gray-900 rounded-full flex items-center justify-center text-white hover:bg-gray-800 transition-colors"
                  aria-label="Email"
                >
                  <Mail size={20} />
                </Link> */}
                <Link
                  href="tel:+918983985787"
                  className="w-12 h-12 bg-gray-900 rounded-full flex items-center justify-center text-white hover:bg-gray-800 transition-colors"
                  aria-label="Phone"
                >
                  <Phone size={20} />
                </Link>
              </div>
              <p className="text-sm text-gray-400">
                Follow us for style inspiration and latest updates
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
            {/* Left - Links */}
            <div className="flex flex-wrap justify-center md:justify-start gap-4">
              <Link
                href="/Terms"
                className="hover:text-white transition-colors"
              >
                Terms & Conditions
              </Link>
              <Link
                href="/Privacy"
                className="hover:text-white transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="/Refund"
                className="hover:text-white transition-colors"
              >
                Exchange Policy
              </Link>
              <Link
                href="/Cookies"
                className="hover:text-white transition-colors"
              >
                Cookies Policy
              </Link>
            </div>

            {/* Center - Copyright */}
            <p className="text-center">© 2026 knotch. All Rights Reserved</p>

            {/* Right - Developer Credit */}
            <p className="text-center md:text-right font-inter">
              Managed by{" "}
              <Link
                href="https://www.ikrastudio.in/"
                target="_blank"
                className="text-white hover:underline"
              >
                iKRA Studio
              </Link>{" "}
              and
              <Link
                href="https://www.rexory.in/"
                target="_blank"
                className="text-white hover:underline "
              >
                {"  "}Rexory Studio
              </Link>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
