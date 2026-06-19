"use client";
import {
  CheckCircle,
  Clock,
  Truck,
  XCircle,
  CreditCard,
  AlertCircle,
} from "lucide-react";


const ORDER_STATUS = {
  placed: {
    label: "Placed",
    icon: Clock,
    bg: "bg-[#BFC3C7]",
    text: "text-black",
  },
  confirmed: {
    label: "Confirmed",
    icon: CheckCircle,
    bg: "bg-[#8A8A8A]",
    text: "text-white",
  },
  processing: {
    label: "Processing",
    icon: Clock,
    bg: "bg-[#2B2B2B]",
    text: "text-white",
  },
  shipped: {
    label: "Shipped",
    icon: Truck,
    bg: "bg-[#2B2B2B]",
    text: "text-white",
  },
  "out-for-delivery": {
    label: "Out for Delivery",
    icon: Truck,
    bg: "bg-black",
    text: "text-white",
  },
  delivered: {
    label: "Delivered",
    icon: CheckCircle,
    bg: "bg-black",
    text: "text-white",
  },
  cancelled: {
    label: "Cancelled",
    icon: XCircle,
    bg: "bg-[#8A8A8A]",
    text: "text-white",
  },
  returned: {
    label: "Returned",
    icon: XCircle,
    bg: "bg-[#8A8A8A]",
    text: "text-white",
  },
  rto: {
    label: "RTO",
    icon: AlertCircle,
    bg: "bg-[#2B2B2B]",
    text: "text-white",
  },
};

const PAYMENT_STATUS = {
  pending: {
    label: "Unpaid",
    icon: Clock,
    bg: "bg-[#BFC3C7]",
    text: "text-black",
  },
  paid: { label: "Paid", icon: CreditCard, bg: "bg-black", text: "text-white" },
  failed: {
    label: "Failed",
    icon: AlertCircle,
    bg: "bg-[#8A8A8A]",
    text: "text-white",
  },
};

const SHIP_STATUS = {
  not_created: {
    label: "Not Created",
    icon: Clock,
    bg: "bg-[#BFC3C7]",
    text: "text-black",
  },
  created: {
    label: "Created",
    icon: CheckCircle,
    bg: "bg-[#8A8A8A]",
    text: "text-white",
  },
  pickup_scheduled: {
    label: "Pickup Scheduled",
    icon: Truck,
    bg: "bg-[#2B2B2B]",
    text: "text-white",
  },
  in_transit: {
    label: "In Transit",
    icon: Truck,
    bg: "bg-[#2B2B2B]",
    text: "text-white",
  },
  delivered: {
    label: "Delivered",
    icon: CheckCircle,
    bg: "bg-black",
    text: "text-white",
  },
  cancelled: {
    label: "Cancelled",
    icon: XCircle,
    bg: "bg-[#8A8A8A]",
    text: "text-white",
  },
};

export default function StatusBadge({ status, type = "order" }) {
  const map =
    type === "payment"
      ? PAYMENT_STATUS
      : type === "ship"
      ? SHIP_STATUS
      : ORDER_STATUS;

  const c = map?.[status];

  if (!c) {
    return (
      <span className="px-2 py-1 text-xs bg-red-100 text-red-600">
        {String(status)}
      </span>
    );
  }

  const Icon = c.icon;

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 text-[10px] font-medium tracking-[0.2em] uppercase ${c.bg} ${c.text}`}
    >
      <Icon size={10} strokeWidth={2.5} />
      {c.label}
    </span>
  );
}