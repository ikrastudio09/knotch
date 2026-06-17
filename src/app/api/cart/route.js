import connectDB from "@/lib/db.js";
import { cookies } from "next/headers";
import User from "@/Models/UserModel";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export const runtime = "nodejs";

export async function GET() {
  try {
    await connectDB();

    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userID = decoded.id;

    const user = await User.findById(userID).populate({
      path: "cartData.productID",
      select:
        "productName productSellingPrice productOriginalPrice productImages slug productStock",
    });

    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    const cart = user.cartData;

    let cartCount = 0;
    let cartTotal = 0;

    const formattedCart = cart.map((item) => {
      const product = item.productID;

      const price = product.productSellingPrice;

      cartCount += item.productQuantity;
      cartTotal += price * item.productQuantity;

      const stockForSize = product.productStock.get(item.productSize) || 0;
      
      console.log(product);
      return {
        productID: product._id,
        productName: product.productName,
        slug: product.slug,
        image: product.productImages?.[0]?.url,
        price: price,
        originalPrice: product.productOriginalPrice,
        size: item.productSize,
        quantity: item.productQuantity,
        availableStock: stockForSize,
      };
    });

    return NextResponse.json({
      success: true,
      cart: formattedCart,
      cartCount,
      cartTotal,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { success: false, message: "Server Error" },
      { status: 500 }
    );
  }
}