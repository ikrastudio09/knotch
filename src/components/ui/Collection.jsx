"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

const tabs = [
  { id: "home", label: "Collection" },
  { id: "trending", label: "Trending" },
  { id: "new-arrivals", label: "New Arrivals" },
  { id: "sale", label: "SALE" },
];

const mobileTabs = tabs.filter((t) => t.id !== "sale");

export default function CollectionsSection() {
  const [activeTab, setActiveTab] = useState("home");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const carouselRef = useRef(null);

  useEffect(() => {
    const el = carouselRef.current;
    if (!el) return;
    const handleScroll = () => {
      const index = Math.round(el.scrollLeft / el.offsetWidth);
      setActiveIndex(index);
    };
    el.addEventListener("scroll", handleScroll, { passive: true });
    return () => el.removeEventListener("scroll", handleScroll);
  }, [products]);

  // Reset index when tab changes
  useEffect(() => {
    setActiveIndex(0);
  }, [activeTab]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/products?displayAt=${activeTab}&limit=4`);
        const data = await res.json();
        setProducts(data.products || []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [activeTab]);

  return (
    <section className="py-2 bg-white">
      <div className="w-full">
        {/* Title */}
        <div className="text-center mb-5">
          <h2
            className="text-[clamp(2rem,5vw,3.2rem)] font-bold text-black tracking-wide mb-4"
            style={{ fontFamily: "'The Seasons', serif" }}
          >
            Collections
          </h2>
        </div>

        {/* Tabs — mobile: 3 tabs, desktop: all 4 */}
        <div className="md:hidden flex justify-start items-center mb-8 gap-2 overflow-x-auto px-4 pb-1 no-scrollbar">
          <style>{`.no-scrollbar::-webkit-scrollbar { display: none; }`}</style>
          {mobileTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`shrink-0 px-5 py-2 text-[0.65rem] font-bold tracking-[0.16em] transition-all duration-200 ${
                activeTab === tab.id
                  ? "bg-black text-white"
                  : "border border-[#BFC3C7] text-[#2B2B2B] hover:border-black hover:text-black"
              }`}
              style={{ fontFamily: "'Nexa', sans-serif" }}
            >
              {tab.label.toUpperCase()}
            </button>
          ))}
        </div>

        <div className="hidden md:flex justify-center items-center mb-8 gap-2 flex-wrap px-4">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`shrink-0 px-5 py-2 text-[0.65rem] font-bold tracking-[0.16em] transition-all duration-200 ${
                activeTab === tab.id
                  ? "bg-black text-white"
                  : "border border-[#BFC3C7] text-[#2B2B2B] hover:border-black hover:text-black"
              }`}
              style={{ fontFamily: "'Nexa', sans-serif" }}
            >
              {tab.label.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex justify-center py-20">
            <p
              className="text-[0.75rem] font-light text-[#8A8A8A] tracking-widest"
              style={{ fontFamily: "'Nexa', sans-serif" }}
            >
              LOADING...
            </p>
          </div>
        )}

        {/* Products */}
        {!loading && (
          <>
            {/* Mobile: full-width snap carousel */}
            <div className="md:hidden">
              <div
                ref={carouselRef}
                className="flex overflow-x-auto snap-x snap-mandatory no-scrollbar"
                style={{ scrollbarWidth: "none" }}
              >
                {products?.map((product) => (
                  <Link
                    key={product._id}
                    href={`/products/${product.slug}`}
                    className="shrink-0ll snap-center group px-4"
                  >
                    <div
                      className="relative overflow-hidden bg-[#f4f4f4] w-full mb-4"
                      style={{ aspectRatio: "3/4" }}
                    >
                      <Image
                        src={product.productImages[0].url}
                        alt={product.productName}
                        fill
                        sizes="100vw"
                        className="object-cover"
                      />
                      {product.soldOut && (
                        <div
                          className="absolute top-3 left-3 bg-black text-white px-2.5 py-1 text-[0.62rem] font-bold tracking-widest"
                          style={{ fontFamily: "'Nexa', sans-serif" }}
                        >
                          SOLD OUT
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col items-center gap-1 pb-6">
                      <p
                        className="text-[0.95rem] font-light text-[#2B2B2B] tracking-wide leading-snug text-center"
                        style={{ fontFamily: "'Nexa', sans-serif" }}
                      >
                        {product.productName}
                      </p>
                      <div className="flex items-center justify-center gap-2 mt-0.5">
                        <span
                          className="text-[0.85rem] font-bold text-black"
                          style={{ fontFamily: "'Nexa', sans-serif" }}
                        >
                          Rs. {product.productSellingPrice?.toLocaleString()}
                        </span>
                        {product.productOriginalPrice && (
                          <span
                            className="text-[0.75rem] font-light text-[#8A8A8A] line-through"
                            style={{ fontFamily: "'Nexa', sans-serif" }}
                          >
                            Rs. {product.productOriginalPrice?.toLocaleString()}
                          </span>
                        )}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              {/* Dynamic scroll indicator */}
              <div className="flex justify-center px-8 mt-3">
                <div className="w-40 h-0.5 bg-[#BFC3C7] rounded-full relative">
                  <div
                    className="absolute top-0 left-0 h-full bg-black rounded-full transition-all duration-300"
                    style={{
                      width: `${100 / (products?.length || 1)}%`,
                      transform: `translateX(${activeIndex * 100}%)`,
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Desktop: 4-column grid */}
            <div className="hidden md:grid grid-cols-4 gap-2 px-6">
              {products?.map((product) => (
                <div key={product._id} className="group cursor-pointer">
                  <Link href={`/products/${product.slug}`}>
                    <div
                      className="relative overflow-hidden bg-[#f4f4f4] mb-3"
                      style={{ aspectRatio: "3/4" }}
                    >
                      <Image
                        src={product.productImages[0].url}
                        alt={product.productName}
                        fill
                        sizes="25vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      {product.soldOut && (
                        <div
                          className="absolute top-3 left-3 bg-black text-white px-2.5 py-1 text-[0.62rem] font-bold tracking-widest"
                          style={{ fontFamily: "'Nexa', sans-serif" }}
                        >
                          SOLD OUT
                        </div>
                      )}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-all duration-300 rounded-2xl" />
                    </div>
                    <div className="px-1 flex flex-col gap-1">
                      <p
                        className="text-[0.8rem] font-light text-[#2B2B2B] tracking-wide leading-snug group-hover:underline underline-offset-2 line-clamp-2"
                        style={{ fontFamily: "'Nexa', sans-serif" }}
                      >
                        {product.productName}
                      </p>
                      <div className="flex items-center gap-2">
                        <span
                          className="text-[0.82rem] font-bold text-black"
                          style={{ fontFamily: "'Nexa', sans-serif" }}
                        >
                          Rs. {product.productSellingPrice?.toLocaleString()}
                        </span>
                        {product.productOriginalPrice && (
                          <span
                            className="text-[0.72rem] font-light text-[#8A8A8A] line-through"
                            style={{ fontFamily: "'Nexa', sans-serif" }}
                          >
                            Rs. {product.productOriginalPrice?.toLocaleString()}
                          </span>
                        )}
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}