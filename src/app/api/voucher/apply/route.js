import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Voucher from "@/Models/VoucherModel";

export async function POST(req) {
  try {
    await connectDB();

    const { code, cartTotal } = await req.json();

    const voucher = await Voucher.findOne({
      code: code.toUpperCase(),
    });

    if (!voucher)
      return NextResponse.json(
        { success: false, message: "Invalid voucher" },
        { status: 404 }
      );

    if (!voucher.active)
      return NextResponse.json(
        { success: false, message: "Voucher inactive" },
        { status: 400 }
      );

    const now = new Date();

    if (
      voucher.validFrom &&
      now < voucher.validFrom
    ) {
      return NextResponse.json({
        success: false,
        message: "Voucher not started",
      });
    }

    if (
      voucher.validTill &&
      now > voucher.validTill
    ) {
      return NextResponse.json({
        success: false,
        message: "Voucher expired",
      });
    }

    if (
      cartTotal < voucher.minOrderAmount
    ) {
      return NextResponse.json({
        success: false,
        message: `Minimum order ₹${voucher.minOrderAmount}`,
      });
    }

    if (
      voucher.usageLimit &&
      voucher.usedCount >= voucher.usageLimit
    ) {
      return NextResponse.json({
        success: false,
        message: "Voucher exhausted",
      });
    }

    let discount = 0;

    if (voucher.discountType === "flat") {
      discount = voucher.discountValue;
    }

    if (voucher.discountType === "percentage") {
      discount =
        (cartTotal * voucher.discountValue) / 100;

      if (
        voucher.maxDiscount &&
        discount > voucher.maxDiscount
      ) {
        discount = voucher.maxDiscount;
      }
    }

    return NextResponse.json({
      success: true,
      voucherCode: voucher.code,
      discount,
      freeShipping: voucher.freeShipping,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { success: false },
      { status: 500 }
    );
  }
}