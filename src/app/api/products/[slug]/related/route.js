import { NextResponse } from "next/server";
import connectDB from "@/lib/db.js";
import Product from "@/Models/ProductModel.js";
import "@/Models/CategoryModel.js";

export const runtime = "nodejs";

export async function GET(request, context) {
  await connectDB();

  const { slug } = await context.params;

  try {
    const { searchParams } = new URL(request.url);

    const limit = Number(searchParams.get("limit")) || 4;

    const currentProduct = await Product.findOne({ slug });

    if (!currentProduct) {
      return NextResponse.json(
        {
          success: false,
          message: "Product not found !!",
        },
        { status: 404 },
      );
    }

    const relatedProducts = await Product.find({
      productCategory: currentProduct.productCategory,
      _id: { $ne: currentProduct._id },
    })
      .select("productName slug productSellingPrice productImages")
      .limit(limit)
      .sort({ createdAt: -1 });

    return NextResponse.json({
        success: true,
        relatedProducts,
    }, {status: 200});
  } catch (error) {
    console.error(error);

    return NextResponse.json({
        success: false,
        message: 'Internal Server Error'
    }, {status: 500});
  }
}
