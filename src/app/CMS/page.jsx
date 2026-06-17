"use client";
import { useState } from "react";
import CMSlayout   from "@/components/ui/CMSlayout";
import ProductsPage from "@/components/ui/ProductsPage";
import CustomerPage from "@/components/ui/CustomerPage";
import OrdersPage  from "@/components/ui/OrdersPage";

export default function CMSPage() {
  const [page, setPage] = useState("products");

  const renderPage = () => {
    switch (page) {
      case "products":  return <ProductsPage />;
      case "customers": return <CustomerPage />;
      case "orders":    return <OrdersPage />;
      default:          return <ProductsPage />;
    }
  };

  return (
    <>
      {/* Font imports + CSS vars — add to globals.css if preferred */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Jost:wght@300;400;500;600&display=swap');
        :root {
          --seasons : 'Cormorant Garamond', serif;
          --nexa    : 'Jost', sans-serif;
        }
        * { font-family: var(--nexa); }
        ::-webkit-scrollbar       { width: 4px; height: 4px; }
        ::-webkit-scrollbar-track { background: #F8F8F8; }
        ::-webkit-scrollbar-thumb { background: #BFC3C7; }
        ::-webkit-scrollbar-thumb:hover { background: #8A8A8A; }
      `}</style>

      <CMSlayout page={page} setPage={setPage}>
        {renderPage()}
      </CMSlayout>
    </>
  );
}