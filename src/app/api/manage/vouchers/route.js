import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import VoucherModel from "@/Models/VoucherModel";

export async function GET() {
  try {
    await connectDB();

    const vouchers = await VoucherModel.find()
      .sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      vouchers,
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