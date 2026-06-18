import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import connectDB from "@/lib/db";
import User from "@/Models/UserModel";
import Product from "@/Models/ProductModel";
import Order from "@/Models/OrderModel";
import { createShiprocketOrder } from "@/lib/shiprocket";

export async function POST(req) {
  try {
    await connectDB();

    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 },
      );
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id).populate("cartData.productID");
    const { shippingAddress, paymentMethod, shipping, razorpayOrderID, paymentID, razorpaySignature } =
      await req.json();

    if (!shippingAddress) {
      return NextResponse.json(
        { success: false, message: "Shipping address required" },
        { status: 400 },
      );
    }

    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 },
      );
    }

    if (!user.cartData.length) {
      return NextResponse.json(
        { success: false, message: "Cart is empty" },
        { status: 400 },
      );
    }

    const cart = user.cartData;

    let items = [];
    let total = 0;

    for (let item of cart) {
      const product = item.productID;

      if (!product) {
        throw new Error("Product not found");
      }

      const stock = product.productStock.get(item.productSize);

      if (stock === undefined) {
        throw new Error(
          `${product.productName} size ${item.productSize} not available`,
        );
      }

      if (stock < item.productQuantity) {
        throw new Error(`${product.productName} is out of stock`);
      }

      items.push({
        productID: product._id,
        productName: product.productName,
        sellingPrice: product.productSellingPrice,
        originalPrice: product.productOriginalPrice,
        productImage: product.productImages[0]?.url,
        productSize: item.productSize,
        quantity: item.productQuantity,
      });

      total += product.productSellingPrice * item.productQuantity;
    }

    const totalItems = cart.reduce(
      (sum, item) => sum + item.productQuantity,
      0,
    );

    const order = await Order.create({
      orderNumber: `ORD-${Date.now()}`,
      userID: user._id,
      items,
      shippingAddress,
      shipping,
      razorpayOrderID,
      paymentID,
      razorpaySignature,
      paymentMethod: "razorpay",
      paymentStatus: "paid",
      totalAmount: total + (shipping?.cost || 0),
      totalItems,
    });

    try {
      const shiprocketResponse = await createShiprocketOrder(order);
      if (!order.shipping) {
        order.shipping = {};
      }

      order.shipping.orderId = shiprocketResponse.order_id;

      order.shipping.shipmentId = shiprocketResponse.shipment_id;

      order.shipping.shippingStatus = "order_created";

      await order.save();
    } catch (err) {
      order.shippingError = err.message;
      await order.save();
    }

    for (let item of cart) {
      await Product.updateOne(
        {
          _id: item.productID._id,
        },
        {
          $inc: {
            [`productStock.${item.productSize}`]: -item.productQuantity,
          },
        },
      );
    }

    user.cartData = [];
    await user.save();

    return NextResponse.json({
      success: true,
      message: "Order placed successfully",
      order,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 },
    );
  }
}
