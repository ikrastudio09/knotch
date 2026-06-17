import mongoose from "mongoose";
import shippingSchema from "./ShippingModel.js";

const orderItemSchema = new mongoose.Schema(
  {
    productID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Products",
      required: true,
    },

    productName: {
      type: String,
      required: true,
    },

    sellingPrice: {
      type: Number,
      required: true,
    },

    originalPrice: {
      type: Number,
    },

    productImage: {
      type: String,
    },

    productSize: {
      type: String,
      required: true,
    },

    quantity: {
      type: Number,
      required: true,
    },
  },
  { _id: false },
);

const addressSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },

    phone: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
    },
    AddressLine1: { type: String, required: true },
    AddressLine2: String,
    State: { type: String, required: true },
    City: { type: String, required: true },
    PinCode: { type: String, required: true },
    Country: { type: String, default: "India" },
  },
  { _id: false },
);

const orderSchema = new mongoose.Schema(
  {
    orderNumber: {
      type: String,
      unique: true,
      default: () => `ORD-${Date.now()}`,
    },

    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    items: {
      type: [orderItemSchema],
      required: true,
    },

    shippingAddress: addressSchema,

    shipping: shippingSchema,
    shippingError: {
      type: String,
    },

    razorpayOrderID: {
      type: String,
    },

    razorpaySignature: {
      type: String,
    },

    paymentMethod: {
      type: String,
      enum: ["razorpay"],
      default: "razorpay",
    },

    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed"],
      default: "pending",
      index: true,
    },

    paymentID: {
      type: String,
    },

    orderStatus: {
      type: String,
      enum: [
        "placed",
        "confirmed",
        "processing",
        "shipped",
        "out-for-delivery",
        "delivered",
        "cancelled",
        "returned",
        "rto",
      ],
      default: "placed",
      index: true,
    },

    totalAmount: {
      type: Number,
      required: true,
    },

    totalItems: {
      type: Number,
      required: true,
    },

    orderDate: {
      type: Date,
      default: Date.now,
      index: true,
    },
  },
  { timestamps: true },
);

const Order = mongoose.models.Order || mongoose.model("Order", orderSchema);

export default Order;
