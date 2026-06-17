"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";

export default function KeptaliveCollection() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/products?displayAt=trending&limit=4`);
        const data = await res.json();
        setProducts(data.products || []);
        console.log(data.products);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);
  return (
    <section className="w-full bg-white px-6 py-10 font-sans">
      {/* Product Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-0 border border-gray-200">
        {products.map((product, index) => (
          <Link key={product.productID} href={`/products/${product.slug}`}>
            <div
              className={`flex flex-col cursor-pointer group ${
                index !== products.length - 1 ? "border-r border-gray-200" : ""
              }`}
            >
              {/* Image Box */}
              <div className="relative overflow-hidden bg-[#e8ddd0] aspect-3/4">
                {/* Brand watermark */}
                <span className="absolute top-3 left-3 z-10 text-white text-xs font-light tracking-wide opacity-90 select-none">
                  knotch
                </span>
                <img
                  src={product.productImages[0].url}
                  alt={product.productName}
                  className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* Product Info */}
              <div className="px-3 py-3 border-t border-gray-200">
                <p className="text-xs text-gray-800 font-medium leading-snug">
                  {product.productName}
                </p>
                <p className="text-xs text-gray-600 mt-1">
                  Rs. {product.productSellingPrice}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
