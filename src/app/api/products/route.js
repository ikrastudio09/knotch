import { NextResponse } from "next/server";
import connectDB from "@/lib/db.js";
import Product from "@/Models/ProductModel.js";
import "@/Models/CategoryModel.js";

export const runtime = "nodejs";

export async function GET(request) {
  await connectDB();

  try {
    const { searchParams } = new URL(request.url);

    const page = Number(searchParams.get("page")) || 1;
    const limit = Number(searchParams.get("limit")) || 10;
    const skip = (page - 1) * limit;
    const displayAt = searchParams.get("displayAt");
    const categories = searchParams.get("categories");
    const minPrice = searchParams.get("minPrice");
    const maxPrice = searchParams.get("maxPrice");
    const search = searchParams.get("search");
    const sort = searchParams.get("sort") || "newest";
    const sizes = searchParams.get("size");

    let filter = {};

    if (displayAt) {
      filter.displayAt = displayAt;
    }

    if (categories) {
      filter.productCategory = { $in: categories.split(",") };
    }

    if (sizes) {
      const selectedSizes = sizes.split(",");

      filter.$or = selectedSizes.map((size) => ({
        [`productStock.${size}`]: { $gt: 0 },
      }));
    }

    if (minPrice || maxPrice) {
      filter.productSellingPrice = {};

      if (minPrice) filter.productSellingPrice.$gte = Number(minPrice);
      if (maxPrice) filter.productSellingPrice.$lte = Number(maxPrice);
    }

    if (search) {
      filter.productName = { $regex: search, $options: "i" };
    }

    let sortOption = {};

    sortOption = {
      createdAt: -1,
      _id: -1,
    };

    switch (sort) {
      case "Price: Low to High":
        sortOption = {
          productSellingPrice: 1,
          _id: 1,
        };
        break;

      case "Price: High to Low":
        sortOption = {
          productSellingPrice: -1,
          _id: -1,
        };
        break;

      default:
        sortOption = {
          createdAt: -1,
          _id: -1,
        };
    }
    const [products, total] = await Promise.all([
      Product.find(filter)
        .populate("productCategory", "name")
        .sort(sortOption)
        .skip(skip)
        .limit(limit),
      Product.countDocuments(filter),
    ]);

    return NextResponse.json({
      success: true,
      page,
      totalPages: Math.ceil(total / limit),
      totalProducts: total,
      products,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 },
    );
  }
}
