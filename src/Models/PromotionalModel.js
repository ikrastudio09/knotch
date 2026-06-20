import mongoose from "mongoose";

const PromotionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    promotionType: {
      type: String,
      enum: ["bundle_price"],
      required: true,
    },

    active: {
      type: Boolean,
      default: true,
    },

    categoryID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },

    requiredQuantity: {
      type: Number,
      required: true,
    },

    bundlePrice: {
      type: Number,
      required: true,
    },

    validFrom: Date,

    validTill: Date,
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Promotion ||
  mongoose.model("Promotion", PromotionSchema);