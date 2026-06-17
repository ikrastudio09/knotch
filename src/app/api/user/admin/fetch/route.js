import { NextResponse } from "next/server";
import connectDB from "@/lib/db.js";
import User from "@/Models/UserModel.js";

export async function GET(){
    await connectDB();

    try {
        const users = await User.find();
        
        return NextResponse.json({
            success: true,
            users,
        });
    } catch (error) {
        console.error(error);

        return NextResponse.json({
            success: false,
            message: 'internal Server error',
        }, {status: 500});
    }
}