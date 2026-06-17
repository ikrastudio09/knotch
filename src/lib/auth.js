// lib/auth.js

import { cookies } from "next/headers";
import { verifyToken } from "@/lib/jwt";

export async function getCurrentUser() {
  const token = (await cookies()).get("token")?.value;

  if (!token) return null;

  try {
    return await verifyToken(token);
  } catch {
    return null;
  }
}