import { NextResponse } from "next/server";
import connectDB from "@/lib/db.js";
import cloudinary from "@/lib/services/cloudinary.js";
import Product from "@/Models/ProductModel.js";

export const runtime = "nodejs";

export async function DELETE(request, context) {
  await connectDB();
  const { id } = await context.params;
  try {
    const product = await Product.findById(id);

    if (!product) {
      return NextResponse.json(
        { success: false, message: "Product not found" },
        { status: 404 },
      );
    } 

    // -------- DELETE IMAGES FROM CLOUDINARY --------
    // for (const img of product.productImages) {
    //   await cloudinary.uploader.destroy(img.public_id);
    // }

    // -------- DELETE PRODUCT FROM DB --------
    await Product.findByIdAndDelete(id);

    return NextResponse.json(
      {
        success: true,
        message: "Product Deleted Successfully !!",
      },
      { status: 200 },
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 },
    );
  }
}
