import { NextResponse } from "next/server";
import connectDB from "@/lib/db.js";
import Order from "@/Models/OrderModel.js";
import "@/Models/UserModel.js";

export async function GET(){
    await connectDB();

    try {
        const orders = await Order.find().populate("userID").sort({createdAt: -1});

        return NextResponse.json({
            success: true,
            orders
        });
    } catch (error) {
        console.error(error);

        return NextResponse.json({
            success: false,
            message: 'Internal server error'
        },{status: 500});
    }
}