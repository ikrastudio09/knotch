import { NextResponse } from "next/server";
import connectDB from "@/lib/db.js";
import mongoose from "mongoose";
import Product from "@/Models/ProductModel.js";

export const runtime = "nodejs";

export async function POST(request) {
  await connectDB();

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { items } = await request.json();

    for (const item of items) {
      const { productID, size, quantity } = item;

      const product = await Product.findById(productID).session(session);

      if (!product) {
        throw new Error("Product not found ||");
      }

      const currentStock = product.productStock?.get(color)?.get(size);

      if (!currentStock || currentStock < quantity) {
        throw new Error(`Insufficient stock for ${color} - ${size}`);
      }

      product.productStock.get(color).set(size, currentStock - quantity);
      product.markModified("productStock");
      await product.save({ session });
    }

    await session.commitTransaction();
    session.endSession();

    return NextResponse.json(
      {
        success: true,
        message: "Stock updated successfully !!",
      },
      { status: 200 },
    );
  } catch (error) {
    await session.abortTransaction();
    session.endSession();

    return NextResponse.json(
      { success: false, message: error.message },
      { status: 400 },
    );
  }
}
