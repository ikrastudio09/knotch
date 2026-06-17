"use client";

import Image from "next/image";
import { Truck, ShoppingCart, MapPinned } from "lucide-react";

export default function HeroBanner() {
  return (
    <section style={{ fontFamily: "'Inter', sans-serif" }}>
      {/* ── Hero Image ── */}
      <div className="relative w-full h-[60vh] sm:h-[70vh] md:h-[80vh] lg:h-[85vh] overflow-hidden bg-[#f4f4f4]">
        <Image
          src="/Images/5.png"
          alt="Hero banner"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
      </div>

      {/* ── Feature Strip ── */}
      <div className="bg-white border-t border-[#E5E5E5]">
        <div className="max-w-7xl mx-auto grid grid-cols-3 divide-x divide-[#E5E5E5]">
          <div className="flex flex-col items-center justify-center gap-2 sm:gap-3 py-6 sm:py-8 px-2 text-center">
            <Truck className="w-5 h-5 sm:w-6 sm:h-6 text-black" strokeWidth={1.5} />
            <p className="text-[0.65rem] sm:text-sm font-light text-black tracking-wide leading-tight">
              Free Shipping Above Rs 1999
            </p>
          </div>

          <div className="flex flex-col items-center justify-center gap-2 sm:gap-3 py-6 sm:py-8 px-2 text-center">
            <ShoppingCart className="w-5 h-5 sm:w-6 sm:h-6 text-black" strokeWidth={1.5} />
            <p className="text-[0.65rem] sm:text-sm font-light text-black tracking-wide leading-tight">
              Easy &amp; Secure Checkout
            </p>
          </div>

          <div className="flex flex-col items-center justify-center gap-2 sm:gap-3 py-6 sm:py-8 px-2 text-center">
            <MapPinned className="w-5 h-5 sm:w-6 sm:h-6 text-black" strokeWidth={1.5} />
            <p className="text-[0.65rem] sm:text-sm font-light text-black tracking-wide leading-tight">
              Pan India Delivery
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}