"use client";

import { useState } from "react";
import { X, Heart, ShoppingBag, Search, User } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";

export default function WishlistPage() {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const { decrementWishlist, incrementCart } = useCart();
  const router = useRouter();

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const res = await fetch("/api/wishlist/fetch", {
          method: "POST",
        });

        const data = await res.json();

        if (data.success) {
          setWishlistItems(data.wishlist);
        }

        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchWishlist();
  }, []);

  const removeFromWishlist = async (productID) => {
    try {
      const res = await fetch("/api/wishlist/toggle", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productID }),
      });

      const data = await res.json();

      if (data.success) {
        setWishlistItems((prev) =>
          prev.filter((item) => item._id !== productID),
        );
        toast.success("Product removed from wishlist");
        decrementWishlist();
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  const addToCart = async (item) => {
    try {
      const size = item.productSize?.[0] || "M"; // default size
      const quantity = 1;

      const res = await fetch("/api/cart/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productID: item._id,
          productSize: size,
          productQuantity: quantity,
        }),
      });

      const data = await res.json();

      if (data.success) {
        // remove from wishlist
        await fetch("/api/wishlist/toggle", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ productID: item._id }),
        });

        setWishlistItems((prev) => prev.filter((p) => p._id !== item._id));

        toast.success("Moved to bag");
        incrementCart();
        decrementWishlist();
      } else {
        toast.error(data.message || "Failed to add product to cart");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-white pt-16">
        <main className="max-w-full mx-auto px-12  py-12">
          {/* Header */}
          <div className="flex items-baseline gap-4 mb-10 border-b border-[#BFC3C7] pb-6 font-nunito">
            <h2 className="text-[clamp(1.8rem,4vw,2.8rem)] font-bold text-black tracking-wide">
              My Wishlist
            </h2>

            <span className="text-[0.78rem] font-light text-[#8A8A8A] tracking-wide">
              {wishlistItems.length} items
            </span>
          </div>

          {/* Wishlist Grid */}
          {wishlistItems.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {wishlistItems.map((item) => (
                <div key={item._id} className="group relative cursor-pointer">
                  {/* Remove Button */}
                  <button
                    onClick={() => removeFromWishlist(item._id)}
                    className="absolute top-2 right-2 w-7 h-7 bg-white flex items-center justify-center z-10 opacity-0 group-hover:opacity-100 transition-opacity border border-[#BFC3C7] hover:border-black"
                  >
                    <X className="w-3 h-3 text-[#2B2B2B]" />
                  </button>

                  {/* Image */}
                  <div
                    className="relative overflow-hidden bg-[#f4f4f4] rounded-2xl mb-3"
                    style={{ aspectRatio: "3/4" }}
                    onClick={() => router.push(`/products/${item.slug}`)}
                  >
                    <img
                      src={item.productImages?.[0]?.url}
                      alt={item.productName}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex flex-col gap-1 px-1">
                    <p className="text-[0.8rem] font-light text-[#2B2B2B] tracking-wide line-clamp-2 leading-snug">
                      {item.productName}
                    </p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-[0.82rem] font-bold text-black">
                        Rs. {item.productSellingPrice?.toLocaleString()}
                      </span>
                      {item.productOriginalPrice && (
                        <span className="text-[0.72rem] font-light text-[#8A8A8A] line-through">
                          Rs. {item.productOriginalPrice?.toLocaleString()}
                        </span>
                      )}
                    </div>

                    {/* Move to Bag */}
                    <button
                      onClick={() => addToCart(item)}
                      className="mt-2 w-full py-2 border border-black text-black text-[0.68rem] font-bold tracking-[0.14em] hover:bg-black hover:text-white transition"
                    >
                      MOVE TO BAG
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Empty State */}
          {wishlistItems.length === 0 && !loading && (
            <div className="flex flex-col items-center justify-center py-28 gap-5">
              <Heart className="w-14 h-14 text-[#BFC3C7]" strokeWidth={1} />
              <h3 className="text-[1.4rem] font-bold text-black tracking-wide font-nunito">
                Your Wishlist is Empty
              </h3>

              <p className="text-[0.82rem] font-light text-[#8A8A8A] tracking-wide text-center max-w-sm leading-relaxed font-inter">
                Add items you love to your wishlist. Review them anytime and
                easily move them to your bag.
              </p>

              <button className="mt-2 px-8 py-3 bg-black text-white text-[0.72rem] font-bold tracking-[0.18em] hover:bg-[#2B2B2B] transition font-nunito">
                CONTINUE SHOPPING
              </button>
            </div>
          )}

          {/* Loading State */}
          {loading && (
            <div className="flex justify-center py-28">
              <p className="text-[0.78rem] font-light text-[#8A8A8A] tracking-widest">
                LOADING...
              </p>
            </div>
          )}
        </main>
      </div>
      <Footer />
    </>
  );
}
