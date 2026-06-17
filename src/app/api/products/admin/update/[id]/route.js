import { NextResponse } from "next/server";
import connectDB from "@/lib/db.js";
import { uploadToCloudinary } from "@/lib/services/uploadservice.js";
import cloudinary from "@/lib/services/cloudinary.js";
import Product from "@/Models/ProductModel.js";

export const runtime = "nodejs";

export async function PUT(request, context) {
  await connectDB();

  const { id } = await context.params;
  let uploadedImages = [];

  try {
    const formData = await request.formData();
    const product = await Product.findById(id);

    if (!product) {
      return NextResponse.json(
        { success: false, message: "Product Not Found" },
        { status: 404 },
      );
    }

    // ---------- SAFE EXTRACTION ----------
    const productName = formData.get("productName");
    const productSellingPriceRaw = formData.get("productSellingPrice");
    const productOriginalPriceRaw = formData.get("productOriginalPrice");
    const productCategory = formData.get("productCategory");
    const productDescription = formData.get("productDescription");
    const displayAt = formData.get("displayAt");
    const exchangePolicyRaw = formData.get("exchangePolicy");

    const productSizeRaw = formData.get("productSize");
    const productStockRaw = formData.get("productStock");
    const imagesToRemoveRaw = formData.get("imagesToRemove");

    // ---------- REMOVE IMAGES ----------
    if (imagesToRemoveRaw) {
      const imagesToRemove = JSON.parse(imagesToRemoveRaw);

      for (const public_id of imagesToRemove) {
        await cloudinary.uploader.destroy(public_id);
      }

      product.productImages = product.productImages.filter(
        (img) => !imagesToRemove.includes(img.public_id),
      );
    }

    // ---------- ADD NEW IMAGES ----------
    const newFiles = formData.getAll("images");

    for (const file of newFiles) {
      if (!file || !file.name) continue;

      const result = await uploadToCloudinary(file);

      uploadedImages.push({
        url: result.secure_url,
        public_id: result.public_id,
      });
    }

    product.productImages.push(...uploadedImages);

    // ---------- UPDATE FIELDS ----------
    if (productName !== null) product.productName = productName;

    if (productSellingPriceRaw !== null)
      product.productSellingPrice = Number(productSellingPriceRaw);

    if (productOriginalPriceRaw !== null)
      product.productOriginalPrice = Number(productOriginalPriceRaw);

    if (productCategory !== null) product.productCategory = productCategory;

    if (productDescription !== null)
      product.productDescription = productDescription;

    if (displayAt !== null) product.displayAt = displayAt;

    if (exchangePolicyRaw !== null)
      product.exchangePolicy = exchangePolicyRaw === "true";

    if (productSizeRaw) {
      const parsedSize = JSON.parse(productSizeRaw);
      product.productSize = parsedSize;
    }
    
    if (productStockRaw) {
      const parsedStock = JSON.parse(productStockRaw);

      const stockMap = new Map(Object.entries(parsedStock));

      product.productStock = stockMap;
    }

    await product.save();

    return NextResponse.json({
      success: true,
      product,
    });
  } catch (error) {
    // Rollback newly uploaded images
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
