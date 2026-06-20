"use client";

import {
  Package, Users, ShoppingBag,
  ChevronRight,
  Mail,
  Tag,
  Gift,
} from "lucide-react";

const NAV = [
  { id: "products",  label: "Products",  icon: Package },
  { id: "customers", label: "Customers", icon: Users },
  { id: "orders",    label: "Orders",    icon: ShoppingBag },
  { id: "subscribers",    label: "Subscribers",    icon: Mail },
  { id: "voucher",    label: "Vouchers",    icon: Tag },
  { id: "promotion",    label: "Promotions",    icon: Gift },
];

export default function CMSLayout({ page, setPage, children }) {
  return (
    <div
      className="flex h-screen bg-white overflow-hidden"
      style={{ fontFamily: "var(--nexa)" }}
    >
      {/* ── Sidebar ─────────────────────────────────────────── */}
      <aside className="w-60 flex-shrink-0 border-r border-[#BFC3C7] flex flex-col bg-white">
        {/* Logo */}
        <div className="px-6 py-7 border-b border-[#BFC3C7]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-black" />
            <div>
              <p className="text-sm font-bold tracking-widest uppercase text-black leading-none">
                Knotch
              </p>
              <p className="text-[10px] tracking-[0.3em] text-[#8A8A8A] uppercase mt-0.5">
                Admin CMS
              </p>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
          {NAV.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setPage(id)}
              className={`w-full flex items-center gap-3 px-4 py-3 text-xs tracking-widest uppercase transition-all text-left
                ${page === id
                  ? "bg-black text-white"
                  : "text-[#8A8A8A] hover:text-black hover:bg-[#F8F8F8]"
                }`}
            >
              <Icon size={15} />
              {label}
            </button>
          ))}
        </nav>

        {/* Bottom user chip */}
        <div className="px-6 py-5 border-t border-[#BFC3C7]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#2B2B2B] text-white text-xs flex items-center justify-center font-bold">
              K
            </div>
            <div>
              <p className="text-xs font-bold text-black">knotch</p>
              <p className="text-[10px] text-[#8A8A8A]">Super User</p>
            </div>
          </div>
        </div>
      </aside>

      {/* ── Main ────────────────────────────────────────────── */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <header className="flex items-center justify-between px-8 py-5 border-b border-[#BFC3C7] flex-shrink-0">
          <div className="flex items-center gap-2 text-xs text-[#8A8A8A] tracking-widest uppercase">
            <span>CMS</span>
            <ChevronRight size={12} />
            <span className="text-black">
              {NAV.find((n) => n.id === page)?.label}
            </span>
          </div>
        </header>

        {/* Page content */}
        <div className="flex-1 overflow-y-auto p-8">{children}</div>
      </main>
    </div>
  );
}