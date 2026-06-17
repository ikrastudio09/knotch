import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Order from "@/Models/OrderModel";
import mongoose from "mongoose";

export async function PATCH(req, { params }) {
  try {
    await connectDB();

    const { orderId } = params;
    const { orderStatus } = await req.json();

    const allowedStatuses = [
      "placed",
      "confirmed",
      "shipped",
      "out-for-delivery",
      "delivered",
      "cancelled",
    ];

    if (!mongoose.Types.ObjectId.isValid(orderId)) {
      return NextResponse.json(
        { success: false, message: "Invalid order ID" },
        { status: 400 }
      );
    }

    if (!allowedStatuses.includes(orderStatus)) {
      return NextResponse.json(
        { success: false, message: "Invalid order status" },
        { status: 400 }
      );
    }

    const order = await Order.findByIdAndUpdate(
      orderId,
      { orderStatus },
      { new: true }
    );

    if (!order) {
      return NextResponse.json(
        { success: false, message: "Order not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, order },
      { status: 200 }
    );

  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to update order",
        error: error.message,
      },
      { status: 500 }
    );
  }
}