import mongoose from "mongoose";

const shippingSchema = new mongoose.Schema(
  {
    provider: {
      type: String,
      enum: ["shiprocket", "manual"],
      default: "shiprocket",
    },

    shipmentId: {
      type: String,
    },

    orderId: {
      type: String,
    },

    awbCode: {
      type: String,
    },

    courierName: {
      type: String,
    },

    labelUrl: {
      type: String,
    },

    manifestUrl: {
      type: String,
    },

    trackingUrl: {
      type: String,
    },

    pickupScheduledDate: {
      type: Date,
    },

    shippedDate: {
      type: Date,
    },

    deliveredDate: {
      type: Date,
    },

    courierCompanyId: {
      type: String,
    },

    shippingStatus: {
      type: String,
      enum: [
        "not_created",
        "order_created",
        "pickup_scheduled",
        "picked_up",
        "in_transit",
        "out_for_delivery",
        "delivered",
        "cancelled",
        "returned",
      ],
      default: "not_created",
      index: true,
    },
  },
  { _id: false },
);

export default shippingSchema;
