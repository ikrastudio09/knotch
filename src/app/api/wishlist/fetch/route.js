import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import User from "@/Models/UserModel";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function POST() {
  try {

    await connectDB();

    // Read token from cookies
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    // Decode token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userID = decoded.id;

    // Fetch user and populate products
    const user = await User.findById(userID).populate({
      path: "wishListData",
      select: "productName productSellingPrice productOriginalPrice productImages slug"
    });

    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      wishlist: user.wishListData
    });

  } catch (error) {

    return NextResponse.json(
      {
        success: false,
        error: error.message
      },
      { status: 500 }
    );
  }
}