import { NextResponse } from "next/server";
import connectDB from "@/lib/db.js";
import Product from '@/Models/ProductModel.js';
import '@/Models/CategoryModel.js';

export const runtime = "nodejs";

export async function GET(request, context){
    await connectDB();

    try {
        const {slug} = await context.params;

        const product = await Product.findOne({
            slug
        }).populate("productCategory", "name");

        if(!product){
            return NextResponse.json({
                success: false,
                message: 'Product not found !!'
            },{status: 404});
        }

        return NextResponse.json({
            success: true,
            product
        },{status: 200});
    } catch (error) {
        return NextResponse.json({
            success: false,
            message: 'Internal Server Error'
        },{status: 500});
    }
}