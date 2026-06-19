import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import VoucherModel from "@/Models/VoucherModel";

export async function DELETE(req, { params }) {
  try {
    await connectDB();

    const { id } = await params;

    const voucher = await VoucherModel.findByIdAndDelete(
      id
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
      message: "Voucher deleted successfully",
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