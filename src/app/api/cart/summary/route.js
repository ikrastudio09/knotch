import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import User from "@/Models/UserModel";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { getCartSummary } from "@/lib/cartSummary";

export async function GET() {
  try {
    await connectDB();

    const cookieStore = await cookies();

    const token =
      cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized",
        },
        { status: 401 }
      );
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    const user =
      await User.findById(
        decoded.id
      ).populate("cartData.productID");

    const summary =
      await getCartSummary(
        user.cartData
      );

    return NextResponse.json({
      success: true,

      ...summary,
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