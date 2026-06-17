import { NextResponse } from "next/server";
import { verifyToken } from "@/lib/jwt";

export async function middleware(req) {
  const token = req.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/Login", req.url));
  }

  try {
    const decoded = await verifyToken(token);
    const { pathname } = req.nextUrl;

    if (pathname.startsWith("/admin") && decoded.role !== "admin") {
      return NextResponse.redirect(new URL("/", req.url));
    }

    return NextResponse.next();
  } catch (err) {
    console.error("Token verification failed:", err);
    return NextResponse.redirect(new URL("/Login", req.url));
  }
}

export const config = {
  matcher: ["/admin/:path*", "/checkout/:path*", "/Profile/:path*"],
};