import connectDB from "@/lib/db.js";
import { cookies } from "next/headers";
import User from "@/Models/UserModel";
import Product from "@/Models/ProductModel";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export const runtime = "nodejs";

export async function POST(req) {
  try {
    await connectDB();

    const { productID, productQuantity, productSize } = await req.json();
    const qty = Math.max(1, Number(productQuantity) || 1);

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

    const product = await Product.findById(productID);

    if (!product) {
      return NextResponse.json(
        { success: false, message: "Product unavailable" },
        { status: 404 }
      );
    }

    const stock = product.productStock.get(productSize) || 0;

    if (stock === 0) {
      return NextResponse.json(
        { success: false, message: "Selected size out of stock" },
        { status: 400 }
      );
    }

    // try incrementing existing cart item
    const result = await User.updateOne(
      {
        _id: userID,
        "cartData.productID": productID,
        "cartData.productSize": productSize,
      },
      {
        $inc: { "cartData.$.productQuantity": qty },
      }
    );

    // if no item matched → push new item
    if (result.modifiedCount === 0) {
      await User.updateOne(
        { _id: userID },
        {
          $push: {
            cartData: {
              productID,
              productSize,
              productQuantity: qty,
            },
          },
        }
      );
    }

    const user = await User.findById(userID);

    const cartCount = user.cartData.reduce(
      (sum, item) => sum + item.productQuantity,
      0
    );

    return NextResponse.json({
      success: true,
      message: "Product added to cart",
      cartCount,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { success: false, message: "Server Error" },
      { status: 500 }
    );
  }
}