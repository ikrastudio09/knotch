import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Subscriber from "@/Models/SubscriberModel";

export const runtime = "nodejs";

export async function POST(request) {
  try {
    await connectDB();

    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { success: false, message: "Email required" },
        { status: 400 }
      );
    }

    const existing = await Subscriber.findOne({ email });

    if (existing) {
      return NextResponse.json({
        success: true,
        message: "Already subscribed",
      });
    }

    await Subscriber.create({
      email,
    });

    return NextResponse.json({
      success: true,
      message: "Subscribed successfully",
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong",
      },
      {
        status: 500,
      }
    );
  }
}