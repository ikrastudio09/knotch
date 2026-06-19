import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import VoucherModel from "@/Models/VoucherModel";

export async function PATCH(req, { params }) {
  try {
    await connectDB();

    const { id } = await params;

    const data = await req.json();

    const voucher = await VoucherModel.findByIdAndUpdate(
      id,
      {
        ...data,
      },
      {
        new: true,
      }
    );

    if (!voucher) {
      return NextResponse.json(
        {
          success: false,
          message: "Voucher not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Voucher updated",
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