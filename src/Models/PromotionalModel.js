import mongoose from "mongoose";

const PromotionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    /**
     * V1: only "bundle_price" is implemented.
     * Future types to add here: "buy_x_get_y", "cart_value_reward", etc.
     */
    promotionType: {
      type: String,
      enum: ["bundle_price"],
      required: true,
    },

    active: {
      type: Boolean,
      default: true,
      index: true,
    },

    // Which product category this promotion applies to
    categoryID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },

    // bundle_price fields
    requiredQuantity: {
      type: Number,
      required: function () {
        return this.promotionType === "bundle_price";
      },
      min: 2,
    },

    bundlePrice: {
      type: Number,
      required: function () {
        return this.promotionType === "bundle_price";
      },
      min: 0,
    },

    // Validity window (null = no limit on that side)
    validFrom: {
      type: Date,
      default: null,
    },

    validTill: {
      type: Date,
      default: null,
    },

    // Reserved for future types — not used in V1
    // buy_x_get_y fields
    buyQuantity: { type: Number, default: null },
    getQuantity: { type: Number, default: null },
    getProductID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Products",
      default: null,
    },

    // cart_value_reward fields
    minCartValue: { type: Number, default: null },
    rewardType: {
      type: String,
      enum: ["flat", "percentage", "free_shipping", null],
      default: null,
    },
    rewardValue: { type: Number, default: null },
  },
  {
    timestamps: true,
  }
);

// Compound index so the engine can quickly fetch active, valid promotions
PromotionSchema.index({ active: 1, validFrom: 1, validTill: 1 });

export default mongoose.models.Promotion ||
  mongoose.model("Promotion", PromotionSchema);