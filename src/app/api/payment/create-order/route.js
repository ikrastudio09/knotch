import { NextResponse } from "next/server";
import razorpay from "@/lib/razorpay";
import { cookies } from "next/headers";
import User from "@/Models/UserModel";
import jwt from "jsonwebtoken";
import connectDB from "@/lib/db";
import { calculateCartTotals } from "@/lib/calculateCartTotal";

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

    const { voucherCode } = await req.json();

    const totals = await calculateCartTotals(user.cartData, user, voucherCode);

    const order = await razorpay.orders.create({
      amount: totals.finalAmount * 100,
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    });

    return NextResponse.json({
      success: true,
      order,

      payableAmount: totals.finalAmount,

      voucherDiscount: totals.voucherDiscount,

      freeShippingApplied: totals.freeShipping,
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
