"use client";

import { useState, useEffect } from "react";
import {
  X,
  Star,
  Package,
  CheckCircle,
  Search,
  SlidersHorizontal,
  ChevronRight,
  User,
  Heart,
  ShoppingBag,
  ArrowLeftRight,
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function OrdersPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [activeTab, setActiveTab] = useState("exchange");
  const [searchQuery, setSearchQuery] = useState("");
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await fetch("/api/orders/users", {
        credentials: "include",
      });

      const data = await res.json();

      if (data.success) {
        const formatted = data.orders.map((o) => ({
          id: o._id,
          status: o.orderStatus,
          deliveryDate: new Date(o.orderDate).toDateString(),

          products: o.items.map((item) => ({
            brand: item.productName,
            name: item.productName,
            size: item.productSize,
            image: item.productImage,
          })),
        }));

        setOrders(formatted);
      }
    } catch (error) {
      console.error("Failed to fetch orders:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-sm text-gray-500">Loading orders...</p>
        </div>
        <Footer />
      </>
    );
  }

  const openModal = (order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedOrder(null);
    setActiveTab("exchange");
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-white pt-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Header */}
          <div className="mb-10 border-b border-[#BFC3C7] pb-6">
            <h1 className="text-[clamp(1.8rem,4vw,2.8rem)] font-bold text-black tracking-wide font-nunito">
              All Orders
            </h1>

            <p className="text-[0.75rem] font-light text-[#8A8A8A] tracking-wide mt-1 font-inter">
              from anytime
            </p>
          </div>

          {/* Search + Filter */}
          <div className="flex gap-3 mb-10">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8A8A8A]" />
              <input
                type="text"
                placeholder="Search in orders"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 border border-[#BFC3C7] text-[0.82rem] font-light text-[#2B2B2B] placeholder-[#BFC3C7] focus:outline-none focus:border-black transition tracking-wide"
              />
            </div>
            <button className="flex items-center gap-2 px-4 py-2.5 border border-[#BFC3C7] text-[0.75rem] font-bold tracking-widest text-black hover:bg-black hover:text-white transition font-nunito">
              <SlidersHorizontal className="w-4 h-4" />
              FILTER
            </button>
          </div>

          {/* Orders List */}
          <div className="space-y-6">
            {orders.map((order) => (
              <div key={order.id} className="border border-[#BFC3C7]">
                {/* Status Header */}
                {order.status === "refund" && (
                  <div className="border-l-4 border-black p-5 flex items-start gap-3">
                    <div className="bg-black rounded-full p-1.5 mt-0.5 shrink-0">
                      <CheckCircle className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <p className="text-[0.78rem] font-bold text-black tracking-wide">
                        Refund Credited
                      </p>
                      <p className="text-[0.75rem] font-light text-[#2B2B2B] mt-1 leading-relaxed tracking-wide">
                        Your refund of{" "}
                        <span className="font-bold">
                          ₹{order.refundAmount.toFixed(2)}
                        </span>{" "}
                        has been processed on {order.refundDate}.
                      </p>
                      <button className="text-[0.7rem] font-bold text-black tracking-widest mt-2 underline underline-offset-2 hover:no-underline transition">
                        View Refund Details
                      </button>
                    </div>
                  </div>
                )}

                {order.status === "delivered" && (
                  <div className="border-l-4 border-black p-5 flex items-start gap-3">
                    <div className="bg-black rounded-full p-1.5 mt-0.5 shrink-0">
                      <Package className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <p className="text-[0.78rem] font-bold text-black tracking-wide">
                        Delivered
                      </p>
                      <p className="text-[0.75rem] font-light text-[#8A8A8A] mt-0.5 tracking-wide">
                        On {order.deliveryDate}
                      </p>
                    </div>
                  </div>
                )}

                {/* Product */}
                {order.products.map((product, idx) => (
                  <div key={idx} className="p-5 border-t border-[#BFC3C7]">
                    <div className="flex gap-4 items-start">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-20 h-20 object-cover bg-[#f4f4f4] shrink-0"
                      />
                      <div className="flex-1">
                        <p className="text-[0.82rem] font-bold text-black tracking-wide">
                          {product.brand}
                        </p>
                        <p className="text-[0.78rem] font-light text-[#2B2B2B] mt-0.5 tracking-wide">
                          {product.name}
                        </p>
                        <p className="text-[0.72rem] font-light text-[#8A8A8A] mt-0.5 tracking-wide">
                          Size: {product.size}
                        </p>
                      </div>
                      <ChevronRight className="w-4 h-4 text-[#BFC3C7] shrink-0 mt-1" />
                    </div>

                    {/* Exchange/Return Notice */}
                    {order.status === "delivered" &&
                      order.exchangeReturnDeadline && (
                        <div className="mt-4 p-3 bg-[#f4f4f4] border border-[#BFC3C7]">
                          <p className="text-[0.72rem] font-light text-[#8A8A8A] tracking-wide">
                            Exchange / Return window closed on{" "}
                            {order.exchangeReturnDeadline}
                          </p>
                        </div>
                      )}

                    {/* Rating */}
                    <div className="mt-4 pt-4 border-t border-[#BFC3C7]">
                      <div className="flex items-center gap-1 mb-1.5">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className="w-5 h-5 text-[#BFC3C7] hover:text-black cursor-pointer transition-colors"
                          />
                        ))}
                      </div>
                      <p className="text-[0.72rem] font-light text-[#8A8A8A] tracking-wide">
                        Rate & Review to earn store credits
                      </p>
                    </div>

                    {/* /Return Button */}
                    {order.status === "delivered" && (
                      <div className="mt-4">
                        <button
                          onClick={() => openModal(order)}
                          className="flex items-center gap-2 px-6 py-2.5 border border-black text-black text-[0.72rem] font-bold tracking-widest hover:bg-black hover:text-white transition"
                        >
                          <ArrowLeftRight className="w-3.5 h-3.5" />
                          EXCHANGE OR RETURN
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Exchange/Return Modal */}
        {isModalOpen && selectedOrder && (
          <div className="fixed inset-0 top-16 bg-black/60 flex items-center justify-center z-50 p-4">
            <div
              className="bg-white max-w-2xl w-full flex flex-col relative"
              style={{ maxHeight: "80vh" }}
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between px-8 py-6 border-b border-[#BFC3C7]">
                <h2
                  className="text-[1.2rem] font-bold text-black tracking-wide"
                  style={{ fontFamily: "'The Seasons', serif" }}
                >
                  Exchange or Return
                </h2>
                <button
                  onClick={closeModal}
                  className="text-[#8A8A8A] hover:text-black transition"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Tabs */}
              <div className="flex border-b border-[#BFC3C7] shrink-0">
                {["exchange", "return"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex-1 py-4 text-[0.7rem] font-bold tracking-[0.14em] transition ${
                      activeTab === tab
                        ? "text-black border-b-2 border-black"
                        : "text-[#8A8A8A] hover:text-black"
                    }`}
                  >
                    {tab === "exchange" ? "EXCHANGE ITEM" : "RETURN ITEM"}
                  </button>
                ))}
              </div>

              {/* Modal Body — scrollable */}
              <div
                className="overflow-y-auto px-8 py-6"
                style={{ scrollbarWidth: "none" }}
              >
                {/* Product Info */}
                <div className="flex gap-4 mb-6 p-4 bg-[#f4f4f4]">
                  <img
                    src={selectedOrder.products[0].image}
                    alt={selectedOrder.products[0].name}
                    className="w-16 h-16 object-cover bg-white shrink-0"
                  />
                  <div>
                    <p className="text-[0.78rem] font-bold text-black tracking-wide">
                      {selectedOrder.products[0].brand}
                    </p>
                    <p className="text-[0.75rem] font-light text-[#2B2B2B] mt-0.5 tracking-wide">
                      {selectedOrder.products[0].name}
                    </p>
                    <p className="text-[0.72rem] font-light text-[#8A8A8A] mt-0.5 tracking-wide">
                      Size: {selectedOrder.products[0].size}
                    </p>
                  </div>
                </div>

                {/* Exchange */}
                {activeTab === "exchange" && (
                  <div className="space-y-6">
                    <div>
                      <p className="text-[0.7rem] font-bold tracking-[0.14em] text-black mb-3">
                        REASON FOR EXCHANGE
                      </p>
                      <select className="w-full px-4 py-3 border border-[#BFC3C7] text-[0.82rem] font-light text-[#2B2B2B] focus:outline-none focus:border-black transition tracking-wide bg-white">
                        <option value="">Select a reason</option>
                        <option value="size">Size doesn't fit</option>
                        <option value="color">Different color needed</option>
                        <option value="defect">Product has defect</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <div>
                      <p className="text-[0.7rem] font-bold tracking-[0.14em] text-black mb-3">
                        SELECT NEW SIZE
                      </p>
                      <div className="flex gap-2 flex-wrap">
                        {["6", "7", "8", "9"].map((size) => (
                          <button
                            key={size}
                            className="px-4 py-2 border border-[#BFC3C7] text-[0.78rem] font-light text-[#2B2B2B] hover:border-black hover:text-black transition"
                          >
                            {size}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-[0.7rem] font-bold tracking-[0.14em] text-black mb-3">
                        EXCHANGE POLICY
                      </p>
                      <ul className="space-y-2">
                        {[
                          "Exchange window is 7 days from delivery",
                          "Product must be unused with original tags",
                          "Free pickup from your address",
                          "New item ships once we receive the return",
                        ].map((point, i) => (
                          <li
                            key={i}
                            className="text-[0.75rem] font-light text-[#2B2B2B] tracking-wide"
                          >
                            — {point}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                {/* Return */}
                {activeTab === "return" && (
                  <div className="space-y-6">
                    <div>
                      <p className="text-[0.7rem] font-bold tracking-[0.14em] text-black mb-3">
                        REASON FOR RETURN
                      </p>
                      <select className="w-full px-4 py-3 border border-[#BFC3C7] text-[0.82rem] font-light text-[#2B2B2B] focus:outline-none focus:border-black transition tracking-wide bg-white">
                        <option value="">Select a reason</option>
                        <option value="not-needed">No longer needed</option>
                        <option value="quality">Quality issues</option>
                        <option value="wrong">Wrong item received</option>
                        <option value="damaged">Item damaged</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <div>
                      <p className="text-[0.7rem] font-bold tracking-[0.14em] text-black mb-3">
                        ADDITIONAL COMMENTS (OPTIONAL)
                      </p>
                      <textarea
                        rows={4}
                        className="w-full px-4 py-3 border border-[#BFC3C7] text-[0.82rem] font-light text-[#2B2B2B] placeholder-[#BFC3C7] focus:outline-none focus:border-black transition tracking-wide resize-none"
                        placeholder="Tell us more about your experience..."
                      />
                    </div>
                    <div>
                      <p className="text-[0.7rem] font-bold tracking-[0.14em] text-black mb-3">
                        REFUND INFORMATION
                      </p>
                      <div className="bg-[#f4f4f4] p-4 border border-[#BFC3C7]">
                        <p className="text-[0.78rem] font-bold text-black tracking-wide">
                          Refund Amount: ₹
                          {selectedOrder.products[0].brand === "ADRO"
                            ? "799.00"
                            : "1199.00"}
                        </p>
                        <p className="text-[0.75rem] font-light text-[#2B2B2B] mt-1 tracking-wide leading-relaxed">
                          Processed within 5–7 business days after we verify the
                          returned item.
                        </p>
                      </div>
                    </div>
                    <div>
                      <p className="text-[0.7rem] font-bold tracking-[0.14em] text-black mb-3">
                        RETURN POLICY
                      </p>
                      <ul className="space-y-2">
                        {[
                          "Return window is 7 days from delivery",
                          "Product must be unused with original tags and packaging",
                          "Free pickup from your address",
                          "Full refund to original payment method",
                        ].map((point, i) => (
                          <li
                            key={i}
                            className="text-[0.75rem] font-light text-[#2B2B2B] tracking-wide"
                          >
                            — {point}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>

              {/* Modal Footer */}
              <div className="px-8 py-5 border-t border-[#BFC3C7] flex gap-3">
                <button
                  onClick={closeModal}
                  className="flex-1 py-3 border border-[#BFC3C7] text-[0.72rem] font-light text-[#2B2B2B] tracking-widest hover:border-black hover:text-black transition"
                >
                  CANCEL
                </button>
                <button className="flex-1 py-3 bg-black text-white text-[0.72rem] font-bold tracking-[0.18em] hover:bg-[#2B2B2B] transition">
                  {activeTab === "exchange"
                    ? "REQUEST EXCHANGE"
                    : "REQUEST RETURN"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}
