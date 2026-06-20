import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import PromotionModel from "@/Models/PromotionalModel";
import CategoryModel from "@/Models/CategoryModel";

/**
 * PATCH /api/manage/promotions/update/[id]
 *
 * Partial update — send only the fields you want to change.
 * Used for:
 *   - Full edit (all fields)
 *   - Quick toggle: { active: true/false }
 */
export async function PATCH(req, { params }) {
  try {
    await connectDB();

    const { id } = await params;
    const body = await req.json();

    const promotion = await PromotionModel.findById(id);

    if (!promotion) {
      return NextResponse.json(
        { success: false, message: "Promotion not found" },
        { status: 404 }
      );
    }

    const {
      title,
      promotionType,
      categoryID,
      requiredQuantity,
      bundlePrice,
      active,
      validFrom,
      validTill,
    } = body;

    // ── Category check (only if being updated) ───────────────────────────────
    if (categoryID && categoryID !== promotion.categoryID.toString()) {
      const category = await CategoryModel.findById(categoryID);
      if (!category) {
        return NextResponse.json(
          { success: false, message: "Category not found" },
          { status: 404 }
        );
      }
    }

    // ── Conflict check (only if activating or switching category) ────────────
    const isActivating =
      active === true && promotion.active === false;
    const categoryChanging =
      categoryID && categoryID !== promotion.categoryID.toString();

    if (isActivating || categoryChanging) {
      const targetCategory = categoryID || promotion.categoryID.toString();
      const targetType = promotionType || promotion.promotionType;

      const conflict = await PromotionModel.findOne({
        _id: { $ne: id },
        categoryID: targetCategory,
        promotionType: targetType,
        active: true,
      });

      if (conflict) {
        return NextResponse.json(
          {
            success: false,
            message: `Cannot activate: "${conflict.title}" is already active for this category. Disable it first.`,
          },
          { status: 409 }
        );
      }
    }

    // ── bundle_price validation (only if those fields are being updated) ──────
    const newType = promotionType || promotion.promotionType;
    const newQty = requiredQuantity !== undefined ? Number(requiredQuantity) : null;
    const newPrice = bundlePrice !== undefined ? Number(bundlePrice) : null;

    if (newType === "bundle_price") {
      if (newQty !== null && newQty < 2) {
        return NextResponse.json(
          { success: false, message: "Required quantity must be at least 2" },
          { status: 400 }
        );
      }
      if (newPrice !== null && newPrice < 0) {
        return NextResponse.json(
          { success: false, message: "Bundle price must be a positive number" },
          { status: 400 }
        );
      }
    }

    // ── Date validation ──────────────────────────────────────────────────────
    const fromDate = validFrom !== undefined ? (validFrom ? new Date(validFrom) : null) : promotion.validFrom;
    const tillDate = validTill !== undefined ? (validTill ? new Date(validTill) : null) : promotion.validTill;

    if (fromDate && tillDate && fromDate >= tillDate) {
      return NextResponse.json(
        { success: false, message: "Valid From must be before Valid Till" },
        { status: 400 }
      );
    }

    // ── Apply updates ────────────────────────────────────────────────────────
    if (title !== undefined) promotion.title = title.trim();
    if (promotionType !== undefined) promotion.promotionType = promotionType;
    if (categoryID !== undefined) promotion.categoryID = categoryID;
    if (requiredQuantity !== undefined) promotion.requiredQuantity = Number(requiredQuantity);
    if (bundlePrice !== undefined) promotion.bundlePrice = Number(bundlePrice);
    if (active !== undefined) promotion.active = Boolean(active);
    if (validFrom !== undefined) promotion.validFrom = validFrom ? new Date(validFrom) : null;
    if (validTill !== undefined) promotion.validTill = validTill ? new Date(validTill) : null;

    await promotion.save();

    const updated = await PromotionModel.findById(id).populate(
      "categoryID",
      "categoryName"
    );

    return NextResponse.json({
      success: true,
      message: "Promotion updated",
      promotion: updated,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}