import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import connectDB from "@/lib/db";
import User from "@/Models/UserModel";
import { calculateCartTotals } from "@/lib/calculateCartTotal";

/**
 * GET /api/cart/calculate
 *
 * Called by the cart page on load and after every cart mutation.
 * Returns full totals, promotion trackers, and available promotions
 * so the UI can render progress and selection without a round-trip
 * to the payment route.
 *
 * Query params (all optional):
 *   ?voucherCode=FLAT100
 *   ?selectedPromotionId=<ObjectId>
 */
export async function GET(req) {
  try {
    await connectDB();

    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).populate(
      "cartData.productID"
    );

    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    if (!user.cartData.length) {
      return NextResponse.json({
        success: true,
        subtotal: 0,
        promotionDiscount: 0,
        voucherDiscount: 0,
        shippingCost: 50,
        finalAmount: 50,
        appliedPromotions: [],
        promotionTrackers: [],
        availablePromotions: [],
      });
    }

    const { searchParams } = new URL(req.url);
    const voucherCode = searchParams.get("voucherCode") || undefined;
    const selectedPromotionId =
      searchParams.get("selectedPromotionId") || undefined;

    const totals = await calculateCartTotals(
      user.cartData,
      user,
      voucherCode,
      selectedPromotionId
    );

    return NextResponse.json({
      success: true,
      subtotal: totals.subtotal,
      promotionDiscount: totals.promotionDiscount,
      voucherDiscount: totals.voucherDiscount,
      shippingCost: totals.shippingCost,
      finalAmount: totals.finalAmount,
      appliedPromotions: totals.appliedPromotions,
      promotionTrackers: totals.promotionTrackers,
      // Strip Mongoose docs down to plain objects for the client
      availablePromotions: totals.availablePromotions.map((p) => ({
        _id: p._id.toString(),
        title: p.title,
        bundlePrice: p.bundlePrice,
        requiredQuantity: p.requiredQuantity,
        categoryName: p.categoryID?.categoryName,
      })),
    });
  } catch (error) {
    // Mutual exclusion error and other validation errors are 400
    const status =
      error.message.includes("cannot use") ||
      error.message.includes("requires")
        ? 400
        : 500;

    return NextResponse.json(
      { success: false, message: error.message },
      { status }
    );
  }
}