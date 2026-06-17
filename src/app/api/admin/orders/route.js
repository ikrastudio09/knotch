import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Order from "@/Models/OrderModel";

export async function GET() {
  try {
    await connectDB();

    const orders = await Order.find()
      .populate("userID", "userName userEmail")
      .sort({ orderDate: -1 });

    return NextResponse.json(orders, { status: 200 });

  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch orders", error: error.message },
      { status: 500 }
    );
  }
}