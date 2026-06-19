import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import VoucherModel from "@/Models/VoucherModel";

export async function POST(req) {
  try {
    await connectDB();

    const data = await req.json();

    const existingVoucher = await VoucherModel.findOne({
      code: data.code.toUpperCase().trim(),
    });

    if (existingVoucher) {
      return NextResponse.json(
        {
          success: false,
          message: "Voucher already exists",
        },
        { status: 400 }
      );
    }

    const voucher = await VoucherModel.create({
      ...data,
      code: data.code.toUpperCase().trim(),
    });

    return NextResponse.json({
      success: true,
      message: "Voucher created successfully",
      voucher,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      { status: 500 }
    );
  }
}