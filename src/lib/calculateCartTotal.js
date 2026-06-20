import VoucherModel from "@/Models/VoucherModel";
import PromotionalModel from "@/Models/PromotionalModel";
import { applyBundlePromotions } from "./promotions";

export async function calculateCartTotals(cart, user, voucherCode) {
  let subtotal = 0;

  for (const item of cart) {
    subtotal += item.productID.productSellingPrice * item.productQuantity;
  }

  // Promotion Logic
  let promotionDiscount = 0;
  let appliedPromotions = [];

  // const promotions = await PromotionalModel.find({
  //   active: true,
  // });

  // const promotionResult = applyBundlePromotions(cart, promotions);

  // promotionDiscount = promotionResult.totalDiscount;

  // appliedPromotions = promotionResult.appliedPromotions;


  // console.log("PROMOTIONS:", promotions);
  // TODO

  const totalAfterPromotion = subtotal - promotionDiscount;

  // Voucher Logic
  let voucherDiscount = 0;
  let freeShipping = false;
  let voucher = null;

  if (voucherCode) {
    voucher = await VoucherModel.findOne({
      code: voucherCode.toUpperCase().trim(),
    });

    if (!voucher) {
      throw new Error("Invalid voucher");
    }

    if (!voucher.active) {
      throw new Error("Voucher inactive");
    }

    if (voucher.usedBy.some((id) => id.toString() === user._id.toString())) {
      throw new Error("Voucher already used");
    }

    const now = new Date();

    if (voucher.validFrom && now < voucher.validFrom) {
      throw new Error("Voucher not started");
    }

    if (voucher.validTill && now > voucher.validTill) {
      throw new Error("Voucher expired");
    }

    if (totalAfterPromotion < voucher.minOrderAmount) {
      throw new Error(`Minimum order amount ₹${voucher.minOrderAmount}`);
    }

    if (voucher.usageLimit && voucher.usedCount >= voucher.usageLimit) {
      throw new Error("Voucher usage limit reached");
    }

    if (voucher.discountType === "flat") {
      voucherDiscount = voucher.discountValue;
    }

    if (voucher.discountType === "percentage") {
      voucherDiscount = (totalAfterPromotion * voucher.discountValue) / 100;
    }

    if (voucher.maxDiscount && voucherDiscount > voucher.maxDiscount) {
      voucherDiscount = voucher.maxDiscount;
    }

    if (voucher.freeShipping) {
      freeShipping = true;
    }

    voucherDiscount = Math.min(voucherDiscount, totalAfterPromotion);
  }

  const shippingCost = freeShipping ? 0 : 50;

  return {
    subtotal,
    promotionDiscount,
    appliedPromotions,
    voucherDiscount,
    freeShipping,
    shippingCost,

    finalAmount: totalAfterPromotion + shippingCost - voucherDiscount,

    voucher,
  };
}
