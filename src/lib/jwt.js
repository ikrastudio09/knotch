import jwt from "jsonwebtoken"
import { jwtVerify } from "jose"

export function signToken(user){
    return jwt.sign(
        {
            id: user._id,
            role: user.role,
            email: user.email,
        },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
    )
}

export async function verifyToken(token) {
  const secret = new TextEncoder().encode(process.env.JWT_SECRET)

  const { payload } = await jwtVerify(token, secret)

  return payload
}