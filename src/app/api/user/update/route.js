import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import User from "@/Models/UserModel";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function PUT(req) {
  try {
    await connectDB();

    const body = await req.json();

    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findByIdAndUpdate(
      decoded.id,
      {
        userName: body.userName,
        userNumber: body.userNumber,
        userAddress: body.userAddress
      },
      { new: true }
    );

    return NextResponse.json({ success: true, user });

  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}