import mongoose from "mongoose";

const ProductCounterSchema = new mongoose.Schema({
  id: { type: String, required: true },
  seq: { type: Number, default: 0 }
});

const ProductCounter =
  mongoose.models.ProductCounter ||
  mongoose.model("ProductCounter", ProductCounterSchema);

export default ProductCounter;