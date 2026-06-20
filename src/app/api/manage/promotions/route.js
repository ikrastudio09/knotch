import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import PromotionModel from "@/Models/PromotionalModel";

/**
 * GET /api/manage/promotions
 *
 * Returns all promotions (active + inactive) with their category populated.
 * Used by the CMS promotions page.
 */
export async function GET() {
  try {
    await connectDB();

    const promotions = await PromotionModel.find({})
      .populate("categoryID", "categoryName")
      .sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      promotions,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}