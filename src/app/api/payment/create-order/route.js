

import { NextResponse } from "next/server";
import razorpay from "@/lib/razorpay";
import { cookies } from "next/headers";
import User from "@/Models/UserModel";
import jwt from "jsonwebtoken";
import connectDB from "@/lib/db";

export async function POST(req) {
  await connectDB();
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    if (!token) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized",
        },
        { status: 401 },
      );
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).populate("cartData.productID");
    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "User not found",
        },
        { status: 404 },
      );
    }

    if (!user.cartData.length) {
      return NextResponse.json(
        {
          success: false,
          message: "Cart empty",
        },
        { status: 400 },
      );
    }
    let total = 0;

    for (const item of user.cartData) {
      total += item.productID.productSellingPrice * item.productQuantity;
    }

    const finalAmount = total + 50;

    const order = await razorpay.orders.create({
      amount: finalAmount * 100,
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    });

    return NextResponse.json({
      success: true,
      order,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      { status: 500 },
    );
  }
}
