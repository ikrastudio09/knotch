import VoucherModel from "@/Models/VoucherModel";
import {
  getActivePromotions,
  applyBundlePromotions,
  calculatePromotionProgress,
} from "./promotionEngine";

/**
 * Central cart calculation function.
 *
 * Rules:
 *  - selectedPromotionId and voucherCode are mutually exclusive.
 *  - If both are supplied, throw immediately.
 *  - Promotion engine runs first; if a promotion is selected, voucher is skipped.
 *  - If only a voucher is supplied, promotion engine still calculates trackers
 *    (for display), but no promotion discount is applied.
 *
 * @param {Array}  cart                - user.cartData populated with productID
 * @param {Object} user                - Mongoose user document
 * @param {string} [voucherCode]       - optional voucher code string
 * @param {string} [selectedPromotionId] - optional promotion ObjectId string
 */
export async function calculateCartTotals(
  cart,
  user,
  voucherCode,
  selectedPromotionId
) {
  // ── Mutual exclusion guard ──────────────────────────────────────────────────
  if (selectedPromotionId && voucherCode) {
    throw new Error(
      "You cannot use a promotion and a voucher on the same order. Please choose one."
    );
  }

  // ── Subtotal (sum of selling prices × quantities) ───────────────────────────
  let subtotal = 0;
  for (const item of cart) {
    subtotal += item.productID.productSellingPrice * item.productQuantity;
  }

  // ── Promotion Engine ─────────────────────────────────────────────────────────
  const activePromotions = await getActivePromotions();

  // Always compute trackers so the cart UI can render progress bars
  const promotionTrackers = calculatePromotionProgress(cart, activePromotions);

  let promotionDiscount = 0;
  let appliedPromotions = [];

  if (selectedPromotionId) {
    const result = applyBundlePromotions(
      cart,
      activePromotions,
      selectedPromotionId
    );
    promotionDiscount = result.totalDiscount;
    appliedPromotions = result.appliedPromotions;
  }

  const totalAfterPromotion = subtotal - promotionDiscount;

  // ── Voucher Engine (skipped if promotion is selected) ────────────────────────
  let voucherDiscount = 0;
  let freeShipping = false;
  let voucher = null;

  if (voucherCode && !selectedPromotionId) {
    voucher = await VoucherModel.findOne({
      code: voucherCode.toUpperCase().trim(),
    });

    if (!voucher) throw new Error("Invalid voucher");
    if (!voucher.active) throw new Error("Voucher inactive");

    if (voucher.usedBy.some((id) => id.toString() === user._id.toString())) {
      throw new Error("Voucher already used");
    }

    const now = new Date();
    if (voucher.validFrom && now < voucher.validFrom)
      throw new Error("Voucher not started");
    if (voucher.validTill && now > voucher.validTill)
      throw new Error("Voucher expired");
    if (totalAfterPromotion < voucher.minOrderAmount)
      throw new Error(`Minimum order amount ₹${voucher.minOrderAmount}`);
    if (voucher.usageLimit && voucher.usedCount >= voucher.usageLimit)
      throw new Error("Voucher usage limit reached");

    if (voucher.discountType === "flat") {
      voucherDiscount = voucher.discountValue;
    } else if (voucher.discountType === "percentage") {
      voucherDiscount = (totalAfterPromotion * voucher.discountValue) / 100;
    }

    if (voucher.maxDiscount && voucherDiscount > voucher.maxDiscount) {
      voucherDiscount = voucher.maxDiscount;
    }

    if (voucher.freeShipping) freeShipping = true;

    // Never let voucher discount exceed the amount it applies to
    voucherDiscount = Math.min(voucherDiscount, totalAfterPromotion);
  }

  // ── Shipping ─────────────────────────────────────────────────────────────────
  const shippingCost = freeShipping ? 0 : 50;

  // ── Final Amount ─────────────────────────────────────────────────────────────
  const finalAmount =
    totalAfterPromotion - voucherDiscount + shippingCost;

  return {
    subtotal,
    promotionDiscount,
    appliedPromotions,
    promotionTrackers,
    availablePromotions: activePromotions,
    voucherDiscount,
    freeShipping,
    shippingCost,
    finalAmount,
    voucher,
  };
}