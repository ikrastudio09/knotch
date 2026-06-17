import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import User from "@/Models/UserModel";
import bcrypt from "bcryptjs";
import { signToken } from "@/lib/jwt";

export async function POST(req) {
  await connectDB();

  const { userEmail, userNumber, userPassword } = await req.json();

  const user = await User.findOne({
    $or: [
      ...(userEmail ? [{ userEmail }] : []),
      ...(userNumber ? [{ userNumber }] : []),
    ],
  });
  if (!user)
    return NextResponse.json(
      { message: "Invalid Credentials, Please Try Again" },
      { status: 400 },
    );

  const isMatch = await bcrypt.compare(userPassword, user.userPassword);
  if (!isMatch)
    return NextResponse.json(
      { message: "Invalid Credentials, Please Try Again" },
      { status: 400 },
    );

  const token = signToken(user);
  const response = NextResponse.json({ message: "Login successful" });

  response.cookies.set({
    name: "token",
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 60 * 24,
  });

  return response;
}
