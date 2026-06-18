"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { X, Heart, Currency } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import toast from "react-hot-toast";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";
export default function CartPage() {
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [savedAddresses, setSavedAddresses] = useState([]); // Empty initially - will show modal
  const [addressForm, setAddressForm] = useState({
    name: "",
    email: "",
    mobile: "",
    pincode: "",
    houseNumber: "",
    address: "",
    locality: "",
    city: "",
    state: "",
    addressType: "Home",
    paymentType: "COD",
  });

  const router = useRouter();
  const [selectedAddressIndex, setSelectedAddressIndex] = useState(0);

  const [cartItems, setCartItems] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);
  const [cartCount, setCartCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const { decrementCart, incrementWishlist } = useCart();

  const loadRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");

      script.src = "https://checkout.razorpay.com/v1/checkout.js";

      script.onload = () => resolve(true);

      script.onerror = () => resolve(false);

      document.body.appendChild(script);
    });
  };

  const fetchCart = async () => {
    try {
      const res = await fetch("/api/cart", {
        method: "GET",
      });

      const data = await res.json();

      if (data.success) {
        setCartItems(data.cart);
        setCartTotal(data.cartTotal);
      }

      console.log(data.cart);

      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const removeItem = async (productID, size) => {
    try {
      const res = await fetch("/api/cart/delete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productID,
          productSize: size,
        }),
      });

      const data = await res.json();

      if (data.success) {
        toast.success("Product removed from cart");
        fetchCart();
        decrementCart();
      } else {
        toast.error("Product removal failed");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  const updateQuantity = async (productID, size, action) => {
    try {
      const res = await fetch("/api/cart/update", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productID,
          productSize: size,
          action,
        }),
      });

      const data = await res.json();

      if (data.success) {
        fetchCart();
      } else {
        toast.error(data.message || "Failed to update quantity");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  const moveToWishlist = async (productID, size) => {
    try {
      const wishlistRes = await fetch("/api/wishlist/toggle", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productID }),
      });

      const wishlistData = await wishlistRes.json();

      if (!wishlistData.success) {
        toast.error("Failed to move to wishlist");
        return;
      }

      const cartRes = await fetch("/api/cart/delete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productID,
          productSize: size,
        }),
      });

      const cartData = await cartRes.json();

      if (cartData.success) {
        toast.success("Moved to wishlist");
        fetchCart();
        incrementWishlist();
        decrementCart();
      } else {
        toast.error("Failed to update cart");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  const totalMRP = cartItems.reduce(
    (sum, item) => sum + item.originalPrice * item.quantity,
    0,
  );

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const discount = totalMRP - totalPrice;
  const platformFee = 0;
  const finalAmount = totalPrice + platformFee;

  const handleSaveAddress = async () => {
    if (
      !addressForm.name ||
      !addressForm.email ||
      !addressForm.mobile ||
      !addressForm.pincode ||
      !addressForm.address
    ) {
      toast.error("Fill all fields");
      return;
    }

    const shippingAddress = {
      fullName: addressForm.name,
      email: addressForm.email,
      phone: addressForm.mobile,
      AddressLine1: addressForm.houseNumber,
      AddressLine2: addressForm.address,
      City: addressForm.city,
      State: addressForm.state,
      PinCode: addressForm.pincode,
      Country: "India",
    };

    placeOrder(shippingAddress);
  };

  const handleInputChange = (e) => {
    setAddressForm({
      ...addressForm,
      [e.target.name]: e.target.value,
    });
  };

  const placeOrder = async (shippingAddress) => {
    if (cartItems.length === 0) {
      toast.error("Cart is empty");
      return;
    }

    try {
      const loaded = await loadRazorpay();

      if (!loaded) {
        toast.error("RazorPay failed to load");
        return;
      }

      const res = await fetch("/api/payment/create-order", {
        method: "POST",
      });

      const data = await res.json();

      if (!data.success) {
        toast.error(data.message);
        return;
      }

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: data.order.amount,
        currency: data.order.currency,
        order_id: data.order.id,
        name: "Knotch",
        description: "Order Payment",
        handler: async function (response) {
          const orderRes = await fetch("/api/orders/create", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              shippingAddress,

              shipping: {
                method: "standard",
                cost: 50,
              },

              razorpayOrderID: response.razorpay_order_id,

              paymentID: response.razorpay_payment_id,

              razorpaySignature: response.razorpay_signature,

              paymentMethod: "razorpay",
            }),
          });

          const orderData = await orderRes.json();
          if (orderData.success) {
            toast.success("Order Placed");
            window.location.href = `/Orders`;
          }
        },

        prefill: {
          name: shippingAddress.fullName,
          email: shippingAddress.email,
          contact: shippingAddress.phone,
        },
        modal: {
          ondismiss: function () {
            toast.error("Payment cancelled");
          },
        },
      };
      if (!window.Razorpay) {
        toast.error("Razorpay SDK not loaded");
        return;
      }
      const paymentObject = new window.Razorpay(options);

      paymentObject.open();
    } catch (error) {
      console.error(error);

      toast.error(error.message || "Something went wrong");
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-white pt-16">
        <div className="max-w-7xl mx-auto px-4 py-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* ── LEFT: Cart Items ── */}
            <div className="lg:col-span-2 space-y-4">
              {/* Items Selection Header */}
              <div className="bg-white border border-[#BFC3C7] p-4">
                <h1 className="text-black text-2xl text-center font-nunito">
                  Your Products
                </h1>

                {/* Cart Items */}
                <div className="space-y-6">
                  {cartItems?.map((item) => (
                    <div
                      key={item.productID + item.size}
                      className="border-t border-[#BFC3C7] pt-5"
                    >
                      <div className="flex gap-4 items-start">
                        <img
                          src={item.image}
                          alt={item.productName}
                          className="w-24 h-32 object-cover rounded-xl bg-[#f4f4f4] shrink-0"
                        />
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <div className="flex flex-col gap-1">
                              <p className="text-[0.78rem] font-light text-[#2B2B2B] tracking-wide">
                                {item.productName}
                              </p>
                              <div className="flex gap-3 mt-2">
                                <div className="border border-[#BFC3C7] px-3 py-1.5 text-[0.75rem] font-light text-black bg-white focus:outline-none focus:border-black transition">
                                  <span>Size: {item.size}</span>
                                </div>
                                <div className="flex items-center border border-[#BFC3C7] text-black">
                                  <button
                                    onClick={() =>
                                      updateQuantity(
                                        item.productID,
                                        item.size,
                                        "dec",
                                      )
                                    }
                                    className="px-3 py-1 text-sm hover:bg-gray-100"
                                  >
                                    −
                                  </button>

                                  <span className="px-3 text-[0.8rem]">
                                    {item.quantity}
                                  </span>

                                  <button
                                    onClick={() =>
                                      updateQuantity(
                                        item.productID,
                                        item.size,
                                        "inc",
                                      )
                                    }
                                    className="px-3 py-1 text-sm hover:bg-gray-100"
                                  >
                                    +
                                  </button>
                                </div>
                                {item.badge && (
                                  <span className="bg-black text-white px-2 py-1 text-[0.65rem] font-bold tracking-widest">
                                    {item.badge}
                                  </span>
                                )}
                              </div>
                              <div className="mt-3 flex items-center gap-2">
                                <span className="text-[0.88rem] font-bold text-black">
                                  ₹{item.price.toLocaleString()}
                                </span>
                                <span className="text-[0.75rem] font-light text-[#8A8A8A] line-through">
                                  ₹{item.originalPrice?.toLocaleString()}
                                </span>
                              </div>
                              <p className="text-[0.72rem] font-light text-[#8A8A8A] mt-1 tracking-wide">
                                ✓ 7 days return available
                              </p>
                            </div>
                            <div className="flex items-center gap-3">
                              <button
                                title="Move to wishlist"
                                onClick={() =>
                                  moveToWishlist(item.productID, item.size)
                                }
                                className="text-[#BFC3C7] hover:text-black transition"
                              >
                                <Heart className="w-6 h-6" />
                              </button>

                              <button
                                title="Remove from cart"
                                onClick={() =>
                                  removeItem(item.productID, item.size)
                                }
                                className="text-[#BFC3C7] hover:text-black transition"
                              >
                                <X className="w-6 h-6" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* ── RIGHT: Summary ── */}
            <div className="space-y-4">
              {/* Price Details */}
              <div className="bg-white border border-[#BFC3C7] p-5">
                <h3 className="text-[0.7rem] font-bold tracking-[0.14em] text-black mb-5">
                  PRICE DETAILS ({cartItems.length} ITEMS)
                </h3>
                <div className="space-y-3 text-[0.78rem]">
                  <div className="flex justify-between">
                    <span className="font-light text-[#2B2B2B] tracking-wide">
                      Total
                    </span>
                    <span className="font-light text-[#2B2B2B]">
                      ₹{totalMRP.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-light text-[#2B2B2B] tracking-wide">
                      Discount
                    </span>
                    <span className="font-bold text-black">
                      − ₹{discount.toLocaleString()}
                    </span>
                  </div>
                  {/* <div className="flex justify-between">
                    <span className="font-light text-[#2B2B2B] tracking-wide">
                      Coupon Discount
                    </span>
                    <button className="font-bold text-black underline underline-offset-2 hover:no-underline transition">
                      Apply Coupon
                    </button>
                  </div> */}
                  <div className="flex justify-between">
                    <span className="font-light text-[#2B2B2B] tracking-wide">
                      Platform Fee
                    </span>
                    <span className="font-light text-[#2B2B2B]">
                      ₹{platformFee}
                    </span>
                  </div>
                  <div className="border-t border-[#BFC3C7] pt-4 flex justify-between">
                    <span className="font-bold text-black tracking-wide text-[0.82rem]">
                      Total Amount
                    </span>
                    <span className="font-bold text-black text-[0.82rem]">
                      ₹{finalAmount.toLocaleString()}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => setShowAddressModal(true)}
                  className="w-full bg-black text-white py-4 text-[0.75rem] font-bold tracking-[0.18em] uppercase hover:bg-[#2B2B2B] transition mt-6"
                >
                  PLACE ORDER
                </button>
                <p className="text-[0.7rem] font-light text-[#8A8A8A] mt-3 tracking-wide leading-relaxed">
                  By placing the order, you agree to our{" "}
                  <a
                    href="#"
                    className="text-black underline underline-offset-2 hover:no-underline"
                  >
                    Terms of Use
                  </a>{" "}
                  and{" "}
                  <a
                    href="#"
                    className="text-black underline underline-offset-2 hover:no-underline"
                  >
                    Privacy Policy
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ── Address Modal ── */}
        {showAddressModal && (
          <div className="fixed inset-0 top-16 bg-black/60 flex items-center justify-center z-50 p-4">
            <div className="bg-white max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 relative max-h-[85vh]">
              {/* Close button */}
              <button
                onClick={() => setShowAddressModal(false)}
                className="absolute top-2 right-2 z-10 text-[#8A8A8A] hover:text-black transition"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Left — Form */}
              <div
                className="p-8 overflow-y-auto max-h-[85vh]"
                style={{ scrollbarWidth: "none" }}
              >
                {/* ... rest of form unchanged ... */}
                <h2 className="text-[1.4rem] font-bold text-black tracking-wide mb-6 font-nunito">
                  Contact Details
                </h2>

                <div className="space-y-4">
                  {[
                    { name: "name", placeholder: "Name*", type: "text" },
                    {
                      name: "email",
                      placeholder: "Email Address*",
                      type: "email",
                    },
                    { name: "mobile", placeholder: "Mobile No*", type: "tel" },
                  ].map((field) => (
                    <input
                      key={field.name}
                      type={field.type}
                      name={field.name}
                      value={addressForm[field.name]}
                      onChange={handleInputChange}
                      placeholder={field.placeholder}
                      className="w-full px-4 py-3 border border-[#BFC3C7] text-[0.82rem] font-light text-[#2B2B2B] placeholder-[#BFC3C7] focus:outline-none focus:border-black transition tracking-wide"
                    />
                  ))}

                  <p className="text-[0.7rem] font-bold tracking-[0.14em] text-black pt-2 font-nunito">
                    ADDRESS
                  </p>

                  {[
                    { name: "pincode", placeholder: "Pin Code*" },
                    {
                      name: "houseNumber",
                      placeholder: "House Number / Tower / Block*",
                    },
                    {
                      name: "address",
                      placeholder: "Address (locality, building, street)*",
                    },
                    { name: "locality", placeholder: "Locality / Town*" },
                  ].map((field) => (
                    <input
                      key={field.name}
                      type="text"
                      name={field.name}
                      value={addressForm[field.name]}
                      onChange={handleInputChange}
                      placeholder={field.placeholder}
                      className="w-full px-4 py-3 border border-[#BFC3C7] text-[0.82rem] font-light text-[#2B2B2B] placeholder-[#BFC3C7] focus:outline-none focus:border-black transition tracking-wide"
                    />
                  ))}

                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { name: "city", placeholder: "City / District*" },
                      { name: "state", placeholder: "State*" },
                    ].map((field) => (
                      <input
                        key={field.name}
                        type="text"
                        name={field.name}
                        value={addressForm[field.name]}
                        onChange={handleInputChange}
                        placeholder={field.placeholder}
                        className="w-full px-4 py-3 border border-[#BFC3C7] text-[0.82rem] font-light text-[#2B2B2B] placeholder-[#BFC3C7] focus:outline-none focus:border-black transition tracking-wide"
                      />
                    ))}
                  </div>

                  <div>
                    <p className="text-[0.7rem] font-bold tracking-[0.14em] text-black mb-3 font-nunito">
                      ADDRESS TYPE
                    </p>
                    <div className="flex gap-6">
                      {["Home", "Office"].map((type) => (
                        <label
                          key={type}
                          className="flex items-center gap-2 cursor-pointer"
                        >
                          <input
                            type="radio"
                            name="addressType"
                            value={type}
                            checked={addressForm.addressType === type}
                            onChange={handleInputChange}
                            className="accent-black"
                          />
                          <span className="text-[0.78rem] font-light text-[#2B2B2B] tracking-wide">
                            {type}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-[0.7rem] font-bold tracking-[0.14em] text-black mb-3 font-nunito">
                      PAYMENT TYPE
                    </p>
                    <div className="flex gap-6">
                      {["COD", "UPI"].map((type) => (
                        <label
                          key={type}
                          className="flex items-center gap-2 cursor-pointer"
                        >
                          <input
                            type="radio"
                            name="paymentType"
                            value={type}
                            checked={addressForm.paymentType === type}
                            onChange={handleInputChange}
                            className="accent-black"
                          />
                          <span className="text-[0.78rem] font-light text-[#2B2B2B] tracking-wide">
                            {type === "COD" ? "Cash on Delivery" : "UPI"}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 mt-8 pb-4">
                  <button
                    onClick={() => setShowAddressModal(false)}
                    className="flex-1 py-3 border border-[#BFC3C7] text-[0.75rem] font-light text-[#2B2B2B] tracking-widest hover:border-black hover:text-black transition font-nunito"
                  >
                    CANCEL
                  </button>
                  <button
                    onClick={handleSaveAddress}
                    className="flex-1 py-3 bg-black text-white text-[0.75rem] font-bold tracking-[0.18em] hover:bg-[#2B2B2B] transition font-nunito"
                  >
                    PLACE ORDER
                  </button>
                </div>
              </div>

              {/* Right — Price Summary */}
              <div className="bg-[#f4f4f4] p-8 border-l border-[#BFC3C7]">
                <div className="bg-white border border-[#BFC3C7] p-6 sticky top-6">
                  <h3 className="text-[0.7rem] font-bold tracking-[0.14em] text-black mb-5 font-nunito">
                    PRICE DETAILS ({cartItems.length} ITEMS)
                  </h3>
                  <div className="space-y-3 text-[0.78rem]">
                    <div className="flex justify-between">
                      <span className="font-light text-[#2B2B2B] tracking-wide font-nunito">
                        Total MRP
                      </span>
                      <span className="font-light text-[#2B2B2B]">
                        ₹{totalMRP.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-light text-[#2B2B2B] tracking-wide font-nunito">
                        Discount on MRP
                      </span>
                      <span className="font-bold text-black font-inter">
                        − ₹{discount.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-light text-[#2B2B2B] tracking-wide font-nunito">
                        Platform Fee
                      </span>
                      <span className="font-light text-[#2B2B2B] font-inter">
                        ₹{platformFee}
                      </span>
                    </div>
                    <div className="border-t border-[#BFC3C7] pt-4 flex justify-between font-nunito">
                      <span className="font-bold text-black tracking-wide text-[0.82rem] font-inter">
                        Total Amount
                      </span>
                      <span className="font-bold text-black text-[0.82rem] font-inter">
                        ₹{finalAmount.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}
