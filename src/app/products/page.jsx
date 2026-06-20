"use client";

import { useState, useEffect, useRef } from "react";
import { ChevronDown, Grid2x2, Grid3x3 } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useRouter } from "next/navigation";
import logo from "../../../public/Images/logo_nobg.png";
import Image from "next/image";

function ProductCard({ product, onClick }) {
  const [currentImg, setCurrentImg] = useState(0);
  const images = product.productImages || [];
  const intervalRef = useRef(null);

  const startSlideshow = () => {
    if (images.length <= 1) return;
    let idx = 0;
    intervalRef.current = setInterval(() => {
      idx = (idx + 1) % images.length;
      setCurrentImg(idx);
    }, 1500);
  };

  const stopSlideshow = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setCurrentImg(0);
  };

  useEffect(() => () => clearInterval(intervalRef.current), []);

  return (
    <div
      className="cursor-pointer group"
      onClick={onClick}
      onMouseEnter={startSlideshow}
      onMouseLeave={stopSlideshow}
    >
      {/* Image wrapper */}
      <div
        className="relative overflow-hidden bg-[#f4f4f4] mb-3"
        style={{ aspectRatio: "3/4" }}
      >
        <Image
          src={logo}
          alt="Knotch"
          width={48}
          height={48}
          className="absolute top-3 left-3 z-10 opacity-90 select-none"
        ></Image>
        {images.length === 0 && (
          <div className="absolute inset-0 bg-[#f4f4f4]" />
        )}
        {images.map((img, i) => (
          <img
            key={i}
            src={img.url}
            alt={product.productName}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
              i === currentImg ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}

        {/* subtle dark gradient at bottom for depth */}
        <div className="absolute bottom-0 left-0 right-0 h-1/4 bg-linear-to-t from-black/10 to-transparent rounded-b-2xl pointer-events-none" />
      </div>

      {/* Info */}
      <div className="flex flex-col gap-1 px-1 mt-1">
        <p className="text-[#2B2B2B] text-[0.8rem] font-light leading-snug tracking-wide group-hover:underline underline-offset-2 font-inter">
          {product.productName}
        </p>

        <div className="flex items-center gap-2">
          <p className="text-black text-[0.8rem] font-bold tracking-wide font-inter">
            Rs. {product.productSellingPrice?.toLocaleString()}
          </p>

          {product.productMrp &&
            product.productMrp > product.productSellingPrice && (
              <>
                <p className="text-[#8A8A8A] text-[0.75rem] font-light line-through tracking-wide font-inter">
                  Rs. {product.productMrp?.toLocaleString()}
                </p>

                <p className="text-[0.7rem] font-bold text-white bg-black px-1.5 py-0.5 rounded-sm tracking-wide font-inter">
                  {Math.round(
                    ((product.productMrp - product.productSellingPrice) /
                      product.productMrp) *
                      100,
                  )}
                  % OFF
                </p>
              </>
            )}
        </div>
      </div>
    </div>
  );
}

export default function NewSeasonPage() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [selectedView, setSelectedView] = useState("4-grid");
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [selectedSort, setSelectedSort] = useState("Featured");

  const sortOptions = [
    "Featured",
    "Price: Low to High",
    "Price: High to Low",
    "Newest",
  ];
  const sizes = ["XS", "S", "M", "L", "XL", "XXL"];
  const router = useRouter();

  const [filters, setFilters] = useState({
    categories: [],
    priceRange: [0, 2000],
    size: [],
  });

  const fetchProducts = async (pageNumber, reset = false) => {
    try {
      setLoading(true);
      const query = new URLSearchParams({
        page: pageNumber,
        limit: 20,
        sort: selectedSort,
        categories: filters.categories.join(","),
        minPrice: filters.priceRange[0],
        maxPrice: filters.priceRange[1],
        size: filters.size.join(","),
      });
      const res = await fetch(`/api/products?${query}`);
      const data = await res.json();
      if (reset) {
        setProducts(data.products);
      } else {
        setProducts((prev) => [...prev, ...data.products]);
      }
      setHasMore(pageNumber < data.totalPages);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await fetch(`/api/category/fetch`);
      const data = await res.json();
      setCategories(data.categories || []);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    setProducts([]);
    setPage(1);
    fetchProducts(1, true);
  }, [filters, selectedSort]);

  useEffect(() => {
    if (page > 1) {
      fetchProducts(page);
    }
  }, [page]);

  const toggleFilter = (filterType, value) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: prev[filterType].includes(value)
        ? prev[filterType].filter((item) => item !== value)
        : [...prev[filterType], value],
    }));
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-white pt-26">
        <div className="pb-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Filter Bar */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4 py-4 border-t border-b border-[#BFC3C7]">
              <div className="flex items-center gap-4 w-full sm:w-auto">
                {/* Filter Button */}
                <button
                  onClick={() => setIsFilterOpen(!isFilterOpen)}
                  className="flex items-center gap-2 px-4 py-2 text-sm border border-[#BFC3C7] text-black hover:bg-gray-50 transition tracking-widest font-nunito"
                >
                  <span>FILTER</span>
                  <ChevronDown
                    size={16}
                    className={`transition-transform duration-200 ${isFilterOpen ? "rotate-180" : ""}`}
                  />
                </button>

                {/* Sort Dropdown */}
                <div className="relative flex-1 sm:flex-none">
                  <button
                    onClick={() => setIsSortOpen(!isSortOpen)}
                    className="flex items-center gap-2 px-4 py-2 text-sm border border-[#BFC3C7] text-black hover:bg-gray-50 transition tracking-widest w-full sm:w-auto justify-between font-nunito"
                  >
                    <span>{selectedSort.toUpperCase() || "FEATURED"}</span>
                    <ChevronDown
                      size={16}
                      className={`transition-transform duration-200 ${isSortOpen ? "rotate-180" : ""}`}
                    />
                  </button>
                  {isSortOpen && (
                    <div className="absolute top-full left-0 mt-1 w-full sm:w-56 bg-white border border-[#BFC3C7] shadow-md z-40">
                      {sortOptions.map((option) => (
                        <button
                          key={option}
                          className="block w-full text-left px-4 py-3 text-sm text-[#2B2B2B] hover:bg-gray-50 font-light"
                          onClick={() => {
                            setSelectedSort(option);
                            setIsSortOpen(false);
                          }}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* View Options */}
              <div className="hidden sm:flex items-center gap-2">
                {[
                  { id: "2-grid", icon: <Grid2x2 size={20} /> },
                  { id: "3-grid", icon: <Grid3x3 size={20} /> },
                  {
                    id: "4-grid",
                    icon: (
                      <div className="grid grid-cols-4 gap-0.5 w-4.5 h-4.5">
                        {Array.from({ length: 16 }).map((_, i) => (
                          <span
                            key={i}
                            className="w-0.75 h-0.75 bg-current block"
                          ></span>
                        ))}
                      </div>
                    ),
                  },
                ].map(({ id, icon }) => (
                  <button
                    key={id}
                    onClick={() => setSelectedView(id)}
                    className={`p-2 border border-[#BFC3C7] transition ${
                      selectedView === id
                        ? "bg-black text-white border-black"
                        : "bg-white text-black hover:bg-gray-50"
                    }`}
                  >
                    {icon}
                  </button>
                ))}
              </div>
            </div>

            {/* Filter Panel */}
            {isFilterOpen && (
              <div className="mb-8 p-6 border border-[#BFC3C7] bg-white">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
                  {/* Categories */}
                  <div>
                    <h3 className="text-[0.7rem] font-bold tracking-[0.14em] text-black mb-3">
                      CATEGORIES
                    </h3>
                    <div className="flex flex-col gap-2">
                      {categories.map((category) => (
                        <label
                          key={category.categoryName}
                          className="flex items-center gap-2 cursor-pointer text-[0.82rem] font-light text-[#2B2B2B]"
                        >
                          <input
                            type="checkbox"
                            className="accent-black"
                            checked={filters.categories.includes(category._id)}
                            onChange={() =>
                              toggleFilter("categories", category._id)
                            }
                          />
                          {category.categoryName}
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Price */}
                  <div>
                    <h3 className="text-[0.7rem] font-bold tracking-[0.14em] text-black mb-3">
                      PRICE
                    </h3>
                    <input
                      type="range"
                      min="0"
                      max="2000"
                      value={filters.priceRange[1]}
                      className="w-full accent-black mb-2"
                      onChange={(e) =>
                        setFilters((prev) => ({
                          ...prev,
                          priceRange: [0, parseInt(e.target.value)],
                        }))
                      }
                    />
                    <div className="flex justify-between text-[0.78rem] font-light text-[#2B2B2B]">
                      <span>Rs. {filters.priceRange[0]}</span>
                      <span>Rs. {filters.priceRange[1]}</span>
                    </div>
                  </div>

                  {/* Size */}
                  <div>
                    <h3 className="text-[0.7rem] font-bold tracking-[0.14em] text-black mb-3">
                      SIZE
                    </h3>
                    <div className="grid grid-cols-3 gap-2">
                      {sizes.map((size) => (
                        <button
                          key={size}
                          onClick={() => toggleFilter("size", size)}
                          className={`px-3 py-2 text-sm font-light border transition ${
                            filters.size.includes(size)
                              ? "bg-black text-white border-black"
                              : "bg-white text-[#2B2B2B] border-[#BFC3C7] hover:bg-gray-100"
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Clear Filters */}
                <div className="mt-6 pt-6 border-t border-[#BFC3C7] flex justify-end">
                  <button
                    onClick={() =>
                      setFilters({
                        categories: [],
                        priceRange: [0, 2000],
                        size: [],
                      })
                    }
                    className="text-sm font-light text-[#2B2B2B] underline hover:no-underline bg-none border-none cursor-pointer"
                  >
                    Clear All Filters
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Product Grid */}
          <div className="w-full px-0.5 sm:px-3.5 lg:px-4.5">
            <div
              className={`grid gap-0.5 ${
                selectedView === "2-grid"
                  ? "grid-cols-2"
                  : selectedView === "3-grid"
                    ? "grid-cols-2 lg:grid-cols-3"
                    : "grid-cols-2 lg:grid-cols-4"
              }`}
            >
              {products.map((product) => (
                <ProductCard
                  key={product._id}
                  product={product}
                  onClick={() => router.push(`/products/${product.slug}`)}
                />
              ))}
            </div>
          </div>

          {/* Load More */}
          {hasMore && (
            <div className="flex justify-center mt-12">
              <button
                onClick={() => {
                  setPage((prev) => prev + 1);
                }}
                className="px-8 py-3 text-[0.72rem] font-bold tracking-[0.16em] border border-black bg-white text-black hover:bg-black hover:text-white transition cursor-pointer"
              >
                {loading ? "LOADING..." : "LOAD MORE"}
              </button>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
