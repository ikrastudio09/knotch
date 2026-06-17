"use client";
import { useState, useEffect } from "react";
import {
  Search,
  Eye,
  X,
  MapPin,
  Phone,
  Mail,
  Calendar,
  ShoppingBag,
  CreditCard,
} from "lucide-react";
import toast from "react-hot-toast";

// ── Mock data (replace with API) ─────────────────────────────
const MOCK_CUSTOMERS = [
  {
    _id: "u1",
    userName: "Aanya Sharma",
    userEmail: "aanya@email.com",
    userNumber: "+91 98765 43210",
    authProvider: "google",
    userRole: "user",
    signUpDate: "2024-03-15",
    userAddress: [
      {
        AddressLine1: "42 Marine Drive",
        City: "Mumbai",
        State: "Maharashtra",
        PinCode: "400001",
        Country: "India",
      },
    ],
    cartData: [],
    wishListData: [],
    orders: 8,
    totalSpent: 24500,
  },
  {
    _id: "u2",
    userName: "Rohan Mehta",
    userEmail: "rohan@email.com",
    userNumber: "+91 87654 32109",
    authProvider: "local",
    userRole: "user",
    signUpDate: "2024-05-22",
    userAddress: [
      {
        AddressLine1: "8 Hauz Khas",
        City: "Delhi",
        State: "Delhi",
        PinCode: "110016",
        Country: "India",
      },
    ],
    cartData: [],
    wishListData: [],
    orders: 3,
    totalSpent: 9200,
  },
  {
    _id: "u3",
    userName: "Priya Kapoor",
    userEmail: "priya@email.com",
    userNumber: "+91 76543 21098",
    authProvider: "local",
    userRole: "user",
    signUpDate: "2023-11-10",
    userAddress: [
      {
        AddressLine1: "15 Indiranagar",
        City: "Bangalore",
        State: "Karnataka",
        PinCode: "560038",
        Country: "India",
      },
    ],
    cartData: [],
    wishListData: [],
    orders: 15,
    totalSpent: 67800,
  },
  {
    _id: "u4",
    userName: "Kabir Nair",
    userEmail: "kabir@email.com",
    userNumber: "+91 65432 10987",
    authProvider: "google",
    userRole: "user",
    signUpDate: "2024-01-08",
    userAddress: [
      {
        AddressLine1: "5 T Nagar",
        City: "Chennai",
        State: "Tamil Nadu",
        PinCode: "600017",
        Country: "India",
      },
    ],
    cartData: [],
    wishListData: [],
    orders: 6,
    totalSpent: 18300,
  },
  {
    _id: "u5",
    userName: "Ishaan Verma",
    userEmail: "ishaan@email.com",
    userNumber: "+91 54321 09876",
    authProvider: "local",
    userRole: "user",
    signUpDate: "2024-07-01",
    userAddress: [
      {
        AddressLine1: "77 Koregaon Park",
        City: "Pune",
        State: "Maharashtra",
        PinCode: "411001",
        Country: "India",
      },
    ],
    cartData: [],
    wishListData: [],
    orders: 2,
    totalSpent: 5600,
  },
  {
    _id: "u6",
    userName: "Meera Joshi",
    userEmail: "meera@email.com",
    userNumber: "+91 43210 98765",
    authProvider: "local",
    userRole: "user",
    signUpDate: "2023-09-14",
    userAddress: [
      {
        AddressLine1: "22 Jubilee Hills",
        City: "Hyderabad",
        State: "Telangana",
        PinCode: "500033",
        Country: "India",
      },
    ],
    cartData: [],
    wishListData: [],
    orders: 22,
    totalSpent: 102400,
  },
];

// ── Avatar initials ──────────────────────────────────────────
const initials = (name) =>
  name
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2) || "??";

