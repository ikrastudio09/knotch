import mongoose from "mongoose";

const SubscriberSchema = new mongoose.Schema(
  {
    email: {
      type: String, // not 'String'
      required: true,
      unique: true,
      lowercase: true,
      index: true,
    },

    isActive: {
      type: Boolean,
      default: true, // not True
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Subscriber ||
  mongoose.model("Subscriber", SubscriberSchema);