import connectDB from "@/lib/db.js";
import { cookies } from "next/headers";
import User from "@/Models/UserModel";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export const runtime = "nodejs";

export async function GET() {
  try {
    await connectDB();

    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json({ wishlistCount: 0 });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userID = decoded.id;

    const user = await User.findById(userID).select("wishListData");

    const wishlistCount = user.wishListData.length;

    return NextResponse.json({ wishlistCount });
  } catch (err) {
    return NextResponse.json({ wishlistCount: 0 });
  }
}