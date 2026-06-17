import connectDB from "@/lib/db.js";
import { cookies } from "next/headers";
import User from "@/Models/UserModel";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export const runtime = "nodejs";

export async function DELETE(req) {
  try {
    await connectDB();

    const { productID, productSize } = await req.json();

    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json({ success: false }, { status: 401 });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userID = decoded.id;

    await User.updateOne(
      { _id: userID },
      {
        $pull: {
          cartData: {
            productID,
            productSize,
          },
        },
      }
    );

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}