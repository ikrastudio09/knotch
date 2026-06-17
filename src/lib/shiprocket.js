const SHIPROCKET_EMAIL = process.env.SR_EMAIL;
const SHIPROCKET_PASSWORD = process.env.SR_PASSWORD;

let token = null;
let tokenExpiry = null;

export async function getShiprocketToken() {
  if (token && tokenExpiry > Date.now()) {
    return token;
  }

  const response = await fetch(
    "https://apiv2.shiprocket.in/v1/external/auth/login",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: SHIPROCKET_EMAIL,
        password: SHIPROCKET_PASSWORD,
      }),
    },
  );

  const data = await response.json();
  console.log("LOGIN RESPONSE:", data);

  token = data.token;

  tokenExpiry = Date.now() + 9 * 24 * 60 * 60 * 1000;

  return token;
}

export async function createShiprocketOrder(order) {
  const token = await getShiprocketToken();

  const payload = {
    order_id: order.orderNumber,

    order_date: new Date().toISOString(),

    pickup_location: "Primary",

    billing_customer_name: order.shippingAddress.fullName,
    billing_last_name: "",

    billing_address: order.shippingAddress.AddressLine1,

    billing_address_2: order.shippingAddress.AddressLine2 || "",

    billing_city: order.shippingAddress.City,

    billing_pincode: order.shippingAddress.PinCode,

    billing_state: order.shippingAddress.State,

    billing_country: order.shippingAddress.Country,

    billing_email: order.shippingAddress.email,

    billing_phone: order.shippingAddress.phone,

    shipping_is_billing: true,

    order_items: order.items.map((item) => ({
      name: item.productName,
      sku: item.productID.toString(),
      units: item.quantity,
      selling_price: item.sellingPrice,
    })),

    payment_method: "Prepaid",

    sub_total: order.totalAmount,

    length: 10,
    breadth: 10,
    height: 10,
    weight: 0.5,
  };

  const response = await fetch(
    "https://apiv2.shiprocket.in/v1/external/orders/create/adhoc",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    },
  );

  const data = await response.json();

  console.log("SHIPROCKET RESPONSE:", JSON.stringify(data, null, 2));

  if (!response.ok) {
    throw new Error(data.message || "Shiprocket API Error");
  }

  if (data.status === false || data.shipment_id === undefined) {
    throw new Error(data.message || "Shiprocket order creation failed");
  }

  return data;
}
