"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

export default function ProductShowcaseSection() {

  const [currentProduct, setCurrentProduct] = useState(0);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const goToPrevious = () => {
    if (products.length === 0) return;
    setCurrentProduct((prev) => (prev - 1 + products.length) % products.length);
  };

  const goToNext = () => {
    if (products.length === 0) return;
    setCurrentProduct((prev) => (prev + 1) % products.length);
  };

  const goToSlide = (index) => {
    setCurrentProduct(index);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);

        const res = await fetch(`/api/products?displayAt=trending&limit=4`);
        const data = await res.json();

        setProducts(data.products || []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const product = products[currentProduct];

  return (
    <section style={{ backgroundColor: "#FFFFFF" }}>
      <div className="grid md:grid-cols-2">

        {/* Left - Product Carousel */}
        <div className="flex items-center justify-center py-6 px-8 md:px-12 bg-white">
          <div className="max-w-md w-full">

            {/* Collection Title */}
            <h2
              className="text-2xl md:text-3xl text-center mb-2"
              style={{
                fontFamily: "'The Seasons', serif",
                fontWeight: 700,
                color: "#000000",
              }} 
            >
              MIDNIGHT BLOOM
            </h2>

            <div
              className="w-12 h-0.5 mx-auto mb-4"
              style={{ backgroundColor: "#BFC3C7" }}
            />

            {loading && (
              <p className="text-center text-sm">Loading...</p>
            )}

            {!loading && product && (
              <div className="relative">

                {/* Navigation Arrows */}
                <button
                  onClick={goToPrevious}
                  className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-10 h-10 bg-white shadow-md rounded-full flex items-center justify-center hover:bg-gray-50 transition-all"
                >
                  <ChevronLeft size={20} />
                </button>

                <button
                  onClick={goToNext}
                  className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-10 h-10 bg-white shadow-md rounded-full flex items-center justify-center hover:bg-gray-50 transition-all"
                >
                  <ChevronRight size={20} />
                </button>

                {/* Product Image */}
                <Link href={`/products/${product.slug}`}>
                  <div className="relative aspect-[3/4] mb-4 overflow-hidden group cursor-pointer max-w-70 mx-auto">
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                      style={{
                        backgroundImage: `url('${product.productImages?.[0]?.url}')`,
                      }}
                    />
                  </div>
                </Link>

                {/* Product Info */}
                <div className="text-center mb-4">
                  <h3
                    className="text-lg mb-1"
                    style={{
                      fontFamily: "'The Seasons', serif",
                      fontWeight: 400,
                      color: "#2B2B2B",
                    }}
                  >
                    {product.productName}
                  </h3>

                  <p
                    className="text-base"
                    style={{
                      fontFamily: "'Nexa', sans-serif",
                      fontWeight: 300,
                      color: "#2B2B2B",
                    }}
                  >
                    ₹{product.productSellingPrice?.toLocaleString()}
                  </p>
                </div>

                {/* Dots */}
                <div className="flex justify-center space-x-2 mb-6">
                  {products.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => goToSlide(index)}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        index === currentProduct ? "w-6" : ""
                      }`}
                      style={{
                        backgroundColor:
                          index === currentProduct ? "#000000" : "#BFC3C7",
                      }}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Image */}
        <div style={{ backgroundColor: "#8A8A8A" }}>
          <div className="relative w-full h-[600px] overflow-hidden">
            <img
              src="/Images/4.jpeg"
              alt="Lifestyle"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/5" />
          </div>
        </div>

      </div>
    </section>
  );
}