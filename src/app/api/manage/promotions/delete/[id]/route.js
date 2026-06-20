import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import PromotionModel from "@/Models/PromotionalModel";
import Order from "@/Models/OrderModel";

/**
 * DELETE /api/manage/promotions/delete/[id]
 *
 * Hard deletes a promotion.
 * Guards against deleting a promotion that has been used in orders
 * (selectedPromotionId references on Order documents).
 *
 * If the promotion has been used, the client should disable it instead.
 */
export async function DELETE(req, { params }) {
  try {
    await connectDB();

    const { id } = await params;

    const promotion = await PromotionModel.findById(id);

    if (!promotion) {
      return NextResponse.json(
        { success: false, message: "Promotion not found" },
        { status: 404 }
      );
    }

    // ── Guard: don't delete promotions referenced in orders ──────────────────
    const usedInOrders = await Order.exists({ selectedPromotionId: id });

    if (usedInOrders) {
      return NextResponse.json(
        {
          success: false,
          message:
            "This promotion has been used in orders and cannot be deleted. Disable it instead to hide it from customers.",
        },
        { status: 409 }
      );
    }

    await PromotionModel.findByIdAndDelete(id);

    return NextResponse.json({
      success: true,
      message: "Promotion deleted",
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}