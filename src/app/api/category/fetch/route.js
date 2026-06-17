import Category from "@/Models/CategoryModel.js";
import connectDB from "@/lib/db.js";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function GET() {
    await connectDB();

    try {
        const categories = await Category.find();

        if(!categories){
            return NextResponse.json({
                success: false,
                message: 'Categories Not Found!!'
            }, {status: 404});
        }

        return NextResponse.json({
            success: true,
            categories
        }, {status: 200});
    } catch (error) {
        console.error(error);
        return NextResponse.json({
            success: false,
            message: 'Internal server error'
        }, {status: 500});
    }
}