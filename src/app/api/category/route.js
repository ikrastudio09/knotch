import connectDB from "@/lib/db.js";
import { createCategory } from "@/lib/services/categoryService.js";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(request) {
  await connectDB();

  try {
    const formData = await request.formData();

    const categoryName = formData.get("categoryName");

    if (!categoryName) {
      return NextResponse.json(
        {
          success: false,
          message: "Category Name Missing",
        },
        { status: 400 },
      );
    }

    const Category = await createCategory({
      categoryName,
    });

    return NextResponse.json({
      success: true,
      Category,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 },
    );
  }
}
