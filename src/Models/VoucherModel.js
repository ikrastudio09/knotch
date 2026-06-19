import mongoose from "mongoose";

const VoucherSchema = new mongoose.Schema({
  code: {
    type: String,
    unique: true,
    uppercase: true,
  },

  description: String,

  discountType: {
    type: String,
    enum: ["flat", "pecentage"],
  },

  discountValue: Number,

  freeShipping: {
    type: Boolean,
    default: false,
  },

  minOrderAmount: {
    type: Number,
    default: 0,
  },

  maximumDiscount: Number,

  usageLimit: Number,

  usedCount: {
    type: Number,
    default: 0,
  },

  usedBy: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],

  validFrom: Date,

  validTill: Date,

  active: {
    type: Boolean,
    default: true,
  },
});

export default mongoose.models.Voucher ||
  mongoose.model("Voucher", VoucherSchema);
