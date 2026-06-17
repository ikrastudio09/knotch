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
      return NextResponse.json({ cartCount: 0 });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userID = decoded.id;

    const user = await User.findById(userID).select("cartData");

    if (!user) {
      return NextResponse.json({ cartCount: 0 });
    }

    const cartCount = user.cartData.length;

    return NextResponse.json({ cartCount });

  } catch (err) {
    console.error(err);
    return NextResponse.json({ cartCount: 0 });
  }
}