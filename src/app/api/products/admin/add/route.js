import { NextResponse } from "next/server";
import connectDB from "@/lib/db.js";
import { uploadToCloudinary } from "@/lib/services/uploadservice.js";
import { createProduct } from "@/lib/services/productService.js";
import cloudinary from "@/lib/services/cloudinary.js";

export const runtime = "nodejs"; // Dont know why

export async function POST(request) {
  await connectDB();

  let uploadedImages = [];

  try {
    const formData = await request.formData();

    const productName = formData.get("productName");
    const productSellingPrice = Number(formData.get("productSellingPrice"));
    const productOriginalPrice = Number(formData.get("productOriginalPrice"));
    const productCategory = formData.get("productCategory");
    const productDescription = formData.get("productDescription");
    const displayAt = formData.get("displayAt");
    const exchangePolicy = formData.get("exchangePolicy") === "true";

    const productSize = JSON.parse(formData.get("productSize"));
    const productStock = JSON.parse(formData.get("productStock"));

    const files = formData.getAll("images");

    // ---------- VALIDATION ----------
    if (!productName || !productSellingPrice || !productCategory) {
      return NextResponse.json(
        { success: false, message: "Required fields missing" },
        { status: 400 },
      );
    }

    if (productOriginalPrice && productOriginalPrice < productSellingPrice) {
      return NextResponse.json(
        {
          success: false,
          message: "Original price must be greater than selling price",
        },
        { status: 400 },
      );
    }

    if (!productSize || !productStock) {
      return NextResponse.json(
        { success: false, message: "Size and stock required" },
        { status: 400 },
      );
    }

    for (const size of productSize) {
      if (!(size in productStock)) {
        return NextResponse.json(
          { success: false, message: `Stock missing for size ${size}` },
          { status: 400 },
        );
      }

      if (typeof productStock[size] !== "number" || productStock[size] < 0) {
        return NextResponse.json(
          { success: false, message: `Invalid stock for size ${size}` },
          { status: 400 },
        );
      }
    }

    if (!files.length) {
      return NextResponse.json(
        { success: false, message: "At least one image required" },
        { status: 400 },
      );
    }

    // ---------- IMAGE UPLOAD ----------
    for (const file of files) {
      const result = await uploadToCloudinary(file);

      uploadedImages.push({
        url: result.secure_url,
        public_id: result.public_id,
      });
    }

    const stockMap = new Map(Object.entries(productStock));

    // ---------- CREATE PRODUCT ----------
    const product = await createProduct({
      productName,
      productSellingPrice,
      productOriginalPrice,
      productCategory,
      productSize,
      productDescription,
      productImages: uploadedImages,
      productStock: stockMap,
      displayAt,
      exchangePolicy,
    });

    return NextResponse.json({
      success: true,
      product,
    });
  } catch (error) {
    // 🔥 Rollback images if DB fails
    for (const img of uploadedImages) {
      await cloudinary.uploader.destroy(img.public_id);
    }

    console.error(error);

    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 },
    );
  }
}
