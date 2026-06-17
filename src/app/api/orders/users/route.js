import Order from "@/Models/OrderModel";
import connectDB from "@/lib/db";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function GET() {
  try {
    await connectDB();

    // get cookie
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return Response.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    // verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const userID = decoded.id;

    // find orders of that user
    const orders = await Order.find({ userID })
      .populate("items.productID")
      .sort({ orderDate: -1 });

    return Response.json({
      success: true,
      orders,
    });
  } catch (error) {
    console.error(error);

    return Response.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}