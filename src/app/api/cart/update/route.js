import connectDB from "@/lib/db.js";
import { cookies } from "next/headers";
import User from "@/Models/UserModel";
import Product from "@/Models/ProductModel";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export const runtime = "nodejs";

export async function PATCH(req) {
  try {
    await connectDB();

    const { productID, productSize, action } = await req.json();

    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json({ success: false }, { status: 401 });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userID = decoded.id;

    const user = await User.findById(userID);

    const item = user.cartData.find(
      (i) =>
        i.productID.toString() === productID &&
        i.productSize === productSize
    );

    if (!item) {
      return NextResponse.json({ success: false, message: "Item not found" });
    }

    const product = await Product.findById(productID);
    const stock = product.productStock.get(productSize) || 0;

    if (action === "inc") {
      if (item.productQuantity >= stock) {
        return NextResponse.json({
          success: false,
          message: "Stock limit reached",
        });
      }
      item.productQuantity += 1;
    }

    if (action === "dec") {
      item.productQuantity -= 1;
    }

    if (item.productQuantity <= 0) {
      user.cartData = user.cartData.filter(
        (i) =>
          !(i.productID.toString() === productID && i.productSize === productSize)
      );
    }

    await user.save();

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}