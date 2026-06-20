import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import PromotionModel from "@/Models/PromotionalModel";
import CategoryModel from "@/Models/CategoryModel";

/**
 * POST /api/manage/promotions/create
 *
 * Body:
 * {
 *   title: string            — display name e.g. "Buy Any 3 Shirts @ ₹1100"
 *   promotionType: string    — "bundle_price" (only V1 type)
 *   categoryID: ObjectId     — which category the bundle applies to
 *   requiredQuantity: number — how many items needed to unlock
 *   bundlePrice: number      — total price for the bundle
 *   active: boolean          — whether live to customers (default true)
 *   validFrom: Date | null
 *   validTill: Date | null
 * }
 */
export async function POST(req) {
  try {
    await connectDB();

    const body = await req.json();
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

    // ── Required field validation ────────────────────────────────────────────
    if (!title?.trim()) {
      return NextResponse.json(
        { success: false, message: "Title is required" },
        { status: 400 }
      );
    }

    if (!promotionType) {
      return NextResponse.json(
        { success: false, message: "Promotion type is required" },
        { status: 400 }
      );
    }

    if (!categoryID) {
      return NextResponse.json(
        { success: false, message: "Category is required" },
        { status: 400 }
      );
    }

    // Verify the category exists
    const category = await CategoryModel.findById(categoryID);
    if (!category) {
      return NextResponse.json(
        { success: false, message: "Category not found" },
        { status: 404 }
      );
    }

    // ── bundle_price specific validation ─────────────────────────────────────
    if (promotionType === "bundle_price") {
      if (!requiredQuantity || Number(requiredQuantity) < 2) {
        return NextResponse.json(
          { success: false, message: "Required quantity must be at least 2" },
          { status: 400 }
        );
      }

      if (!bundlePrice || Number(bundlePrice) < 0) {
        return NextResponse.json(
          { success: false, message: "Bundle price must be a positive number" },
          { status: 400 }
        );
      }
    }

    // ── Date validation ──────────────────────────────────────────────────────
    if (validFrom && validTill && new Date(validFrom) >= new Date(validTill)) {
      return NextResponse.json(
        { success: false, message: "Valid From must be before Valid Till" },
        { status: 400 }
      );
    }

    // ── Check for conflicting active promotion on same category ──────────────
    // Prevent two active bundle_price promotions for the same category
    const conflict = await PromotionModel.findOne({
      categoryID,
      promotionType,
      active: true,
    });

    if (conflict) {
      return NextResponse.json(
        {
          success: false,
          message: `An active "${promotionType}" promotion for this category already exists: "${conflict.title}". Disable it before creating another.`,
        },
        { status: 409 }
      );
    }

    // ── Create ───────────────────────────────────────────────────────────────
    const promotion = await PromotionModel.create({
      title: title.trim(),
      promotionType,
      categoryID,
      requiredQuantity: Number(requiredQuantity),
      bundlePrice: Number(bundlePrice),
      active: active !== undefined ? Boolean(active) : true,
      validFrom: validFrom ? new Date(validFrom) : null,
      validTill: validTill ? new Date(validTill) : null,
    });

    const populated = await promotion.populate("categoryID", "categoryName");

    return NextResponse.json(
      {
        success: true,
        message: "Promotion created successfully",
        promotion: populated,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}