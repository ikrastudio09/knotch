import { NextResponse } from "next/server";
import razorpay from "@/lib/razorpay";
import { cookies } from "next/headers";
import User from "@/Models/UserModel";
import jwt from "jsonwebtoken";
import connectDB from "@/lib/db";
import VoucherModel from "@/Models/VoucherModel";

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

    let total = 0;

    for (const item of user.cartData) {
      total += item.productID.productSellingPrice * item.productQuantity;
    }
    let voucherDiscount = 0;
    let freeShippingApplied = false;

    let voucher = null;

    if (voucherCode) {
      voucher = await VoucherModel.findOne({
        code: voucherCode.toUpperCase().trim(),
      });

      if (!voucher) {
        throw new Error("Invalid voucher");
      }

      if (!voucher.active) {
        throw new Error("Voucher inactive");
      }

      const now = new Date();

      if (voucher.validFrom && now < voucher.validFrom) {
        throw new Error("Voucher not started");
      }

      if (voucher.validTill && now > voucher.validTill) {
        throw new Error("Voucher expired");
      }

      if (voucher.usedBy.some((id) => id.toString() === user._id.toString())) {
        throw new Error("Voucher already used");
      }

      if (total < voucher.minOrderAmount) {
        throw new Error(`Minimum order amount ₹${voucher.minOrderAmount}`);
      }

      if (voucher.usageLimit && voucher.usedCount >= voucher.usageLimit) {
        throw new Error("Voucher usage limit reached");
      }

      if (voucher.discountType === "flat") {
        voucherDiscount = voucher.discountValue;
      }

      if (voucher.discountType === "percentage") {
        voucherDiscount = (total * voucher.discountValue) / 100;
      }

      if (voucher.maxDiscount && voucherDiscount > voucher.maxDiscount) {
        voucherDiscount = voucher.maxDiscount;
      }

      if (voucher.freeShipping) {
        freeShippingApplied = true;
      }

      voucherDiscount = Math.min(voucherDiscount, total);
    }

    const shippingCost = freeShippingApplied ? 0 : 50;

    const finalAmount = total + shippingCost - voucherDiscount;

    const order = await razorpay.orders.create({
      amount: finalAmount * 100,
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    });

    return NextResponse.json({
      success: true,
      order,

      payableAmount: finalAmount,

      voucherDiscount,

      freeShippingApplied,
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
