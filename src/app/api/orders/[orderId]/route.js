import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Order from "@/Models/OrderModel";

export async function GET(req, context) {
  try {
    await connectDB();

    const { orderId } = await context.params;

    const order = await Order.findById(orderId);

    if (!order) {
      return NextResponse.json(
        { success: false, message: "Order not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      order,
    });

  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}