// ── Customer Profile Modal ───────────────────────────────────
function CustomerModal({ customer, onClose }) {
  const addr = customer.userAddress?.[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white w-full max-w-lg max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-6 border-b border-[#BFC3C7] sticky top-0 bg-white z-10">
          <p className="text-xs tracking-[0.3em] text-[#8A8A8A] uppercase">
            Customer Profile
          </p>
          <button
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center border border-[#BFC3C7] text-black hover:bg-black hover:text-white hover:border-black transition-all"
          >
            <X size={18} />
          </button>
        </div>

        <div className="px-8 py-6 space-y-7">
          {/* Identity */}
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 bg-black text-white flex items-center justify-center text-xl font-bold flex-shrink-0">
              {initials(customer.userName)}
            </div>
            <div>
              <h2
                className="text-2xl font-bold text-black"
                style={{ fontFamily: "var(--seasons)" }}
              >
                {customer.userName}
              </h2>
              <div className="flex items-center gap-3 mt-1">
                <span
                  className={`text-[10px] px-2 py-0.5 tracking-widest uppercase font-medium border ${customer.authProvider === "google" ? "border-[#2B2B2B] text-[#2B2B2B]" : "border-[#BFC3C7] text-[#8A8A8A]"}`}
                >
                  {customer.authProvider}
                </span>
                <span className="text-[10px] px-2 py-0.5 tracking-widest uppercase font-medium border border-[#BFC3C7] text-[#8A8A8A]">
                  {customer.userRole}
                </span>
              </div>
            </div>
          </div>

          {/* Contact info */}
          <div className="space-y-3">
            <p className="text-xs tracking-[0.25em] text-[#8A8A8A] uppercase border-b border-[#BFC3C7] pb-2">
              Contact
            </p>
            {[
              { icon: Mail, value: customer.userEmail },
              { icon: Phone, value: customer.userNumber || "—" },
              {
                icon: Calendar,
                value: `Joined ${new Date(customer.signUpDate).toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" })}`,
              },
            ].map(({ icon: Icon, value }) => (
              <div key={value} className="flex items-center gap-3">
                <div className="w-8 h-8 border border-[#BFC3C7] flex items-center justify-center flex-shrink-0">
                  <Icon size={13} className="text-[#8A8A8A]" />
                </div>
                <p className="text-sm text-[#2B2B2B]">{value}</p>
              </div>
            ))}
          </div>

          {/* Address */}
          {addr && (
            <div className="space-y-3">
              <p className="text-xs tracking-[0.25em] text-[#8A8A8A] uppercase border-b border-[#BFC3C7] pb-2">
                Primary Address
              </p>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 border border-[#BFC3C7] flex items-center justify-center flex-shrink-0 mt-0.5">
                  <MapPin size={13} className="text-[#8A8A8A]" />
                </div>
                <div>
                  <p className="text-sm text-[#2B2B2B]">{addr.AddressLine1}</p>
                  {addr.AddressLine2 && (
                    <p className="text-sm text-[#2B2B2B]">
                      {addr.AddressLine2}
                    </p>
                  )}
                  <p className="text-sm text-[#2B2B2B]">
                    {addr.City}, {addr.State} — {addr.PinCode}
                  </p>
                  <p className="text-xs text-[#8A8A8A] mt-0.5">
                    {addr.Country}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Stats */}
          <div className="space-y-3">
            <p className="text-xs tracking-[0.25em] text-[#8A8A8A] uppercase border-b border-[#BFC3C7] pb-2">
              Activity
            </p>
            <div className="grid grid-cols-3 gap-3">
              <div className="border border-[#BFC3C7] p-4 text-center">
                <p className="text-3xl font-bold text-black">
                  {customer.orders}
                </p>
                <p className="text-[10px] tracking-widest text-[#8A8A8A] uppercase mt-1">
                  Orders
                </p>
              </div>
              <div className="border border-[#BFC3C7] p-4 text-center">
                <p className="text-3xl font-bold text-black">
                  ₹{(customer.totalSpent / 1000).toFixed(1)}k
                </p>
                <p className="text-[10px] tracking-widest text-[#8A8A8A] uppercase mt-1">
                  Spent
                </p>
              </div>
              <div className="border border-[#BFC3C7] p-4 text-center">
                <p className="text-3xl font-bold text-black">
                  {customer.wishListData?.length ?? 0}
                </p>
                <p className="text-[10px] tracking-widest text-[#8A8A8A] uppercase mt-1">
                  Wishlist
                </p>
              </div>
            </div>
          </div>

          {/* Cart snapshot */}
          <div className="space-y-3">
            <p className="text-xs tracking-[0.25em] text-[#8A8A8A] uppercase border-b border-[#BFC3C7] pb-2">
              Cart ({customer.cartData?.length ?? 0} items)
            </p>
            {customer.cartData?.length === 0 ? (
              <p className="text-sm text-[#8A8A8A]">Cart is empty</p>
            ) : (
              customer.cartData.map((item, i) => (
                <div
                  key={i}
                  className="flex justify-between text-sm py-2 border-b border-[#BFC3C7] last:border-b-0"
                >
                  <span className="text-[#2B2B2B]">
                    Item #{i + 1} — {item.productSize}
                  </span>
                  <span className="font-medium">
                    Qty: {item.productQuantity}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="px-8 py-5 border-t border-[#BFC3C7] bg-[#F8F8F8] sticky bottom-0">
          <button
            onClick={onClose}
            className="w-full py-3 text-xs tracking-widest uppercase bg-black text-white hover:bg-[#2B2B2B] transition-colors font-medium"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Customers Page ───────────────────────────────────────────
export default function CustomerPage() {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);
  const [customers, setCustomers] = useState([]);

  const fetchCustomers = async () => {
    try {
      const res = await fetch("/api/user/admin/fetch");
      const data = await res.json();

      if(data.success){
        setCustomers(data.users);
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchCustomers();
  }, []);

  const filtered = customers.filter(
    (c) =>
      c.userName.toLowerCase().includes(search.toLowerCase()) ||
      c.userEmail.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="space-y-6">
      {/* Heading */}
      <div>
        <p className="text-xs tracking-[0.3em] text-[#8A8A8A] uppercase mb-1">
          Directory
        </p>
        <h1
          className="text-4xl font-bold text-black"
          style={{ fontFamily: "var(--seasons)" }}
        >
          Customers
        </h1>
      </div>

      {/* Search */}
      <div className="relative">
        <Search
          size={15}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8A8A8A]"
        />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border border-[#BFC3C7] pl-11 pr-4 py-3 text-sm text-black placeholder:text-[#8A8A8A] focus:outline-none focus:border-black transition-colors"
          placeholder="Search products..."
        />
      </div>

      {/* Table */}
      <div className="border border-[#BFC3C7] overflow-x-auto">
        <table className="w-full min-w-[700px]">
          <thead>
            <tr className="border-b border-[#BFC3C7] bg-[#F8F8F8]">
              {[
                "Customer",
                "Contact",
                "Location",
                "Auth",
                "Orders",
                "Total Spent",
                "Joined",
                "",
              ].map((h) => (
                <th
                  key={h}
                  className="text-left px-5 py-4 text-xs tracking-widest text-[#8A8A8A] uppercase font-medium whitespace-nowrap"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((c) => {
              const addr = c.userAddress?.[0];
              return (
                <tr
                  key={c._id}
                  className="border-b border-[#BFC3C7] last:border-b-0 hover:bg-[#F8F8F8] transition-colors"
                >
                  {/* Name + avatar */}
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 bg-black text-white text-xs flex items-center justify-center font-bold flex-shrink-0">
                        {initials(c.userName)}
                      </div>
                      <p className="text-sm font-bold text-black whitespace-nowrap">
                        {c.userName}
                      </p>
                    </div>
                  </td>
                  {/* Email + phone */}
                  <td className="px-5 py-4">
                    <p className="text-xs text-[#2B2B2B]">{c.userEmail}</p>
                    <p className="text-xs text-[#8A8A8A]">
                      {c.userNumber || "—"}
                    </p>
                  </td>
                  {/* Location */}
                  <td className="px-5 py-4 text-sm text-[#2B2B2B] whitespace-nowrap">
                    {addr ? `${addr.City}, ${addr.State}` : "—"}
                  </td>
                  {/* Auth provider */}
                  <td className="px-5 py-4">
                    <span className="text-[10px] px-2 py-0.5 border border-[#BFC3C7] text-[#8A8A8A] tracking-widest uppercase">
                      {c.authProvider}
                    </span>
                  </td>
                  {/* Orders */}
                  <td className="px-5 py-4 text-sm font-bold text-black">
                    {c.orders}
                  </td>
                  {/* Total spent */}
                  <td className="px-5 py-4 text-sm font-bold text-black">
                    ₹{c.totalSpent?.toLocaleString()}
                  </td>
                  {/* Join date */}
                  <td className="px-5 py-4 text-xs text-[#8A8A8A] whitespace-nowrap">
                    {new Date(c.signUpDate).toLocaleDateString("en-IN", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </td>
                  {/* View button */}
                  <td className="px-5 py-4">
                    <button
                      onClick={() => setSelected(c)}
                      className="flex items-center gap-1.5 text-xs tracking-widest uppercase border border-[#BFC3C7] px-3 py-2 hover:border-black hover:text-black text-[#8A8A8A] transition-all whitespace-nowrap"
                    >
                      <Eye size={12} /> View
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {selected && (
        <CustomerModal customer={selected} onClose={() => setSelected(null)} />
      )}
    </div>
  );
}
