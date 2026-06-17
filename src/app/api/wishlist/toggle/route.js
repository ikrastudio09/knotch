import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import User from "@/Models/UserModel";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function POST(req) {
  try {

    await connectDB();

    const { productID } = await req.json();

    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userID = decoded.id;

    const user = await User.findById(userID);

    const idx = user.wishListData.findIndex(
      (id) => id.toString() === productID
    );

    if (idx > -1) {
      user.wishListData.splice(idx, 1);

      await user.save();

      return NextResponse.json({
        success: true,
        action: "removed"
      });
    }

    user.wishListData.push(productID);
    await user.save();

    return NextResponse.json({
      success: true,
      action: "added"
    });

  } catch (error) {

    return NextResponse.json({
      success: false,
      error: error.message
    }, { status: 500 });

  }
}