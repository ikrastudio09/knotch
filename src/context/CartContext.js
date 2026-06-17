"use client";

import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {

  const [cartCount, setCartCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);

  const fetchCounts = async () => {
    try {

      const cartRes = await fetch("/api/cart/count");
      const cartData = await cartRes.json();
      setCartCount(cartData.cartCount);

      const wishlistRes = await fetch("/api/wishlist/count");
      const wishlistData = await wishlistRes.json();
      setWishlistCount(wishlistData.wishlistCount);

    } catch (err) {
      console.error(err);
    }
  };

  // cart
  const incrementCart = () => setCartCount(prev => prev + 1);
  const decrementCart = () => setCartCount(prev => Math.max(0, prev - 1));

  // wishlist
  const incrementWishlist = () => setWishlistCount(prev => prev + 1);
  const decrementWishlist = () => setWishlistCount(prev => Math.max(0, prev - 1));

  useEffect(() => {
    fetchCounts();
  }, []);

  return (
    <CartContext.Provider
      value={{
        cartCount,
        wishlistCount,
        fetchCounts,
        incrementCart,
        decrementCart,
        incrementWishlist,
        decrementWishlist
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);