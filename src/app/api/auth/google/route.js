import { NextResponse } from "next/server"
import { OAuth2Client } from "google-auth-library"
import connectDB from "@/lib/db"
import User from "@/Models/UserModel"
import { signToken } from "@/lib/jwt"

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)

export async function POST(req){
    await connectDB()

    const {token} = await req.json()
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_CLIENT_ID,
    })
    const payload = ticket.getPayload()

    let user = await User.findOne({userEmail: payload.email})
    if(!user){
        user = await User.create({
            userName: payload.name,
            userEmail: payload.email,
            authProvider: "google",
            googleId: payload.sub,
        })
    }

    const jwtToken = signToken(user)
    const response = NextResponse.json({ message: "Google login success" })

    response.cookies.set({
        name: "token",
        value: jwtToken,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
    })

  return response
}