import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Subscriber from "@/Models/SubscriberModel";

export async function GET() {
  try {
    await connectDB();

    const subscribers = await Subscriber.find({
      isActive: true,
    }).sort({
      createdAt: -1,
    });

    return NextResponse.json({
      success: true,
      subscribers,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { success: false },
      { status: 500 }
    );
  }
}