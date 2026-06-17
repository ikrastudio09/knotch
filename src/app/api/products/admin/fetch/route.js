import { NextResponse } from "next/server";
import connectDB from "@/lib/db.js";
import Product from "@/Models/ProductModel.js";
import "@/Models/CategoryModel.js"

export const runtime = "nodejs";

export async function GET(){
    await connectDB();

    try {
        const products = await Product.find().populate("productCategory", "categoryName").sort({createdAt: -1});

        return NextResponse.json({
            success: true,
            products
        });
    } catch (error) {
        console.error(error);

        return NextResponse.json({
            success: false,
            message: 'Internal server error'
        },{status: 500});
    }
}