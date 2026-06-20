import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Order from "@/Models/OrderModel";
import mongoose from "mongoose";

export async function PATCH(req, context) {
  try {
    await connectDB();

    const { id } = await context.params;

    console.log("ORDER ID:", id);

    const { orderStatus, paymentStatus } = await req.json();

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid order ID",
        },
        { status: 400 }
      );
    }

    const order = await Order.findByIdAndUpdate(
      id,
      {
        orderStatus,
        paymentStatus,
      },
      {
        new: true,
      }
    );

    return NextResponse.json({
      success: true,
      order,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error.message,
      },
      {
        status: 500,
      }
    );
  }
}