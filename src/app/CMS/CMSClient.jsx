"use client";

import { useState } from "react";
import CMSlayout from "@/components/ui/CMSlayout";
import ProductsPage from "@/components/ui/ProductsPage";
import CustomerPage from "@/components/ui/CustomerPage";
import OrdersPage from "@/components/ui/OrdersPage";
import VoucherPage from "@/components/ui/VoucherPage";

export default function CMSClient() {
  const [page, setPage] = useState("products");

  const renderPage = () => {
    switch (page) {
      case "products":
        return <ProductsPage />;
      case "customers":
        return <CustomerPage />;
      case "orders":
        return <OrdersPage />;
      case "subscribers":
        return <SubscriberPage />;
      case "voucher":
        return <VoucherPage />;
      default:
        return <ProductsPage />;
    }
  };

  return (
    <CMSlayout page={page} setPage={setPage}>
      {renderPage()}
    </CMSlayout>
  );
}
