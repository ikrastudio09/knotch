"use client";

import { useState, useEffect, useRef } from "react";
import { Heart, ChevronLeft, ChevronRight, X } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useCart } from "@/context/CartContext";


export default function ProductPage() {
  const [selectedSize, setSelectedSize] = useState("S");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [wishlist, setWishlist] = useState(false);
  const [product, setProduct] = useState();
  const [loading, setLoading] = useState(false);
  const [relatedProducts, setrelatedProducts] = useState([]);
  const [activeSlide, setActiveSlide] = useState(0);
  const [sizeChartOpen, setSizeChartOpen] = useState(false);
  const { slug } = useParams();
  const router = useRouter();
  const {incrementCart, incrementWishlist, decrementWishlist} = useCart();

  useEffect(() => {
    if (!slug) return;
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/products/${slug}`);
        const data = await res.json();
        if (!res.ok) {
          router.push("/products");
          return;
        }
        setProduct(data.product);
        if (data.product?.productSize?.length)
          setSelectedSize(data.product.productSize[0]);
        if (data.product?.productColour?.length)
          setSelectedColor(data.product.productColour[0]);
        const wishlistRes = await fetch("/api/wishlist/fetch", {
          method: "POST",
        });
        const wishlistData = await wishlistRes.json();
        if (wishlistData.success) {
          setWishlist(
            wishlistData.wishlist.some((p) => p._id === data.product._id),
          );
        }
        const relatedRes = await fetch(`/api/products/${slug}/related`);
        const relatedData = await relatedRes.json();
        setrelatedProducts(relatedData.relatedProducts || []);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    fetchData();
  }, [slug]);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-white" style={{ fontFamily: "'Inter', sans-serif" }}>
        <p className="text-[#8A8A8A] text-sm tracking-widest font-light">
          LOADING...
        </p>
      </div>
    );

  if (!product)
    return (
      <div className="min-h-screen flex items-center justify-center bg-white" style={{ fontFamily: "'Inter', sans-serif" }}>
        <p className="text-[#8A8A8A] text-sm tracking-widest font-light">
          PRODUCT NOT FOUND
        </p>
      </div>
    );

  const toggleWishlist = async () => {
    try {
      const res = await fetch("/api/wishlist/toggle", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productID: product._id }),
      });

      const data = await res.json();

      if (data.success) {
        if (data.action === "added") {
          setWishlist(true);
          toast.success("Product added to wishlist");
          incrementWishlist();
        }
        else if (data.action === "removed") {
          setWishlist(false);
          toast.success("Product removed from wishlist");
          decrementWishlist();
        }
      }

    } catch (error) {
      console.error(error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  const addToCart = async () => {
    try {
      const res = await fetch("/api/cart/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productID: product._id,
          productSize: selectedSize,
          productQuantity: quantity,
        }),
      });

      const data = await res.json();

      if (data.success) {
        toast.success("Product added to cart");
        setQuantity(1);
        incrementCart();
      } else {
        toast.error(data.message || "Failed to add product to cart.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  const canAddToCart = selectedSize && quantity > 0;

  const discount =
    product.productOriginalPrice && product.productSellingPrice
      ? Math.round(
        ((product.productOriginalPrice - product.productSellingPrice) /
          product.productOriginalPrice) *
        100,
      )
      : null;

  const allImages = product.productImages || [];
  const totalSlides = allImages.length;

  const prevSlide = () => setActiveSlide((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
  const nextSlide = () => setActiveSlide((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));

  return (
    <>
      <Navbar />
      <div className="bg-white md:mt-16 mt-32" style={{ fontFamily: "'Inter', sans-serif" }}>
        <main className="max-w-400 mx-auto">

          {/* ── MOBILE / TABLET: Carousel ── */}
          <div className="xl:hidden">
            <div className="relative w-full overflow-hidden bg-[#f4f4f4]" style={{ aspectRatio: "3/4" }}>
              <div
                className="flex h-full transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${activeSlide * 100}%)` }}
              >
                {allImages.map((image, index) => (
                  <div key={index} className="min-w-full h-full shrink-0">
                    <img
                      src={image.url}
                      alt={`${product.productName} view ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>

              {discount && (
                <div className="absolute top-3 left-3 bg-black text-white px-2.5 py-1 text-[0.65rem] font-bold tracking-widest z-10">
                  {discount}% OFF
                </div>
              )}

              <button
                onClick={toggleWishlist}
                className={`absolute top-3 right-3 p-2.5 rounded-full z-10 transition-all duration-200 ${wishlist ? "bg-black" : "bg-white"
                  }`}
              >
                <Heart
                  className={`w-5 h-5 transition-all duration-200 ${wishlist ? "fill-white text-white" : "fill-transparent text-[#2B2B2B]"
                    }`}
                />
              </button>

              {totalSlides > 1 && (
                <>
                  <button
                    onClick={prevSlide}
                    className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full z-10 shadow"
                  >
                    <ChevronLeft className="w-5 h-5 text-[#2B2B2B]" />
                  </button>
                  <button
                    onClick={nextSlide}
                    className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full z-10 shadow"
                  >
                    <ChevronRight className="w-5 h-5 text-[#2B2B2B]" />
                  </button>
                </>
              )}

              {totalSlides > 1 && (
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
                  {allImages.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveSlide(index)}
                      className={`rounded-full transition-all duration-300 ${index === activeSlide
                        ? "bg-black w-5 h-1.5"
                        : "bg-white/70 w-1.5 h-1.5"
                        }`}
                    />
                  ))}
                </div>
              )}
            </div>

            <div className="px-4 py-6 flex flex-col gap-6">
              <h1
                className="text-[clamp(1.4rem,6vw,2rem)] font-bold text-black tracking-wide leading-tight"
                style={{ fontFamily: "'Nunito', sans-serif" }}
              >
                {product.productName}
              </h1>

              <div className="border-t border-b border-[#BFC3C7] py-4 flex flex-col gap-1">
                <div className="flex items-baseline gap-3 flex-wrap">
                  <span className="text-[1.6rem] font-bold text-black tracking-tight">
                    ₹{product.productSellingPrice?.toLocaleString()}
                  </span>
                  {product.productOriginalPrice && (
                    <span className="text-base font-light text-[#8A8A8A] line-through">
                      ₹{product.productOriginalPrice?.toLocaleString()}
                    </span>
                  )}
                  {discount && (
                    <span className="text-[0.7rem] font-bold text-white bg-black px-2 py-0.5 tracking-widest">
                      {discount}% OFF
                    </span>
                  )}
                </div>
                <p className="text-[0.75rem] font-light text-[#8A8A8A] tracking-wide">
                  inclusive of all taxes
                </p>
              </div>

              {product.productSize?.length > 0 && (
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-[0.7rem] font-bold tracking-[0.16em] text-black">SELECT SIZE</h3>
                    <button
                      onClick={() => setSizeChartOpen(true)}
                      className="text-[0.7rem] font-light text-[#8A8A8A] tracking-widest hover:text-black transition underline underline-offset-2"
                    >
                      Size Chart →
                    </button>
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    {product.productSize.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`px-4 py-2 text-sm font-light border tracking-wider transition ${selectedSize === size
                          ? "bg-black text-white border-black"
                          : "bg-white text-[#2B2B2B] border-[#BFC3C7] hover:border-black"
                          }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                  <p className="text-[0.72rem] text-black mt-2">
                    {product.productStock?.get?.(selectedSize) || product.productStock?.[selectedSize]} pieces left
                  </p>
                </div>


              )}

              {product.productColour?.length > 0 && (
                <div>
                  <h3 className="text-[0.7rem] font-bold tracking-[0.16em] text-black mb-3">SELECT COLOUR</h3>
                  <div className="flex gap-3 flex-wrap">
                    {product.productColour.map((color) => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        title={color}
                        className={`w-9 h-9 rounded-full border-2 transition ${selectedColor === color
                          ? "border-black ring-2 ring-offset-2 ring-black"
                          : "border-[#BFC3C7] hover:border-black"
                          }`}
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                  {selectedColor && (
                    <p className="text-[0.72rem] text-[#8A8A8A] mt-2 tracking-wide">{selectedColor}</p>
                  )}
                </div>
              )}

              <div>
                <h3 className="text-[0.7rem] font-bold tracking-[0.16em] text-black mb-3">QUANTITY</h3>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 flex items-center justify-center border border-[#BFC3C7] hover:border-black transition text-[#2B2B2B]"
                  >
                    <span className="text-lg font-light">−</span>
                  </button>
                  <span className="text-sm font-light text-black min-w-[2ch] text-center tracking-widest">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(Math.min(10, quantity + 1))}
                    className="w-10 h-10 flex items-center justify-center border border-[#BFC3C7] hover:border-black transition text-[#2B2B2B]"
                  >
                    <span className="text-lg font-light">+</span>
                  </button>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={addToCart}
                  disabled={!canAddToCart}
                  className="flex-1 bg-black text-white py-4 px-6 text-[0.75rem] font-bold tracking-[0.18em] uppercase hover:bg-[#2B2B2B] transition disabled:opacity-50"
                >
                  Add to Bag
                </button>
                <button
                  onClick={toggleWishlist}
                  className={`p-4 border transition-all duration-200 ${wishlist ? "border-black bg-black" : "border-[#BFC3C7] hover:border-black"
                    }`}
                >
                  <Heart
                    className={`w-5 h-5 transition-all duration-200 ${wishlist ? "fill-white text-white" : "fill-transparent text-[#2B2B2B]"
                      }`}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* ── DESKTOP: 3-equal-column layout ── */}
          <div className="hidden xl:grid grid-cols-3 gap-2 pt-4 items-start">

            {/* COL 1: Sticky main image */}
            <div className="sticky top-16 self-start">
              <div
                className="relative overflow-hidden bg-[#f4f4f4] w-full"
                style={{ aspectRatio: "3/4" }}
              >
                <img
                  src={product.productImages[0]?.url}
                  alt={product.productName}
                  className="w-full h-full object-cover"
                />
                {discount && (
                  <div className="absolute top-3 left-3 bg-black text-white px-2.5 py-1 text-[0.65rem] font-bold tracking-widest">
                    {discount}% OFF
                  </div>
                )}
              </div>
            </div>

            {/* COL 2: Scrolling stacked images — same height as col 1 via overflow+maxHeight */}
            <div
              className="flex flex-col gap-2 overflow-y-auto"
              style={{
                maxHeight: "calc((100vw / 3) * (4/3))",
                scrollbarWidth: "none",
                msOverflowStyle: "none",
              }}
            >
              <style>{`.scroll-hide::-webkit-scrollbar { display: none; }`}</style>
              {product.productImages.slice(1, 5).map((image, index) => (
                <div
                  key={index}
                  className="relative overflow-hidden bg-[#f4f4f4] shrink-0 w-full scroll-hide"
                  style={{ aspectRatio: "3/4" }}
                >
                  <img
                    src={image.url}
                    alt={`${product.productName} view ${index + 2}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>

            {/* COL 3: Sticky product info */}
            <div className="sticky top-16 self-start px-6 py-8 flex flex-col gap-7">
              <h1
                className="text-[clamp(1.6rem,2.5vw,2.4rem)] font-bold text-black tracking-wide leading-tight"
                style={{ fontFamily: "'Nunito', sans-serif" }}
              >
                {product.productName}
              </h1>

              <div className="border-t border-b border-[#BFC3C7] py-5 flex flex-col gap-1">
                <div className="flex items-baseline gap-3">
                  <span className="text-[1.9rem] font-bold text-black tracking-tight">
                    ₹{product.productSellingPrice?.toLocaleString()}
                  </span>
                  {product.productOriginalPrice && (
                    <span className="text-base font-light text-[#8A8A8A] line-through">
                      ₹{product.productOriginalPrice?.toLocaleString()}
                    </span>
                  )}
                  {discount && (
                    <span className="text-[0.7rem] font-bold text-white bg-black px-2 py-0.5 tracking-widest">
                      {discount}% OFF
                    </span>
                  )}
                </div>
                <p className="text-[0.75rem] font-light text-[#8A8A8A] tracking-wide">
                  inclusive of all taxes
                </p>
              </div>

              {product.productSize?.length > 0 && (
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-[0.7rem] font-bold tracking-[0.16em] text-black">SELECT SIZE</h3>
                    <button
                      onClick={() => setSizeChartOpen(true)}
                      className="text-[0.7rem] font-light text-[#8A8A8A] tracking-widest hover:text-black transition underline underline-offset-2"
                    >
                      Size Chart →
                    </button>
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    {product.productSize.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`px-4 py-2 text-sm font-light border tracking-wider transition ${selectedSize === size
                          ? "bg-black text-white border-black"
                          : "bg-white text-[#2B2B2B] border-[#BFC3C7] hover:border-black"
                          }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {product.productColour?.length > 0 && (
                <div>
                  <h3 className="text-[0.7rem] font-bold tracking-[0.16em] text-black mb-4">SELECT COLOUR</h3>
                  <div className="flex gap-3 flex-wrap">
                    {product.productColour.map((color) => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        title={color}
                        className={`w-9 h-9 rounded-full border-2 transition ${selectedColor === color
                          ? "border-black ring-2 ring-offset-2 ring-black"
                          : "border-[#BFC3C7] hover:border-black"
                          }`}
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                  {selectedColor && (
                    <p className="text-[0.72rem] text-[#8A8A8A] mt-2 tracking-wide">{selectedColor}</p>
                  )}
                </div>
              )}

              <div>
                <h3 className="text-[0.7rem] font-bold tracking-[0.16em] text-black mb-4">QUANTITY</h3>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 flex items-center justify-center border border-[#BFC3C7] hover:border-black transition text-[#2B2B2B]"
                  >
                    <span className="text-lg font-light">−</span>
                  </button>
                  <span className="text-sm font-light text-black min-w-[2ch] text-center tracking-widest">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(Math.min(10, quantity + 1))}
                    className="w-10 h-10 flex items-center justify-center border border-[#BFC3C7] hover:border-black transition text-[#2B2B2B]"
                  >
                    <span className="text-lg font-light">+</span>
                  </button>
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  onClick={addToCart}
                  disabled={!canAddToCart}
                  className="flex-1 bg-black text-white py-4 px-6 text-[0.75rem] font-bold tracking-[0.18em] uppercase hover:bg-[#2B2B2B] transition">
                  Add to Bag
                </button>
                <button
                  onClick={toggleWishlist}
                  className={`p-4 border transition-all duration-200 ${wishlist ? "border-black bg-black" : "border-[#BFC3C7] hover:border-black"
                    }`}
                >
                  <Heart
                    className={`w-5 h-5 transition-all duration-200 ${wishlist ? "fill-white text-white" : "fill-transparent text-[#2B2B2B]"
                      }`}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* You May Also Like */}
          <section className="mt-24 border-t border-[#BFC3C7] pt-16 px-4 sm:px-6 lg:px-8 pb-20">
            <div className="flex items-end justify-between mb-10">
              <h2
                className="text-[clamp(1.4rem,3vw,2.2rem)] font-bold text-black tracking-wide"
                style={{ fontFamily: "'Nunito', sans-serif" }}
              >
                You May Also Like
              </h2>
              <button className="text-[0.7rem] font-light text-[#8A8A8A] tracking-widest hover:text-black transition underline underline-offset-2">
                View All →
              </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {relatedProducts.map((item) => (
                <div
                  key={item._id}
                  className="group cursor-pointer"
                  onClick={() => router.push(`/products/${item.slug}`)}
                >
                  <div
                    className="relative overflow-hidden bg-[#f4f4f4] mb-3"
                    style={{ aspectRatio: "3/4" }}
                  >
                    <img
                      src={item.productImages?.[0].url}
                      alt={item.productName}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <button
                      className="absolute top-3 right-3 bg-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={toggleWishlist}
                    >
                      <Heart className="w-4 h-4 text-[#2B2B2B]" />
                    </button>
                  </div>
                  <div className="flex flex-col gap-1 px-1">
                    <p className="text-[0.8rem] font-light text-[#2B2B2B] leading-snug tracking-wide group-hover:underline underline-offset-2 line-clamp-2">
                      {item.productName}
                    </p>
                    <div className="flex items-center gap-2">
                      <span className="text-[0.82rem] font-bold text-black">
                        ₹{item.productSellingPrice?.toLocaleString()}
                      </span>
                      {item.productOriginalPrice && (
                        <span className="text-[0.75rem] font-light text-[#8A8A8A] line-through">
                          ₹{item.productOriginalPrice?.toLocaleString()}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>
      <Footer />

      {/* ── SIZE CHART MODAL ── */}
      {sizeChartOpen && (
        <div
          onClick={() => setSizeChartOpen(false)}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 px-4 py-8 overflow-y-auto"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white w-full max-w-2xl max-h-[85vh] overflow-y-auto relative"
          >
            <button
              onClick={() => setSizeChartOpen(false)}
              className="absolute top-4 right-4 p-2 hover:bg-[#f4f4f4] rounded-full transition z-10"
            >
              <X className="w-5 h-5 text-[#2B2B2B]" />
            </button>

            <div className="px-6 sm:px-10 py-10 flex flex-col gap-10">
              <h2
                className="text-[clamp(1.4rem,3vw,1.9rem)] font-bold text-black tracking-wide"
                style={{ fontFamily: "'Nunito', sans-serif" }}
              >
                Size Guide
              </h2>

              {/* SIZE CHART */}
              <div>
                <h3 className="text-[0.7rem] font-bold tracking-[0.16em] text-black mb-3">
                  SIZE CHART (IN INCHES)
                </h3>
                <div className="overflow-x-auto border border-[#BFC3C7]">
                  <table className="w-full text-left border-collapse min-w-[560px]">
                    <thead>
                      <tr className="bg-black text-white">
                        {["Size", "Shoulder", "Chest", "Height", "Sleeve Open", "Half Sleeve", "Full Sleeve"].map(
                          (h) => (
                            <th
                              key={h}
                              className="px-3 py-2.5 text-[0.65rem] font-bold tracking-widest whitespace-nowrap"
                            >
                              {h}
                            </th>
                          )
                        )}
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        ["S", "28–32", "32–38", "24–27", "7–11", "7–8", "22–24.5"],
                        ["M", "33–36", "39–42", "26–29", "8–13", "7.5–8.5", "24–25.5"],
                        ["L", "37–39", "43–45", "26–30", "12–14", "8–9", "25–26"],
                        ["XL", "40+", "46–48", "28–30+", "14–15", "8.5–9", "25.5–26"],
                      ].map((row, i) => (
                        <tr key={row[0]} className={i % 2 === 0 ? "bg-white" : "bg-[#f4f4f4]"}>
                          {row.map((cell, idx) => (
                            <td
                              key={idx}
                              className="px-3 py-2.5 text-[0.78rem] font-light text-[#2B2B2B] tracking-wide whitespace-nowrap"
                            >
                              {cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* PRODUCT DETAILS */}
              <div className="border-t border-[#BFC3C7] pt-6">
                <h3 className="text-[0.7rem] font-bold tracking-[0.16em] text-black mb-3">PRODUCT DETAILS</h3>
                <p className="text-[0.82rem] font-light text-[#2B2B2B] leading-relaxed tracking-wide">
                  {product.productDescription}
                </p>
              </div>

              {/* WASH & CARE */}
              <div className="border-t border-[#BFC3C7] pt-6">
                <h3 className="text-[0.7rem] font-bold tracking-[0.16em] text-black mb-3">WASH & CARE</h3>
                <ul className="text-[0.82rem] font-light text-[#2B2B2B] leading-relaxed tracking-wide list-disc pl-4 flex flex-col gap-1">
                  <li>Machine wash cold, with similar colours</li>
                  <li>Do not bleach</li>
                  <li>Tumble dry low, or line dry in shade</li>
                  <li>Iron on low heat, inside out</li>
                  <li>Do not dry clean unless stated otherwise</li>
                </ul>
              </div>

              {/* FIT NOTES */}
              <div className="border-t border-[#BFC3C7] pt-6">
                <h3 className="text-[0.7rem] font-bold tracking-[0.16em] text-black mb-3">FIT NOTES</h3>
                <p className="text-[0.82rem] font-light text-[#2B2B2B] leading-relaxed tracking-wide">
                  This style is designed with a true-to-size, relaxed fit. We recommend
                  choosing your usual size for the most comfortable wear. If you prefer
                  an oversized look, consider sizing up by one.
                </p>
              </div>

              {/* GET IN TOUCH */}
              <div className="border-t border-[#BFC3C7] pt-6 flex flex-col gap-3">
                <h3 className="text-[0.7rem] font-bold tracking-[0.16em] text-black">STILL UNSURE?</h3>
                <p className="text-[0.82rem] font-light text-[#2B2B2B] leading-relaxed tracking-wide">
                  Our style team is happy to help you find the right fit before you order.
                </p>
                <a
                  href="mailto:support@knotch.com"
                  className="self-start bg-black text-white py-3 px-6 text-[0.72rem] font-bold tracking-[0.18em] uppercase hover:bg-[#2B2B2B] transition"
                >
                  Get in Touch
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}