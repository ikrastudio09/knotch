import { NextResponse } from "next/server"
import connectDB from "@/lib/db"
import User from "@/Models/UserModel"
import bcrypt from "bcryptjs"

export async function POST(req){
    await connectDB()

    const {userName, userEmail,userNumber, userPassword, userAddress} = await req.json();

    if(!userEmail && !userNumber){
        console.error('Missing Parameters')
        return;
    }

    const existing = await User.findOne({userEmail})
    if(existing)
        return NextResponse.json({message: "Email is already registered, "},{status:400})

    const existingPhone = await User.findOne({userNumber})
    if(existingPhone)
        return NextResponse.json({message: "Mobile numbeer is already registered, "},{status:400})

    const hashed = await bcrypt.hash(userPassword, 10)
    await User.create({
        userName,
        userEmail,
        userNumber,
        userPassword: hashed,
        userAddress: userAddress? userAddress:[]
    })

    return NextResponse.json({message: "Registration Successfull"})
}